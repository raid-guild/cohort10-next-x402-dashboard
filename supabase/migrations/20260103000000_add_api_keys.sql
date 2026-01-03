-- Create api_keys table for multiple keys per organization
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT, -- Optional name/label for the key (e.g., "Production Server")
  key_prefix TEXT NOT NULL, -- Store prefix for display (e.g., "rg_live_")
  key_hash TEXT NOT NULL, -- Bcrypt hash of the full key
  expires_at TIMESTAMPTZ NOT NULL,
  environment TEXT NOT NULL DEFAULT 'live' CHECK (environment IN ('live', 'test')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ, -- Track when key was last used
  is_active BOOLEAN DEFAULT true -- Allow soft deletion/deactivation
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_organization_id ON public.api_keys(organization_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON public.api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON public.api_keys(is_active) WHERE is_active = true;

-- RLS policies for api_keys table
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (API routes handle auth via cookies)
CREATE POLICY "Allow public read of api_keys"
  ON public.api_keys
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert of api_keys"
  ON public.api_keys
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update of api_keys"
  ON public.api_keys
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete of api_keys"
  ON public.api_keys
  FOR DELETE
  USING (true);

-- Remove old API key columns from organizations table if they exist
-- (This is safe to run even if columns don't exist)
DO $$
BEGIN
  ALTER TABLE public.organizations DROP COLUMN IF EXISTS api_key;
  ALTER TABLE public.organizations DROP COLUMN IF EXISTS api_key_hash;
  ALTER TABLE public.organizations DROP COLUMN IF EXISTS api_key_expires_at;
  ALTER TABLE public.organizations DROP COLUMN IF EXISTS api_key_environment;
EXCEPTION
  WHEN undefined_column THEN NULL;
END $$;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Allow organization owners to update API keys" ON public.organizations;
DROP POLICY IF EXISTS "Allow public update of API keys" ON public.organizations;
