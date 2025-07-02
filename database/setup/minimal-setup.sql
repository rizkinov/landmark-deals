-- =====================================================
-- MINIMAL SETUP: Quick Start for Image Storage
-- =====================================================
-- Run this first to get basic functionality working

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Create basic security policies
CREATE POLICY "Allow authenticated users to upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Allow public read access to property images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images');

CREATE POLICY "Allow authenticated users to update property images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images');

CREATE POLICY "Allow authenticated users to delete property images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- 3. Create basic cleanup function
CREATE OR REPLACE FUNCTION cleanup_orphaned_images()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
  image_record RECORD;
BEGIN
  -- Find images in storage that are not referenced in deals table
  FOR image_record IN
    SELECT name, id
    FROM storage.objects
    WHERE bucket_id = 'property-images'
    AND NOT EXISTS (
      SELECT 1 FROM deals 
      WHERE property_image_url LIKE '%' || storage.objects.name || '%'
    )
  LOOP
    -- Delete the orphaned image
    DELETE FROM storage.objects 
    WHERE id = image_record.id;
    
    deleted_count := deleted_count + 1;
  END LOOP;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create basic storage usage function
CREATE OR REPLACE FUNCTION get_storage_usage()
RETURNS TABLE(
  total_files INTEGER,
  total_size_mb NUMERIC,
  avg_file_size_kb NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_files,
    ROUND((SUM(COALESCE(metadata->>'size', '0')::BIGINT) / 1024.0 / 1024.0)::NUMERIC, 2) as total_size_mb,
    ROUND((AVG(COALESCE(metadata->>'size', '0')::BIGINT) / 1024.0)::NUMERIC, 2) as avg_file_size_kb
  FROM storage.objects 
  WHERE bucket_id = 'property-images';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create simple health check view
CREATE OR REPLACE VIEW storage_health_check AS
SELECT 
  'Storage Bucket Status' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'property-images') 
    THEN 'HEALTHY' 
    ELSE 'ERROR' 
  END as status,
  'Production bucket exists' as description

UNION ALL

SELECT 
  'Storage Usage' as check_name,
  CASE 
    WHEN (
      SELECT COALESCE(SUM(COALESCE(metadata->>'size', '0')::BIGINT), 0)
      FROM storage.objects 
      WHERE bucket_id = 'property-images'
    ) < 1073741824 -- 1GB limit
    THEN 'HEALTHY'
    ELSE 'WARNING'
  END as status,
  CONCAT(
    'Using ',
    ROUND(
      COALESCE(
        (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
         FROM storage.objects 
         WHERE bucket_id = 'property-images'), 0
      ) / 1024.0 / 1024.0, 2
    ),
    ' MB'
  ) as description

UNION ALL

SELECT 
  'Orphaned Images' as check_name,
  CASE 
    WHEN (
      SELECT COUNT(*) FROM storage.objects o
      WHERE o.bucket_id = 'property-images'
      AND NOT EXISTS (
        SELECT 1 FROM deals d 
        WHERE d.property_image_url LIKE '%' || o.name || '%'
      )
    ) = 0
    THEN 'HEALTHY'
    ELSE 'WARNING'
  END as status,
  CONCAT(
    COALESCE(
      (SELECT COUNT(*) FROM storage.objects o
       WHERE o.bucket_id = 'property-images'
       AND NOT EXISTS (
         SELECT 1 FROM deals d 
         WHERE d.property_image_url LIKE '%' || o.name || '%'
       )), 0
    ),
    ' orphaned images found'
  ) as description;

-- 6. Add basic index for performance
CREATE INDEX IF NOT EXISTS idx_deals_property_image_url 
ON deals(property_image_url) 
WHERE property_image_url IS NOT NULL;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Test the setup
SELECT 'Setup completed successfully!' as message;

-- Check bucket exists
SELECT 
  id,
  name,
  public,
  file_size_limit,
  array_length(allowed_mime_types, 1) as mime_types_count
FROM storage.buckets 
WHERE id = 'property-images';

-- Check policies exist
SELECT 
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%property images%';

-- Test functions work
SELECT 'cleanup_orphaned_images function' as test, cleanup_orphaned_images()::TEXT as result
UNION ALL
SELECT 'get_storage_usage function' as test, CONCAT(total_files, ' files, ', total_size_mb, ' MB') as result
FROM get_storage_usage();

-- Test health check view
SELECT * FROM storage_health_check; 