-- =====================================================
-- TEST AUDIT FUNCTION DIRECTLY
-- =====================================================

-- Step 1: Test if the function can be called
SELECT 
  property_name,
  last_edited_at,
  last_edited_by,
  last_edited_by_email,
  last_edited_by_role
FROM get_deals_with_audit_info() 
LIMIT 3;

-- Step 2: Check if the admin user exists for that UUID
SELECT 
  id,
  email, 
  role,
  is_active,
  auth_user_id
FROM admin_users 
WHERE id = '708e74fe-e148-4444-87f9-d424389ba52d';

-- Step 3: Manual JOIN test - see if this works
SELECT 
  d.property_name,
  d.last_edited_at,
  d.last_edited_by,
  au.email as admin_email,
  au.role as admin_role
FROM deals d
LEFT JOIN admin_users au ON d.last_edited_by = au.id
WHERE d.last_edited_by IS NOT NULL
LIMIT 3; 