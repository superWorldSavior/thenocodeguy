---
id: 19
title: "Review visuelle systématique du site (toutes pages, desktop + mobile)"
priority: high
size: M
labels: []
---

## Description
Passer chaque page du site en revue avec Playwright (desktop 1440px + mobile 390px). Capturer screenshots, vérifier cohérence visuelle, textes, liens, espacement, CTA. Documenter les anomalies et créer des stories correctives si besoin.

Pages à tester : /, /contact, /legal, /privacy, /a-propos (+ toute page active).
Le site est positionné comme agence de staffing IA — vérifier que le wording reflète ce positionnement.

## Acceptance Criteria
- Screenshots Playwright de TOUTES les pages publiques, desktop (1440px) + mobile (390px)
- Screenshots des 4 locales (fr, en, zh-TW, zh-CN) pour la homepage
- Checklist par page : pas de texte tronqué, pas d'overflow horizontal, images chargées, CTA visibles
- Aucune référence à "catalog", "profiles agents", "pricing" dans le contenu visible
- Rapport écrit dans memory/visual-review-{date}.md avec liste des problèmes trouvés
- Build npm run build doit passer avant les screenshots

---
_Updated 2026-02-21 — aligned with staffing agency positioning_
