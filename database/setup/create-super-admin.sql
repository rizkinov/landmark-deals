-- =====================================================
-- CREATE SUPER ADMIN USER
-- =====================================================
-- Run this AFTER creating the auth user in Supabase dashboard

-- Step 1: Find your auth user ID
-- Go to Supabase Dashboard → Authentication → Users
-- Find rizki.novianto@cbre.com and copy the ID

-- Step 2: Replace 'YOUR_AUTH_USER_ID_HERE' with the actual UUID
-- Then run this INSERT statement:

INSERT INTO admin_users (auth_user_id, email, role)
VALUES (
  '483fe23c-d4dd-40e2-8ef6-43d4d81d63b9', 
  'rizki.novianto@cbre.com', 
  'super_admin'
);

-- Step 3: Verify the super admin was created
SELECT 
  au.id,
  au.email,
  au.role,
  au.created_at,
  u.email as auth_email,
  u.created_at as auth_created_at
FROM admin_users au
JOIN auth.users u ON au.auth_user_id = u.id
WHERE au.email = 'rizki.novianto@cbre.com';

-- Step 4: Test the helper functions
-- (These will only work when you're authenticated as the super admin)
-- SELECT is_admin(); -- Should return true
-- SELECT get_admin_role(); -- Should return 'super_admin'

-- =====================================================
-- QUICK REFERENCE FOR LATER
-- =====================================================

-- To create additional admin users (run when logged in as super admin):
-- SELECT create_admin_user('new.admin@cbre.com', 'admin');

-- To deactivate an admin user:
-- UPDATE admin_users SET is_active = false WHERE email = 'admin@example.com';

-- To view all admin users:
-- SELECT id, email, role, is_active, created_at, last_login FROM admin_users ORDER BY created_at;

-- To view admin audit log:
-- SELECT 
--   al.action,
--   al.target_email,
--   al.created_at,
--   au.email as admin_email
-- FROM admin_audit_log al
-- JOIN admin_users au ON al.admin_user_id = au.id
-- ORDER BY al.created_at DESC
-- LIMIT 50; 