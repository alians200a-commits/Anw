-- Dalili security hardening: operational roles are Owner + Admin only.
-- Keeps the historical enum values for migration safety, but constraints/RLS/functions
-- reject any active role outside owner/admin.

alter table public.admin_invites
  add column if not exists display_name text;

update public.admin_invites
set display_name = split_part(email, '@', 1)
where nullif(trim(coalesce(display_name, '')), '') is null;

alter table public.admin_profiles
  drop constraint if exists admin_profiles_owner_admin_only;
alter table public.admin_profiles
  add constraint admin_profiles_owner_admin_only
  check (role::text in ('owner','admin'));

alter table public.admin_invites
  drop constraint if exists admin_invites_owner_admin_only;
alter table public.admin_invites
  add constraint admin_invites_owner_admin_only
  check (role::text in ('owner','admin'));

-- Keep current owner safe and only let the owner manage Admin accounts.
create or replace function private.protect_admin_profile_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.id is distinct from old.id
     or new.email is distinct from old.email
     or new.created_at is distinct from old.created_at then
    raise exception 'Immutable admin identity fields cannot be changed';
  end if;

  if old.role::text = 'owner' then
    if new.role::text <> 'owner' or new.is_active is distinct from true then
      raise exception 'The owner account cannot be demoted or disabled';
    end if;
  else
    if new.role::text <> 'admin' then
      raise exception 'Admin accounts cannot be promoted to owner';
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

revoke all on function private.protect_admin_profile_changes() from public, anon, authenticated;

drop trigger if exists admin_profiles_protect_changes on public.admin_profiles;
create trigger admin_profiles_protect_changes
before update on public.admin_profiles
for each row execute function private.protect_admin_profile_changes();

-- Signup accepts an explicit Admin invitation. A single bootstrap Owner invite is
-- allowed only when no Owner exists yet. The invite name is authoritative for audit.
create or replace function private.handle_admin_signup()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite_row public.admin_invites%rowtype;
begin
  select * into invite_row
  from public.admin_invites
  where lower(email) = lower(new.email)
    and is_active = true
    and accepted_at is null
    and (
      role::text = 'admin'
      or (
        role::text = 'owner'
        and invited_by is null
        and not exists (
          select 1 from public.admin_profiles p where p.role::text = 'owner'
        )
      )
    )
  order by id asc
  limit 1;

  if found then
    insert into public.admin_profiles (id, email, display_name, role)
    values (
      new.id,
      lower(new.email),
      coalesce(nullif(trim(invite_row.display_name), ''), split_part(lower(new.email), '@', 1)),
      invite_row.role
    )
    on conflict (id) do nothing;

    update public.admin_invites
    set accepted_at = now(), accepted_user_id = new.id
    where id = invite_row.id;
  end if;

  return new;
end;
$$;
revoke all on function private.handle_admin_signup() from public, anon, authenticated;

-- Zero-trust content write guard: only an active Owner/Admin can mutate content.
create or replace function private.prepare_content_write()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := (select auth.uid());
  actor_role public.admin_role;
begin
  if actor is not null then
    select p.role into actor_role
    from public.admin_profiles p
    where p.id = actor and p.is_active = true;

    if actor_role is null or actor_role::text not in ('owner','admin') then
      raise exception 'Not authorized to manage content';
    end if;

    if tg_op = 'INSERT' then
      new.created_by := actor;
      new.updated_by := actor;
      new.version := 1;
    else
      new.created_by := old.created_by;
      new.updated_by := actor;
      new.version := old.version + 1;
    end if;
  elsif tg_op = 'UPDATE' then
    new.created_by := old.created_by;
    new.version := old.version + 1;
  end if;

  new.updated_at := now();

  if new.status = 'published' and (tg_op = 'INSERT' or old.status is distinct from 'published') then
    new.published_at := now();
    if actor is not null then new.published_by := actor; end if;
  end if;

  return new;
end;
$$;
revoke all on function private.prepare_content_write() from public, anon, authenticated;

-- RLS: Owner/Admin only for private admin/content operations.
drop policy if exists admin_profiles_read on public.admin_profiles;
create policy admin_profiles_read
on public.admin_profiles for select
to authenticated
using (private.current_admin_role()::text in ('owner','admin'));

