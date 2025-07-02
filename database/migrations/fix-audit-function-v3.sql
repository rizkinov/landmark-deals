-- =====================================================
-- FIX AUDIT FUNCTION V3 - Simple TEXT Types
-- =====================================================

-- Step 1: Drop the existing function
DROP FUNCTION IF EXISTS get_deals_with_audit_info();

-- Step 2: Create simple audit function using TEXT for all strings
CREATE OR REPLACE FUNCTION get_deals_with_audit_info()
RETURNS TABLE(
  id UUID,
  property_name TEXT,
  location TEXT,
  country TEXT,
  deal_price_usd BIGINT,
  deal_date TEXT,
  deal_date_sortable DATE,
  buyer TEXT,
  seller TEXT,
  asset_class TEXT,
  services TEXT,
  remarks TEXT,
  property_image_url TEXT,
  local_currency TEXT,
  local_currency_amount NUMERIC,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_edited_at TIMESTAMP,
  last_edited_by UUID,
  last_edited_by_email TEXT,
  last_edited_by_role TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.property_name,
    d.location,
    d.country,
    d.deal_price_usd,
    d.deal_date,
    d.deal_date_sortable,
    d.buyer,
    d.seller,
    d.asset_class,
    d.services,
    d.remarks,
    d.property_image_url,
    d.local_currency,
    d.local_currency_amount,
    d.created_at,
    d.updated_at,
    d.last_edited_at,
    d.last_edited_by,
    au.email::TEXT as last_edited_by_email,
    au.role::TEXT as last_edited_by_role
  FROM deals d
  LEFT JOIN admin_users au ON d.last_edited_by = au.id
  ORDER BY d.last_edited_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Test the function
SELECT 
  property_name,
  last_edited_at,
  last_edited_by,
  last_edited_by_email,
  last_edited_by_role
FROM get_deals_with_audit_info() 
WHERE last_edited_by IS NOT NULL
LIMIT 3;

SELECT 'Simple audit function created successfully!' as status; 