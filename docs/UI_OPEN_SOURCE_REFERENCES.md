# Open-source UI references

Internal engineering reference only. This file is not rendered in the public app UI.

## Motion Primitives
- Repository: https://github.com/ibelick/motion-primitives
- License: MIT
- Used as a design/interaction reference for:
  - animated disclosure / accordion affordances
  - lightweight content reveal transitions
  - active-card border-trail treatment
  - layered premium card surfaces
- Integration approach: patterns adapted into the existing app CSS and Motion setup; no runtime dependency was added.

## Health Icons
- Repository: https://github.com/resolvetosavelives/healthicons
- License: MIT
- Used as a medical-device icon-language reference only.
- Scientific guardrail for inhalational anesthetics: do not use an O2 cylinder or simple face-mask symbol to represent volatile anesthetic agents. The visible app treatment uses a generic vaporizer + vapor-flow concept so it remains agent-neutral for sevoflurane, isoflurane, desflurane, enflurane and halothane.
- Integration approach: local visual adaptation only; public UI does not show a source card.

## Guardrails
- Prefer permissive open-source assets with an explicit license.
- Avoid adding a new dependency when the visual pattern can be implemented with the existing stack.
- Keep motion subtle on mobile and honor `prefers-reduced-motion`.
- Public attribution is shown only when the source license requires it.
- Medical iconography must not introduce a clinically misleading association just because an icon is visually attractive.
