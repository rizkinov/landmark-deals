/**
 * Admin API: Manual Password Rotation
 * Allows admins to manually trigger password rotation
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSecurePassword } from '@/src/lib/password-generator'
import { sendPasswordNotification, PASSWORD_RECIPIENTS } from '@/src/lib/email'
import { cookies } from 'next/headers'

// Initialize Supabase client with service role for password update
function getSupabaseServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Supabase configuration missing')
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

// Get Supabase client for user authentication
function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing')
    }

    return createClient(supabaseUrl, supabaseAnonKey)
}

export async function POST(request: NextRequest) {
    try {
        // Get the access token from cookies
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('sb-access-token')?.value
        const refreshToken = cookieStore.get('sb-refresh-token')?.value

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            )
        }

        // Verify the user is an admin
        const supabase = getSupabaseClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Invalid authentication' },
                { status: 401 }
            )
        }

        // Check if user is admin
        const supabaseService = getSupabaseServiceClient()
        const { data: adminData, error: adminError } = await supabaseService
            .from('admin_users')
            .select('id, email, role, is_active')
            .eq('auth_user_id', user.id)
            .eq('is_active', true)
            .single()

        if (adminError || !adminData) {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            )
        }

        console.log(`Manual password rotation triggered by: ${adminData.email}`)

        // Parse request body for options
        const body = await request.json().catch(() => ({}))
        const sendEmail = body.sendEmail !== false // Default to true
        const customRecipients = body.recipients as string[] | undefined

        // Generate a new secure password
        const newPassword = generateSecurePassword({
            length: 16,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true,
        })

        // Update password in database
        const { error: updateError } = await supabaseService.rpc('update_site_password', {
            new_password: newPassword,
            admin_user_id: adminData.id
        })

        if (updateError) {
            console.error('Failed to update password:', updateError)
            return NextResponse.json(
                { error: 'Failed to update password', details: updateError.message },
                { status: 500 }
            )
        }

        // Calculate next rotation date
        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

        let emailSent = false
        let emailError: string | undefined

        // Send notification emails if requested
        if (sendEmail) {
            const recipients = customRecipients || PASSWORD_RECIPIENTS
            const emailResult = await sendPasswordNotification(
                recipients,
                newPassword,
                nextMonth
            )

            emailSent = emailResult.success
            if (!emailResult.success) {
                emailError = emailResult.error
                console.error('Email notification failed:', emailError)
            }
        }

        // Log the action
        try {
            await supabaseService.from('audit_log').insert({
                action: 'site_password_manual_rotation',
                actor_email: adminData.email,
                details: {
                    email_sent: emailSent,
                    email_error: emailError,
                    recipients: sendEmail ? (customRecipients || PASSWORD_RECIPIENTS) : [],
                },
                created_at: new Date().toISOString(),
            })
        } catch (auditError) {
            console.warn('Failed to log audit event:', auditError)
        }

        return NextResponse.json({
            success: true,
            password: newPassword, // Return to admin for immediate use
            emailSent,
            emailError,
            recipients: sendEmail ? (customRecipients || PASSWORD_RECIPIENTS) : [],
            rotatedBy: adminData.email,
            nextRotation: nextMonth.toISOString(),
            timestamp: new Date().toISOString(),
        })

    } catch (error) {
        console.error('Manual password rotation failed:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
