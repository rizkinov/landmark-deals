-- =====================================================
-- MINIMAL AUDIT FUNCTION - Only Essential Data
-- =====================================================

-- Step 1: Drop any existing function
DROP FUNCTION IF EXISTS get_deals_with_audit_info();

-- Step 2: Create a minimal function that only returns what we need
CREATE OR REPLACE FUNCTION get_deals_with_audit_info()
RETURNS SETOF deals AS $$
BEGIN
  RETURN QUERY
  SELECT d.* FROM deals d
  ORDER BY d.last_edited_at DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create a separate function just for audit info
CREATE OR REPLACE FUNCTION get_deal_audit_info(deal_id UUID)
RETURNS TABLE(
  admin_email TEXT,
  admin_role TEXT,
  edit_time TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.email::TEXT,
    au.role::TEXT,
    d.last_edited_at
  FROM deals d
  LEFT JOIN admin_users au ON d.last_edited_by = au.id
  WHERE d.id = deal_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Test both functions
SELECT 'Testing basic deals function...' as test;
SELECT COUNT(*) as deal_count FROM get_deals_with_audit_info();

SELECT 'Testing audit info function...' as test;
SELECT * FROM get_deal_audit_info(
  (SELECT id FROM deals WHERE last_edited_by IS NOT NULL LIMIT 1)
);

SELECT 'Minimal audit functions created successfully!' as status; 