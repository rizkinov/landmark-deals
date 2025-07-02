-- =====================================================
-- ADMIN AUTHENTICATION SETUP
-- =====================================================
-- Run this in Supabase SQL Editor to set up admin authentication

-- 1. Create admin users management table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR UNIQUE NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('super_admin', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(auth_user_id)
);

-- 2. Create indexes for better performance
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_auth_id ON admin_users(auth_user_id);
CREATE INDEX idx_admin_users_role ON admin_users(role);

-- 3. Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Allow authenticated admin users to view admin_users table
CREATE POLICY "Admin users can view admin users"
ON admin_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.is_active = true
  )
);

-- Only super admins can insert/update/delete admin users
CREATE POLICY "Super admins can manage admin users"
ON admin_users FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.role = 'super_admin' 
    AND au.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.role = 'super_admin' 
    AND au.is_active = true
  )
);

-- 5. Create helper functions

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = user_id 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get admin role
CREATE OR REPLACE FUNCTION get_admin_role(user_id UUID DEFAULT auth.uid())
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM admin_users 
  WHERE auth_user_id = user_id 
  AND is_active = true;
  
  RETURN COALESCE(user_role, 'none');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last login
CREATE OR REPLACE FUNCTION update_admin_last_login(user_id UUID DEFAULT auth.uid())
RETURNS VOID AS $$
BEGIN
  UPDATE admin_users 
  SET last_login = NOW()
  WHERE auth_user_id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user (for super admin use)
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email VARCHAR,
  admin_role VARCHAR DEFAULT 'admin'
)
RETURNS UUID AS $$
DECLARE
  new_admin_id UUID;
  current_user_role TEXT;
BEGIN
  -- Check if current user is super admin
  SELECT role INTO current_user_role
  FROM admin_users 
  WHERE auth_user_id = auth.uid() 
  AND is_active = true;
  
  IF current_user_role != 'super_admin' THEN
    RAISE EXCEPTION 'Only super admins can create admin users';
  END IF;
  
  -- Validate role
  IF admin_role NOT IN ('super_admin', 'admin') THEN
    RAISE EXCEPTION 'Invalid role. Must be super_admin or admin';
  END IF;
  
  -- Insert admin user (auth_user_id will be populated when they first sign in)
  INSERT INTO admin_users (email, role, created_by)
  VALUES (admin_email, admin_role, (
    SELECT id FROM admin_users WHERE auth_user_id = auth.uid()
  ))
  RETURNING id INTO new_admin_id;
  
  RETURN new_admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create audit table for admin actions
CREATE TABLE admin_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id),
  action VARCHAR NOT NULL, -- 'login', 'create_admin', 'delete_admin', 'update_deal', etc.
  target_email VARCHAR, -- For admin management actions
  details JSONB, -- Additional action details
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for audit log
CREATE INDEX idx_admin_audit_log_admin_user ON admin_audit_log(admin_user_id);
CREATE INDEX idx_admin_audit_log_action ON admin_audit_log(action);
CREATE INDEX idx_admin_audit_log_created_at ON admin_audit_log(created_at);

-- Enable RLS for audit log
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Audit log policies
CREATE POLICY "Admin users can view audit log"
ON admin_audit_log FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.is_active = true
  )
);

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  action_type VARCHAR,
  target_email VARCHAR DEFAULT NULL,
  action_details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  current_admin_id UUID;
BEGIN
  -- Get current admin user id
  SELECT id INTO current_admin_id
  FROM admin_users 
  WHERE auth_user_id = auth.uid();
  
  IF current_admin_id IS NOT NULL THEN
    INSERT INTO admin_audit_log (admin_user_id, action, target_email, details)
    VALUES (current_admin_id, action_type, target_email, action_details);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Update deals table RLS policies for admin access
-- Admin users can manage all deals
CREATE POLICY "Admin users can manage all deals"
ON deals FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.auth_user_id = auth.uid() 
    AND au.is_active = true
  )
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if setup completed successfully
SELECT 
  'Admin Users Table' as component,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admin_users')
       THEN '✅ Created' ELSE '❌ Missing' END as status

UNION ALL

SELECT 
  'Admin Functions' as component,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'is_admin')
       THEN '✅ Created' ELSE '❌ Missing' END as status

UNION ALL

SELECT 
  'Audit Log Table' as component,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admin_audit_log')
       THEN '✅ Created' ELSE '❌ Missing' END as status;

-- =====================================================
-- NOTES FOR IMPLEMENTATION
-- =====================================================

/*
NEXT STEPS AFTER RUNNING THIS SQL:

1. Create super admin user account:
   - Go to Supabase Auth dashboard
   - Create user with email: rizki.novianto@cbre.com
   - Set password: Cbre2025!
   - Copy the user ID from auth.users table

2. Insert super admin record:
   INSERT INTO admin_users (auth_user_id, email, role)
   VALUES ('USER_ID_FROM_STEP_1', 'rizki.novianto@cbre.com', 'super_admin');

3. Test functions:
   SELECT is_admin(); -- Should return true when logged in as super admin
   SELECT get_admin_role(); -- Should return 'super_admin'

4. Implement frontend components:
   - AdminLoginModal
   - AdminGuard
   - AdminManagement

SECURITY NOTES:
- All sensitive functions use SECURITY DEFINER
- RLS policies ensure proper access control
- Audit logging tracks all admin actions
- Password complexity should be enforced in frontend
*/ 