/**
 * Cron Job: Rotate Site Access Password
 * Runs on the 1st of every month at 00:00 UTC
 * 
 * This endpoint:
 * 1. Generates a new secure password
 * 2. Updates it in the database
 * 3. Sends notification emails to configured recipients
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSecurePassword } from '@/src/lib/password-generator'
import { sendPasswordNotification, PASSWORD_RECIPIENTS } from '@/src/lib/email'

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

        // Generate a new secure password
        const newPassword = generateSecurePassword({
            length: 16,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true,
        })

        console.log('Generated new password')

        // Initialize Supabase client
        const supabase = getSupabaseClient()

        // Update password in database using the stored procedure
        const { data, error } = await supabase.rpc('update_site_password', {
            new_password: newPassword,
            admin_user_id: null // System-generated, no admin user
        })

        if (error) {
            console.error('Failed to update password in database:', error)
            return NextResponse.json(
                {
                    success: false,
                    error: 'Database update failed',
                    details: error.message
                },
                { status: 500 }
            )
        }

        console.log('Password updated in database')

        // Calculate next rotation date (1st of next month)
        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

        // Send notification emails
        const emailResult = await sendPasswordNotification(
            PASSWORD_RECIPIENTS,
            newPassword,
            nextMonth
        )

        if (!emailResult.success) {
            console.error('Email notification failed:', emailResult.error)
            // Password was updated, but email failed - log but don't fail the request
            return NextResponse.json({
                success: true,
                warning: 'Password updated but email notification failed',
                emailError: emailResult.error,
                timestamp: new Date().toISOString(),
            })
        }

        console.log('Email notifications sent successfully')

        // Log the rotation event
        try {
            await supabase.from('audit_log').insert({
                action: 'site_password_rotated',
                actor_email: 'system@cron',
                details: {
                    recipients: PASSWORD_RECIPIENTS,
                    next_rotation: nextMonth.toISOString(),
                    email_sent: true,
                },
                created_at: new Date().toISOString(),
            })
        } catch (auditError) {
            // Audit logging is non-critical
            console.warn('Failed to log audit event:', auditError)
        }

        return NextResponse.json({
            success: true,
            message: 'Password rotated and notifications sent',
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
