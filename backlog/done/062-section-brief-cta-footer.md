---
id: 62
title: "Section CTA 'Poster un brief de poste' + Footer"
priority: high
size: S
labels: [sprint, design]
dependsOn: [60]
---

## Description
Section CTA finale de la landing page : titre fort, sous-titre sur le processus, bouton "Poster un brief de poste" → /contact ou Calendly. Aucun prix affiché. Le client indiquera sa fourchette de budget dans le formulaire de brief. Footer propre avec liens navigation et legal.

## Acceptance Criteria
- CTA section renders with headline and a primary button "Post a job brief" / "Poster un brief" linking to /contact
- No price displayed in this section
- Footer renders with: logo, tagline (agency framing), links (Nos agents, Lab, Contact), legal links
- All text via messages/en.json (no hardcoded strings)
- Components: organisms/CTASection.tsx, organisms/Footer.tsx (update existing)
- Renders correctly light + dark, desktop + mobile
