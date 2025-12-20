/**
 * Admin API: Manual Password Rotation
 * Allows admins to manually trigger password rotation for both site access and confidentials
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSecurePassword } from '@/src/lib/password-generator'
import { sendBothPasswordsNotification, PASSWORD_RECIPIENTS } from '@/src/lib/email'
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

export async function POST(request: NextRequest) {
    try {
        // Get the service client to verify admin status
        const supabaseService = getSupabaseServiceClient()

        // Get authorization from request header (passed from client)
        const authHeader = request.headers.get('authorization')
        let adminData = null

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.substring(7)

            // Verify the token and get user
            const { data: { user }, error: authError } = await supabaseService.auth.getUser(token)

            if (!authError && user) {
                // Check if user is admin
                const { data, error } = await supabaseService
                    .from('admin_users')
                    .select('id, email, role, is_active')
                    .eq('auth_user_id', user.id)
                    .eq('is_active', true)
                    .single()

                if (!error && data) {
                    adminData = data
                }
            }
        }

        // If no valid auth header, try to get admin email from body (for client-side calls)
        if (!adminData) {
            const body = await request.json().catch(() => ({}))

            // Check if admin email was passed and verify it exists
            if (body.adminEmail) {
                const { data, error } = await supabaseService
                    .from('admin_users')
                    .select('id, email, role, is_active')
                    .eq('email', body.adminEmail)
                    .eq('is_active', true)
                    .single()

                if (!error && data) {
                    adminData = data
                }
            }

            // Re-parse body for other options
            const sendEmail = body.sendEmail !== false
            const customRecipients = body.recipients as string[] | undefined

            if (!adminData) {
                return NextResponse.json(
                    { error: 'Admin authentication required' },
                    { status: 401 }
                )
            }

            return handlePasswordRotation(adminData, sendEmail, customRecipients, supabaseService)
        }

        // Parse request body for options
        const body = await request.json().catch(() => ({}))
        const sendEmail = body.sendEmail !== false
        const customRecipients = body.recipients as string[] | undefined

        return handlePasswordRotation(adminData, sendEmail, customRecipients, supabaseService)

    } catch (error) {
        console.error('Manual password rotation failed:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

async function handlePasswordRotation(
    adminData: { id: string; email: string; role: string },
    sendEmail: boolean,
    customRecipients: string[] | undefined,
    supabaseService: ReturnType<typeof getSupabaseServiceClient>
) {
    console.log(`Manual password rotation triggered by: ${adminData.email}`)

    // Generate new secure passwords for both
    const siteAccessPassword = generateSecurePassword({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
    })

    const confidentialPassword = generateSecurePassword({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
    })

    // Update site access password
    const { error: siteError } = await supabaseService.rpc('update_site_password', {
        new_password: siteAccessPassword,
        admin_user_id: adminData.id
    })

    if (siteError) {
        console.error('Failed to update site access password:', siteError)
        return NextResponse.json(
            { error: 'Failed to update site access password', details: siteError.message },
            { status: 500 }
        )
    }

    // Update confidential password
    const { error: confidentialError } = await supabaseService.rpc('update_confidential_password', {
        new_password: confidentialPassword,
        admin_user_id: adminData.id
    })

    if (confidentialError) {
        console.error('Failed to update confidential password:', confidentialError)
        return NextResponse.json(
            { error: 'Failed to update confidential password', details: confidentialError.message },
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
        const emailResult = await sendBothPasswordsNotification(
            recipients,
            siteAccessPassword,
            confidentialPassword,
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
            action: 'passwords_manual_rotation',
            actor_email: adminData.email,
            details: {
                passwords_rotated: ['site_access', 'confidential'],
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
        siteAccessPassword,
        confidentialPassword,
        // Legacy field for backward compatibility
        password: siteAccessPassword,
        emailSent,
        emailError,
        recipients: sendEmail ? (customRecipients || PASSWORD_RECIPIENTS) : [],
        rotatedBy: adminData.email,
        nextRotation: nextMonth.toISOString(),
        timestamp: new Date().toISOString(),
    })
}


