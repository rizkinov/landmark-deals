# 🗄️ Database Files

This folder contains all database-related SQL files for the Landmark Deals application, organized by purpose.

## 📁 Folder Structure

### `/setup/` - Database Setup & Schema
Initial database setup, schema creation, and configuration files:

- **`supabase-schema.sql`** - Main database schema definition
- **`environment-setup.sql`** - Complete environment setup (384 lines)
- **`minimal-setup.sql`** - Quick setup for development (188 lines)
- **`setup-image-storage.sql`** - Image storage configuration (245 lines)
- **`safe-storage-setup.sql`** - Safe storage setup variant (177 lines)

### `/migrations/` - Database Migrations
All database migration files for features and schema changes:

#### Core Migrations
- **`migration.sql`** - Main migration file (112 lines)
- **`migration-step-by-step.sql`** - Step-by-step migration guide (61 lines)
- **`clean-migration.sql`** - Clean migration variant (55 lines)

#### Currency Feature
- **`currency-migration.sql`** - Currency feature migration (154 lines)
- **`currency-migration-step-by-step.sql`** - Step-by-step currency migration (53 lines)
- **`currency-migration-rollback.sql`** - Currency rollback (28 lines)

#### Services & Asset Classes
- **`asset-class-services-migration.sql`** - Asset class services (81 lines)
- **`safe-asset-class-services-migration.sql`** - Safe variant (169 lines)
- **`fixed-services-migration.sql`** - Fixed services migration (99 lines)
- **`simple-services-migration.sql`** - Simplified version (98 lines)

#### Feature Additions
- **`add-location-remarks-columns.sql`** - Location remarks feature (47 lines)
- **`fix-date-sorting.sql`** - Date sorting fix (55 lines)

### `/utilities/` - Database Utilities
Helper scripts and reference files:

- **`quick-reference.sql`** - Quick reference commands (332 lines)
- **`individual-commands.sql`** - Individual command examples (43 lines)
- **`diagnose-database-structure.sql`** - Database diagnostic queries (32 lines)

## 🚀 Getting Started

### **New Setup**
For a fresh database setup, use:
```bash
# Quick development setup
database/setup/minimal-setup.sql

# Full production setup  
database/setup/environment-setup.sql
```

### **Migrations**
Apply migrations in order based on your current database state. See `database/migrations/` folder.

### **Diagnostics**
Use utilities to check database state:
```bash
database/utilities/diagnose-database-structure.sql
```

## 📝 Notes

- All file paths in documentation now reference this `/database/` folder structure
- Original files were moved from root directory for better organization
- See `../SETUP-ORDER.md` for detailed setup instructions with updated paths
- Migration files may have dependencies - review before applying

---

**Total Files**: 20 SQL files organized by purpose  
**Last Updated**: Database organization cleanup 