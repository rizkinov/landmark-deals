-- =====================================================
-- ENVIRONMENT-SPECIFIC CONFIGURATIONS
-- =====================================================

-- =====================================================
-- DEVELOPMENT ENVIRONMENT
-- =====================================================

-- Development bucket with relaxed policies for testing
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images-dev',
  'property-images-dev',
  true,
  10485760, -- 10MB for development
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Development policies (more permissive)
CREATE POLICY "Dev: Allow all operations on property images"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'property-images-dev')
WITH CHECK (bucket_id = 'property-images-dev');

-- =====================================================
-- STAGING ENVIRONMENT
-- =====================================================

-- Staging bucket with production-like settings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images-staging',
  'property-images-staging',
  true,
  5242880, -- 5MB like production
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Staging policies (same as production)
CREATE POLICY "Staging: Allow authenticated users to upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images-staging');

CREATE POLICY "Staging: Allow public read access to property images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images-staging');

-- =====================================================
-- PRODUCTION ENVIRONMENT
-- =====================================================

-- Production bucket (from main setup file)
-- Additional production-specific configurations

-- Enable audit logging for production
CREATE TABLE IF NOT EXISTS image_audit_log (
  id SERIAL PRIMARY KEY,
  action VARCHAR(20) NOT NULL, -- 'upload', 'delete', 'update'
  user_id UUID,
  deal_id INTEGER,
  image_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create audit trigger for production
CREATE OR REPLACE FUNCTION log_image_operations()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO image_audit_log (action, file_name, file_size, timestamp)
    VALUES ('upload', NEW.name, (NEW.metadata->>'size')::BIGINT, NOW());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO image_audit_log (action, file_name, file_size, timestamp)
    VALUES ('delete', OLD.name, (OLD.metadata->>'size')::BIGINT, NOW());
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit trigger only in production
CREATE TRIGGER image_audit_trigger
  AFTER INSERT OR DELETE ON storage.objects
  FOR EACH ROW
  WHEN (NEW.bucket_id = 'property-images' OR OLD.bucket_id = 'property-images')
  EXECUTE FUNCTION log_image_operations();

-- =====================================================
-- MIGRATION SCRIPTS
-- =====================================================

-- Script to migrate from development to staging
CREATE OR REPLACE FUNCTION migrate_dev_to_staging()
RETURNS INTEGER AS $$
DECLARE
  migrated_count INTEGER := 0;
  image_record RECORD;
BEGIN
  FOR image_record IN
    SELECT * FROM storage.objects WHERE bucket_id = 'property-images-dev'
  LOOP
    -- Copy to staging bucket
    INSERT INTO storage.objects (
      bucket_id, name, owner, created_at, updated_at, 
      last_accessed_at, metadata
    ) VALUES (
      'property-images-staging',
      image_record.name,
      image_record.owner,
      image_record.created_at,
      image_record.updated_at,
      image_record.last_accessed_at,
      image_record.metadata
    ) ON CONFLICT (bucket_id, name) DO NOTHING;
    
    migrated_count := migrated_count + 1;
  END LOOP;
  
  RETURN migrated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Script to migrate from staging to production
CREATE OR REPLACE FUNCTION migrate_staging_to_production()
RETURNS INTEGER AS $$
DECLARE
  migrated_count INTEGER := 0;
  image_record RECORD;
BEGIN
  FOR image_record IN
    SELECT * FROM storage.objects WHERE bucket_id = 'property-images-staging'
  LOOP
    -- Copy to production bucket
    INSERT INTO storage.objects (
      bucket_id, name, owner, created_at, updated_at, 
      last_accessed_at, metadata
    ) VALUES (
      'property-images',
      image_record.name,
      image_record.owner,
      image_record.created_at,
      image_record.updated_at,
      image_record.last_accessed_at,
      image_record.metadata
    ) ON CONFLICT (bucket_id, name) DO NOTHING;
    
    migrated_count := migrated_count + 1;
  END LOOP;
  
  RETURN migrated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- MONITORING AND ALERTING
-- =====================================================

-- Create monitoring view for storage health
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
      SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
      FROM storage.objects 
      WHERE bucket_id = 'property-images'
    ) < 1073741824 -- 1GB limit
    THEN 'HEALTHY'
    ELSE 'WARNING'
  END as status,
  CONCAT(
    'Using ',
    ROUND(
      (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
       FROM storage.objects 
       WHERE bucket_id = 'property-images') / 1024.0 / 1024.0, 2
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
    (SELECT COUNT(*) FROM storage.objects o
     WHERE o.bucket_id = 'property-images'
     AND NOT EXISTS (
       SELECT 1 FROM deals d 
       WHERE d.property_image_url LIKE '%' || o.name || '%'
     )),
    ' orphaned images found'
  ) as description;

-- Function to check storage quota usage
CREATE OR REPLACE FUNCTION check_storage_quota()
RETURNS TABLE(
  bucket_name TEXT,
  used_mb NUMERIC,
  limit_mb NUMERIC,
  usage_percentage NUMERIC,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.name as bucket_name,
    ROUND(
      COALESCE(
        (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
         FROM storage.objects 
         WHERE bucket_id = b.id), 0
      ) / 1024.0 / 1024.0, 2
    ) as used_mb,
    ROUND(b.file_size_limit / 1024.0 / 1024.0, 2) as limit_mb,
    ROUND(
      COALESCE(
        (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
         FROM storage.objects 
         WHERE bucket_id = b.id), 0
      ) * 100.0 / (1073741824), 2 -- Assuming 1GB total quota
    ) as usage_percentage,
    CASE 
      WHEN COALESCE(
        (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
         FROM storage.objects 
         WHERE bucket_id = b.id), 0
      ) > 838860800 -- 80% of 1GB
      THEN 'WARNING'
      WHEN COALESCE(
        (SELECT SUM(COALESCE(metadata->>'size', '0')::BIGINT) 
         FROM storage.objects 
         WHERE bucket_id = b.id), 0
      ) > 1073741824 -- 100% of 1GB
      THEN 'CRITICAL'
      ELSE 'OK'
    END as status
  FROM storage.buckets b
  WHERE b.id LIKE 'property-images%';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BACKUP AND RECOVERY
-- =====================================================

-- Create backup metadata table
CREATE TABLE IF NOT EXISTS image_backups (
  id SERIAL PRIMARY KEY,
  backup_date DATE DEFAULT CURRENT_DATE,
  bucket_id TEXT,
  total_files INTEGER,
  total_size_bytes BIGINT,
  backup_location TEXT,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Function to log backup completion
CREATE OR REPLACE FUNCTION log_backup_completion(
  p_bucket_id TEXT,
  p_backup_location TEXT
)
RETURNS INTEGER AS $$
DECLARE
  backup_id INTEGER;
  file_count INTEGER;
  total_size BIGINT;
BEGIN
  -- Get current statistics
  SELECT 
    COUNT(*),
    SUM(COALESCE(metadata->>'size', '0')::BIGINT)
  INTO file_count, total_size
  FROM storage.objects
  WHERE bucket_id = p_bucket_id;
  
  -- Insert backup record
  INSERT INTO image_backups (
    bucket_id, total_files, total_size_bytes, backup_location
  ) VALUES (
    p_bucket_id, file_count, total_size, p_backup_location
  ) RETURNING id INTO backup_id;
  
  RETURN backup_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PERFORMANCE OPTIMIZATION
-- =====================================================

-- Create additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_created 
ON storage.objects(bucket_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_storage_objects_name_pattern 
ON storage.objects(name text_pattern_ops) 
WHERE bucket_id LIKE 'property-images%';

-- Create materialized view for faster statistics
CREATE MATERIALIZED VIEW IF NOT EXISTS storage_stats_cache AS
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(COALESCE(metadata->>'size', '0')::BIGINT) as total_size,
  AVG(COALESCE(metadata->>'size', '0')::BIGINT) as avg_size,
  MIN(created_at) as oldest_file,
  MAX(created_at) as newest_file,
  NOW() as last_updated
FROM storage.objects
WHERE bucket_id LIKE 'property-images%'
GROUP BY bucket_id;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_storage_stats_cache_bucket 
ON storage_stats_cache(bucket_id);

-- Function to refresh stats cache
CREATE OR REPLACE FUNCTION refresh_storage_stats()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY storage_stats_cache;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule stats refresh (if using pg_cron extension)
-- SELECT cron.schedule('refresh-storage-stats', '0 */6 * * *', 'SELECT refresh_storage_stats();');

-- =====================================================
-- TESTING QUERIES
-- =====================================================

-- Test storage health
-- SELECT * FROM storage_health_check;

-- Test storage quota
-- SELECT * FROM check_storage_quota();

-- Test migration functions
-- SELECT migrate_dev_to_staging();
-- SELECT migrate_staging_to_production();

-- Test backup logging
-- SELECT log_backup_completion('property-images', 's3://backups/2024-01-01/');

-- Test stats refresh
-- SELECT refresh_storage_stats();
-- SELECT * FROM storage_stats_cache; 