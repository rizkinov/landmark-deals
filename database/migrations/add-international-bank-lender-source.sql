-- Migration: Remove lender_source constraint to allow custom values
-- Date: 2025-10-23
-- Description: Removes lender_source check constraint to allow users to enter custom lender sources
--              The UI provides suggested options but accepts any text input

-- Drop existing constraint to allow free text entry
ALTER TABLE deals DROP CONSTRAINT IF EXISTS check_lender_source;

-- Verify constraint was removed
SELECT COUNT(*) as constraint_exists
FROM pg_constraint
WHERE conname = 'check_lender_source';
