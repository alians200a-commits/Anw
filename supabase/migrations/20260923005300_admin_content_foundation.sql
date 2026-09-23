create schema if not exists private;

create type public.admin_role as enum ('owner','admin','editor','reviewer');
create type public.content_status as enum ('draft','review','approved','published','rejected','archived');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role public.admin_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_invites (
  id bigint generated always as identity primary key,
  email text not null,
  role public.admin_role not null,
  is_active boolean not null default true,
  invited_by uuid references public.admin_profiles(id),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  accepted_user_id uuid references auth.users(id),
  constraint admin_invites_email_normalized unique (email)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (length(trim(content_type)) > 0),
  slug text not null check (length(trim(slug)) > 0),
  title_ar text,
  title_en text,
  payload jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  version integer not null default 1 check (version > 0),
  created_by uuid references public.admin_profiles(id),
  updated_by uuid references public.admin_profiles(id),
  published_by uuid references public.admin_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  constraint content_items_type_slug_key unique (content_type, slug)
);

create index content_items_type_status_idx on public.content_items(content_type, status);
create index content_items_updated_at_idx on public.content_items(updated_at desc);
create index content_items_payload_gin_idx on public.content_items using gin(payload);

create table public.content_revisions (
  id bigint generated always as identity primary key,
  content_id uuid not null references public.content_items(id) on delete restrict,
  revision_version integer not null,
  snapshot jsonb not null,
  changed_by uuid references public.admin_profiles(id),
  changed_at timestamptz not null default now(),
  constraint content_revisions_content_version_key unique(content_id, revision_version)
);

create index content_revisions_content_idx on public.content_revisions(content_id, revision_version desc);

create or replace function private.current_admin_role()
returns public.admin_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.admin_profiles p
  where p.id = (select auth.uid())
    and p.is_active = true
  limit 1;
$$;

revoke all on function private.current_admin_role() from public;
grant usage on schema private to authenticated;
grant execute on function private.current_admin_role() to authenticated;

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
  order by id asc
  limit 1;

  if found then
    insert into public.admin_profiles (id, email, role)
    values (new.id, lower(new.email), invite_row.role)
    on conflict (id) do nothing;

    update public.admin_invites
    set accepted_at = now(), accepted_user_id = new.id
    where id = invite_row.id;
  end if;

  return new;
end;
$$;

revoke all on function private.handle_admin_signup() from public;

create trigger on_auth_user_created_admin
  after insert on auth.users
  for each row execute function private.handle_admin_signup();

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

    if actor_role is null then
      raise exception 'Not authorized to manage content';
    end if;

    if tg_op = 'INSERT' then
      if actor_role = 'editor' and new.status <> 'draft' then
        raise exception 'Editors can create drafts only';
      elsif actor_role = 'reviewer' then
        raise exception 'Reviewers cannot create content';
      end if;
      new.created_by := actor;
      new.updated_by := actor;
      new.version := 1;
    else
      if actor_role = 'editor' then
        if old.status not in ('draft','rejected') or new.status not in ('draft','review') then
          raise exception 'Editor workflow violation';
        end if;
      elsif actor_role = 'reviewer' then
        if old.status <> 'review' or new.status not in ('review','approved','rejected') then
          raise exception 'Reviewer workflow violation';
        end if;
      end if;
      new.updated_by := actor;
      new.version := old.version + 1;
    end if;
  elsif tg_op = 'UPDATE' then
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

revoke all on function private.prepare_content_write() from public;

create trigger content_items_prepare_write
  before insert or update on public.content_items
  for each row execute function private.prepare_content_write();

create or replace function private.capture_content_revision()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.content_revisions(content_id, revision_version, snapshot, changed_by)
  values (new.id, new.version, to_jsonb(new), (select auth.uid()));
  return new;
end;
$$;

revoke all on function private.capture_content_revision() from public;

create trigger content_items_capture_revision
  after insert or update on public.content_items
  for each row execute function private.capture_content_revision();

alter table public.admin_profiles enable row level security;
alter table public.admin_invites enable row level security;
alter table public.content_items enable row level security;
alter table public.content_revisions enable row level security;

create policy admin_profiles_read
on public.admin_profiles for select
to authenticated
using (
  id = (select auth.uid())
  or private.current_admin_role() in ('owner','admin')
);

create policy admin_profiles_manage
on public.admin_profiles for update
to authenticated
using (private.current_admin_role() = 'owner')
with check (private.current_admin_role() = 'owner');

create policy admin_invites_read
on public.admin_invites for select
to authenticated
using (private.current_admin_role() in ('owner','admin'));

create policy admin_invites_insert
on public.admin_invites for insert
to authenticated
with check (
  private.current_admin_role() in ('owner','admin')
  and invited_by = (select auth.uid())
);

create policy admin_invites_update
on public.admin_invites for update
to authenticated
using (private.current_admin_role() in ('owner','admin'))
with check (private.current_admin_role() in ('owner','admin'));

create policy content_public_read_published
on public.content_items for select
to anon
using (status = 'published');

create policy content_admin_read
on public.content_items for select
to authenticated
using (private.current_admin_role() is not null or status = 'published');

create policy content_admin_insert
on public.content_items for insert
to authenticated
with check (
  private.current_admin_role() in ('owner','admin','editor')
  and created_by = (select auth.uid())
  and updated_by = (select auth.uid())
);

create policy content_admin_update
on public.content_items for update
to authenticated
using (private.current_admin_role() in ('owner','admin','editor','reviewer'))
with check (
  private.current_admin_role() in ('owner','admin','editor','reviewer')
  and updated_by = (select auth.uid())
);

create policy revisions_admin_read
on public.content_revisions for select
to authenticated
using (private.current_admin_role() is not null);

revoke all on public.admin_profiles from anon, authenticated;
revoke all on public.admin_invites from anon, authenticated;
revoke all on public.content_items from anon, authenticated;
revoke all on public.content_revisions from anon, authenticated;

grant select on public.content_items to anon;
grant select, insert, update on public.content_items to authenticated;
grant select, update on public.admin_profiles to authenticated;
grant select, insert, update on public.admin_invites to authenticated;
grant usage, select on sequence public.admin_invites_id_seq to authenticated;
grant select on public.content_revisions to authenticated;

insert into public.admin_invites(email, role, is_active)
values ('alians200a@gmail.com', 'owner', true)
on conflict (email) do update set role = excluded.role, is_active = true;
