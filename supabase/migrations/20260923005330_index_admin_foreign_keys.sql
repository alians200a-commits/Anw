create index if not exists admin_invites_accepted_user_idx on public.admin_invites(accepted_user_id);
create index if not exists admin_invites_invited_by_idx on public.admin_invites(invited_by);
create index if not exists content_items_created_by_idx on public.content_items(created_by);
create index if not exists content_items_updated_by_idx on public.content_items(updated_by);
create index if not exists content_items_published_by_idx on public.content_items(published_by);
create index if not exists content_revisions_changed_by_idx on public.content_revisions(changed_by);
