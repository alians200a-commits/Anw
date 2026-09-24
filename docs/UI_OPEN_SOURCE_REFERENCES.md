# Open-source UI references

Internal engineering reference only. This file is not rendered in the public app UI.

## Craft
- Repository: https://github.com/BENZOOgataga/Craft
- License: MIT
- Used as a visual/interaction reference for:
  - elevated feature-card depth
  - restrained hover lift
  - layered top highlight
  - glow confined to the card surface
  - polished icon pods
- Integration approach: patterns adapted to the existing guide cards and the Mamlakat Al-Takhdeer palette; no runtime dependency was added.

## Magic UI
- Repository: https://github.com/magicuidesign/magicui
- License: MIT
- Used as a visual/interaction reference for:
  - border-beam treatment
  - moving highlight along a premium container edge
  - layered glass-like surfaces
- Integration approach: the border-beam idea was reimplemented with lightweight CSS so the app keeps its existing dependency set and reduced-motion support.

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
- Do not use an O2 cylinder as the symbol for sevoflurane or other volatile anesthetic agents.
- Product navigation convention: the inhalational-anesthetics category intentionally uses a recognizable anesthesia vaporizer icon. This is UI shorthand. Nitrous oxide remains in the same inhalational category even though it is not delivered through a volatile-agent vaporizer.
- Integration approach: local visual adaptation only; public UI does not show a source card.

## Guardrails
- Prefer permissive open-source assets with an explicit license.
- Avoid adding a new dependency when the visual pattern can be implemented with the existing stack.
- Keep motion subtle on mobile and honor `prefers-reduced-motion`.
- Public attribution is shown only when the source license requires it.
- Medical iconography should be reviewed for clinical meaning; documented product-navigation conventions must not be presented as clinical delivery claims.
