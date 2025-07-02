-- =====================================================
-- ADD DEAL AUDIT TRACKING
-- =====================================================
-- This adds audit tracking to see who last edited deals and when

-- Step 1: Add audit columns to deals table
ALTER TABLE deals 
ADD COLUMN last_edited_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN last_edited_by UUID REFERENCES admin_users(id);

-- Step 2: Update existing deals to have initial audit data
-- Set last_edited_at to created_at for existing records
UPDATE deals 
SET last_edited_at = created_at 
WHERE last_edited_at IS NULL;

-- Step 3: Create indexes for better performance
CREATE INDEX idx_deals_last_edited_at ON deals(last_edited_at);
CREATE INDEX idx_deals_last_edited_by ON deals(last_edited_by);

-- Step 4: Create function to automatically update audit fields
CREATE OR REPLACE FUNCTION update_deal_audit_info()
RETURNS TRIGGER AS $$
DECLARE
  current_admin_id UUID;
BEGIN
  -- Get the current admin user ID
  SELECT id INTO current_admin_id
  FROM admin_users 
  WHERE auth_user_id = auth.uid() 
  AND is_active = true
  LIMIT 1;
  
  -- Update audit fields
  NEW.last_edited_at = NOW();
  NEW.last_edited_by = current_admin_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create trigger to automatically update audit info on deal changes
DROP TRIGGER IF EXISTS deal_audit_trigger ON deals;
CREATE TRIGGER deal_audit_trigger
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_deal_audit_info();

-- Step 6: Create function to get deal with editor info
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

-- Step 7: Verification
SELECT 'Deal audit tracking added successfully!' as status; 