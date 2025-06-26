-- =====================================================
-- PRODUCTION SETUP: Image Storage for Landmark Deals
-- =====================================================

-- 1. Create Storage Bucket for Property Images
-- Run this in Supabase SQL Editor or Dashboard
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
);

-- 2. Set up Row Level Security (RLS) Policies for Storage
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Allow public read access to property images
CREATE POLICY "Allow public read access to property images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Allow authenticated users to update property images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images');

-- Allow authenticated users to delete property images
CREATE POLICY "Allow authenticated users to delete property images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- 3. Create function to clean up orphaned images
-- This function helps remove images that are no longer referenced by any deals
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

-- 4. Create trigger to automatically clean up images when deals are deleted
CREATE OR REPLACE FUNCTION extract_filename_from_url(url TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Extract filename from Supabase storage URL
  -- Example: https://xxx.supabase.co/storage/v1/object/public/property-images/filename.jpg
  RETURN CASE 
    WHEN url LIKE '%/storage/v1/object/public/property-images/%' THEN
      SUBSTRING(url FROM '.*/property-images/(.+)$')
    ELSE
      NULL
  END;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION cleanup_deal_image()
RETURNS TRIGGER AS $$
DECLARE
  filename TEXT;
BEGIN
  -- Extract filename from the deleted deal's image URL
  filename := extract_filename_from_url(OLD.property_image_url);
  
  -- If it's a storage URL and not the default image, delete it
  IF filename IS NOT NULL AND filename != 'default-photo.jpeg' THEN
    DELETE FROM storage.objects 
    WHERE bucket_id = 'property-images' 
    AND name = 'property-images/' || filename;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS cleanup_deal_image_trigger ON deals;
CREATE TRIGGER cleanup_deal_image_trigger
  AFTER DELETE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_deal_image();

-- 5. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_property_image_url 
ON deals(property_image_url) 
WHERE property_image_url IS NOT NULL;

-- 6. Create view for image usage statistics
CREATE OR REPLACE VIEW image_usage_stats AS
SELECT 
  'Total Images in Storage' as metric,
  COUNT(*) as count
FROM storage.objects 
WHERE bucket_id = 'property-images'

UNION ALL

SELECT 
  'Images Used by Deals' as metric,
  COUNT(DISTINCT property_image_url) as count
FROM deals 
WHERE property_image_url IS NOT NULL
AND property_image_url LIKE '%/storage/v1/object/public/property-images/%'

UNION ALL

SELECT 
  'Default Images Used' as metric,
  COUNT(*) as count
FROM deals 
WHERE property_image_url = '/default-photo.jpeg'
OR property_image_url LIKE '%default-photo.jpeg'

UNION ALL

SELECT 
  'External Images Used' as metric,
  COUNT(*) as count
FROM deals 
WHERE property_image_url IS NOT NULL
AND property_image_url NOT LIKE '%/storage/v1/object/public/property-images/%'
AND property_image_url != '/default-photo.jpeg'
AND property_image_url NOT LIKE '%default-photo.jpeg';

-- 7. Create function to get storage usage
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

-- 8. Create backup function for image metadata
CREATE OR REPLACE FUNCTION backup_image_references()
RETURNS TABLE(
  deal_id INTEGER,
  property_name TEXT,
  image_url TEXT,
  backup_date TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id as deal_id,
    d.property_name,
    d.property_image_url as image_url,
    NOW() as backup_date
  FROM deals d
  WHERE d.property_image_url IS NOT NULL
  ORDER BY d.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- MAINTENANCE QUERIES
-- =====================================================

-- Query to find orphaned images
SELECT 
  o.name,
  o.created_at,
  o.metadata->>'size' as size_bytes
FROM storage.objects o
WHERE o.bucket_id = 'property-images'
AND NOT EXISTS (
  SELECT 1 FROM deals d 
  WHERE d.property_image_url LIKE '%' || o.name || '%'
);

-- Query to find deals with missing images
SELECT 
  id,
  property_name,
  property_image_url
FROM deals
WHERE property_image_url IS NOT NULL
AND property_image_url LIKE '%/storage/v1/object/public/property-images/%'
AND NOT EXISTS (
  SELECT 1 FROM storage.objects o
  WHERE o.bucket_id = 'property-images'
  AND deals.property_image_url LIKE '%' || o.name || '%'
);

-- Clean up orphaned images (run manually when needed)
-- SELECT cleanup_orphaned_images();

-- Get storage usage statistics
-- SELECT * FROM get_storage_usage();

-- Get image usage statistics
-- SELECT * FROM image_usage_stats;

-- Backup image references
-- SELECT * FROM backup_image_references();

-- =====================================================
-- SECURITY NOTES
-- =====================================================

/*
1. The bucket is set to public read access for displaying images
2. Only authenticated users can upload/modify/delete images
3. File size is limited to 5MB
4. Only image MIME types are allowed
5. Automatic cleanup prevents orphaned files
6. Triggers ensure data consistency
*/ 