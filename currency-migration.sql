-- CBRE Landmark Deals - Currency Migration
-- This migration adds local currency support to the deals table
-- Date: $(date)

-- =============================================================================
-- PHASE 1: ADD NEW CURRENCY COLUMNS
-- =============================================================================

-- Add new columns for local currency support
ALTER TABLE deals 
ADD COLUMN local_currency VARCHAR(3),
ADD COLUMN local_currency_amount DECIMAL(10,2);

-- =============================================================================
-- PHASE 2: CREATE COUNTRY-TO-CURRENCY MAPPING
-- =============================================================================

-- Create a temporary function to get default currency for each country
CREATE OR REPLACE FUNCTION get_default_currency(country_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE country_name
    WHEN 'Australia' THEN 'AUD'
    WHEN 'Japan' THEN 'JPY'
    WHEN 'Singapore' THEN 'SGD'
    WHEN 'Hong Kong' THEN 'HKD'
    WHEN 'China' THEN 'CNY'
    WHEN 'Korea' THEN 'KRW'
    WHEN 'Taiwan' THEN 'TWD'
    WHEN 'Maldives' THEN 'MVR'
    ELSE 'USD'
  END;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- PHASE 3: MIGRATE EXISTING DATA
-- =============================================================================

-- Update existing records with local currency information
-- For Singapore deals, use existing SGD amounts
UPDATE deals 
SET 
  local_currency = 'SGD',
  local_currency_amount = deal_price_sgd
WHERE country = 'Singapore';

-- For non-Singapore deals, set local currency and use approximate conversion
-- Note: These amounts should be manually verified and updated with actual deal amounts
UPDATE deals 
SET 
  local_currency = get_default_currency(country),
  local_currency_amount = CASE 
    WHEN country = 'Japan' THEN deal_price_usd * 150 -- Approximate JPY conversion
    WHEN country = 'Australia' THEN deal_price_usd * 1.5 -- Approximate AUD conversion
    WHEN country = 'Hong Kong' THEN deal_price_usd * 7.8 -- Approximate HKD conversion
    WHEN country = 'China' THEN deal_price_usd * 7.2 -- Approximate CNY conversion
    WHEN country = 'Korea' THEN deal_price_usd * 1300 -- Approximate KRW conversion
    WHEN country = 'Taiwan' THEN deal_price_usd * 31 -- Approximate TWD conversion
    WHEN country = 'Maldives' THEN deal_price_usd * 15.4 -- Approximate MVR conversion
    ELSE deal_price_usd -- Default to USD amount
  END
WHERE country != 'Singapore';

-- =============================================================================
-- PHASE 4: ADD CONSTRAINTS AND VALIDATION
-- =============================================================================

-- Add constraint for valid currency codes
ALTER TABLE deals 
ADD CONSTRAINT deals_local_currency_check 
CHECK (local_currency IN ('USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR'));

-- Make local_currency NOT NULL after migration
ALTER TABLE deals ALTER COLUMN local_currency SET NOT NULL;
ALTER TABLE deals ALTER COLUMN local_currency_amount SET NOT NULL;

-- =============================================================================
-- PHASE 5: UPDATE INDEXES
-- =============================================================================

-- Add index for currency-based queries
CREATE INDEX idx_deals_local_currency ON deals(local_currency);
CREATE INDEX idx_deals_currency_amount ON deals(local_currency_amount);

-- =============================================================================
-- PHASE 6: UPDATE VIEWS
-- =============================================================================

-- Drop and recreate the search view to include new currency fields
DROP VIEW IF EXISTS deals_with_search;

CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;

-- =============================================================================
-- PHASE 7: SAMPLE DATA UPDATES (for existing sample data)
-- =============================================================================

-- Update sample data with more accurate local currency amounts
-- These are example conversions - replace with actual deal amounts

UPDATE deals SET local_currency_amount = 1800000 WHERE property_name = 'Marina Bay Financial Centre Tower 3'; -- SGD 1.8B
UPDATE deals SET local_currency_amount = 120000 WHERE property_name = 'Tokyo Midtown Office Complex'; -- JPY 120B
UPDATE deals SET local_currency_amount = 5100 WHERE property_name = 'Hong Kong Central Plaza'; -- HKD 5.1B
UPDATE deals SET local_currency_amount = 600000 WHERE property_name = 'Seoul Digital Media City'; -- KRW 600B
UPDATE deals SET local_currency_amount = 10000 WHERE property_name = 'Taipei 101 Shopping Center'; -- TWD 10B
UPDATE deals SET local_currency_amount = 6400 WHERE property_name = 'Beijing Financial Street Tower'; -- CNY 6.4B
UPDATE deals SET local_currency_amount = 1125 WHERE property_name = 'Sydney Harbour Business District'; -- AUD 1.125B
UPDATE deals SET local_currency_amount = 2025000 WHERE property_name = 'One Raffles Place Advisory'; -- SGD 2.025B
UPDATE deals SET local_currency_amount = 102000 WHERE property_name = 'Shibuya Sky Tower'; -- JPY 102B
UPDATE deals SET local_currency_amount = 375000 WHERE property_name = 'Incheon Logistics Hub'; -- KRW 375B
UPDATE deals SET local_currency_amount = 1147500 WHERE property_name = 'Grand Hyatt Singapore'; -- SGD 1.1475B
UPDATE deals SET local_currency_amount = 63000 WHERE property_name = 'Tokyo Data Center Campus'; -- JPY 63B

-- =============================================================================
-- CLEANUP
-- =============================================================================

-- Drop the temporary function
DROP FUNCTION get_default_currency(TEXT);

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Verify the migration
SELECT 
  property_name,
  country,
  deal_price_usd,
  local_currency,
  local_currency_amount,
  deal_price_sgd -- Will be removed in future migration
FROM deals
ORDER BY country, property_name;

-- Check for any null values
SELECT COUNT(*) as null_currency_count
FROM deals 
WHERE local_currency IS NULL OR local_currency_amount IS NULL;

-- Summary by currency
SELECT 
  local_currency,
  COUNT(*) as deal_count,
  AVG(deal_price_usd) as avg_usd_amount,
  AVG(local_currency_amount) as avg_local_amount
FROM deals
GROUP BY local_currency
ORDER BY local_currency; 