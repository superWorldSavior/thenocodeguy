---
id: 61
title: "Section 'Profils disponibles' — 3 fiches candidats style intérim"
priority: high
size: M
labels: [sprint, design]
dependsOn: [59, 60]
---

## Description
Remplace la section "Agents" générique par une section "Profils disponibles" qui ressemble à une agence de recrutement. Chaque agent = une fiche candidat avec : avatar stylisé, titre de poste, compétences clés, missions types, disponibilité, fourchette de rémunération. Le visiteur doit avoir l'impression de parcourir des CV, pas des "pricing tiers".

## Acceptance Criteria
- Section renders 3 agent profile cards: Commercial, Admin, Webmaster
- Each card displays: avatar (SVG illustration, not photo), job title, 3-4 key skills as badges, 2-3 sample missions, availability status ("Disponible" / "Available"), and starting price ("from 149€/month")
- Cards use indigo accent color and slate palette (new theme)
- Layout is responsive: 3 columns desktop, 1 column mobile (stacked)
- All text sourced from messages/en.json (no hardcoded strings)
- Section heading uses hiring/recruitment vocabulary from messages (e.g., "Available profiles" / "Profils disponibles")
- Component placed in components/organisms/ProfilesSection.tsx
