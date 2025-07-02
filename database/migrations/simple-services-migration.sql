-- CBRE Capital Market Deals: Simple Services Migration
-- This script adds the services column and updates existing data

-- Step 1: Add services column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'deals' AND column_name = 'services') THEN
        ALTER TABLE deals ADD COLUMN services TEXT;
        RAISE NOTICE 'Added services column';
    ELSE
        RAISE NOTICE 'Services column already exists';
    END IF;
END $$;

-- Step 2: Show current data structure
SELECT 'Current data sample:' as info;
SELECT id, property_name, asset_class, services, buyer, seller 
FROM deals 
ORDER BY created_at DESC 
LIMIT 10;

-- Step 3: Update services for existing records that don't have it set
-- For now, let's set a default based on the asset class or make educated guesses

-- Set Property Sales as default for most asset classes
UPDATE deals SET services = 'Property Sales' 
WHERE services IS NULL;

-- You can manually update specific deals if needed:
-- UPDATE deals SET services = 'Capital Advisors' WHERE property_name = 'One Raffles Place';
-- UPDATE deals SET services = 'Debt & Structured Finance' WHERE buyer = 'Some Specific Buyer';

-- Step 4: Add constraint for services
DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'deals_services_check') THEN
        ALTER TABLE deals DROP CONSTRAINT deals_services_check;
        RAISE NOTICE 'Dropped existing services constraint';
    END IF;
    
    -- Add new constraint
    ALTER TABLE deals 
    ADD CONSTRAINT deals_services_check 
    CHECK (services IN ('Debt & Structured Finance', 'Capital Advisors', 'Property Sales'));
    RAISE NOTICE 'Added services constraint';
END $$;

-- Step 5: Make services column NOT NULL
ALTER TABLE deals ALTER COLUMN services SET NOT NULL;

-- Step 6: Create indexes for services
DROP INDEX IF EXISTS idx_deals_services;
DROP INDEX IF EXISTS idx_deals_asset_class_services;

CREATE INDEX idx_deals_services ON deals(services);
CREATE INDEX idx_deals_asset_class_services ON deals(asset_class, services);

-- Step 7: Update search index to include services
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english', 
  property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services));

-- Step 8: Update the view
DROP VIEW IF EXISTS deals_with_search;
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller || ' ' || asset_class || ' ' || services) as search_vector
FROM deals;

-- Step 9: Add sample data with different service types
INSERT INTO deals (property_name, property_image_url, country, deal_price_usd, deal_price_sgd, asset_class, services, deal_date, buyer, seller) 
SELECT * FROM (VALUES
  ('Kyoto Hotel Resort Complex', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 'Japan', 420.00, 567.00, 'Hotels & Hospitality', 'Capital Advisors', 'Q3 2024', 'Hyatt Hotels', 'Marriott International'),
  ('Hong Kong Retail Center', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', 'Hong Kong', 380.50, 513.68, 'Retail', 'Debt & Structured Finance', 'Q2 2024', 'Link REIT', 'Wharf Holdings'),
  ('Singapore Residential Tower', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'Singapore', 850.00, 1147.50, 'Residential / Multifamily', 'Property Sales', 'Q4 2024', 'City Developments', 'UOL Group')
) AS new_deals(property_name, property_image_url, country, deal_price_usd, deal_price_sgd, asset_class, services, deal_date, buyer, seller)
WHERE NOT EXISTS (
  SELECT 1 FROM deals WHERE property_name = new_deals.property_name
);

-- Step 10: Show final results
SELECT 'Migration completed! Results:' as info;

SELECT 'Asset Class and Services breakdown:' as breakdown;
SELECT asset_class, services, COUNT(*) as count 
FROM deals 
GROUP BY asset_class, services 
ORDER BY asset_class, services;

SELECT 'Total deals by service type:' as summary;
SELECT services, COUNT(*) as count 
FROM deals 
GROUP BY services 
ORDER BY services; 