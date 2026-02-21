---
id: 70
title: "Refonte Navigation — liens et CTA alignés recrutement"
priority: high
size: S
labels: [sprint, design]
dependsOn: [60]
---

## Description
Mettre à jour Navigation.tsx : supprimer le lien "Tarifs" (pricing intégré dans landing), ajouter "Nos agents" (ancre vers section Profils), CTA principal devient "Déposer un brief" → /contact. Mettre à jour les clés nav dans messages/en.json et fr.json.

## Acceptance Criteria
- Nav no longer contains a "Pricing" / "Tarifs" link
- Nav contains "Our agents" / "Nos agents" link that scrolls to #profiles section
- Primary CTA button text is "Post a brief" / "Déposer un brief" linking to /contact
- Changes reflected in messages/en.json and fr.json (no hardcoded nav strings)
- Nav renders correctly mobile (hamburger) + desktop, light + dark
