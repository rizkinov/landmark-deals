-- Add Location and Remarks columns to deals table
-- Step 1: Add the new columns

-- Add location column (required field)
ALTER TABLE deals 
ADD COLUMN location VARCHAR(255) NOT NULL DEFAULT 'TBD';

-- Add remarks column (optional field)  
ALTER TABLE deals 
ADD COLUMN remarks TEXT;

-- Step 2: Remove the default from location now that it's added
ALTER TABLE deals 
ALTER COLUMN location DROP DEFAULT;

-- Step 3: Add indexes for performance
CREATE INDEX idx_deals_location ON deals(location);

-- Step 4: Update the search index to include location
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english', 
  property_name || ' ' || buyer || ' ' || seller || ' ' || location || ' ' || COALESCE(remarks, '')));

-- Step 5: Update the view to include new fields
DROP VIEW IF EXISTS deals_with_search;
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller || ' ' || location || ' ' || COALESCE(remarks, '')) as search_vector
FROM deals;

-- Step 6: Update existing sample data with locations (optional, for testing)
UPDATE deals SET location = 'Marina Bay, Singapore' WHERE property_name = 'Marina Bay Financial Centre Tower 3';
UPDATE deals SET location = 'Midtown, Tokyo' WHERE property_name = 'Tokyo Midtown Office Complex';
UPDATE deals SET location = 'Central, Hong Kong' WHERE property_name = 'Hong Kong Central Plaza';
UPDATE deals SET location = 'Digital Media City, Seoul' WHERE property_name = 'Seoul Digital Media City';
UPDATE deals SET location = 'Xinyi District, Taipei' WHERE property_name = 'Taipei 101 Shopping Center';
UPDATE deals SET location = 'Financial Street, Beijing' WHERE property_name = 'Beijing Financial Street Tower';
UPDATE deals SET location = 'Sydney CBD, Sydney' WHERE property_name = 'Sydney Harbour Business District';
UPDATE deals SET location = 'Raffles Place, Singapore' WHERE property_name = 'One Raffles Place';
UPDATE deals SET location = 'Shibuya, Tokyo' WHERE property_name = 'Shibuya Sky Tower';
UPDATE deals SET location = 'Incheon, Seoul' WHERE property_name = 'Incheon Logistics Hub';

-- Step 7: Add some sample remarks (optional, for testing)
UPDATE deals SET remarks = 'Landmark transaction in prime financial district' WHERE property_name = 'Marina Bay Financial Centre Tower 3';
UPDATE deals SET remarks = 'Strategic acquisition for office portfolio expansion' WHERE property_name = 'Tokyo Midtown Office Complex';
UPDATE deals SET remarks = 'Advisory services for portfolio restructuring' WHERE property_name = 'One Raffles Place'; 