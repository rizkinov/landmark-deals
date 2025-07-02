-- CBRE LANDMARK DEALS: STEP-BY-STEP MIGRATION
-- Run these commands one by one in your database

-- Step 1: Add the new asset_class column
ALTER TABLE deals ADD COLUMN asset_class TEXT;

-- Step 2: Update existing data (map subcategories to asset classes)
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

-- Step 3: Check if all records were updated (should return 0)
SELECT COUNT(*) FROM deals WHERE asset_class IS NULL;

-- Step 4: Add constraint
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

-- Step 5: Make asset_class required
ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;

-- Step 6: Drop the search view first (it depends on old columns)
DROP VIEW IF EXISTS deals_with_search;

-- Step 7: Drop old columns
ALTER TABLE deals DROP COLUMN IF EXISTS category;
ALTER TABLE deals DROP COLUMN IF EXISTS subcategory;

-- Step 8: Update indexes
DROP INDEX IF EXISTS idx_deals_country_category;
DROP INDEX IF EXISTS idx_deals_subcategory;
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);
CREATE INDEX idx_deals_asset_class ON deals(asset_class);

-- Step 9: Recreate search view with new structure
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;

-- Verification: Check the final result
SELECT asset_class, COUNT(*) as count FROM deals GROUP BY asset_class ORDER BY asset_class; 