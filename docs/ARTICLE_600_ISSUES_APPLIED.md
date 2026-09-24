# Applying the “600 issues in an AI-built application” lessons

The practical lesson used for Dalili is simple: AI-generated code is treated as a draft, not as trusted production code. Changes must be small, reviewable, testable, security-checked, and observable when something fails.

Applied in this revision:
- Root-level error boundary so unexpected UI failures do not become a blank screen.
- Safe runtime diagnostics for fallback/error paths without logging user payloads or secrets.
- Published-content loaders now report database/schema failures instead of silently hiding all of them.
- Storage path validation rejects encoded traversal/control characters.
- Published media URLs are constrained to HTTPS, the configured Supabase host, and the public content-media bucket.
- Admin account role regression test locks the model to Owner/Admin only.
- Security regression tests cover malicious slugs, paths, and URLs.
- Automated AI-code production audit checks critical invariants before release.
- One `npm run verify` gate combines type checking, security/content audits, tests, and production build.
- GitHub Actions uses the same release gate and runs a dependency vulnerability audit.
- A permanent AI-assisted development checklist was added under docs/.
