-- Migration: Change lease_term_years to lease_term_months
-- Date: 2025-10-22
-- Description: Converts Sale & Leaseback lease term from years to months for more granular control

-- Step 1: Add new column for months
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lease_term_months INTEGER;

-- Step 2: Convert existing years data to months (multiply by 12)
UPDATE deals
SET lease_term_months = lease_term_years * 12
WHERE lease_term_years IS NOT NULL;

-- Step 3: Drop old constraint
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_lease_term_years;

-- Step 4: Drop old column
ALTER TABLE deals DROP COLUMN IF EXISTS lease_term_years;

-- Step 5: Add constraint for new column
ALTER TABLE deals ADD CONSTRAINT check_lease_term_months CHECK (lease_term_months > 0);

-- Step 6: Update column comment
COMMENT ON COLUMN deals.lease_term_months IS 'Duration of leaseback agreement in months for Sale & Leaseback deals';

-- Step 7: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_deals_lease_term_months ON deals(lease_term_months) WHERE lease_term_months IS NOT NULL;

-- Step 8: Drop old index
DROP INDEX IF EXISTS idx_deals_lease_term_years;

COMMIT;

-- ROLLBACK INSTRUCTIONS (if needed):
-- To rollback this migration, run the following:
/*
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lease_term_years INTEGER;
UPDATE deals SET lease_term_years = ROUND(lease_term_months / 12.0) WHERE lease_term_months IS NOT NULL;
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_lease_term_months;
ALTER TABLE deals DROP COLUMN IF EXISTS lease_term_months;
ALTER TABLE deals ADD CONSTRAINT check_lease_term_years CHECK (lease_term_years > 0);
COMMENT ON COLUMN deals.lease_term_years IS 'Duration of leaseback agreement in years';
CREATE INDEX IF NOT EXISTS idx_deals_lease_term_years ON deals(lease_term_years) WHERE lease_term_years IS NOT NULL;
DROP INDEX IF EXISTS idx_deals_lease_term_months;
*/
