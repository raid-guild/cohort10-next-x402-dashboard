-- Temporary: store raw API key for facilitator lookups
ALTER TABLE public.api_keys
  ADD COLUMN IF NOT EXISTS key_plaintext TEXT;

CREATE INDEX IF NOT EXISTS idx_api_keys_key_plaintext
  ON public.api_keys(key_plaintext)
  WHERE key_plaintext IS NOT NULL;
