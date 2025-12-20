-- Confidential Access Password Setup
-- This adds the confidential access password to the existing site_settings table

-- Insert initial confidential password 'THRIVEAPAC###' (hashed)
-- Using the same update_site_password function pattern
INSERT INTO site_settings (setting_key, setting_value, updated_by)
VALUES (
  'confidential_access_password',
  crypt('THRIVEAPAC###', gen_salt('bf')),
  NULL
)
ON CONFLICT (setting_key) DO NOTHING;

-- Function to verify confidential access password
CREATE OR REPLACE FUNCTION verify_confidential_password(input_password TEXT)
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
  WHERE setting_key = 'confidential_access_password'
  LIMIT 1;

  -- If no password is set, return false
  IF stored_password IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Compare the input password with stored password using crypt
  RETURN stored_password = crypt(input_password, stored_password);
END;
$$;

-- Function to update confidential access password
CREATE OR REPLACE FUNCTION update_confidential_password(new_password TEXT, admin_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  hashed_password TEXT;
BEGIN
  -- Hash the password using bcrypt
  hashed_password := crypt(new_password, gen_salt('bf'));

  -- Insert or update the password
  INSERT INTO site_settings (setting_key, setting_value, updated_by)
  VALUES ('confidential_access_password', hashed_password, admin_user_id)
  ON CONFLICT (setting_key)
  DO UPDATE SET
    setting_value = hashed_password,
    updated_by = admin_user_id,
    updated_at = NOW();

  RETURN TRUE;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION verify_confidential_password(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_confidential_password(TEXT, UUID) TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Confidential access password setup complete. Initial password: THRIVEAPAC###';
END $$;
