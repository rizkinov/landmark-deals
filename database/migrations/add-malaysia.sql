-- CBRE Landmark Deals - Add Malaysia Migration
-- Date: 2025-01-22
-- This migration adds Malaysia (MYR) to the allowed countries and currencies

-- ============================================
-- STEP 1: Update country constraint
-- ============================================

-- Drop existing country constraint
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_country_check;

-- Add new constraint with Malaysia (14 countries total, alphabetically ordered)
ALTER TABLE deals ADD CONSTRAINT deals_country_check
CHECK (country IN (
  'Australia', 'China', 'Hong Kong', 'India', 'Japan', 'Korea', 'Malaysia',
  'Maldives', 'New Zealand', 'Philippines', 'Singapore', 'Taiwan', 'Thailand', 'Vietnam'
));

-- ============================================
-- STEP 2: Update local_currency constraint
-- ============================================

-- Drop existing local_currency constraint
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_local_currency_check;

-- Add new constraint with MYR (15 currencies total)
ALTER TABLE deals ADD CONSTRAINT deals_local_currency_check
CHECK (local_currency IN (
  'USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR',
  'INR', 'NZD', 'PHP', 'VND', 'THB', 'MYR'
));

-- ============================================
-- STEP 3: Update loan_size_currency constraint (for D&SF deals)
-- ============================================

-- Drop existing loan_size_currency constraints if they exist (handle both naming conventions)
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_loan_size_currency;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_loan_size_currency_check;

-- Add new constraint with MYR (using the original constraint name from D&SF migration)
ALTER TABLE deals ADD CONSTRAINT check_loan_size_currency
CHECK (loan_size_currency IS NULL OR loan_size_currency IN (
  'USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR',
  'INR', 'NZD', 'PHP', 'VND', 'THB', 'MYR'
));

-- ============================================
-- STEP 4: Add documentation comment
-- ============================================

COMMENT ON TABLE deals IS 'Updated to include Malaysia (MYR) and reordered countries alphabetically - 14 countries, 15 currencies total';

-- ============================================
-- STEP 5: Add TEST sample deals for Malaysia
-- ============================================

-- TEST: Property Sales - Kuala Lumpur Office Tower
INSERT INTO deals (
  property_name, country, deal_price_usd, local_currency, local_currency_amount,
  asset_class, services, deal_date, buyer, seller, location
) VALUES (
  'TEST: Petronas Twin Towers Complex', 'Malaysia', 425.5, 'MYR', 2000,
  'Office', 'Property Sales', 'Q3 2024',
  'Khazanah Nasional', 'CIMB Property Trust', 'Kuala Lumpur City Centre'
);

-- TEST: Capital Advisors - Malaysia Industrial Park
INSERT INTO deals (
  property_name, country, deal_price_usd, local_currency, local_currency_amount,
  asset_class, services, deal_date, buyer, seller, location,
  project_title, project_subtitle, content_html, slug
) VALUES (
  'TEST: Iskandar Malaysia Logistics Hub', 'Malaysia', 156.8, 'MYR', 737,
  'Industrial & Logistics', 'Capital Advisors', 'Q2 2024',
  'YTL Land', 'UEM Sunrise', 'Johor Bahru, Iskandar',
  'TEST: Iskandar Malaysia Logistics Hub', 'Strategic Industrial Development in Johor',
  '<p>Premium logistics facility strategically located in Iskandar Malaysia, featuring state-of-the-art warehousing and distribution capabilities.</p>',
  'test-iskandar-malaysia-logistics-hub'
);

