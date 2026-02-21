---
id: 62
title: "Section Brief de poste + CTA Calendly + Footer"
priority: high
size: M
labels: [sprint, design]
dependsOn: [61]
---

## Description
Section finale de la landing page : CTA pour déposer un brief de poste (lien Calendly ou formulaire simple), section pricing honnête (149€ fondateur / 249€ public, pas de grille de features), et footer propre. Le CTA doit ressembler à "Déposez une offre d'emploi" pas à "Commencez votre essai gratuit".

## Acceptance Criteria
- CTA section renders with headline "Post a job brief" / "Déposez un brief de poste" and a primary button linking to /contact (or Calendly URL from env var NEXT_PUBLIC_CALENDLY_URL)
- Pricing section shows 2 options: Founder offer (149€/month, limited to 10 spots, locked for life) and Standard (249€/month) — no feature grid, just the key differentiator (founder price locked for life)
- Footer renders with: logo, tagline, links (Contact, Lab), legal notice, copyright
- All text via messages/en.json
- Components placed at correct atomic level: organisms/CTASection.tsx, organisms/PricingSection.tsx, organisms/Footer.tsx
- Page builds without errors and renders correctly light + dark, desktop + mobile
