# AI-assisted code production checklist

This repository treats AI-generated changes as a draft until they pass the same engineering gates as human-written code.

## Before changing code
- Inspect the existing path first; do not rewrite a working subsystem just because a new implementation looks cleaner.
- Keep the change small enough to review and revert.
- Do not add a package when the platform or existing code can solve the problem clearly.

## Before accepting a change
- Define the success condition and the important failure conditions.
- Test authentication/authorization at the database boundary, not only in the UI.
- Validate external/published data before rendering it.
- Validate URLs and storage paths before using them.
- Never put service-role/secret keys in browser code or Git.
- Make unexpected failures visible through safe diagnostics; do not silently swallow critical errors.
- Verify mobile UI and the main user flow after functional changes.

## Release gate
Run `npm run verify` and do not ship when any gate fails.

The gate includes TypeScript checking, security checks, content integrity checks, regression tests, and a production build.
