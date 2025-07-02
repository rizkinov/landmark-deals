-- =====================================================
-- CHECK TRIGGER AND FUNCTION STATUS
-- =====================================================

-- Step 1: Check if the audit function exists
SELECT 
  proname as function_name,
  proargtypes,
  prosrc as function_source
FROM pg_proc 
WHERE proname = 'get_deals_with_audit_info';

-- Step 2: Check if the trigger function exists
SELECT 
  proname as function_name,
  prosrc as function_source
FROM pg_proc 
WHERE proname = 'update_deal_audit_info';

-- Step 3: Check if the trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'deal_audit_trigger';

-- Step 4: Check admin_users table to see which admin has that ID
SELECT 
  id,
  email,
  role,
  is_active
FROM admin_users 
WHERE id = '708e74fe-e148-4444-87f9-d424389ba52d';

-- Step 5: Check if we can call the audit function
SELECT 
  property_name,
  last_edited_at,
  last_edited_by,
  last_edited_by_email,
  last_edited_by_role
FROM get_deals_with_audit_info() 
WHERE last_edited_by IS NOT NULL
LIMIT 3; 