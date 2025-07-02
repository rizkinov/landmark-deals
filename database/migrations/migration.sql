-- =============================================================================
-- CBRE LANDMARK DEALS: MIGRATION FROM CATEGORIES TO ASSET CLASSES
-- =============================================================================
-- This migration removes the category/subcategory structure and replaces it
-- with a simplified asset_class field

-- Add the new asset_class column
ALTER TABLE deals ADD COLUMN asset_class TEXT;

-- Update existing data based on subcategory mapping
-- Map subcategories directly to asset classes since they align perfectly
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

-- Verify all records have been updated (uncomment to check)
-- SELECT COUNT(*) FROM deals WHERE asset_class IS NULL;

-- Add the constraint after data migration
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

-- Make asset_class NOT NULL after all data is migrated
ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;

-- Drop the search view first (it depends on category/subcategory columns)
DROP VIEW IF EXISTS deals_with_search;

-- Drop old category and subcategory columns
ALTER TABLE deals DROP COLUMN IF EXISTS category;
ALTER TABLE deals DROP COLUMN IF EXISTS subcategory;

-- Update indexes for better performance
DROP INDEX IF EXISTS idx_deals_country_category;
DROP INDEX IF EXISTS idx_deals_subcategory;
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);
CREATE INDEX idx_deals_asset_class ON deals(asset_class);

-- Recreate the search view with the new structure
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check all asset classes are present
-- SELECT asset_class, COUNT(*) as count FROM deals GROUP BY asset_class ORDER BY asset_class;

-- Check sample records
-- SELECT id, property_name, asset_class, country FROM deals LIMIT 5;

-- =============================================================================
-- ROLLBACK (if needed)
-- =============================================================================

/*
-- WARNING: This will restore the old structure but you'll lose any new data
-- Only use if you need to rollback the migration

-- Add back the old columns
ALTER TABLE deals ADD COLUMN category TEXT;
ALTER TABLE deals ADD COLUMN subcategory TEXT;

-- Map asset classes back to categories and subcategories
UPDATE deals SET 
  category = CASE 
    WHEN asset_class IN ('Office', 'Hotels & Hospitality', 'Industrial & Logistics', 'Retail', 'Residential / Multifamily', 'Land', 'Data Centres') 
    THEN 'Investment Property Sales'
    WHEN asset_class IN ('Debt & Structured Finance', 'Capital Advisors') 
    THEN 'Services'
    ELSE 'Investment Property Sales'
  END,
  subcategory = asset_class;

-- Add constraints
ALTER TABLE deals ADD CONSTRAINT deals_category_check 
CHECK (category IN ('Investment Property Sales', 'Services'));

ALTER TABLE deals ALTER COLUMN category SET NOT NULL;
ALTER TABLE deals ALTER COLUMN subcategory SET NOT NULL;

-- Drop asset_class
ALTER TABLE deals DROP COLUMN asset_class;

-- Restore old indexes
DROP INDEX IF EXISTS idx_deals_country_asset_class;
DROP INDEX IF EXISTS idx_deals_asset_class;
CREATE INDEX idx_deals_country_category ON deals(country, category);
CREATE INDEX idx_deals_subcategory ON deals(subcategory);
*/ 