-- Run these commands ONE BY ONE in your database

-- Command 1:
ALTER TABLE deals ADD COLUMN asset_class TEXT;

-- Command 2:
UPDATE deals SET asset_class = subcategory WHERE subcategory IN ('Office', 'Hotels & Hospitality', 'Industrial & Logistics', 'Retail', 'Residential / Multifamily', 'Land', 'Data Centres', 'Debt & Structured Finance', 'Capital Advisors');

-- Command 3:
SELECT COUNT(*) FROM deals WHERE asset_class IS NULL;

-- Command 4:
ALTER TABLE deals ADD CONSTRAINT deals_asset_class_check CHECK (asset_class IN ('Office', 'Hotels & Hospitality', 'Industrial & Logistics', 'Retail', 'Residential / Multifamily', 'Land', 'Data Centres', 'Debt & Structured Finance', 'Capital Advisors'));

-- Command 5:
ALTER TABLE deals ALTER COLUMN asset_class SET NOT NULL;

-- Command 6:
DROP VIEW IF EXISTS deals_with_search;

-- Command 7:
ALTER TABLE deals DROP COLUMN IF EXISTS category;

-- Command 8:
ALTER TABLE deals DROP COLUMN IF EXISTS subcategory;

-- Command 9:
DROP INDEX IF EXISTS idx_deals_country_category;

-- Command 10:
DROP INDEX IF EXISTS idx_deals_subcategory;

-- Command 11:
CREATE INDEX idx_deals_country_asset_class ON deals(country, asset_class);

-- Command 12:
CREATE INDEX idx_deals_asset_class ON deals(asset_class);

-- Command 13:
CREATE OR REPLACE VIEW deals_with_search AS SELECT *, to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector FROM deals;

-- Command 14 (verification):
SELECT asset_class, COUNT(*) as count FROM deals GROUP BY asset_class ORDER BY asset_class; 