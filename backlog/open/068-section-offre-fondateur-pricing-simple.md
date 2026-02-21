---
id: 68
title: "Section 'Offre Fondateur' — pricing simple, urgency, 10 places"
priority: high
size: M
labels: [sprint, design]
dependsOn: [60]
---

## Description
Nouvelle section entre témoignages et CTA final. 2 options côte à côte : Fondateur (149€/mois, 10 places, prix bloqué à vie) et Standard (249€/mois). Pas de grille de features. Compteur de places restantes statique pour l'instant. Framing : "rémunération de l'agent", pas "abonnement". Accent sur l'urgency fondateur.

## Acceptance Criteria
- Section renders 2 pricing cards: Founder (149€/month, "lifetime price lock", "10 spots") and Standard (249€/month)
- No feature grid — just the price, the key differentiator ("price locked for life" for Founder), and a CTA button per card
- Founder card visually highlighted (indigo border or badge)
- Static spots counter shown on Founder card (e.g. "8 spots remaining")
- All text from messages/en.json (no hardcoded strings)
- Component at components/organisms/FounderOfferSection.tsx
- Renders correctly light + dark, desktop + mobile
