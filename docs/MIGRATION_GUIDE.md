# Database Migration Guide: Adding New Countries

## Overview
This guide will help you add the 5 new countries (India, New Zealand, Philippines, Vietnam, Thailand) to your Supabase database.

## Option 1: Using Supabase Dashboard (Recommended)

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project
4. Navigate to **SQL Editor** in the left sidebar

### Step 2: Execute Migration SQL
Copy and paste the following SQL into the SQL Editor and click **Run**:

```sql
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
```

### Step 3: Verify Migration
After running the migration, verify it worked by running this query:

```sql
-- Check the current constraints
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'deals'::regclass 
AND contype = 'c';
```

You should see the updated constraints with all 13 countries and 13 currencies.

## Option 2: Using Command Line (If you have psql access)

### Prerequisites
- PostgreSQL client (psql) installed
- Your Supabase database connection string

### Step 1: Connect to Database
```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### Step 2: Run Migration File
```bash
\i database/migrations/add-new-countries.sql
```

## Option 3: Using Node.js Script (If you have env vars)

### Step 1: Set Environment Variables
```bash
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Step 2: Run Migration Script
```bash
node run-migration.js
```

## Verification Steps

After running the migration, verify everything is working:

### 1. Test New Country Creation
Try creating a deal with one of the new countries through your admin interface:
- India (should auto-select INR)
- New Zealand (should auto-select NZD)
- Philippines (should auto-select PHP)
- Vietnam (should auto-select VND)
- Thailand (should auto-select THB)

### 2. Test Filtering
- Check that the new countries appear in filter dropdowns
- Test filtering by each new country
- Verify flag emojis display correctly

### 3. Test Currency Formatting
Create test deals with different amounts to verify currency formatting:
- India: ₹1000M should display as ₹1B
- New Zealand: NZ$500M should display as NZ$500.0M
- Philippines: ₱1500M should display as ₱1.5B
- Vietnam: ₫2000M should display as ₫2B
- Thailand: ฿750M should display as ฿750.0M

## What This Migration Does

1. **Removes Old Constraints**: Drops the existing country and currency constraints
2. **Adds New Constraints**: Creates new constraints that include all 13 countries and 13 currencies
3. **Maintains Data Integrity**: All existing data remains valid
4. **Documents Changes**: Adds a comment to the table with the migration timestamp

## Countries Added
- **India** 🇮🇳 (INR - ₹)
- **New Zealand** 🇳🇿 (NZD - NZ$)
- **Philippines** 🇵🇭 (PHP - ₱)
- **Vietnam** 🇻🇳 (VND - ₫)
- **Thailand** 🇹🇭 (THB - ฿)

## Rollback (If Needed)

If you need to rollback this migration:

```sql
-- Rollback: Remove new countries
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_country_check;
ALTER TABLE deals ADD CONSTRAINT deals_country_check 
CHECK (country IN ('Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives', 'Australia'));

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_local_currency_check;
ALTER TABLE deals ADD CONSTRAINT deals_local_currency_check 
CHECK (local_currency IN ('USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR'));
```

## Support

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify your database permissions
3. Ensure no existing data violates the new constraints
4. Contact support if needed

---

**Status**: Ready to execute
**Impact**: Low risk - only adds new allowed values
**Rollback**: Available if needed