-- CBRE Capital Market Deals: Safe Asset Class & Services Migration
-- This migration safely restructures the filtering system from category/subcategory to asset_class/services

-- Step 1: Check and add columns only if they don't exist
DO $$
BEGIN
    -- Add asset_class column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'deals' AND column_name = 'asset_class') THEN
        ALTER TABLE deals ADD COLUMN asset_class TEXT;
    END IF;
    
    -- Add services column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'deals' AND column_name = 'services') THEN
        ALTER TABLE deals ADD COLUMN services TEXT;
    END IF;
END $$;

-- Step 2: Check current data structure
-- Let's see what we're working with
SELECT 
    CASE WHEN category IS NOT NULL THEN 'category exists' ELSE 'category missing' END as category_status,
    CASE WHEN subcategory IS NOT NULL THEN 'subcategory exists' ELSE 'subcategory missing' END as subcategory_status,
    CASE WHEN asset_class IS NOT NULL THEN 'asset_class exists' ELSE 'asset_class missing' END as asset_class_status,
    CASE WHEN services IS NOT NULL THEN 'services exists' ELSE 'services missing' END as services_status,
    COUNT(*) as deal_count
FROM deals 
GROUP BY 
    CASE WHEN category IS NOT NULL THEN 'category exists' ELSE 'category missing' END,
    CASE WHEN subcategory IS NOT NULL THEN 'subcategory exists' ELSE 'subcategory missing' END,
    CASE WHEN asset_class IS NOT NULL THEN 'asset_class exists' ELSE 'asset_class missing' END,
    CASE WHEN services IS NOT NULL THEN 'services exists' ELSE 'services missing' END;

-- Step 3: Show current data to understand the migration needed
SELECT id, property_name, category, subcategory, asset_class, services 
FROM deals 
ORDER BY created_at DESC 
LIMIT 10;

-- Step 4: Update asset_class based on current subcategory values (only if asset_class is NULL)
UPDATE deals SET asset_class = 'Office' 
WHERE asset_class IS NULL AND subcategory = 'Office';

UPDATE deals SET asset_class = 'Retail' 
WHERE asset_class IS NULL AND subcategory = 'Retail';

UPDATE deals SET asset_class = 'Residential / Multifamily' 
WHERE asset_class IS NULL AND subcategory = 'Residential / Multifamily';

UPDATE deals SET asset_class = 'Industrial & Logistics' 
WHERE asset_class IS NULL AND subcategory = 'Industrial & Logistics';

UPDATE deals SET asset_class = 'Hotels & Hospitality' 
WHERE asset_class IS NULL AND subcategory = 'Hotels & Hospitality';

UPDATE deals SET asset_class = 'Land' 
WHERE asset_class IS NULL AND subcategory = 'Land';

UPDATE deals SET asset_class = 'Data Centres' 
WHERE asset_class IS NULL AND subcategory = 'Data Centres';

-- Step 5: Update services based on current category and subcategory logic (only if services is NULL)
-- If category was 'Services' and subcategory was 'Capital Advisors', set services to 'Capital Advisors'
UPDATE deals SET services = 'Capital Advisors' 
WHERE services IS NULL AND category = 'Services' AND subcategory = 'Capital Advisors';

-- If category was 'Services' and subcategory was something else, assume it's 'Debt & Structured Finance'
UPDATE deals SET services = 'Debt & Structured Finance' 
WHERE services IS NULL AND category = 'Services' AND subcategory != 'Capital Advisors';

-- If category was 'Investment Property Sales', set services to 'Property Sales'
UPDATE deals SET services = 'Property Sales' 
WHERE services IS NULL AND category = 'Investment Property Sales';

-- Step 6: For any remaining NULL values, set defaults
UPDATE deals SET asset_class = 'Office' WHERE asset_class IS NULL;
UPDATE deals SET services = 'Property Sales' WHERE services IS NULL;

