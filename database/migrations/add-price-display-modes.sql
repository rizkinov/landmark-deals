-- Migration: Add Price Display Modes for Property Sales
-- Date: 2025-01-22
-- Description: Adds support for "Over", "Approx", and enhanced "Confidential" price displays

-- ============================================
-- STEP 1: Add new columns to deals table
-- ============================================

-- Add price_display_mode column with constraint
ALTER TABLE deals
  ADD COLUMN IF NOT EXISTS price_display_mode VARCHAR(20) DEFAULT 'exact'
    CHECK (price_display_mode IN ('exact', 'over', 'approx', 'confidential'));

-- Add show_usd column
ALTER TABLE deals
  ADD COLUMN IF NOT EXISTS show_usd BOOLEAN DEFAULT true;

-- ============================================
-- STEP 2: Migrate existing is_confidential values
-- ============================================

-- Update existing confidential deals to use new price_display_mode
UPDATE deals
SET price_display_mode = 'confidential'
WHERE is_confidential = true;

-- For all other deals, ensure they have 'exact' mode (default should handle this)
UPDATE deals
SET price_display_mode = 'exact'
WHERE price_display_mode IS NULL OR price_display_mode = '';

-- Ensure all deals have show_usd = true by default
UPDATE deals
SET show_usd = true
WHERE show_usd IS NULL;

-- ============================================
-- STEP 3: Add documentation comments
-- ============================================

COMMENT ON COLUMN deals.price_display_mode IS
  'Price display mode: exact (default), over (shows "Over" prefix), approx (shows "~" suffix), confidential (hides pricing)';

COMMENT ON COLUMN deals.show_usd IS
  'Whether to show USD amount. If false, displays as "USD: -" on cards. Only applies to over/approx modes.';

-- ============================================
-- STEP 4: Create index for performance
-- ============================================

-- Add index on price_display_mode for filtering (if needed in future)
CREATE INDEX IF NOT EXISTS idx_deals_price_display_mode
  ON deals(price_display_mode);

-- ============================================
-- STEP 5: Verification queries
-- ============================================

-- Verify the migration
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Verifying new columns...';
END $$;

-- Check column exists and has correct default
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'deals'
  AND column_name IN ('price_display_mode', 'show_usd')
ORDER BY column_name;

-- Count deals by price_display_mode
SELECT
  price_display_mode,
  COUNT(*) as deal_count
FROM deals
GROUP BY price_display_mode
ORDER BY deal_count DESC;

-- ============================================
-- ROLLBACK INSTRUCTIONS (if needed)
-- ============================================

-- To rollback this migration, run:
/*
-- Restore is_confidential as primary field (if needed)
UPDATE deals
SET is_confidential = (price_display_mode = 'confidential')
WHERE price_display_mode = 'confidential';

-- Drop the new columns
ALTER TABLE deals DROP COLUMN IF EXISTS price_display_mode;
ALTER TABLE deals DROP COLUMN IF EXISTS show_usd;

-- Drop the index
DROP INDEX IF EXISTS idx_deals_price_display_mode;
*/
