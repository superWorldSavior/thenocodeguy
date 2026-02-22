---
id: 81
title: "Page À propos — histoire, équipe, mission"
priority: high
size: M
labels: [m1]
---

## Description
Créer la page /a-propos (ou /about selon locale) présentant The No Code Guys : l'histoire du fondateur, la mission (Randstad de l'IA — placer des agents IA dans les équipes), la vision. Positionnement agence de staffing IA. Page essentielle pour la confiance B2B.

## Acceptance Criteria
- Route /a-propos (fr), /en/about, /zh-TW/about, /zh-CN/about all return HTTP 200 and render unique content (not a redirect or 404)
- Page contains at minimum 3 sections: founder story (who + why), mission statement (staffing AI agents for SMBs), and vision/values — each with a visible heading
- All text content comes from next-intl messages files (messages/fr.json, en.json, zh-TW.json, zh-CN.json) — zero hardcoded strings in the component
- Page uses shadcn/ui components and follows the existing Slate+Indigo design system (consistent typography, spacing, colors with homepage)
- `npm run build` passes with zero errors and Lighthouse Accessibility score ≥ 90 on the /about route
