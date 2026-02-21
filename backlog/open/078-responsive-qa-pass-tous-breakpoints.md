---
id: 78
title: "QA responsive — vérification tous breakpoints"
priority: medium
size: S
labels: [qa]
---

## Description
Test systématique du site sur les breakpoints critiques : 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px (laptop), 1440px (desktop). Vérifier : pas d'overflow, texte lisible, CTA accessibles, images correctement dimensionnées.

## Acceptance Criteria
- Screenshots Playwright sur 5 breakpoints pour homepage et /contact
- Aucun overflow horizontal sur aucun breakpoint
- Tous les CTA visibles et cliquables (min 44x44px touch target)
- Texte lisible sans zoom sur mobile (min 16px body)
- Rapport QA avec anomalies listées et corrigées
