-- Photo Quote requests (additive only). Anyone may submit; nobody can read except the service role (admin server functions).
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  phone text not null check (char_length(phone) between 7 and 40),
  email text check (email is null or char_length(email) <= 254),
  zip text not null check (zip ~ '^[0-9]{5}$'),
  location text not null check (location in ('curbside', 'inside')),
  stairs_flights smallint not null default 0 check (stairs_flights between 0 and 3),
  long_carry boolean not null default false,
  heavy_material boolean not null default false,
  hoarder boolean not null default false,
  description text check (description is null or char_length(description) <= 2000),
  photo_paths text[] not null default '{}' check (cardinality(photo_paths) between 1 and 6),
  ai_status text not null check (ai_status in ('ok', 'failed')),
  ai_error text check (ai_error is null or char_length(ai_error) <= 100),
  ai_model text check (ai_model is null or char_length(ai_model) <= 100),
  ai_estimate jsonb,
  outcome text not null check (outcome in ('instant', 'walkthrough', 'manual')),
  truck_eighths smallint check (truck_eighths is null or truck_eighths between 0 and 8),
  price_low integer check (price_low is null or price_low between 0 and 100000),
  price_high integer check (price_high is null or price_high between 0 and 100000),
  quote_lines jsonb,
  discount integer not null default 0 check (discount between 0 and 1000),
  pricing_version text check (pricing_version is null or char_length(pricing_version) <= 40),
  sms_consent boolean not null default false,
  sms_consent_at timestamptz,
  source_page text check (source_page is null or char_length(source_page) <= 200),
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  referrer text check (referrer is null or char_length(referrer) <= 2000),
  status text not null default 'new',
  admin_notes text
);
grant insert on public.quote_requests to anon, authenticated;
grant all on public.quote_requests to service_role;
alter table public.quote_requests enable row level security;
drop policy if exists "Anyone can submit a quote request" on public.quote_requests;
create policy "Anyone can submit a quote request" on public.quote_requests for insert to anon, authenticated with check (status = 'new' and admin_notes is null);
-- No select/update/delete policies: no public reads.

-- Private quote-photos bucket was created through the Storage API (10 MB, images only).
drop policy if exists "Anyone can upload quote photos" on storage.objects;
create policy "Anyone can upload quote photos" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'quote-photos' and (storage.foldername(name))[1] = 'quotes');