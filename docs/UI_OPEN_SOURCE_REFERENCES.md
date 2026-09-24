# Open-source UI references

Internal engineering reference only. This file is not rendered in the public app UI.

## Motion Primitives
- Repository: https://github.com/ibelick/motion-primitives
- License: MIT
- Used as a design/interaction reference for:
  - animated disclosure / accordion affordances
  - lightweight content reveal transitions
  - active-card border-trail treatment
- Integration approach: patterns adapted into the existing app CSS and Motion setup; no runtime dependency was added.

## Health Icons
- Repository: https://github.com/resolvetosavelives/healthicons
- License: MIT
- Used as a medical icon reference for the inhalational-anesthesia visual treatment.
- Integration approach: local visual adaptation only; public UI does not show a source card.

## Guardrails
- Prefer permissive open-source assets with an explicit license.
- Avoid adding a new dependency when the visual pattern can be implemented with the existing stack.
- Keep motion subtle on mobile and honor `prefers-reduced-motion`.
- Public attribution is shown only when the source license requires it.
