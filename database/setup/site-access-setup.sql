-- Site Access Password Protection Setup
-- This creates a settings table for storing the site-wide access password

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read settings (needed for password verification)
CREATE POLICY "Public can read site settings" ON site_settings
FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update settings
CREATE POLICY "Admins can insert site settings" ON site_settings
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update site settings" ON site_settings
FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to verify site access password
CREATE OR REPLACE FUNCTION verify_site_password(input_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_password TEXT;
BEGIN
  -- Get the stored hashed password
  SELECT setting_value INTO stored_password
  FROM site_settings
  WHERE setting_key = 'site_access_password'
  LIMIT 1;

  -- If no password is set, return false
  IF stored_password IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Compare the input password with stored password using crypt
  RETURN stored_password = crypt(input_password, stored_password);
END;
$$;

-- Function to update site access password
CREATE OR REPLACE FUNCTION update_site_password(new_password TEXT, admin_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  hashed_password TEXT;
BEGIN
  -- Hash the password using bcrypt (gen_salt generates a salt)
  hashed_password := crypt(new_password, gen_salt('bf'));

  -- Insert or update the password
  INSERT INTO site_settings (setting_key, setting_value, updated_by)
  VALUES ('site_access_password', hashed_password, admin_user_id)
  ON CONFLICT (setting_key)
  DO UPDATE SET
    setting_value = hashed_password,
    updated_by = admin_user_id,
    updated_at = NOW();

  RETURN TRUE;
END;
$$;

-- Insert initial password 'greg' (hashed)
-- Using the function to ensure proper hashing
SELECT update_site_password('greg', NULL);

-- Update the trigger for updated_at
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_site_settings_updated_at();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON site_settings TO authenticated;
GRANT EXECUTE ON FUNCTION verify_site_password(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_site_password(TEXT, UUID) TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Site access password protection setup complete. Initial password: greg';
END $$;
