-- =====================================================
-- ADD DEBT & STRUCTURED FINANCE FIELDS
-- =====================================================
-- Migration to add D&SF specific fields to the deals table

-- Add D&SF-specific columns to deals table
ALTER TABLE deals ADD COLUMN IF NOT EXISTS deal_type TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS purpose TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS loan_size_local DECIMAL(10,2);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS loan_size_currency TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS ltv_percentage INTEGER;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS loan_term TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS borrower TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lender_source TEXT;

-- Add check constraints for new fields (only if they don't exist)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_deal_type') THEN
        ALTER TABLE deals ADD CONSTRAINT check_deal_type
          CHECK (deal_type IS NULL OR deal_type IN ('Senior Investment', 'Mezzanine Finance', 'Bridge Loan', 'Construction Finance'));
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_lender_source') THEN
        ALTER TABLE deals ADD CONSTRAINT check_lender_source
          CHECK (lender_source IS NULL OR lender_source IN ('Bank Lender', 'Non Bank Lender', 'Private Equity', 'REIT', 'Government Fund'));
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_ltv_percentage') THEN
        ALTER TABLE deals ADD CONSTRAINT check_ltv_percentage
          CHECK (ltv_percentage IS NULL OR (ltv_percentage >= 0 AND ltv_percentage <= 100));
    END IF;
END $$;

-- Add currency check for loan_size_currency (same as local_currency options)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_loan_size_currency') THEN
        ALTER TABLE deals ADD CONSTRAINT check_loan_size_currency
          CHECK (loan_size_currency IS NULL OR loan_size_currency IN ('USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR', 'INR', 'NZD', 'PHP', 'VND', 'THB'));
    END IF;
END $$;

-- Create indexes for performance on new D&SF fields
CREATE INDEX IF NOT EXISTS idx_deals_deal_type ON deals(deal_type);
CREATE INDEX IF NOT EXISTS idx_deals_lender_source ON deals(lender_source);
CREATE INDEX IF NOT EXISTS idx_deals_borrower ON deals(borrower);
CREATE INDEX IF NOT EXISTS idx_deals_service_type ON deals(services, deal_type);

-- Update the search index to include new D&SF fields
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english',
  COALESCE(property_name, '') || ' ' ||
  COALESCE(buyer, '') || ' ' ||
  COALESCE(seller, '') || ' ' ||
  COALESCE(borrower, '') || ' ' ||
  COALESCE(purpose, '') || ' ' ||
  COALESCE(deal_type, '')
));

-- Update the deals_with_search view to include new fields
DROP VIEW IF EXISTS deals_with_search;
CREATE OR REPLACE VIEW deals_with_search AS
SELECT
  *,
  to_tsvector('english',
    COALESCE(property_name, '') || ' ' ||
    COALESCE(buyer, '') || ' ' ||
    COALESCE(seller, '') || ' ' ||
    COALESCE(borrower, '') || ' ' ||
    COALESCE(purpose, '') || ' ' ||
    COALESCE(deal_type, '')
  ) as search_vector
FROM deals;

-- Add comments for documentation
COMMENT ON COLUMN deals.deal_type IS 'Type of D&SF deal: Senior Investment, Mezzanine Finance, Bridge Loan, Construction Finance';
COMMENT ON COLUMN deals.purpose IS 'Purpose of the financing: Land Bank & Construction, Acquisition Finance, Development Finance, etc.';
COMMENT ON COLUMN deals.loan_size_local IS 'Loan amount in local currency (millions)';
COMMENT ON COLUMN deals.loan_size_currency IS 'Currency for the loan size (AUD, USD, etc.)';
COMMENT ON COLUMN deals.ltv_percentage IS 'Loan-to-value ratio as percentage (0-100)';
COMMENT ON COLUMN deals.loan_term IS 'Term of the loan (e.g., "4 years", "5 years")';
COMMENT ON COLUMN deals.borrower IS 'Entity borrowing the funds (for D&SF deals)';
COMMENT ON COLUMN deals.lender_source IS 'Type of lender: Bank Lender, Non Bank Lender, Private Equity, etc.';