drop policy if exists admin_profiles_manage on public.admin_profiles;
create policy admin_profiles_manage
on public.admin_profiles for update
to authenticated
using (private.current_admin_role()::text = 'owner' and role::text in ('owner','admin'))
with check (private.current_admin_role()::text = 'owner' and role::text in ('owner','admin'));

drop policy if exists admin_invites_read on public.admin_invites;
create policy admin_invites_read
on public.admin_invites for select
to authenticated
using (private.current_admin_role()::text = 'owner');

drop policy if exists admin_invites_insert on public.admin_invites;
create policy admin_invites_insert
on public.admin_invites for insert
to authenticated
with check (
  private.current_admin_role()::text = 'owner'
  and role::text = 'admin'
  and invited_by = (select auth.uid())
  and length(trim(coalesce(display_name, ''))) >= 2
);

drop policy if exists admin_invites_update on public.admin_invites;
create policy admin_invites_update
on public.admin_invites for update
to authenticated
using (private.current_admin_role()::text = 'owner' and role::text = 'admin')
with check (
  private.current_admin_role()::text = 'owner'
  and role::text = 'admin'
  and length(trim(coalesce(display_name, ''))) >= 2
);

drop policy if exists content_admin_read on public.content_items;
create policy content_admin_read
on public.content_items for select
to authenticated
using (private.current_admin_role()::text in ('owner','admin') or status = 'published');

drop policy if exists content_admin_insert on public.content_items;
create policy content_admin_insert
on public.content_items for insert
to authenticated
with check (
  private.current_admin_role()::text in ('owner','admin')
  and created_by = (select auth.uid())
  and updated_by = (select auth.uid())
);

drop policy if exists content_admin_update on public.content_items;
create policy content_admin_update
on public.content_items for update
to authenticated
using (private.current_admin_role()::text in ('owner','admin'))
with check (
  private.current_admin_role()::text in ('owner','admin')
  and updated_by = (select auth.uid())
);

drop policy if exists revisions_admin_read on public.content_revisions;
create policy revisions_admin_read
on public.content_revisions for select
to authenticated
using (private.current_admin_role()::text in ('owner','admin'));

-- Human-readable immutable audit trail for create/edit/publish/archive/delete.
create table if not exists public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.admin_profiles(id) on delete set null,
  actor_name text not null,
  action text not null check (action in ('create','update','publish','archive','delete')),
  entity_type text not null default 'content',
  entity_id uuid,
  content_type text,
  slug text,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_at_idx
  on public.admin_audit_log(created_at desc);
create index if not exists admin_audit_log_entity_idx
  on public.admin_audit_log(entity_id, created_at desc);

alter table public.admin_audit_log enable row level security;

drop policy if exists admin_audit_log_read on public.admin_audit_log;
create policy admin_audit_log_read
on public.admin_audit_log for select
to authenticated
using (private.current_admin_role()::text in ('owner','admin'));

revoke all on public.admin_audit_log from anon, authenticated;
grant select on public.admin_audit_log to authenticated;

create or replace function private.audit_content_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := (select auth.uid());
  actor_label text;
  event_action text;
begin
  select coalesce(nullif(trim(p.display_name), ''), p.email)
  into actor_label
  from public.admin_profiles p
  where p.id = actor;

  actor_label := coalesce(actor_label, 'النظام');

  if tg_op = 'INSERT' then
    event_action := 'create';
    insert into public.admin_audit_log(
      actor_id, actor_name, action, entity_type, entity_id, content_type, slug, before_state, after_state
    ) values (
      actor, actor_label, event_action, 'content', new.id, new.content_type, new.slug, null, to_jsonb(new)
    );
    return new;
  elsif tg_op = 'DELETE' then
    event_action := 'delete';
    insert into public.admin_audit_log(
      actor_id, actor_name, action, entity_type, entity_id, content_type, slug, before_state, after_state
    ) values (
      actor, actor_label, event_action, 'content', old.id, old.content_type, old.slug, to_jsonb(old), null
    );
    return old;
  else
    if new.status = 'published' and old.status is distinct from 'published' then
      event_action := 'publish';
    elsif new.status = 'archived' and old.status is distinct from 'archived' then
      event_action := 'archive';
    else
      event_action := 'update';
    end if;

    insert into public.admin_audit_log(
      actor_id, actor_name, action, entity_type, entity_id, content_type, slug, before_state, after_state
    ) values (
      actor, actor_label, event_action, 'content', new.id, new.content_type, new.slug, to_jsonb(old), to_jsonb(new)
    );
    return new;
  end if;
