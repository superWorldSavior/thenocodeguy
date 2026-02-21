---
id: 27
title: "Light mode — support complet prefers-color-scheme"
priority: high
size: M
labels: []
---

## Description
Le site est full dark hardcodé. Implémenter un vrai light/dark mode auto basé sur prefers-color-scheme, avec toggle manuel. Le light mode est indispensable pour les acheteurs B2B en environnement bureau.

## Acceptance Criteria
Tailwind dark mode configuré en 'class' strategy 

Theme par défaut : suit prefers-color-scheme du navigateur 

Toggle manuel dans le header (icône soleil/lune), préférence persistée en localStorage 

Light mode palette : fond blanc/gris très clair, texte sombre, accents emerald adaptés (plus sombres) 

Toutes les pages testées en light mode : pas de texte illisible, pas de fond transparent cassé 

Composants concernés : nav, hero, cards agents, pricing, témoignages, footer, mockups conversation 

Les logos/images SVG s'adaptent (pas de SVG blanc sur fond blanc) 

Screenshots Playwright light+dark sur homepage avant merge 

Build passe en light et dark mode


---
_Migrated from Azure DevOps #99_
