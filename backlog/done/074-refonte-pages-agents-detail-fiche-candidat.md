---
id: 74
title: "Refonte pages /agents/[slug] — fiches candidat détaillées"
priority: medium
size: L
labels: [backlog, sprint]
dependsOn: [60, 63]
---

## Description
Transformer les pages agents individuelles (/agents/commercial, /agents/admin, /agents/webmaster) en vraies fiches candidat : parcours fictif, compétences détaillées (badges), missions types avec exemples concrets, résultats mesurables, témoignage client. Vocabulaire CV/LinkedIn, pas SaaS. Chaque page = une "candidature" que le client peut consulter.

## Acceptance Criteria
- Each agent page (/agents/commercial, /agents/admin, /agents/webmaster) shows: avatar (#63), job title, key skills (badges), 3 sample missions with concrete outcomes, 1 client testimonial
- Vocabulary is recruitment-framed: "Experience", "Skills", "Sample missions" — not "Features", "Integrations", "Workflows"
- CTA on each page: "Recruit this agent" / "Recruter cet agent" → /contact
- All text from messages/[locale].json
- Renders correctly all 4 locales, light + dark, desktop + mobile

## Archive Note — 2026-02-21
**Status:** OBSOLETE — positioning change to AI staffing agency model (Randstad de l'IA). No agent catalog, no profiles, no avatars, no pricing displayed, custom agents only.
