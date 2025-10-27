-- Migration: Add custom_asset_class field for D&SF deals
-- Purpose: Allow custom asset class input while maintaining constraint for standard deals
-- Date: 2025-10-27

-- Add custom_asset_class column
ALTER TABLE deals
ADD COLUMN custom_asset_class TEXT;

-- Add comment for documentation
COMMENT ON COLUMN deals.custom_asset_class IS 'Custom asset class for D&SF deals when standard options do not apply';

-- Update the constraint to allow NULL for asset_class (will be NULL when custom_asset_class is used)
ALTER TABLE deals
DROP CONSTRAINT IF EXISTS deals_asset_class_check;

ALTER TABLE deals
ADD CONSTRAINT deals_asset_class_check
CHECK (
  asset_class IS NULL OR
  asset_class IN (
    'Office',
    'Hotels & Hospitality',
    'Industrial & Logistics',
    'Retail',
    'Residential / Multifamily',
    'Land',
    'Data Centres'
  )
);

-- Add validation: at least one of asset_class or custom_asset_class must be set
ALTER TABLE deals
ADD CONSTRAINT deals_asset_class_required
CHECK (
  asset_class IS NOT NULL OR
  custom_asset_class IS NOT NULL
);
