-- =====================================================
-- FIX AUDIT FUNCTION - Remove Non-Existent Columns
-- =====================================================

-- Step 1: Check what columns actually exist in deals table
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'deals' 
ORDER BY column_name;

-- Step 2: Create corrected audit function
CREATE OR REPLACE FUNCTION get_deals_with_audit_info()
RETURNS TABLE(
  id UUID,
  property_name VARCHAR,
  location VARCHAR,
  country VARCHAR,
  deal_price_usd BIGINT,
  deal_date VARCHAR,
  deal_date_sortable DATE,
  buyer VARCHAR,
  seller VARCHAR,
  asset_class VARCHAR,
  services VARCHAR,
  remarks TEXT,
  property_image_url TEXT,
  local_currency VARCHAR,
  local_currency_amount NUMERIC,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_edited_at TIMESTAMP,
  last_edited_by UUID,
  last_edited_by_email VARCHAR,
  last_edited_by_role VARCHAR
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
    au.email as last_edited_by_email,
    au.role as last_edited_by_role
  FROM deals d
  LEFT JOIN admin_users au ON d.last_edited_by = au.id
  ORDER BY d.last_edited_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Test the fixed function
SELECT 
  property_name,
  last_edited_at,
  last_edited_by,
  last_edited_by_email,
  last_edited_by_role
FROM get_deals_with_audit_info() 
WHERE last_edited_by IS NOT NULL
LIMIT 3;

SELECT 'Audit function fixed successfully!' as status; 