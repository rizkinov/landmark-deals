-- =====================================================
-- CHECK AUDIT FUNCTION STATUS
-- =====================================================
-- This script checks if the audit tracking function exists and works

-- Step 1: Check if the function exists
SELECT 
  proname as function_name,
  proargnames as argument_names,
  prosrc as function_source
FROM pg_proc 
WHERE proname = 'get_deals_with_audit_info';

-- Step 2: Check if audit columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'deals' 
AND column_name IN ('last_edited_at', 'last_edited_by')
ORDER BY column_name;

-- Step 3: Try to call the function (if it exists)
-- SELECT * FROM get_deals_with_audit_info() LIMIT 1;

-- Step 4: Alternative query - fetch deals directly
SELECT 
  id,
  property_name,
  created_at,
  last_edited_at,
  last_edited_by
FROM deals 
ORDER BY created_at DESC 
LIMIT 5; 