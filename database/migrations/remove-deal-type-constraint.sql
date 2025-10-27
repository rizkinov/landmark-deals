-- Migration: Add custom_deal_type field for D&SF deals
-- Purpose: Allow custom deal type input while maintaining constraint for standard deals
-- Date: 2025-10-27

-- Add custom_deal_type column
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS custom_deal_type TEXT;

-- Add comment for documentation
COMMENT ON COLUMN deals.custom_deal_type IS 'Custom deal type for D&SF deals when standard options do not apply';

-- Drop existing deal_type constraint
ALTER TABLE deals
DROP CONSTRAINT IF EXISTS check_deal_type;

-- Update the constraint to allow NULL for deal_type (will be NULL when custom_deal_type is used)
ALTER TABLE deals
ADD CONSTRAINT check_deal_type
CHECK (
  deal_type IS NULL OR
  deal_type IN (
    'Senior Investment',
    'Mezzanine Finance',
    'Bridge Loan',
    'Construction Finance'
  )
);

-- Add validation: at least one of deal_type or custom_deal_type must be set when services is D&SF
-- Note: We don't enforce this at DB level since deal_type is optional for D&SF deals
-- The application layer will handle this validation if needed

-- Update search index to include custom_deal_type
DROP INDEX IF EXISTS idx_deals_search;

CREATE INDEX idx_deals_search ON deals USING gin(
  to_tsvector('english',
    COALESCE(property_name, '') || ' ' ||
    COALESCE(country, '') || ' ' ||
    COALESCE(location, '') || ' ' ||
    COALESCE(buyer, '') || ' ' ||
    COALESCE(seller, '') || ' ' ||
    COALESCE(asset_class, '') || ' ' ||
    COALESCE(custom_asset_class, '') || ' ' ||
    COALESCE(services, '') || ' ' ||
    COALESCE(project_title, '') || ' ' ||
    COALESCE(project_subtitle, '') || ' ' ||
    COALESCE(purpose, '') || ' ' ||
    COALESCE(deal_type, '') || ' ' ||
    COALESCE(custom_deal_type, '') || ' ' ||
    COALESCE(borrower, '') || ' ' ||
    COALESCE(lender_source, '') || ' ' ||
    COALESCE(tenant, '')
  )
);

-- Update deal_type index to be conditional
DROP INDEX IF EXISTS idx_deals_deal_type;
CREATE INDEX idx_deals_deal_type ON deals(deal_type) WHERE deal_type IS NOT NULL;
CREATE INDEX idx_deals_custom_deal_type ON deals(custom_deal_type) WHERE custom_deal_type IS NOT NULL;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Migration completed: custom_deal_type column added and constraints updated';
END $$;
