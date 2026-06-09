
CREATE TABLE public.nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  your_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  homeowner_name TEXT NOT NULL,
  property_address TEXT NOT NULL,
  help_needed TEXT NOT NULL,
  story TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.nominations TO anon, authenticated;
GRANT ALL ON public.nominations TO service_role;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a nomination" ON public.nominations FOR INSERT TO anon, authenticated WITH CHECK (true);
