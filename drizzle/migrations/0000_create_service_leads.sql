CREATE TABLE public.service_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'new',
  zip text NOT NULL,
  service_type text NOT NULL,
  timing text,
  description text,
  photo_paths text[] DEFAULT '{}',
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  thinking_of_selling boolean,
  sms_consent boolean NOT NULL DEFAULT false,
  sms_consent_at timestamptz,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  notes text
);
GRANT INSERT ON public.service_leads TO anon, authenticated;
GRANT ALL ON public.service_leads TO service_role;
ALTER TABLE public.service_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a service lead"
  ON public.service_leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Anyone can upload service lead photos"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'service-lead-photos');
REVOKE SELECT, UPDATE, DELETE ON public.service_leads FROM anon, authenticated;
GRANT INSERT ON public.service_leads TO anon, authenticated;
GRANT ALL ON public.service_leads TO service_role;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON public.service_leads FROM anon, authenticated;