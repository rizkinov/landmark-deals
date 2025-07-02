-- Fix Date Sorting for CBRE Deals
-- This script adds a proper date column for chronological sorting

-- Step 1: Add a new column for sortable dates
ALTER TABLE deals ADD COLUMN IF NOT EXISTS deal_date_sortable DATE;

-- Step 2: Create a function to convert quarter strings to dates
CREATE OR REPLACE FUNCTION quarter_to_date(quarter_str TEXT) 
RETURNS DATE AS $$
BEGIN
  CASE 
    WHEN quarter_str LIKE 'Q1 %' THEN 
      RETURN (SUBSTRING(quarter_str FROM 4)::INTEGER || '-01-01')::DATE;
    WHEN quarter_str LIKE 'Q2 %' THEN 
      RETURN (SUBSTRING(quarter_str FROM 4)::INTEGER || '-04-01')::DATE;
    WHEN quarter_str LIKE 'Q3 %' THEN 
      RETURN (SUBSTRING(quarter_str FROM 4)::INTEGER || '-07-01')::DATE;
    WHEN quarter_str LIKE 'Q4 %' THEN 
      RETURN (SUBSTRING(quarter_str FROM 4)::INTEGER || '-10-01')::DATE;
    ELSE 
      RETURN NULL;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Update existing records with sortable dates
UPDATE deals 
SET deal_date_sortable = quarter_to_date(deal_date)
WHERE deal_date_sortable IS NULL;

-- Step 4: Create a trigger to automatically update deal_date_sortable when deal_date changes
CREATE OR REPLACE FUNCTION update_deal_date_sortable()
RETURNS TRIGGER AS $$
BEGIN
  NEW.deal_date_sortable = quarter_to_date(NEW.deal_date);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists and create new one
DROP TRIGGER IF EXISTS trigger_update_deal_date_sortable ON deals;
CREATE TRIGGER trigger_update_deal_date_sortable
  BEFORE INSERT OR UPDATE OF deal_date ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_deal_date_sortable();

-- Step 5: Create index for performance
CREATE INDEX IF NOT EXISTS idx_deals_date_sortable ON deals(deal_date_sortable);

-- Step 6: Verify the conversion worked
SELECT 'Date conversion verification:' as info;
SELECT deal_date, deal_date_sortable 
FROM deals 
ORDER BY deal_date_sortable DESC
LIMIT 10; 