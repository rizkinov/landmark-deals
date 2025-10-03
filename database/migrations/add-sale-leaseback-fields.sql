-- Migration: Add Sale & Leaseback fields to deals table
-- Date: 2025-10-04
-- Description: Adds fields specific to Sale & Leaseback deals including yield, GLA, tenant, lease terms

-- Add Sale & Leaseback specific columns
ALTER TABLE deals ADD COLUMN IF NOT EXISTS yield_percentage DECIMAL(5,2);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS gla_sqm INTEGER;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS tenant TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lease_term_years INTEGER;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS annual_rent DECIMAL(10,2);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS rent_currency TEXT;

-- Add constraints (only if they don't exist)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_yield_percentage') THEN
        ALTER TABLE deals ADD CONSTRAINT check_yield_percentage CHECK (yield_percentage >= 0 AND yield_percentage <= 100);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_gla_sqm') THEN
        ALTER TABLE deals ADD CONSTRAINT check_gla_sqm CHECK (gla_sqm > 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_lease_term_years') THEN
        ALTER TABLE deals ADD CONSTRAINT check_lease_term_years CHECK (lease_term_years > 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_annual_rent') THEN
        ALTER TABLE deals ADD CONSTRAINT check_annual_rent CHECK (annual_rent >= 0);
    END IF;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN deals.yield_percentage IS 'Investment yield percentage for Sale & Leaseback deals (0-100)';
COMMENT ON COLUMN deals.gla_sqm IS 'Gross Leasable Area in square meters for Sale & Leaseback deals';
COMMENT ON COLUMN deals.tenant IS 'Entity leasing back the property in Sale & Leaseback deals';
COMMENT ON COLUMN deals.lease_term_years IS 'Duration of leaseback agreement in years';
COMMENT ON COLUMN deals.annual_rent IS 'Annual rent amount in specified currency';
COMMENT ON COLUMN deals.rent_currency IS 'Currency for rent payments (USD, AUD, SGD, etc.)';

-- Insert sample Sale & Leaseback deals (only if they don't exist)
-- Check if any Sale & Leaseback deals already exist before inserting
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM deals WHERE services = 'Sale & Leaseback') THEN
    INSERT INTO deals (
      property_name, country, deal_price_usd, local_currency, local_currency_amount,
      asset_class, services, deal_date, buyer, seller, location, remarks,
      property_image_url, is_confidential,
      -- Sale & Leaseback specific fields
      yield_percentage, gla_sqm, tenant, lease_term_years, annual_rent, rent_currency
    ) VALUES
(
  '3 Moloney Drive', 'Australia', 12.5, 'AUD', 18.8, 'Industrial & Logistics', 'Sale & Leaseback',
  'Q2 2023', 'RF Corval', 'New Edge Microbials', 'Wodonga, NSW',
  'Industrial facility with long-term tenant commitment and strong yield profile',
  '/default-photo.jpeg', false,
  7.75, 7935, 'New Edge Microbials', 15, 0.97, 'AUD'
),
(
  'Marina Bay Logistics Hub', 'Singapore', 45.2, 'SGD', 61.0, 'Industrial & Logistics', 'Sale & Leaseback',
  'Q3 2023', 'CapitaLand Investment', 'DHL Supply Chain', 'Marina Bay, Singapore',
  'Strategic logistics facility with prime location and established tenant',
  '/default-photo.jpeg', false,
  6.25, 12500, 'DHL Supply Chain', 20, 3.81, 'SGD'
),
(
  'Tokyo Tech Center', 'Japan', 89.4, 'JPY', 13400, 'Office', 'Sale & Leaseback',
  'Q1 2023', 'Mitsubishi Estate', 'Sony Corporation', 'Shibuya, Tokyo',
  'Corporate headquarters with technology infrastructure and long-term commitment',
  '/default-photo.jpeg', false,
  5.80, 15800, 'Sony Corporation', 25, 518.12, 'JPY'
),
(
  'Westfield Shopping Plaza', 'Australia', 67.8, 'AUD', 101.7, 'Retail', 'Sale & Leaseback',
  'Q4 2023', 'Charter Hall Retail REIT', 'Westfield Corporation', 'Parramatta, NSW',
  'Major retail center with stable cash flows and established tenant base',
  '/default-photo.jpeg', false,
  7.15, 28500, 'Westfield Corporation', 12, 4.85, 'AUD'
),
(
  'Orchard Road Commercial Tower', 'Singapore', 156.8, 'SGD', 211.7, 'Office', 'Sale & Leaseback',
  'Q1 2024', 'Frasers Property', 'UOB Bank', 'Orchard Road, Singapore',
  'Premium office space in prime CBD location with anchor tenant',
  '/default-photo.jpeg', false,
  4.95, 22400, 'UOB Bank', 18, 7.76, 'SGD'
);
  END IF;
END $$;

-- Update RLS policies to include new fields in search
-- This will be handled in the application layer for now

-- Create index for better query performance on Sale & Leaseback fields
CREATE INDEX IF NOT EXISTS idx_deals_yield_percentage ON deals(yield_percentage) WHERE yield_percentage IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_deals_gla_sqm ON deals(gla_sqm) WHERE gla_sqm IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_deals_tenant ON deals(tenant) WHERE tenant IS NOT NULL;

COMMIT;