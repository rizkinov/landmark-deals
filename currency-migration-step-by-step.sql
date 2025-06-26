-- CBRE Landmark Deals - Currency Migration (Step by Step)
-- Execute each step individually to ensure safe migration

-- STEP 1: Add new columns
ALTER TABLE deals ADD COLUMN local_currency VARCHAR(3);

-- STEP 2: Add local currency amount column
ALTER TABLE deals ADD COLUMN local_currency_amount DECIMAL(10,2);

-- STEP 3: Update Singapore deals with existing SGD data
UPDATE deals SET local_currency = 'SGD', local_currency_amount = deal_price_sgd WHERE country = 'Singapore';

-- STEP 4: Update Japan deals with JPY
UPDATE deals SET local_currency = 'JPY', local_currency_amount = deal_price_usd * 150 WHERE country = 'Japan';

-- STEP 5: Update Australia deals with AUD
UPDATE deals SET local_currency = 'AUD', local_currency_amount = deal_price_usd * 1.5 WHERE country = 'Australia';

-- STEP 6: Update Hong Kong deals with HKD
UPDATE deals SET local_currency = 'HKD', local_currency_amount = deal_price_usd * 7.8 WHERE country = 'Hong Kong';

-- STEP 7: Update China deals with CNY
UPDATE deals SET local_currency = 'CNY', local_currency_amount = deal_price_usd * 7.2 WHERE country = 'China';

-- STEP 8: Update Korea deals with KRW
UPDATE deals SET local_currency = 'KRW', local_currency_amount = deal_price_usd * 1300 WHERE country = 'Korea';

-- STEP 9: Update Taiwan deals with TWD
UPDATE deals SET local_currency = 'TWD', local_currency_amount = deal_price_usd * 31 WHERE country = 'Taiwan';

-- STEP 10: Update Maldives deals with MVR
UPDATE deals SET local_currency = 'MVR', local_currency_amount = deal_price_usd * 15.4 WHERE country = 'Maldives';

-- STEP 11: Add currency constraint
ALTER TABLE deals ADD CONSTRAINT deals_local_currency_check CHECK (local_currency IN ('USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR'));

-- STEP 12: Make columns NOT NULL
ALTER TABLE deals ALTER COLUMN local_currency SET NOT NULL;

-- STEP 13: Make local currency amount NOT NULL
ALTER TABLE deals ALTER COLUMN local_currency_amount SET NOT NULL;

-- STEP 14: Add indexes
CREATE INDEX idx_deals_local_currency ON deals(local_currency);

-- STEP 15: Add currency amount index
CREATE INDEX idx_deals_currency_amount ON deals(local_currency_amount);

-- STEP 16: Update search view
DROP VIEW IF EXISTS deals_with_search;

-- STEP 17: Recreate search view
CREATE OR REPLACE VIEW deals_with_search AS SELECT *, to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector FROM deals; 