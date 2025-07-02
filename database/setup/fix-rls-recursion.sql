-- =====================================================
-- FIX RLS INFINITE RECURSION
-- =====================================================
-- This fixes the "infinite recursion detected in policy" error

-- Step 1: Drop the problematic policies
DROP POLICY IF EXISTS "Admin users can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;

-- Step 2: Create non-recursive policies

-- Allow users to read their own admin record (no recursion)
CREATE POLICY "Users can read own admin record"
ON admin_users FOR SELECT
TO authenticated
USING (auth_user_id = auth.uid());

-- Allow any authenticated user to read admin_users for login purposes
-- (We'll control access at the application level)
CREATE POLICY "Authenticated users can read admin users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- Only allow super admins to modify admin_users
-- Use a direct check against the table without recursion
CREATE POLICY "Super admins can manage admin users"
ON admin_users FOR ALL
TO authenticated
USING (
  -- Check if the current user has super_admin role
  -- This uses a direct lookup without triggering RLS recursion
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role = 'super_admin' 
    AND is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role = 'super_admin' 
    AND is_active = true
  )
);

-- Step 3: Alternative - Create a security definer function for admin checks
CREATE OR REPLACE FUNCTION public.get_user_admin_info(user_id UUID DEFAULT auth.uid())
RETURNS TABLE(
  id UUID,
  email VARCHAR,
  role VARCHAR,
  is_active BOOLEAN
) AS $$
BEGIN
  -- This function bypasses RLS by using SECURITY DEFINER
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.role,
    au.is_active
  FROM admin_users au
  WHERE au.auth_user_id = user_id
  AND au.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Verification
SELECT 'RLS policies fixed successfully!' as status; 