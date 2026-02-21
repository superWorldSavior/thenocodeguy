---
id: 60
title: "Wording v2 — positionnement agence de staffing IA"
priority: high
size: M
labels: [sprint, design]
---

## Description
Réécriture complète du copy EN et FR pour coller au positionnement "agence de staffing IA". Remplacer tout le vocabulaire SaaS (subscribe, plan, trial, prix fixe) par le vocabulaire recrutement (hire, brief, profile, mission). Aucun prix affiché sur le site — le client dépose son brief avec sa fourchette de budget, TNCG fait le matching.

## Acceptance Criteria
- messages/en.json updated: hero headline "Hire an agent, not a tool.", CTA "Post a job brief", no price displayed anywhere
- messages/fr.json updated: "Embauchez un agent, pas un outil.", CTA "Poster un brief", aucun prix affiché
- All references to any price (99€, 149€, 249€) removed from all 4 locale files
- No SaaS vocabulary: no "subscribe", "plan", "free trial", "fair use" — replaced by hiring/recruitment framing
- Hero subtitle explains the process in 1 sentence: brief → matching → 48h → mission
- Stats section uses time/quality metrics (48h placement, 7-day trial) not prices


## Block log — 2026-02-21 04:07 UTC
**Verdict:** CHANGES_REQUESTED — 3 critical blocking issues

1. `nav.pricing` key deleted in all 4 locales → Navigation.tsx:44 uses t("pricing") → runtime crash on nav bar
2. `home.pricingTeaser` / `pricingTeaserPrice` / `pricingTeaserCta` deleted → page.tsx:184–192 still renders them → homepage crashes
3. `pricing.starterPrice` / `starterPriceSuffix` / `starterCta` deleted → pricing/page.tsx still renders them → pricing page crashes
4. (quality) howSubtitle says "4 steps" but only 3 step keys defined

**Fix:** restore deleted i18n keys with updated values (or remove consuming JSX from components)
