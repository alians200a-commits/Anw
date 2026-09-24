-- Preserve a safe first-run bootstrap path: a single historical Owner invite can
-- create the first Owner only when no Owner exists. All later invitations are Admin.
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
