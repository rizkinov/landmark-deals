-- CBRE Capital Market Deals: Asset Class & Services Migration
-- This migration restructures the filtering system from category/subcategory to asset_class/services

-- Step 1: Add new columns with proper constraints
ALTER TABLE deals 
ADD COLUMN asset_class TEXT,
ADD COLUMN services TEXT;

-- Step 2: Update asset_class based on current subcategory values
UPDATE deals SET asset_class = 'Office' WHERE subcategory = 'Office';
UPDATE deals SET asset_class = 'Retail' WHERE subcategory = 'Retail';
UPDATE deals SET asset_class = 'Residential / Multifamily' WHERE subcategory = 'Residential / Multifamily';
UPDATE deals SET asset_class = 'Industrial & Logistics' WHERE subcategory = 'Industrial & Logistics';
UPDATE deals SET asset_class = 'Hotels & Hospitality' WHERE subcategory = 'Hotels & Hospitality';
UPDATE deals SET asset_class = 'Land' WHERE subcategory = 'Land';
UPDATE deals SET asset_class = 'Data Centres' WHERE subcategory = 'Data Centres';

-- Step 3: Update services based on current category and subcategory logic
-- If category was 'Services' and subcategory was 'Capital Advisors', set services to 'Capital Advisors'
UPDATE deals SET services = 'Capital Advisors' WHERE category = 'Services' AND subcategory = 'Capital Advisors';

-- If category was 'Services' and subcategory was something else, assume it's 'Debt & Structured Finance'
UPDATE deals SET services = 'Debt & Structured Finance' WHERE category = 'Services' AND subcategory != 'Capital Advisors';

-- If category was 'Investment Property Sales', set services to 'Property Sales'
UPDATE deals SET services = 'Property Sales' WHERE category = 'Investment Property Sales';

-- Step 4: For any remaining NULL values, set defaults
UPDATE deals SET asset_class = 'Office' WHERE asset_class IS NULL;
UPDATE deals SET services = 'Property Sales' WHERE services IS NULL;

-- Step 5: Add constraints to new columns
ALTER TABLE deals 
ADD CONSTRAINT deals_asset_class_check 
CHECK (asset_class IN ('Office', 'Hotels & Hospitality', 'Industrial & Logistics', 'Retail', 'Residential / Multifamily', 'Land', 'Data Centres'));

ALTER TABLE deals 
ADD CONSTRAINT deals_services_check 
CHECK (services IN ('Debt & Structured Finance', 'Capital Advisors', 'Property Sales'));

-- Step 6: Make new columns NOT NULL
ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;
ALTER TABLE deals ALTER COLUMN services SET NOT NULL;

-- Step 7: Drop old indexes
DROP INDEX IF EXISTS idx_deals_country_category;
DROP INDEX IF EXISTS idx_deals_subcategory;

-- Step 8: Create new indexes for performance
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);
CREATE INDEX idx_deals_services ON deals(services);
CREATE INDEX idx_deals_asset_class_services ON deals(asset_class, services);

-- Step 9: Update the search index to include new fields
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english', 
  property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services));

-- Step 10: Update the view
DROP VIEW IF EXISTS deals_with_search;
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services) as search_vector
FROM deals;

-- Step 11: Drop old columns (after confirming data migration is correct)
ALTER TABLE deals DROP COLUMN category;
ALTER TABLE deals DROP COLUMN subcategory;

-- Step 12: Add some sample data with the new structure to demonstrate different combinations
INSERT INTO deals (property_name, property_image_url, country, deal_price_usd, deal_price_sgd, asset_class, services, deal_date, buyer, seller) VALUES
('Kyoto Hotel Resort Complex', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 'Japan', 420.00, 567.00, 'Hotels & Hospitality', 'Capital Advisors', 'Q3 2024', 'Hyatt Hotels', 'Marriott International'),
('Hong Kong Retail Center', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', 'Hong Kong', 380.50, 513.68, 'Retail', 'Debt & Structured Finance', 'Q2 2024', 'Link REIT', 'Wharf Holdings'),
('Singapore Residential Tower', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'Singapore', 850.00, 1147.50, 'Residential / Multifamily', 'Property Sales', 'Q4 2024', 'City Developments', 'UOL Group');

-- Verification queries (run these to check the migration)
-- SELECT asset_class, services, COUNT(*) FROM deals GROUP BY asset_class, services ORDER BY asset_class, services;
-- SELECT * FROM deals WHERE services = 'Capital Advisors';
-- SELECT * FROM deals WHERE services = 'Debt & Structured Finance';
-- SELECT * FROM deals WHERE services = 'Property Sales'; 