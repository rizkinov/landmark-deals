-- =====================================================
-- TEST DEAL AUDIT TRACKING
-- =====================================================
-- This script tests the audit tracking functionality

-- Step 1: Check if audit columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'deals' 
AND column_name IN ('last_edited_at', 'last_edited_by')
ORDER BY column_name;

-- Step 2: Check if the function exists
SELECT proname 
FROM pg_proc 
WHERE proname = 'get_deals_with_audit_info';

-- Step 3: Check if the trigger exists
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'deal_audit_trigger';

-- Step 4: Test the audit function (sample query)
SELECT 
  property_name,
  last_edited_at,
  last_edited_by_email,
  last_edited_by_role
FROM get_deals_with_audit_info()
LIMIT 5;

-- Step 5: Check audit tracking on recent deals
SELECT 
  property_name,
  created_at,
  last_edited_at,
  CASE 
    WHEN last_edited_at IS NULL THEN 'No edits yet'
    WHEN last_edited_at = created_at THEN 'Never edited'
    ELSE 'Has been edited'
  END as edit_status
FROM deals
ORDER BY created_at DESC
LIMIT 10;

SELECT 'Audit tracking test completed!' as status; 