end;
$$;
revoke all on function private.audit_content_change() from public, anon, authenticated;

drop trigger if exists content_items_audit_change on public.content_items;
create trigger content_items_audit_change
after insert or update or delete on public.content_items
for each row execute function private.audit_content_change();

-- Published snapshots are read-only to browsers; only trusted trigger functions write them.
revoke all on public.published_content_items from anon, authenticated;
grant select on public.published_content_items to anon, authenticated;

-- Draft images are private. Published images stay public but cannot be mutated while referenced.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-media-drafts',
  'content-media-drafts',
  false,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-media',
  'content-media',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
set public = true,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create or replace function private.media_is_published(object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.published_content_items pci
    where jsonb_typeof(pci.payload -> 'media') = 'array'
      and exists (
        select 1
        from jsonb_array_elements(pci.payload -> 'media') as media_item
        where media_item ->> 'path' = object_name
      )
  );
$$;
revoke all on function private.media_is_published(text) from public, anon, authenticated;
grant execute on function private.media_is_published(text) to authenticated;

-- Remove every older content-media write/read policy by its known names.
drop policy if exists "Dalili admins can read content media" on storage.objects;
drop policy if exists "Dalili editors can upload content media" on storage.objects;
drop policy if exists "Dalili editors can update content media" on storage.objects;
drop policy if exists "Dalili editors can delete content media" on storage.objects;
drop policy if exists "Dalili admins can read draft media" on storage.objects;
drop policy if exists "Dalili admins can upload draft media" on storage.objects;
drop policy if exists "Dalili admins can update draft media" on storage.objects;
drop policy if exists "Dalili admins can delete draft media" on storage.objects;
drop policy if exists "Dalili admins can upload published media" on storage.objects;
drop policy if exists "Dalili admins can update unreferenced published media" on storage.objects;
drop policy if exists "Dalili admins can delete unreferenced published media" on storage.objects;

create policy "Dalili admins can read draft media"
on storage.objects for select
to authenticated
using (
  bucket_id = 'content-media-drafts'
  and private.current_admin_role()::text in ('owner','admin')
);

create policy "Dalili admins can upload draft media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'content-media-drafts'
  and private.current_admin_role()::text in ('owner','admin')
);

create policy "Dalili admins can update draft media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'content-media-drafts'
  and private.current_admin_role()::text in ('owner','admin')
)
with check (
  bucket_id = 'content-media-drafts'
  and private.current_admin_role()::text in ('owner','admin')
);

create policy "Dalili admins can delete draft media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'content-media-drafts'
  and private.current_admin_role()::text in ('owner','admin')
);

create policy "Dalili admins can upload published media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'content-media'
  and private.current_admin_role()::text in ('owner','admin')
);

create policy "Dalili admins can update unreferenced published media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'content-media'
  and private.current_admin_role()::text in ('owner','admin')
  and not private.media_is_published(name)
)
with check (
  bucket_id = 'content-media'
  and private.current_admin_role()::text in ('owner','admin')
  and not private.media_is_published(name)
);

create policy "Dalili admins can delete unreferenced published media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'content-media'
  and private.current_admin_role()::text in ('owner','admin')
  and not private.media_is_published(name)
);

-- Trigger-only functions should not be callable directly by clients.
revoke all on function private.capture_content_revision() from public, anon, authenticated;
revoke all on function private.stamp_content_actor() from public, anon, authenticated;
revoke all on function private.sync_published_content_snapshot() from public, anon, authenticated;

-- Keep only the role lookup callable by signed-in users for RLS evaluation.
revoke all on function private.current_admin_role() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.current_admin_role() to authenticated;
