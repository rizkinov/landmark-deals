-- CBRE Landmark Deals - Currency Migration Rollback
-- Use this script to rollback the currency migration if needed

-- STEP 1: Drop indexes
DROP INDEX IF EXISTS idx_deals_local_currency;
DROP INDEX IF EXISTS idx_deals_currency_amount;

-- STEP 2: Drop constraints
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_local_currency_check;

-- STEP 3: Remove new columns
ALTER TABLE deals DROP COLUMN IF EXISTS local_currency;
ALTER TABLE deals DROP COLUMN IF EXISTS local_currency_amount;

-- STEP 4: Restore original search view
DROP VIEW IF EXISTS deals_with_search;

CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;

-- STEP 5: Verify rollback
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'deals' 
ORDER BY ordinal_position; 