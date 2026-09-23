insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-media',
  'content-media',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Dalili admins can read content media" on storage.objects;
drop policy if exists "Dalili editors can upload content media" on storage.objects;
drop policy if exists "Dalili editors can update content media" on storage.objects;
drop policy if exists "Dalili editors can delete content media" on storage.objects;

create policy "Dalili admins can read content media"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'content-media'
  and exists (
    select 1
    from public.admin_profiles p
    where p.id = (select auth.uid())
      and p.is_active = true
  )
);

create policy "Dalili editors can upload content media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'content-media'
  and exists (
    select 1
    from public.admin_profiles p
    where p.id = (select auth.uid())
      and p.is_active = true
      and p.role in ('owner','admin','editor')
  )
);

create policy "Dalili editors can update content media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'content-media'
  and exists (
    select 1
    from public.admin_profiles p
    where p.id = (select auth.uid())
      and p.is_active = true
      and p.role in ('owner','admin','editor')
  )
)
with check (
  bucket_id = 'content-media'
  and exists (
    select 1
    from public.admin_profiles p
    where p.id = (select auth.uid())
      and p.is_active = true
      and p.role in ('owner','admin','editor')
  )
);

create policy "Dalili editors can delete content media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'content-media'
  and exists (
    select 1
    from public.admin_profiles p
    where p.id = (select auth.uid())
      and p.is_active = true
      and p.role in ('owner','admin','editor')
  )
);
