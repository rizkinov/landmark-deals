-- Migration: Add Capital Advisors specific fields to deals table
-- Date: 2025-09-08
-- Description: Extends deals table to support Capital Advisors project functionality

-- Add new columns for Capital Advisors projects
ALTER TABLE deals 
ADD COLUMN project_title TEXT,
ADD COLUMN project_subtitle TEXT,
ADD COLUMN content_html TEXT,
ADD COLUMN gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN slug TEXT;

-- Create unique index on slug for URL routing
CREATE UNIQUE INDEX idx_deals_slug ON deals(slug) WHERE slug IS NOT NULL;

-- Create function to generate slug from project title
CREATE OR REPLACE FUNCTION generate_slug_from_title(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove special chars
  base_slug := regexp_replace(
    regexp_replace(
      lower(trim(title)),
      '[^a-z0-9\s-]', '', 'g'
    ),
    '\s+', '-', 'g'
  );
  
  -- Remove multiple consecutive hyphens
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  
  -- Remove leading/trailing hyphens
  base_slug := trim(base_slug, '-');
  
  -- Ensure slug is not empty
  IF base_slug = '' THEN
    base_slug := 'project';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness and append counter if needed
  WHILE EXISTS (SELECT 1 FROM deals WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug when project_title is set
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate slug for Capital Advisors deals with project_title
  IF NEW.services = 'Capital Advisors' AND NEW.project_title IS NOT NULL AND (NEW.slug IS NULL OR OLD.project_title != NEW.project_title) THEN
    NEW.slug := generate_slug_from_title(NEW.project_title);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_generate_slug
  BEFORE INSERT OR UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_slug();

-- Update storage policies to allow multiple images for galleries
-- (This assumes the property-images bucket exists from minimal-setup.sql)

-- Add comment for tracking
COMMENT ON COLUMN deals.project_title IS 'Main title for Capital Advisors projects';
COMMENT ON COLUMN deals.project_subtitle IS 'Subtitle for Capital Advisors projects';
COMMENT ON COLUMN deals.content_html IS 'Rich text content as HTML for Capital Advisors projects';
COMMENT ON COLUMN deals.gallery_images IS 'Array of image URLs for project galleries';
COMMENT ON COLUMN deals.slug IS 'URL-friendly identifier for Capital Advisors projects';

-- Add index for performance on Capital Advisors queries
CREATE INDEX idx_deals_services_capital_advisors ON deals(services) WHERE services = 'Capital Advisors';

-- Rollback instructions (if needed):
-- DROP TRIGGER IF EXISTS trigger_auto_generate_slug ON deals;
-- DROP FUNCTION IF EXISTS auto_generate_slug();
-- DROP FUNCTION IF EXISTS generate_slug_from_title(TEXT);
-- DROP INDEX IF EXISTS idx_deals_slug;
-- DROP INDEX IF EXISTS idx_deals_services_capital_advisors;
-- ALTER TABLE deals DROP COLUMN IF EXISTS project_title, DROP COLUMN IF EXISTS project_subtitle, DROP COLUMN IF EXISTS content_html, DROP COLUMN IF EXISTS gallery_images, DROP COLUMN IF EXISTS slug;