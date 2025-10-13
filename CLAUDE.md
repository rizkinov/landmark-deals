# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
npm run dev         # Start development server on localhost:3000
npm run build       # Build production application (standalone output)
npm run start       # Start production server
npm run lint        # Run ESLint for code quality
```

### Database Management
```bash
# MCP Database Access (Model Context Protocol)
mcp-inspector --config config/.mcp.json    # Start MCP inspector for database testing at localhost:6274

# Database Health Checks (run in Supabase SQL Editor)
SELECT * FROM storage_health_check;     # Check storage system health
SELECT cleanup_orphaned_images();       # Clean up unused images
SELECT * FROM get_storage_usage();      # Monitor storage usage
```

### No Test Framework
This project currently has no test suite configured. Tests would need to be set up if required.

## Architecture Overview

### Application Structure
- **Framework**: Next.js 15 with App Router and React 19
- **Database**: Supabase PostgreSQL with real-time features
- **Styling**: Tailwind CSS with CBRE design system
- **Components**: Hybrid approach using shadcn/ui base + CBRE-specific components
- **Type Safety**: Full TypeScript with strict mode enabled

### Directory Organization
```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard (requires authentication)
│   ├── deals/             # Main deals listing and filtering
│   └── elements-example/  # Component showcase/documentation
├── src/
│   ├── components/
│   │   ├── admin/         # Admin-only components (DealForm, AdminGuard)
│   │   ├── cbre/          # CBRE-branded UI components
│   │   ├── deals/         # Deal-specific components (DealCard, FilterBar)
│   │   └── ui/            # Base shadcn/ui components
│   ├── hooks/             # Custom React hooks for state management
│   └── lib/               # Core utilities and database operations
├── database/              # SQL scripts organized by purpose
│   ├── setup/            # Initial database setup scripts
│   ├── migrations/       # Database schema changes
│   └── utilities/        # Diagnostic and maintenance scripts
```

### Key Architecture Patterns

#### Database Layer (`src/lib/supabase.ts`)
- Centralized database operations with error handling
- Support for filtered queries with complex search/filter logic
- Real-time subscriptions for live updates
- Audit tracking for admin operations
- Image storage integration

#### Component Architecture
- **CBRE Components**: Branded versions of base UI components in `src/components/cbre/`
- **Deal Components**: Domain-specific components for deal display and management
- **Admin Components**: Authentication-protected admin functionality
- **Design System**: Consistent CBRE branding with custom Tailwind configuration

#### State Management
- Custom hooks pattern for complex state (see `src/hooks/use-filter-state.ts`)
- Local storage integration for filter persistence
- Debounced search and filtering for performance

### Database Schema

#### Core Table: `deals`
```sql
id, property_name, country, deal_price_usd, local_currency, 
local_currency_amount, asset_class, services, deal_date, 
buyer, seller, location, is_confidential, created_at, updated_at
```

#### Key Features
- 13 supported Asia Pacific countries
- 7 asset classes (Office, Retail, Industrial, etc.)
- 3 service types (Property Sales, Capital Advisors, Debt & Structured Finance)
- Confidential pricing support
- Full-text search capabilities
- Audit tracking for admin edits

### Type System (`src/lib/types.ts`)
- Comprehensive TypeScript interfaces for all data structures
- Strict union types for countries, asset classes, and services
- Filter state management types
- Database response types with pagination

### CBRE Design System
- **Colors**: Primary CBRE Green (#003F2D), Accent Green (#17E88F)
- **Typography**: Financier Display for headings, Calibre for body text
- **Styling**: Zero border radius for sharp, professional aesthetic
- **Components**: Custom CBRE-branded versions of all UI components

## Database Management

### Critical Setup Order (MUST follow exactly)
Database components have dependencies that require this exact sequence:

1. **Run `database/setup/minimal-setup.sql` first** - Creates storage bucket and essential functions
2. **Test basic functionality** with health check queries above
3. **Run migrations** from `database/migrations/` if schema changes needed
4. **Optional**: Run `database/setup/setup-image-storage.sql` for advanced features

### Admin Authentication System
- **Simple password-based admin access** (not OAuth)
- **Role-based permissions**: `super_admin` vs `admin`
- **Protected routes**: All `/admin/*` paths require authentication
- **Audit logging**: All admin actions tracked with IP/user agent
- **Setup guide**: See `docs/admin-auth-implementation-guide.md` for complete implementation

### Site Access Password Protection
- **Two-layer security**: Site access password (public) + Admin authentication (admin panel)
- **Site password**: Single shared password protects all public pages (`/`, `/deals`, etc.)
- **24-hour access**: Valid token stored in localStorage after successful authentication
- **Admin bypass**: Authenticated admins automatically bypass site password
- **Admin configurable**: Any admin can change site password via Settings page
- **Initial password**: 'greg' (should be changed in production)
- **Setup guide**: See `docs/SITE-ACCESS-SETUP.md` for complete implementation

### Database Migration Pattern
The project uses a structured migration system:
- Scripts are numbered and must be run in order
- **Country additions**: Use `docs/MIGRATION_GUIDE.md` for adding new Asia Pacific countries
- **Schema changes**: Always test in development first
- **Rollback**: Most migrations include rollback instructions

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional - for advanced storage features
NEXT_PUBLIC_STORAGE_BUCKET=property-images
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
```

## Component Development Guidelines

### CBRE Component Pattern
When creating new UI components:
1. Extend base shadcn/ui component if applicable
2. Apply CBRE design tokens from tailwind.config.js
3. Use CBRE color palette (cbre-green, accent-green, etc.)
4. Follow zero border-radius convention
5. Export from `src/components/cbre/index.ts`

### Deal-Related Components
- Use `Deal` type from `src/lib/types.ts`
- Include proper filtering and search integration
- Support both USD and local currency display
- Handle confidential pricing appropriately

### Admin Components
- Wrap with `AdminGuard` for authentication protection
- Use `DealForm` component for creating/editing deals
- Include proper error handling and validation
- Support image upload via Supabase storage

## Common Development Patterns

### Filtering System
The application uses a sophisticated filtering system:
- Multi-dimensional filters (country, asset class, price, date, etc.)
- Real-time search with debouncing
- URL state persistence
- Filter preset saving

### Image Handling
- Upload to Supabase storage bucket `property-images`
- Automatic optimization and URL generation
- Fallback to placeholder images
- Cleanup of orphaned images

### Admin Authentication
- Simple password-based admin access
- Protected routes using `AdminGuard`
- Audit logging for admin actions
- Session management with local storage

## Configuration Details

### Next.js Configuration
- Standalone output for deployment
- Build error ignoring during development (for rapid iteration)
- React strict mode enabled

### ESLint Configuration
- Next.js and TypeScript rules
- Warnings for unused variables and any types
- Relaxed rules for unescaped entities and img elements

### Tailwind Configuration
- Custom CBRE color palette
- Zero border radius globally
- Custom font family variables
- Comprehensive color mappings for all component states

## Deployment & Production Considerations

### Build Configuration
- **Standalone output**: Configured for Docker/container deployment
- **Build error tolerance**: ESLint and TypeScript errors ignored during build for rapid iteration
- **Static optimization**: Next.js automatically optimizes static assets and images

### Deployment Checklist (From docs/deployment-checklist.md)
Critical production steps:
1. **Supabase setup**: Run all SQL scripts in correct order
2. **Environment variables**: Configure all required vars in deployment platform
3. **Image storage**: Enable production upload in `DealForm.tsx`
4. **Security testing**: Verify RLS policies and admin authentication
5. **Performance testing**: Test with large files and concurrent users

### Security Considerations (From docs/SECURITY.md)
- **Never commit**: Plain text passwords, API keys, private keys, tokens
- **Admin credentials**: Stored securely in Supabase Auth, not in code
- **RLS policies**: All database access protected with Row Level Security
- **Audit logging**: All admin actions logged with IP and user agent
- **Environment separation**: Different credentials for dev/staging/production

### Image Storage Production Setup
1. Uncomment `uploadPropertyImage` import in `DealForm.tsx`
2. Replace development code with production upload in `processFile` function  
3. Configure storage policies in Supabase for 5MB max file size
4. Set up automatic cleanup of orphaned images

### Known Deployment Issues
- **Database dependency order**: Migrations will fail if not run in exact sequence
- **RLS recursion**: Fixed with specific SQL in `database/setup/fix-rls-recursion.sql`
- **Storage permissions**: Requires public bucket with specific RLS policies