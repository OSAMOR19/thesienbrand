-- 0003_admin_roles.sql
-- Grant Admin privileges and manage authorized admin accounts in Supabase

-- 1. Create admin_users table
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Allow public verification of admin emails
drop policy if exists "Anyone can check admin emails" on public.admin_users;
create policy "Anyone can check admin emails"
  on public.admin_users for select
  using (true);

-- 2. Insert designated admin emails
insert into public.admin_users (email, role)
values 
  ('admin@thesienbrand.com', 'admin'),
  ('admin@beaded-bag.com', 'admin')
on conflict (email) do nothing;

-- 3. SQL helper to grant admin access to any user in Supabase auth.users
-- (Run this snippet replacing 'YOUR_EMAIL@EXAMPLE.COM' with the user's email)
/*
insert into public.admin_users (email, role)
values ('YOUR_EMAIL@EXAMPLE.COM', 'admin')
on conflict (email) do nothing;

-- Optionally grant admin role in Supabase Auth user metadata
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email = 'YOUR_EMAIL@EXAMPLE.COM';
*/
