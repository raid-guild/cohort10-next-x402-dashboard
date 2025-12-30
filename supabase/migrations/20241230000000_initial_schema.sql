-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for prototype, ideally refine for production)
-- Allow public read for auth verification logic (or use service_role in API)
CREATE POLICY "Allow public read of users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert of users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read of organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Allow public insert of organizations" ON public.organizations FOR INSERT WITH CHECK (true);