-- Sample D&SF data for testing with various currencies (only if none exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM deals WHERE services = 'Debt & Structured Finance') THEN
    INSERT INTO deals (
  property_name,
  country,
  services,
  deal_date,
  location,
  asset_class,
  deal_type,
  purpose,
  loan_size_local,
  loan_size_currency,
  ltv_percentage,
  loan_term,
  borrower,
  lender_source,
  deal_price_usd,
  local_currency,
  local_currency_amount,
  buyer,
  seller
) VALUES
-- Australia (AUD)
(
  'Pelligra Industrial Development',
  'Australia',
  'Debt & Structured Finance',
  'Q2 2024',
  'Melbourne, Victoria',
  'Industrial & Logistics',
  'Senior Investment',
  'Land Bank & Construction',
  73.5,
  'AUD',
  70,
  '4 years',
  'Pelligra',
  'Non Bank Lender',
  49.0, -- USD equivalent (73.5 / 1.5)
  'AUD',
  73.5,
  'N/A',
  'N/A'
),
-- Singapore (SGD)
(
  'Marina Bay Logistics Hub',
  'Singapore',
  'Debt & Structured Finance',
  'Q3 2024',
  'Marina Bay, Singapore',
  'Industrial & Logistics',
  'Bridge Loan',
  'Acquisition Finance',
  135.0,
  'SGD',
  65,
  '18 months',
  'Mapletree Logistics Trust',
  'Bank Lender',
  100.0, -- USD equivalent (135 / 1.35)
  'SGD',
  135.0,
  'N/A',
  'N/A'
),
-- Japan (JPY)
(
  'Tokyo Data Center Facility',
  'Japan',
  'Debt & Structured Finance',
  'Q1 2024',
  'Shibuya, Tokyo',
  'Data Centres',
  'Mezzanine Finance',
  'Development Finance',
  7500.0,
  'JPY',
  80,
  '5 years',
  'NTT Urban Development',
  'Private Equity',
  50.0, -- USD equivalent (7500 / 150)
  'JPY',
  7500.0,
  'N/A',
  'N/A'
),
-- Hong Kong (HKD)
(
  'Central District Office Tower',
  'Hong Kong',
  'Debt & Structured Finance',
  'Q4 2024',
  'Central, Hong Kong',
  'Office',
  'Construction Finance',
  'Development Finance',
  390.0,
  'HKD',
  75,
  '3 years',
  'Henderson Land Development',
  'Bank Lender',
  50.0, -- USD equivalent (390 / 7.8)
  'HKD',
  390.0,
  'N/A',
  'N/A'
),
-- Korea (KRW)
(
  'Seoul Mixed-Use Development',
  'Korea',
  'Debt & Structured Finance',
  'Q2 2024',
  'Gangnam-gu, Seoul',
  'Residential / Multifamily',
  'Senior Investment',
  'Land Bank & Construction',
  65000.0,
  'KRW',
  60,
  '4 years',
  'Lotte Property & Development',
  'Government Fund',
  50.0, -- USD equivalent (65000 / 1300)
  'KRW',
  65000.0,
  'N/A',
  'N/A'
),
-- India (INR)
(
  'Mumbai Commercial Complex',
  'India',
  'Debt & Structured Finance',
  'Q3 2024',
  'Bandra-Kurla Complex, Mumbai',
  'Office',
  'Bridge Loan',
  'Refinancing',
  4150.0,
  'INR',
  55,
  '2 years',
  'DLF Limited',
  'Non Bank Lender',
  50.0, -- USD equivalent (4150 / 83)
  'INR',
  4150.0,
  'N/A',
  'N/A'
);

-- Rollback instructions (commented out)
/*
-- To rollback this migration:
DROP INDEX IF EXISTS idx_deals_search;
DROP INDEX IF EXISTS idx_deals_deal_type;
DROP INDEX IF EXISTS idx_deals_lender_source;
DROP INDEX IF EXISTS idx_deals_borrower;
DROP INDEX IF EXISTS idx_deals_service_type;

ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_deal_type;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_lender_source;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_ltv_percentage;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_loan_size_currency;

ALTER TABLE deals DROP COLUMN IF EXISTS deal_type;
ALTER TABLE deals DROP COLUMN IF EXISTS purpose;
ALTER TABLE deals DROP COLUMN IF EXISTS loan_size_local;
ALTER TABLE deals DROP COLUMN IF EXISTS loan_size_currency;
ALTER TABLE deals DROP COLUMN IF EXISTS ltv_percentage;
ALTER TABLE deals DROP COLUMN IF EXISTS loan_term;
ALTER TABLE deals DROP COLUMN IF EXISTS borrower;
ALTER TABLE deals DROP COLUMN IF EXISTS lender_source;

-- Restore original search index
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english',
  property_name || ' ' || buyer || ' ' || seller));

-- Restore original view
CREATE OR REPLACE VIEW deals_with_search AS
SELECT
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;
*/