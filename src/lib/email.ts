/**
 * Email Service for Site Access Password Notifications
 * Uses Resend API for reliable email delivery
 */

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

interface EmailResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * Send email using Resend API
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Landmark Deals <noreply@resend.dev>',
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Email send failed:', errorData)
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}`
      }
    }

    const data = await response.json()
    return { success: true, id: data.id }
  } catch (error) {
    console.error('Email send exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Send site access password notification email
 */
export async function sendPasswordNotification(
  recipients: string[],
  password: string,
  expiresAt?: Date
): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landmark-deals.vercel.app'
  const expiryText = expiresAt
    ? `This password is valid until ${expiresAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}.`
    : 'This password will be rotated on the 1st of next month.'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Access Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #003F2D; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                CBRE Capital Markets
              </h1>
              <p style="margin: 10px 0 0; color: #17E88F; font-size: 14px;">
                Landmark Deals Platform
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #003F2D; font-size: 20px;">
                🔐 New Site Access Password
              </h2>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                The site access password for Landmark Deals has been updated. Please use the new password below to access the platform.
              </p>
              
              <!-- Password Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #f8f9fa; border: 2px dashed #003F2D; padding: 20px; text-align: center; border-radius: 4px;">
                    <p style="margin: 0 0 8px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      New Password
                    </p>
                    <p style="margin: 0; color: #003F2D; font-size: 24px; font-family: 'Courier New', monospace; font-weight: bold; letter-spacing: 2px;">
                      ${password}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                ${expiryText}
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 20px 0;">
                    <a href="${siteUrl}" style="display: inline-block; background-color: #003F2D; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 4px;">
                      Access Landmark Deals →
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Security Note -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
                    <p style="margin: 0; color: #856404; font-size: 13px;">
                      <strong>⚠️ Security Note:</strong> Please do not share this password outside of authorized team members. If you believe this password has been compromised, contact your administrator immediately.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                This is an automated message from CBRE Capital Markets - Landmark Deals.
                <br>
                © ${new Date().getFullYear()} CBRE. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `
CBRE Capital Markets - Landmark Deals

🔐 New Site Access Password

The site access password for Landmark Deals has been updated.

New Password: ${password}

${expiryText}

Access the platform at: ${siteUrl}

⚠️ Security Note: Please do not share this password outside of authorized team members.

---
This is an automated message from CBRE Capital Markets - Landmark Deals.
© ${new Date().getFullYear()} CBRE. All rights reserved.
  `.trim()

  return sendEmail({
    to: recipients,
    subject: '🔐 Landmark Deals - New Site Access Password',
    html,
    text,
  })
}

/**
 * List of password recipients
 * These emails will receive the new password when it's rotated
 * 
 * NOTE: Until a domain is verified in Resend, emails can only be sent
 * to the Resend account owner's email address.
 * Once verified, add Christy.Chan@cbre.com back to this list.
 */
export const PASSWORD_RECIPIENTS = [
  'rizki.novianto@cbre.com',
  // 'Christy.Chan@cbre.com', // Uncomment after domain verification in Resend
]