-- Step 7: Add constraints to new columns (drop existing constraints first if they exist)
DO $$
BEGIN
    -- Drop existing constraints if they exist
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'deals_asset_class_check') THEN
        ALTER TABLE deals DROP CONSTRAINT deals_asset_class_check;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'deals_services_check') THEN
        ALTER TABLE deals DROP CONSTRAINT deals_services_check;
    END IF;
    
    -- Add new constraints
    ALTER TABLE deals 
    ADD CONSTRAINT deals_asset_class_check 
    CHECK (asset_class IN ('Office', 'Hotels & Hospitality', 'Industrial & Logistics', 'Retail', 'Residential / Multifamily', 'Land', 'Data Centres'));

    ALTER TABLE deals 
    ADD CONSTRAINT deals_services_check 
    CHECK (services IN ('Debt & Structured Finance', 'Capital Advisors', 'Property Sales'));
END $$;

-- Step 8: Make new columns NOT NULL (only if they aren't already)
DO $$
BEGIN
    -- Check if asset_class is nullable and make it NOT NULL if needed
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'deals' AND column_name = 'asset_class' AND is_nullable = 'YES') THEN
        ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;
    END IF;
    
    -- Check if services is nullable and make it NOT NULL if needed
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'deals' AND column_name = 'services' AND is_nullable = 'YES') THEN
        ALTER TABLE deals ALTER COLUMN services SET NOT NULL;
    END IF;
END $$;

-- Step 9: Update indexes (drop old ones if they exist, create new ones)
DROP INDEX IF EXISTS idx_deals_country_category;
DROP INDEX IF EXISTS idx_deals_subcategory;
DROP INDEX IF EXISTS idx_deals_country_asset_class;
DROP INDEX IF EXISTS idx_deals_services;
DROP INDEX IF EXISTS idx_deals_asset_class_services;

-- Create new indexes for performance
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);
CREATE INDEX idx_deals_services ON deals(services);
CREATE INDEX idx_deals_asset_class_services ON deals(asset_class, services);

-- Step 10: Update the search index to include new fields
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english', 
  property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services));

-- Step 11: Update the view
DROP VIEW IF EXISTS deals_with_search;
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services) as search_vector
FROM deals;

-- Step 12: Show the results after migration
SELECT 'Migration Results:' as status;
SELECT asset_class, services, COUNT(*) as count 
FROM deals 
GROUP BY asset_class, services 
ORDER BY asset_class, services;

-- Step 13: Add some sample data with the new structure (only if they don't already exist)
INSERT INTO deals (property_name, property_image_url, country, deal_price_usd, deal_price_sgd, asset_class, services, deal_date, buyer, seller) 
SELECT * FROM (VALUES
  ('Kyoto Hotel Resort Complex', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 'Japan', 420.00, 567.00, 'Hotels & Hospitality', 'Capital Advisors', 'Q3 2024', 'Hyatt Hotels', 'Marriott International'),
  ('Hong Kong Retail Center', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', 'Hong Kong', 380.50, 513.68, 'Retail', 'Debt & Structured Finance', 'Q2 2024', 'Link REIT', 'Wharf Holdings'),
  ('Singapore Residential Tower', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'Singapore', 850.00, 1147.50, 'Residential / Multifamily', 'Property Sales', 'Q4 2024', 'City Developments', 'UOL Group')
) AS new_deals(property_name, property_image_url, country, deal_price_usd, deal_price_sgd, asset_class, services, deal_date, buyer, seller)
WHERE NOT EXISTS (
  SELECT 1 FROM deals WHERE property_name = new_deals.property_name
);

-- Final verification queries
SELECT 'Final Verification:' as status;
SELECT 'Total deals:' as metric, COUNT(*) as value FROM deals
UNION ALL
SELECT 'Deals with asset_class:', COUNT(*) FROM deals WHERE asset_class IS NOT NULL
UNION ALL  
SELECT 'Deals with services:', COUNT(*) FROM deals WHERE services IS NOT NULL; 