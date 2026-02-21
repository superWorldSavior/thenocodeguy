---
id: 19
title: "Review visuelle systématique du site (toutes pages, desktop + mobile)"
priority: high
size: M
labels: [sprint]
---

## Description
Passer chaque page du site en revue avec Playwright (desktop 1440px + mobile 390px). Capturer screenshots, vérifier cohérence visuelle, textes, liens, espacement, CTA. Documenter les anomalies et créer des stories correctives si besoin. 

AC 

Screenshots de TOUTES les pages (/, /agents, /agents/commercial, /agents/admin, /agents/webmaster, /pricing, /contact, /legal, /privacy, /a-propos) 

Desktop + mobile pour chaque 

Rapport écrit avec anomalies trouvées 

Stories correctives créées dans DevOps si nécessaire

## Acceptance Criteria
Screenshots Playwright de TOUTES les pages publiques, desktop (1440px) + mobile (390px) 

Pages : /, /pricing, /agents, /agents/commercial, /agents/admin, /agents/webmaster, /a-propos, /contact, /lab 

Screenshots des 4 locales (fr, en, zh-TW, zh-CN) pour la homepage 

Checklist par page : pas de texte tronqué, pas d'overflow horizontal, images chargées, CTA visibles 

Rapport écrit dans memory/visual-review-{date}.md avec liste des problèmes trouvés 

Pour chaque problème : créer un PBI dans Azure DevOps avec description + screenshot path 

Si aucun problème : rapport RAS dans le fichier memory 

Build npm run build doit passer avant les screenshots


---
_Migrated from Azure DevOps #88_
