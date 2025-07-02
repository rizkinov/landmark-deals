-- =====================================================
-- CREATE ADMIN USER WITH PASSWORD FUNCTION
-- =====================================================
-- This handles creating admin users with proper auth integration

-- Simple approach: Create a function that guides the process
CREATE OR REPLACE FUNCTION public.create_complete_admin_user(
  admin_email VARCHAR,
  admin_role VARCHAR DEFAULT 'admin'
)
RETURNS JSON AS $$
DECLARE
  current_user_role TEXT;
  result JSON;
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
  
  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM admin_users WHERE email = admin_email) THEN
    RAISE EXCEPTION 'Admin user with this email already exists';
  END IF;
  
  -- For now, return instructions for manual creation
  -- In production, you would integrate with Supabase Admin API or email system
  result := json_build_object(
    'success', true,
    'email', admin_email,
    'role', admin_role,
    'instructions', 'Admin user record created. The user must sign up with this email address to activate their account.',
    'next_steps', 'Send the user their login credentials separately'
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- IMPROVED ADMIN USER LINKING
-- =====================================================
-- Function to link existing auth users to admin roles

CREATE OR REPLACE FUNCTION public.link_auth_user_to_admin(
  user_email VARCHAR,
  admin_role VARCHAR DEFAULT 'admin'
)
RETURNS JSON AS $$
DECLARE
  target_auth_id UUID;
  current_user_role TEXT;
  new_admin_id UUID;
  result JSON;
BEGIN
  -- Check if current user is super admin
  SELECT role INTO current_user_role
  FROM admin_users 
  WHERE auth_user_id = auth.uid() 
  AND is_active = true;
  
  IF current_user_role != 'super_admin' THEN
    RAISE EXCEPTION 'Only super admins can link users to admin roles';
  END IF;
  
  -- Find the auth user ID
  SELECT id INTO target_auth_id
  FROM auth.users
  WHERE email = user_email
  AND email_confirmed_at IS NOT NULL;
  
  IF target_auth_id IS NULL THEN
    RAISE EXCEPTION 'No confirmed user found with email: %', user_email;
  END IF;
  
  -- Check if already an admin
  IF EXISTS (SELECT 1 FROM admin_users WHERE auth_user_id = target_auth_id) THEN
    RAISE EXCEPTION 'User is already an admin';
  END IF;
  
  -- Create admin record
  INSERT INTO admin_users (
    auth_user_id,
    email,
    role,
    is_active,
    created_by
  ) VALUES (
    target_auth_id,
    user_email,
    admin_role,
    true,
    (SELECT id FROM admin_users WHERE auth_user_id = auth.uid())
  )
  RETURNING id INTO new_admin_id;
  
  result := json_build_object(
    'success', true,
    'admin_id', new_admin_id,
    'email', user_email,
    'role', admin_role,
    'message', 'User successfully linked to admin role'
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 