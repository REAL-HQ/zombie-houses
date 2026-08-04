CREATE TABLE public.sell_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  factors TEXT,
  sms_consent BOOLEAN NOT NULL DEFAULT false,
  sms_consent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.sell_leads TO anon, authenticated;
GRANT ALL ON public.sell_leads TO service_role;
ALTER TABLE public.sell_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.sell_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.launch_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  rescue_slug TEXT NOT NULL DEFAULT 'shermans-home',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.launch_notifications TO anon, authenticated;
GRANT ALL ON public.launch_notifications TO service_role;
ALTER TABLE public.launch_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.launch_notifications
  FOR INSERT TO anon, authenticated WITH CHECK (true);