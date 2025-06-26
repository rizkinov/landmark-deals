-- =====================================================
-- QUICK REFERENCE: Common Image Storage Operations
-- =====================================================

-- =====================================================
-- SETUP COMMANDS (Run Once)
-- =====================================================

-- 1. Create production storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
);

-- 2. Enable RLS and create basic policies
CREATE POLICY "Allow authenticated users to upload property images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Allow public read access to property images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'property-images');

-- =====================================================
-- DAILY MONITORING QUERIES
-- =====================================================

-- Check storage health
SELECT * FROM storage_health_check;

-- Check storage usage
SELECT * FROM get_storage_usage();

-- Check recent uploads (last 24 hours)
SELECT 
  name,
  created_at,
  ROUND((metadata->>'size')::BIGINT / 1024.0, 2) as size_kb
FROM storage.objects 
WHERE bucket_id = 'property-images'
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Check deals without images or with broken images
SELECT 
  id,
  property_name,
  CASE 
    WHEN property_image_url IS NULL THEN 'No image'
    WHEN property_image_url = '/default-photo.jpeg' THEN 'Default image'
    ELSE 'Custom image'
  END as image_status
FROM deals
WHERE property_image_url IS NULL 
   OR property_image_url = '/default-photo.jpeg';

-- =====================================================
-- MAINTENANCE QUERIES
-- =====================================================

-- Find orphaned images (not referenced by any deal)
SELECT 
  o.name,
  o.created_at,
  ROUND((o.metadata->>'size')::BIGINT / 1024.0, 2) as size_kb
FROM storage.objects o
WHERE o.bucket_id = 'property-images'
AND NOT EXISTS (
  SELECT 1 FROM deals d 
  WHERE d.property_image_url LIKE '%' || o.name || '%'
)
ORDER BY o.created_at DESC;

-- Clean up orphaned images
SELECT cleanup_orphaned_images();

-- Find deals with missing images (referenced but not in storage)
SELECT 
  d.id,
  d.property_name,
  d.property_image_url
FROM deals d
WHERE d.property_image_url IS NOT NULL
AND d.property_image_url LIKE '%/storage/v1/object/public/property-images/%'
AND NOT EXISTS (
  SELECT 1 FROM storage.objects o
  WHERE o.bucket_id = 'property-images'
  AND d.property_image_url LIKE '%' || o.name || '%'
);

-- =====================================================
-- PERFORMANCE QUERIES
-- =====================================================

-- Storage statistics by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as files_uploaded,
  ROUND(SUM((metadata->>'size')::BIGINT) / 1024.0 / 1024.0, 2) as total_mb
FROM storage.objects
WHERE bucket_id = 'property-images'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Largest files in storage
SELECT 
  name,
  created_at,
  ROUND((metadata->>'size')::BIGINT / 1024.0 / 1024.0, 2) as size_mb
FROM storage.objects
WHERE bucket_id = 'property-images'
ORDER BY (metadata->>'size')::BIGINT DESC
LIMIT 10;

-- Most recent uploads
SELECT 
  name,
  created_at,
  ROUND((metadata->>'size')::BIGINT / 1024.0, 2) as size_kb
FROM storage.objects
WHERE bucket_id = 'property-images'
ORDER BY created_at DESC
LIMIT 20;

-- =====================================================
-- BACKUP QUERIES
-- =====================================================

-- Backup all image references
SELECT 
  d.id as deal_id,
  d.property_name,
  d.property_image_url,
  d.created_at as deal_created,
  NOW() as backup_timestamp
FROM deals d
WHERE d.property_image_url IS NOT NULL
ORDER BY d.id;

-- Log backup completion
SELECT log_backup_completion('property-images', 's3://your-backup-bucket/2024-01-01/');

-- =====================================================
-- TROUBLESHOOTING QUERIES
-- =====================================================

-- Check bucket configuration
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id LIKE 'property-images%';

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage';

-- Check recent errors (if audit logging is enabled)
SELECT 
  action,
  file_name,
  file_size,
  timestamp,
  user_id
FROM image_audit_log
WHERE timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- =====================================================
-- EMERGENCY PROCEDURES
-- =====================================================

-- Disable uploads (remove INSERT policy)
DROP POLICY IF EXISTS "Allow authenticated users to upload property images" ON storage.objects;

