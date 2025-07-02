-- =====================================================
-- EMERGENCY ADMIN FIX SCRIPT
-- =====================================================
-- Use this if you're having trouble with RLS policies

-- Step 1: Temporarily disable RLS to ensure clean setup
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Step 2: Clean up any existing records for this email
DELETE FROM admin_users WHERE email = 'rizki.novianto@cbre.com';

-- Step 3: Insert the super admin record with explicit values
INSERT INTO admin_users (
  id,
  auth_user_id, 
  email, 
  role, 
  is_active,
  created_at
) VALUES (
  gen_random_uuid(),
  '483fe23c-d4dd-40e2-8ef6-43d4d81d63b9',
  'rizki.novianto@cbre.com',
  'super_admin',
  true,
  NOW()
);

-- Step 4: Verify the record was created
SELECT 
  id,
  auth_user_id,
  email,
  role,
  is_active,
  created_at
FROM admin_users 
WHERE email = 'rizki.novianto@cbre.com';

-- Step 5: Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 6: Final verification
SELECT 'Admin user created successfully!' as status; 