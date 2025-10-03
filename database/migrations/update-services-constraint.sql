-- Migration: Update services constraint to include Sale & Leaseback
-- Date: 2025-10-04
-- Description: Updates the existing deals_services_check constraint to allow "Sale & Leaseback"

-- Drop the existing constraint if it exists
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'deals_services_check') THEN
        ALTER TABLE deals DROP CONSTRAINT deals_services_check;
    END IF;
END $$;

-- Add the updated constraint with Sale & Leaseback included
ALTER TABLE deals ADD CONSTRAINT deals_services_check
    CHECK (services IN ('Property Sales', 'Capital Advisors', 'Debt & Structured Finance', 'Sale & Leaseback'));

-- Optional: Add comment
COMMENT ON CONSTRAINT deals_services_check ON deals IS 'Ensures services field contains only valid service types including Sale & Leaseback';

COMMIT;