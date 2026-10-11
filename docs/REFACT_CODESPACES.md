# Refact + GitHub Codespaces test

This branch is isolated from `main` and is intended only for testing Refact in a browser-based GitHub Codespace.

## Start

1. Open this repository on branch `refact-codespaces-test`.
2. Choose **Code → Codespaces → Create codespace on refact-codespaces-test**.
3. Wait for the container setup to finish. Dependencies install automatically.
4. Refact should be installed automatically as the VS Code extension `smallcloud.codify`.
5. Open the Refact sidebar and configure a BYOK model provider. Do **not** commit API keys to the repository.
6. Before allowing edits, ask Refact to analyze the project and report issues only.
7. Run:
   - `npm run verify`
   - `npm run dev`

## Safety

- Do not work directly on `main`.
- Keep all Refact experiments on this branch until reviewed.
- Never commit API keys, tokens, or secrets.
