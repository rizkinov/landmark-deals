-- CBRE LANDMARK DEALS: CLEAN MIGRATION
-- Migration from categories to asset classes

-- Step 1: Add asset_class column
ALTER TABLE deals ADD COLUMN asset_class TEXT;

-- Step 2: Update data
UPDATE deals SET asset_class = subcategory WHERE subcategory IN (
  'Office', 
  'Hotels & Hospitality', 
  'Industrial & Logistics', 
  'Retail', 
  'Residential / Multifamily', 
  'Land', 
  'Data Centres', 
  'Debt & Structured Finance', 
  'Capital Advisors'
);

-- Step 3: Add constraint
ALTER TABLE deals ADD CONSTRAINT deals_asset_class_check 
CHECK (asset_class IN (
  'Office', 
  'Hotels & Hospitality', 
  'Industrial & Logistics', 
  'Retail', 
  'Residential / Multifamily', 
  'Land', 
  'Data Centres', 
  'Debt & Structured Finance', 
  'Capital Advisors'
));

-- Step 4: Make required
ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;

-- Step 5: Drop view first
DROP VIEW IF EXISTS deals_with_search;

-- Step 6: Drop old columns
ALTER TABLE deals DROP COLUMN IF EXISTS category;
ALTER TABLE deals DROP COLUMN IF EXISTS subcategory;

-- Step 7: Update indexes
DROP INDEX IF EXISTS idx_deals_country_category;
DROP INDEX IF EXISTS idx_deals_subcategory;
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);
CREATE INDEX idx_deals_asset_class ON deals(asset_class);

-- Step 8: Recreate view
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals; 