-- Re-enable uploads
CREATE POLICY "Allow authenticated users to upload property images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Reset all deals to default image (EMERGENCY ONLY)
-- UPDATE deals SET property_image_url = '/default-photo.jpeg';

-- Check storage object integrity
SELECT 
  COUNT(*) as total_objects,
  COUNT(CASE WHEN metadata IS NOT NULL THEN 1 END) as objects_with_metadata,
  COUNT(CASE WHEN (metadata->>'size')::BIGINT > 0 THEN 1 END) as objects_with_size
FROM storage.objects
WHERE bucket_id = 'property-images';

-- =====================================================
-- USEFUL UTILITY QUERIES
-- =====================================================

-- Convert bytes to human readable format
CREATE OR REPLACE FUNCTION format_bytes(bytes BIGINT)
RETURNS TEXT AS $$
BEGIN
  IF bytes < 1024 THEN
    RETURN bytes || ' B';
  ELSIF bytes < 1024 * 1024 THEN
    RETURN ROUND(bytes / 1024.0, 1) || ' KB';
  ELSIF bytes < 1024 * 1024 * 1024 THEN
    RETURN ROUND(bytes / 1024.0 / 1024.0, 1) || ' MB';
  ELSE
    RETURN ROUND(bytes / 1024.0 / 1024.0 / 1024.0, 1) || ' GB';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT format_bytes((metadata->>'size')::BIGINT) FROM storage.objects;

-- Get file extension from storage object name
CREATE OR REPLACE FUNCTION get_file_extension(filename TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(SUBSTRING(filename FROM '\.([^.]*)$'));
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT get_file_extension(name) FROM storage.objects;

-- =====================================================
-- SCHEDULED MAINTENANCE (if using pg_cron)
-- =====================================================

-- Schedule daily cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-orphaned-images', '0 2 * * *', 'SELECT cleanup_orphaned_images();');

-- Schedule weekly stats refresh
-- SELECT cron.schedule('refresh-storage-stats', '0 3 * * 0', 'SELECT refresh_storage_stats();');

-- View scheduled jobs
-- SELECT * FROM cron.job;

-- =====================================================
-- QUICK HEALTH CHECK
-- =====================================================

-- Run this query to get a quick overview
SELECT 
  'Storage Health' as category,
  'Bucket Exists' as check_name,
  CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'property-images') 
       THEN '✅ OK' ELSE '❌ FAIL' END as status

UNION ALL

SELECT 
  'Storage Health',
  'Total Files',
  CONCAT('📁 ', COUNT(*), ' files') as status
FROM storage.objects WHERE bucket_id = 'property-images'

UNION ALL

SELECT 
  'Storage Health',
  'Total Size', 
  CONCAT('💾 ', 
    ROUND(SUM(COALESCE(metadata->>'size', '0')::BIGINT) / 1024.0 / 1024.0, 1), 
    ' MB'
  ) as status
FROM storage.objects WHERE bucket_id = 'property-images'

UNION ALL

SELECT 
  'Data Integrity',
  'Deals with Images',
  CONCAT('🖼️ ', COUNT(*), ' deals') as status
FROM deals WHERE property_image_url IS NOT NULL

UNION ALL

SELECT 
  'Data Integrity',
  'Orphaned Images',
  CONCAT(
    CASE WHEN COUNT(*) = 0 THEN '✅ ' ELSE '⚠️ ' END,
    COUNT(*), ' orphaned'
  ) as status
FROM storage.objects o
WHERE o.bucket_id = 'property-images'
AND NOT EXISTS (
  SELECT 1 FROM deals d 
  WHERE d.property_image_url LIKE '%' || o.name || '%'
);

-- =====================================================
-- NOTES
-- =====================================================

/*
IMPORTANT REMINDERS:

1. Always backup before running maintenance queries
2. Test queries in staging environment first
3. Monitor storage usage regularly
4. Clean up orphaned images weekly
5. Check for broken image references monthly
6. Update file size limits based on usage patterns
7. Review and update security policies quarterly

COMMON FILE PATHS:
- Default image: /default-photo.jpeg
- Uploaded images: https://xxx.supabase.co/storage/v1/object/public/property-images/filename.jpg
- Local development: blob:http://localhost:3000/...

SUPPORT CONTACTS:
- Supabase Support: https://supabase.com/support
- Database Issues: Check logs in Supabase Dashboard
- Storage Issues: Check Storage tab in Supabase Dashboard
*/ 