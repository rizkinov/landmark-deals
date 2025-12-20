# Site Access Password Auto-Rotation Setup

This document describes how to set up automatic monthly password rotation for the Landmark Deals site access password.

## Overview

The system provides:
- **Secure password generation**: 16-character passwords with uppercase, lowercase, numbers, and symbols
- **Automatic monthly rotation**: Passwords are rotated on the 1st of every month at 00:00 UTC
- **Email notifications**: New passwords are automatically sent to configured recipients
- **Manual rotation**: Admins can manually rotate passwords from the Settings page

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your Vercel project (or `.env.local` for development):

```env
# Required for email notifications (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional: Custom sender email (requires verified domain in Resend)
RESEND_FROM_EMAIL=Landmark Deals <noreply@yourdomain.com>

# Required for cron job security
CRON_SECRET=your-secure-random-string

# Site URL for email links
NEXT_PUBLIC_SITE_URL=https://your-landmark-deals-url.vercel.app
```

### 2. Resend Account Setup

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. (Optional) Add and verify your domain for custom sender addresses
4. Add the API key to your environment variables

### 3. Vercel Cron Configuration

The `vercel.json` file already includes the cron configuration:

```json
{
  "crons": [
    {
      "path": "/api/cron/rotate-password",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

This runs on the 1st of every month at midnight UTC.

**Note**: Vercel Cron requires a Vercel Pro or Enterprise plan. On free plans, you can use external cron services like:
- [Cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)
- [GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)

### 4. Cron Secret for Security

Generate a secure random string for the CRON_SECRET:

```bash
openssl rand -base64 32
```

Add this to your Vercel project settings, and Vercel will automatically send it with cron requests.

## Email Recipients

Password notifications are sent to the following recipients (configured in `src/lib/email.ts`):

- rizki.novianto@cbre.com
- Christy.Chan@cbre.com

To modify recipients, edit the `PASSWORD_RECIPIENTS` array in `src/lib/email.ts`.

## Manual Rotation

Admins can manually rotate passwords from:

1. Go to Admin Panel → Settings
2. Scroll to "Site Access Password" section
3. Click "Generate & Rotate Password Now"
4. Optionally toggle email notifications on/off
5. Copy the new password displayed

## Password Specifications

Generated passwords include:
- **Length**: 16 characters
- **Uppercase letters**: A-Z (excluding I, O for clarity)
- **Lowercase letters**: a-z (excluding i, l, o for clarity)
- **Numbers**: 2-9 (excluding 0, 1 for clarity)
- **Symbols**: !@#$%^&*-_+=

Example: `Hk7$mP9@vQ3#nR5!`

## API Endpoints

### Cron Endpoint (Automated)
```
GET /api/cron/rotate-password
Authorization: Bearer <CRON_SECRET>
```

### Admin Endpoint (Manual)
```
POST /api/admin/rotate-password
Content-Type: application/json
Cookie: (requires admin session)

{
  "sendEmail": true,
  "recipients": ["custom@email.com"]  // optional
}
```

## Troubleshooting

### Emails not sending
1. Verify RESEND_API_KEY is set correctly
2. Check Resend dashboard for error logs
3. Ensure recipient emails are valid

### Cron not running
1. Verify you're on Vercel Pro/Enterprise
2. Check Vercel dashboard → Cron Jobs for execution logs
3. Verify CRON_SECRET matches

### Password not updating
1. Check Supabase dashboard for database errors
2. Verify SUPABASE_SERVICE_ROLE_KEY is set
3. Check API route logs in Vercel

## Security Considerations

- The CRON_SECRET must be kept confidential
- Never log or expose generated passwords in production
- Email notifications should only go to trusted recipients
- Consider additional email security (SPF, DKIM) for production
