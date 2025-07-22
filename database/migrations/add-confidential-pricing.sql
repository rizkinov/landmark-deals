-- =====================================================
-- ADD CONFIDENTIAL PRICING OPTION TO DEALS
-- =====================================================
-- This adds a boolean column to mark deals as having confidential pricing

-- Step 1: Add is_confidential column to deals table
ALTER TABLE deals 
ADD COLUMN is_confidential BOOLEAN DEFAULT FALSE;

-- Step 2: Create index for better performance when filtering confidential deals
CREATE INDEX idx_deals_is_confidential ON deals(is_confidential);

-- Step 3: Update the get_deals_with_audit_info function to include is_confidential
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
  location_remarks TEXT,
  property_images TEXT[],
  is_confidential BOOLEAN,
  created_at TIMESTAMP,
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
    d.location_remarks,
    d.property_images,
    d.is_confidential,
    d.created_at,
    d.last_edited_at,
    d.last_edited_by,
    au.email as last_edited_by_email,
    au.role as last_edited_by_role
  FROM deals d
  LEFT JOIN admin_users au ON d.last_edited_by = au.id
  ORDER BY d.last_edited_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Verification
SELECT 'Confidential pricing option added successfully!' as status;