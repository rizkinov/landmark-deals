-- CBRE Capital Market Deals: Database Structure Diagnostic
-- This script checks the current structure of the deals table

-- Check what columns exist in the deals table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'deals' 
ORDER BY ordinal_position;

-- Check what constraints exist
SELECT 
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'deals';

-- Check what indexes exist
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'deals';

-- Show sample data to understand current structure
SELECT * FROM deals LIMIT 5;

-- Count total records
SELECT 'Total deals:' as info, COUNT(*) as count FROM deals; 