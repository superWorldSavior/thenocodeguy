---
id: 66
title: "Hero — refonte texte + image pour positionnement agence de staffing IA"
priority: high
size: M
labels: [sprint, design]
dependsOn: [60, 63]
---

## Description
Mettre à jour le HeroSection existant (ATOM-4) pour coller au positionnement agence de staffing : headline "Hire an AI agent for your business", sous-titre qui explique le modèle intérim en 1 phrase, CTA principal "Browse profiles" (→ section #61), CTA secondaire "Post a brief" (→ /contact). L'image droite utilise l'avatar du Commercial agent généré en #63. Remplace les placeholders actuels.

## Acceptance Criteria
- Hero headline updated to "Hire an AI agent for your business" (from messages/en.json)
- Subtitle explains interim model in 1 sentence: "Post a job brief, get matched in 24h, start a 7-day trial — no commitment." (from messages)
- Primary CTA "Browse profiles" scrolls to ProfilesSection (smooth scroll, href="#profiles")
- Secondary CTA "Post a brief" links to /contact
- Right-side image uses /agents/commercial-agent.png (from story #63), displayed via next/image
- No placeholder text or lorem ipsum remains in the hero
- Renders correctly light + dark, desktop + mobile
