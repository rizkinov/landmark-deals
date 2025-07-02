# 🚀 Production Deployment Checklist

## 📋 Pre-Deployment Setup

### 1. Supabase Configuration

#### ✅ Storage Bucket Setup
- [ ] Run `setup-image-storage.sql` in Supabase SQL Editor
- [ ] Verify bucket `property-images` is created
- [ ] Confirm public access is enabled
- [ ] Check file size limit (5MB) and MIME types

#### ✅ Security Policies
- [ ] Verify RLS policies are active
- [ ] Test authenticated user upload permissions
- [ ] Test public read access
- [ ] Confirm delete/update permissions work correctly

#### ✅ Environment Variables
Add to your `.env.local` and production environment:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Storage Configuration
NEXT_PUBLIC_STORAGE_BUCKET=property-images
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
```

### 2. Code Updates

#### ✅ Enable Production Upload
In `src/components/admin/DealForm.tsx`:
- [ ] Uncomment the import: `import { uploadPropertyImage } from '../../lib/storage'`
- [ ] Replace development code with production code in `processFile` function
- [ ] Test file upload functionality

#### ✅ Update Storage Helper
In `src/lib/storage.ts`:
- [ ] Verify Supabase client configuration
- [ ] Test `uploadPropertyImage` function
- [ ] Test `deletePropertyImage` function
- [ ] Add error handling and logging

### 3. Database Setup

#### ✅ Run SQL Scripts
Execute in order:
1. [ ] `setup-image-storage.sql` - Main storage setup
2. [ ] `environment-setup.sql` - Environment-specific configs
3. [ ] Verify all functions and triggers are created

#### ✅ Test Database Functions
```sql
-- Test cleanup function
SELECT cleanup_orphaned_images();

-- Test storage usage
SELECT * FROM get_storage_usage();

-- Test health check
SELECT * FROM storage_health_check;
```

## 🧪 Testing Phase

### 1. Development Testing
- [ ] Test file upload with various image formats (JPG, PNG, GIF, WebP)
- [ ] Test file size validation (reject files > 5MB)
- [ ] Test drag and drop functionality
- [ ] Test URL input fallback
- [ ] Test image preview functionality
- [ ] Test remove image functionality

### 2. Integration Testing
- [ ] Test deal creation with uploaded image
- [ ] Test deal editing with image replacement
- [ ] Test deal deletion (verify image cleanup)
- [ ] Test form validation with images
- [ ] Test error handling for failed uploads

### 3. Performance Testing
- [ ] Test upload speed with large files (up to 5MB)
- [ ] Test concurrent uploads
- [ ] Test storage quota limits
- [ ] Monitor database performance with image operations

## 🔒 Security Testing

### 1. Authentication Tests
- [ ] Verify unauthenticated users cannot upload
- [ ] Test file type restrictions
- [ ] Test file size limits
- [ ] Verify malicious file rejection

### 2. Storage Security
- [ ] Test RLS policies work correctly
- [ ] Verify public URLs are accessible
- [ ] Test image deletion permissions
- [ ] Check for directory traversal vulnerabilities

## 📊 Monitoring Setup

### 1. Error Tracking
- [ ] Set up error logging for upload failures
- [ ] Monitor storage quota usage
- [ ] Track orphaned image cleanup
- [ ] Log audit trail for image operations

### 2. Performance Monitoring
- [ ] Monitor upload response times
- [ ] Track storage usage growth
- [ ] Monitor database query performance
- [ ] Set up alerts for quota limits

## 🚀 Deployment Steps

### 1. Staging Deployment
- [ ] Deploy to staging environment
- [ ] Run environment-specific SQL for staging
- [ ] Test all functionality in staging
- [ ] Perform load testing
- [ ] Verify monitoring and logging

### 2. Production Deployment
- [ ] Deploy code to production
- [ ] Run production SQL scripts
- [ ] Verify environment variables
- [ ] Test critical paths
- [ ] Monitor for errors

### 3. Post-Deployment Verification
- [ ] Test image upload from production
- [ ] Verify images display correctly
- [ ] Check storage bucket accessibility
- [ ] Confirm cleanup functions work
- [ ] Validate monitoring alerts

## 🔧 Configuration Files

### Next.js Configuration
Add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-supabase-project.supabase.co',
      // Add other domains as needed
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
}

module.exports = nextConfig
```

### TypeScript Configuration
Ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🛠 Maintenance Tasks

### Daily
- [ ] Check storage usage
- [ ] Monitor error logs
- [ ] Verify backup completion

### Weekly
- [ ] Run orphaned image cleanup
- [ ] Review storage health check
- [ ] Analyze upload patterns

### Monthly
- [ ] Review storage quota usage
- [ ] Update security policies if needed
- [ ] Performance optimization review
- [ ] Backup verification

## 🚨 Rollback Plan

### If Issues Occur
1. [ ] Disable upload functionality in UI
2. [ ] Revert to previous deployment
3. [ ] Check database integrity
4. [ ] Verify existing images still work
5. [ ] Investigate and fix issues
6. [ ] Re-deploy with fixes

### Emergency Contacts
- [ ] Database Administrator: ___________
- [ ] DevOps Engineer: ___________
- [ ] Product Owner: ___________

## 📝 Documentation Updates

### Post-Deployment
- [ ] Update API documentation
- [ ] Update user guides
- [ ] Document new environment variables
- [ ] Update troubleshooting guides
- [ ] Record lessons learned

---

## ✅ Sign-off

- [ ] **Developer**: Tested and verified ___________
- [ ] **QA**: Tested and approved ___________
- [ ] **DevOps**: Infrastructure ready ___________
- [ ] **Product**: Feature approved ___________
- [ ] **Security**: Security review passed ___________

**Deployment Date**: ___________
**Deployed By**: ___________
**Production URL**: ___________ 