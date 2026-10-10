-- Run this in Supabase: SQL Editor -> New query -> paste -> Run
-- Safe to run again on an existing project (it replaces the old rules).

-- ============================================================
-- STEP 1 (MUST DO): put YOUR admin email on the line below.
-- Only emails in this list can add, change or delete anything.
-- If you leave the example email, you will be locked out of the admin.
-- ============================================================
create table if not exists admin_emails (email text primary key);
insert into admin_emails (email) values ('your-admin-email@example.com') on conflict do nothing;

-- Nobody can read or edit this list through the website (no policies on purpose)
alter table admin_emails enable row level security;

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from admin_emails where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

-- ============================================================
-- Tables
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Charging',
  card_id text not null default 'Charging',
  note text,
  price text,
  image_url text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products add column if not exists card_id text;
update products set card_id = category where card_id is null;
alter table products alter column card_id set default 'Charging';
update products set card_id = 'Charging' where card_id is null;

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table offers enable row level security;

-- ============================================================
-- Security rules
-- ============================================================
drop policy if exists "public read products" on products;
drop policy if exists "public read offers" on offers;
drop policy if exists "admin write products" on products;
drop policy if exists "admin write offers" on offers;

-- Everyone can read (the public website)
create policy "public read products" on products for select using (true);
create policy "public read offers" on offers for select using (true);

-- Only an admin from the list above can add, change or delete
create policy "admin write products" on products for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin write offers" on offers for all to authenticated using (is_admin()) with check (is_admin());

-- ============================================================
-- Photo storage: images only, max 2 MB, admin-only upload
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 2097152, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update
  set file_size_limit = 2097152,
      allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "public read images" on storage.objects;
drop policy if exists "admin upload images" on storage.objects;
drop policy if exists "admin update images" on storage.objects;
drop policy if exists "admin delete images" on storage.objects;

create policy "public read images" on storage.objects for select using (bucket_id = 'product-images');
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and is_admin());
create policy "admin update images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and is_admin());
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and is_admin());
