alter table public.service_leads add column if not exists job_size text check (job_size is null or char_length(job_size) <= 40);
grant insert (job_size) on public.service_leads to anon, authenticated;