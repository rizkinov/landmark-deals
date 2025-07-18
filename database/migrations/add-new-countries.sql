-- CBRE Landmark Deals - Add New Countries Migration
-- This migration adds India, New Zealand, Philippines, Vietnam, and Thailand to the allowed countries

-- Step 1: Update the country constraint to include the new countries
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_country_check;

-- Step 2: Add the new constraint with all countries including the new ones
ALTER TABLE deals ADD CONSTRAINT deals_country_check 
CHECK (country IN ('Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives', 'Australia', 'India', 'New Zealand', 'Philippines', 'Vietnam', 'Thailand'));

-- Step 3: Update the local_currency column constraint if it exists
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_local_currency_check;

-- Step 4: Add the new local_currency constraint with all currencies including the new ones
ALTER TABLE deals ADD CONSTRAINT deals_local_currency_check 
CHECK (local_currency IN ('USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR', 'INR', 'NZD', 'PHP', 'VND', 'THB'));

-- Step 5: Add comment to document the migration
COMMENT ON TABLE deals IS 'Updated to include India, New Zealand, Philippines, Vietnam, and Thailand - Migration applied on ' || NOW();