-- TEST: Debt & Structured Finance - Kuala Lumpur Mixed-Use Development
INSERT INTO deals (
  property_name, country, deal_price_usd, local_currency, local_currency_amount,
  asset_class, services, deal_date, buyer, seller, location,
  deal_type, purpose, loan_size_local, loan_size_currency, ltv_percentage,
  loan_term, borrower, lender_source
) VALUES (
  'TEST: Bukit Bintang Mixed-Use Tower', 'Malaysia', 212.8, 'MYR', 1000,
  'Residential / Multifamily', 'Debt & Structured Finance', 'Q4 2024',
  'Sime Darby Property', 'SP Setia', 'Bukit Bintang, Kuala Lumpur',
  'Senior Investment', 'Development Finance', 640, 'MYR', 65.0,
  '5 years', 'Sime Darby Property', 'Bank Lender'
);

-- TEST: Sale & Leaseback - Penang Retail Mall
INSERT INTO deals (
  property_name, country, deal_price_usd, local_currency, local_currency_amount,
  asset_class, services, deal_date, buyer, seller, location,
  yield_percentage, gla_sqm, tenant, lease_term_years, annual_rent, rent_currency
) VALUES (
  'TEST: Gurney Plaza Shopping Centre', 'Malaysia', 148.9, 'MYR', 700,
  'Retail', 'Sale & Leaseback', 'Q1 2024',
  'CapitaLand Malaysia', 'Gurney Paragon Mall Trust', 'Georgetown, Penang',
  7.50, 45000, 'Parkson Holdings', 15, 52.5, 'MYR'
);

-- TEST: Hotels & Hospitality - Langkawi Resort
INSERT INTO deals (
  property_name, country, deal_price_usd, local_currency, local_currency_amount,
  asset_class, services, deal_date, buyer, seller, location
) VALUES (
  'TEST: The Datai Langkawi Resort', 'Malaysia', 117.0, 'MYR', 550,
  'Hotels & Hospitality', 'Property Sales', 'Q2 2024',
  'Archipelago International', 'YTL Hotels', 'Langkawi Island'
);

-- ============================================
-- STEP 6: Verification queries
-- ============================================

-- Verify constraints were updated
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Verifying constraints...';
END $$;

-- Check country constraint
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'deals'::regclass
  AND conname = 'deals_country_check';

-- Check currency constraints
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'deals'::regclass
  AND conname IN ('deals_local_currency_check', 'check_loan_size_currency');

-- Count Malaysia test deals
SELECT
  country,
  COUNT(*) as deal_count,
  array_agg(DISTINCT services) as service_types
FROM deals
WHERE country = 'Malaysia'
GROUP BY country;

-- ============================================
-- ROLLBACK INSTRUCTIONS (if needed)
-- ============================================

-- To rollback this migration, run:
/*
-- Delete test deals
DELETE FROM deals WHERE property_name LIKE 'TEST:%' AND country = 'Malaysia';

-- Restore old country constraint (13 countries)
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_country_check;
ALTER TABLE deals ADD CONSTRAINT deals_country_check
CHECK (country IN (
  'Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives',
  'Australia', 'India', 'New Zealand', 'Philippines', 'Vietnam', 'Thailand'
));

-- Restore old currency constraints (14 currencies)
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_local_currency_check;
ALTER TABLE deals ADD CONSTRAINT deals_local_currency_check
CHECK (local_currency IN (
  'USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR',
  'INR', 'NZD', 'PHP', 'VND', 'THB'
));

ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_loan_size_currency;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_loan_size_currency_check;
ALTER TABLE deals ADD CONSTRAINT check_loan_size_currency
CHECK (loan_size_currency IS NULL OR loan_size_currency IN (
  'USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR',
  'INR', 'NZD', 'PHP', 'VND', 'THB'
));
*/

-- ============================================
-- SUMMARY
-- ============================================

-- Countries: 13 → 14 (added Malaysia 🇲🇾)
-- Currencies: 14 → 15 (added MYR - Malaysian Ringgit)
-- Exchange Rate: RM 4.7 = USD 1
-- Currency Symbol: RM
-- Test Deals: 5 (Property Sales x2, Capital Advisors, D&SF, Sale & Leaseback)
-- Formatting: Standard decimals (RM500.0M, like USD/SGD/AUD)
