# Site Access Password Protection - Setup Guide

## Overview
This implementation adds a site-wide password protection layer to the Landmark Deals application. Users must enter a password to access the site, while admin users automatically bypass this requirement.

## Features
- ✅ Site-wide password protection for all public pages
- ✅ 24-hour access token after successful authentication
- ✅ Admin bypass (authenticated admins don't need site password)
- ✅ Admin-configurable password via Settings page
- ✅ CBRE-styled password entry modal
- ✅ Password visibility toggle
- ✅ Initial password: `greg`

## Setup Instructions

### 1. Run Database Setup
Execute the SQL script in your Supabase SQL Editor:

```bash
# Navigate to the database setup file
database/setup/site-access-setup.sql
```

**In Supabase SQL Editor:**
1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `site-access-setup.sql`
4. Click "Run" to execute

This will:
- Create `site_settings` table
- Set up RLS policies
- Create helper functions (`verify_site_password`, `update_site_password`)
- Insert initial password 'greg' (hashed with bcrypt)

### 2. Verify Database Setup
Run this query to confirm setup:

```sql
-- Check if site_settings table exists and password is set
SELECT setting_key, updated_at FROM site_settings WHERE setting_key = 'site_access_password';

-- Test password verification (should return true for 'greg')
SELECT verify_site_password('greg');
```

### 3. Restart Development Server
```bash
npm run dev
```

### 4. Test the Implementation

#### Test 1: Public User Access
1. Open browser in incognito/private mode
2. Navigate to `http://localhost:3000`
3. You should see the password modal
4. Enter password: `greg`
5. Should redirect to deals page
6. Close and reopen browser within 24 hours → Should not ask for password again

#### Test 2: Admin Bypass
1. Navigate to `http://localhost:3000/admin`
2. Log in with admin credentials
3. Navigate to `http://localhost:3000/deals`
4. Should NOT see password modal (admin bypass works)

#### Test 3: Change Password
1. Log in as admin
2. Go to `http://localhost:3000/admin/settings`
3. Scroll to "Site Access Password" section
4. Enter new password (e.g., "newpass123")
5. Confirm password
6. Click "Update Site Password"
7. Should see success message

#### Test 4: Verify New Password
1. Open new incognito window
2. Navigate to `http://localhost:3000`
3. Try old password `greg` → Should fail
4. Try new password → Should work

## Architecture

### Files Created
```
database/setup/site-access-setup.sql     # Database schema and functions
src/lib/site-access.ts                   # Password verification logic
src/components/SiteAccessGuard.tsx       # Protection wrapper component
src/components/SiteAccessModal.tsx       # Password entry UI
docs/SITE-ACCESS-SETUP.md               # This file
```

### Files Modified
```
app/layout.tsx                          # Added SiteAccessGuard wrapper
app/admin/settings/page.tsx             # Added password management UI
src/lib/types.ts                        # Added SiteSetting interfaces
```

## How It Works

### Authentication Flow
1. User visits site
2. `SiteAccessGuard` checks:
   - Is user on `/admin` route? → Bypass (admin has own auth)
   - Is user an authenticated admin? → Bypass
   - Does user have valid 24-hour token? → Allow access
   - Otherwise → Show password modal
3. User enters password
4. Password verified against hashed value in database
5. On success: Store 24-hour token in localStorage
6. User can access site for 24 hours

### Admin Password Management
1. Admin logs in to admin panel
2. Navigates to Settings page
3. Enters new password (min 4 characters)
4. Password hashed with bcrypt and stored in database
5. Change logged with admin info and timestamp

### Security Features
- Passwords hashed with bcrypt (gen_salt('bf'))
- Row Level Security (RLS) on site_settings table
- Admin bypass prevents unnecessary friction
- 24-hour token expiration
- Rate limiting on failed attempts (5 attempts = 5 second cooldown)

## Troubleshooting

### Password Modal Not Appearing
**Issue**: Site loads without password prompt

**Solutions**:
1. Check if you're logged in as admin (admins bypass)
2. Clear localStorage: `localStorage.removeItem('landmark_deals_site_access')`
3. Check browser console for errors

### Password Verification Fails
**Issue**: Correct password shows as incorrect

**Solutions**:
1. Verify database function exists:
   ```sql
   SELECT verify_site_password('greg');
   ```
2. Check if pgcrypto extension is enabled:
   ```sql
   CREATE EXTENSION IF NOT EXISTS pgcrypto;
   ```
3. Re-run the setup SQL script

### Admin Can't Change Password
**Issue**: Password update fails in admin settings

**Solutions**:
1. Check admin authentication: `getCurrentAdmin()` should return admin object
2. Verify RLS policies allow authenticated users to update
3. Check browser console for specific error messages

### Token Expires Too Quickly
**Issue**: Users prompted for password before 24 hours

**Solutions**:
1. Check system time is correct
2. Verify `TOKEN_DURATION_MS` in `src/lib/site-access.ts`
3. Check localStorage is not being cleared by browser settings

## Maintenance

### Changing Initial Password
Edit `database/setup/site-access-setup.sql` line:
```sql
-- Change 'greg' to your desired initial password
SELECT update_site_password('your_password_here', NULL);
```

### Adjusting Token Duration
Edit `src/lib/site-access.ts`:
```typescript
// Change 24 hours to desired duration
const TOKEN_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours
```

### Removing Site Password Protection
1. Remove `<SiteAccessGuard>` wrapper from `app/layout.tsx`
2. Or set a known password and share with all users
3. Or modify guard to always return `true` in `checkSiteAccess()`

## Production Deployment

### Pre-Deployment Checklist
- [ ] Run database setup script in production Supabase
- [ ] Change initial password from 'greg' to secure password
- [ ] Test password verification in production
- [ ] Verify admin bypass works in production
- [ ] Document password for authorized users
- [ ] Set up password rotation policy if needed

### Post-Deployment
1. Log in as admin
2. Immediately change site password via Settings
3. Distribute new password to authorized users
4. Monitor `site_settings` table for password changes
5. Set calendar reminders for password rotation

## Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review browser console for errors
3. Check Supabase logs for database errors
4. Verify all setup steps were completed

## Security Notes

⚠️ **Important Security Considerations:**
- This is a simple password protection, not enterprise-grade authentication
- Password is shared among all public users (not per-user)
- Suitable for internal/semi-private content, not highly sensitive data
- Admin users have full control to change the password
- Consider implementing audit logging for password changes
- Rotate password periodically for security

## Future Enhancements

Potential improvements:
- [ ] Multiple user accounts with individual passwords
- [ ] Password strength requirements
- [ ] Password reset functionality
- [ ] Email notifications on password changes
- [ ] More granular access control (per-page permissions)
- [ ] Session management dashboard
- [ ] Audit log viewer for password changes
