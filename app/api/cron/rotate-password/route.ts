/**
 * Cron Job: Rotate Site Access and Confidential Passwords
 * Runs on the 1st of every month at 00:00 UTC
 * 
 * This endpoint:
 * 1. Generates new secure passwords for both site access and confidentials
 * 2. Updates them in the database
 * 3. Sends notification emails to configured recipients
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSecurePassword } from '@/src/lib/password-generator'
import { sendBothPasswordsNotification, PASSWORD_RECIPIENTS } from '@/src/lib/email'

// Initialize Supabase client with service role for server-side operations
function getSupabaseClient() {
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

// Verify the request is from Vercel Cron
function verifyCronRequest(request: NextRequest): boolean {
    // Vercel adds this header when calling cron endpoints
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // If CRON_SECRET is set, verify it
    if (cronSecret) {
        return authHeader === `Bearer ${cronSecret}`
    }

    // For development/testing, allow if no secret is set
    // In production, CRON_SECRET should always be set
    return process.env.NODE_ENV !== 'production'
}

export async function GET(request: NextRequest) {
    try {
        // Verify the request is authorized
        if (!verifyCronRequest(request)) {
            console.error('Unauthorized cron request')
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        console.log('Starting password rotation...')

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

        console.log('Generated new passwords')

        // Initialize Supabase client
        const supabase = getSupabaseClient()

        // Update site access password
        const { error: siteError } = await supabase.rpc('update_site_password', {
            new_password: siteAccessPassword,
            admin_user_id: null // System-generated
        })

        if (siteError) {
            console.error('Failed to update site access password:', siteError)
            return NextResponse.json({
                success: false,
                error: 'Site access password update failed',
                details: siteError.message
            }, { status: 500 })
        }

        console.log('Site access password updated')

        // Update confidential password
        const { error: confidentialError } = await supabase.rpc('update_confidential_password', {
            new_password: confidentialPassword,
            admin_user_id: null // System-generated
        })

        if (confidentialError) {
            console.error('Failed to update confidential password:', confidentialError)
            return NextResponse.json({
                success: false,
                error: 'Confidential password update failed',
                details: confidentialError.message
            }, { status: 500 })
        }

        console.log('Confidential password updated')

        // Calculate next rotation date (1st of next month)
        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

        // Send notification emails with both passwords
        const emailResult = await sendBothPasswordsNotification(
            PASSWORD_RECIPIENTS,
            siteAccessPassword,
            confidentialPassword,
            nextMonth
        )

        if (!emailResult.success) {
            console.error('Email notification failed:', emailResult.error)
            return NextResponse.json({
                success: true,
                warning: 'Passwords updated but email notification failed',
                emailError: emailResult.error,
                timestamp: new Date().toISOString(),
            })
        }

        console.log('Email notifications sent successfully')

        // Log the rotation event
        try {
            await supabase.from('audit_log').insert({
                action: 'passwords_rotated',
                actor_email: 'system@cron',
                details: {
                    passwords_rotated: ['site_access', 'confidential'],
                    recipients: PASSWORD_RECIPIENTS,
                    next_rotation: nextMonth.toISOString(),
                    email_sent: true,
                },
                created_at: new Date().toISOString(),
            })
        } catch (auditError) {
            console.warn('Failed to log audit event:', auditError)
        }

        return NextResponse.json({
            success: true,
            message: 'Both passwords rotated and notifications sent',
            recipients: PASSWORD_RECIPIENTS,
            nextRotation: nextMonth.toISOString(),
            timestamp: new Date().toISOString(),
        })

    } catch (error) {
        console.error('Password rotation failed:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// Also support POST for manual trigger from admin panel
export async function POST(request: NextRequest) {
    return GET(request)
}

