# Dalili security hardening — 2026-09-23

## Administrative model
- Operational roles: `owner` and `admin` only.
- Only the Owner can add, disable, or re-enable Admin accounts.
- Admin accounts can manage and publish content but cannot create/promote another Owner/Admin.
- A human display name is required when the Owner adds an Admin and when an invited Admin activates the account.
- Content create/update/publish/archive/delete actions are recorded in `admin_audit_log` with the acting account name.

## Database authorization
- RLS remains enabled on the admin/content tables.
- All content writes require an active Owner/Admin identity at the database layer.
- Published snapshots are read-only to browser roles.
- Trigger-only functions are not directly executable by browser roles.

## Media
- Draft media is stored in private bucket `content-media-drafts` and displayed through signed URLs.
- Published media is promoted to public bucket `content-media` only during publish.
- Media referenced by published content cannot be updated/deleted through normal admin storage policies.

## Browser / injection hardening
- No `dangerouslySetInnerHTML`, direct `innerHTML`, `eval`, or dynamic Function usage is allowed by the repository security audit.
- Published media URLs must be HTTPS URLs on the configured Supabase project and within the intended public media bucket.
- CSP/referrer policies are set in `index.html`.

## Secrets
- No real Supabase URL/key is stored in source.
- Hosting must provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Never expose `service_role` / `sb_secret_*` values to the browser or `VITE_*` variables.

## Supply chain
- Top-level package versions are pinned.
- Unused dependencies were removed.
- Dependabot configuration covers npm and GitHub Actions.
- CI runs `audit:security` before the normal checks.

## Platform-level traffic attacks
DDoS resistance cannot be implemented purely in React code. It must be enforced by the hosting/CDN and Supabase edge protections. Client-side throttling is not considered a security boundary.
