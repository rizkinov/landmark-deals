# 📋 Setup Guide - Image Storage & Deployment

## ⚠️ **IMPORTANT: Run in This Exact Order**

The error you encountered happens because the views and functions depend on each other. Follow this exact sequence:

---

## **Step 1: Quick Start (Run This First)**

Copy and paste the entire contents of `database/setup/minimal-setup.sql` into your Supabase SQL Editor and run it.

This will create:
- ✅ Storage bucket `property-images`
- ✅ Basic security policies
- ✅ Essential functions (`cleanup_orphaned_images`, `get_storage_usage`)
- ✅ Health check view (`storage_health_check`)
- ✅ Performance index

**Expected Result:** You should see "Setup completed successfully!" and verification data.

---

## **Step 2: Test Basic Functionality**

Run these queries to verify everything works:

```sql
-- Should show HEALTHY status for all checks
SELECT * FROM storage_health_check;

-- Should show 0 files, 0 MB initially
SELECT * FROM get_storage_usage();

-- Should return 0 (no orphaned images yet)
SELECT cleanup_orphaned_images();
```

---

## **Step 3: Enable Production Upload in Code**

Now update your React component:

### In `src/components/admin/DealForm.tsx`:

1. **Uncomment the import:**
```typescript
import { uploadPropertyImage } from '../../lib/storage'
```

2. **Replace the development code in `processFile` function:**
```typescript
// Replace this:
const imageUrl = URL.createObjectURL(file)
handleInputChange('property_image_url', imageUrl)

// With this:
const uploadedUrl = await uploadPropertyImage(file)
handleInputChange('property_image_url', uploadedUrl)
```

---

## **Step 4: Test Upload Functionality**

1. Start your development server:
```bash
npm run dev
```

2. Go to `/admin/deals/new`
3. Try uploading an image
4. Verify it appears in the preview
5. Save the deal and check if the image displays correctly

---

## **Step 5: Advanced Features (Optional)**

If you want the full production setup with monitoring, audit logs, and advanced features, run the other SQL files **after** the minimal setup:

### Run in this order:
1. ✅ `minimal-setup.sql` (already done)
2. `setup-image-storage.sql` (advanced features)
3. `environment-setup.sql` (environment-specific configs)

---

## **Common Issues & Solutions**

### ❌ "relation does not exist" errors
**Cause:** Running queries before creating the required views/functions
**Solution:** Run `minimal-setup.sql` first

### ❌ "policy already exists" errors
**Cause:** Running setup scripts multiple times
**Solution:** The scripts use `CREATE OR REPLACE` and `ON CONFLICT` to handle this

### ❌ Upload fails with permission errors
**Cause:** RLS policies not properly configured
**Solution:** Verify policies exist:
```sql
SELECT policyname FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';
```

### ❌ Images don't display
**Cause:** Bucket not public or wrong URL format
**Solution:** Check bucket configuration:
```sql
SELECT id, name, public FROM storage.buckets 
WHERE id = 'property-images';
```

---

## **Quick Health Check**

Run this anytime to check if everything is working:

```sql
-- Quick overview
SELECT 
  'Bucket Status' as check_type,
  CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'property-images') 
       THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
       
UNION ALL

SELECT 
  'Policy Count' as check_type,
  CONCAT('📋 ', COUNT(*), ' policies') as status
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%property images%'

UNION ALL

SELECT 
  'Function Status' as check_type,
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'cleanup_orphaned_images')
       THEN '✅ READY' ELSE '❌ MISSING' END as status
       
UNION ALL

SELECT 
  'View Status' as check_type,
  CASE WHEN EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'storage_health_check')
       THEN '✅ READY' ELSE '❌ MISSING' END as status;
```

---

## **Next Steps After Setup**

1. **Test thoroughly** in development
2. **Deploy to staging** and test again
3. **Run the same setup** in production
4. **Monitor storage usage** regularly
5. **Set up automated cleanup** (weekly)

---

## **Emergency Reset**

If something goes wrong, you can reset everything:

```sql
-- Remove all policies
DROP POLICY IF EXISTS "Allow authenticated users to upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to property images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update property images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete property images" ON storage.objects;

-- Remove functions and views
DROP VIEW IF EXISTS storage_health_check;
DROP FUNCTION IF EXISTS cleanup_orphaned_images();
DROP FUNCTION IF EXISTS get_storage_usage();

-- Remove bucket (WARNING: This deletes all uploaded images!)
DELETE FROM storage.buckets WHERE id = 'property-images';

-- Then re-run database/setup/minimal-setup.sql
```

---

## **Support**

If you encounter issues:

1. **Check Supabase logs** in the dashboard
2. **Verify your environment variables** are correct
3. **Test with a simple image** (small JPEG file)
4. **Check browser console** for JavaScript errors
5. **Verify Supabase project** has storage enabled

**Remember:** Always test in development before deploying to production! 