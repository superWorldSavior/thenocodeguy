---
id: 75
title: "Page /services — archiver ou transformer en 'Nos missions'"
priority: low
size: S
labels: [backlog]
dependsOn: []
---

## Description
La page /services (audit, workflows sur mesure, lead gen, maintenance) véhicule un positionnement "consulting générique" qui dilue le message agence de recrutement. Décision à prendre : (a) archiver complètement + redirect vers landing, (b) transformer en page "Nos missions" avec des cas clients réels, (c) garder en navigation secondaire. À valider avec Erwan avant d'implémenter.

## Acceptance Criteria
- Decision documented and implemented (archive OR transform OR keep)
- If archived: 301 redirect /services → / in next.config.js
- If transformed: page rewritten with recruitment framing and real case studies
- No orphaned links pointing to /services if archived
