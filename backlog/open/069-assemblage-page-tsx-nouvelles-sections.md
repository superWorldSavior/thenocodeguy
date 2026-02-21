---
id: 69
title: "Assemblage final page.tsx — nouvelles sections dans le bon ordre"
priority: high
size: M
labels: [sprint, design]
dependsOn: [60, 61, 62, 64, 65, 66, 67, 68]
---

## Description
Remplacer le contenu actuel de app/[locale]/page.tsx par les nouvelles sections dans l'ordre correct. Supprimer toutes les anciennes sections inline (stats 99€, ancien how it works en 3 étapes, pricing teaser bandeau, anciennes agents cards). Importer et assembler : Hero → Profils (#61) → Comment ça marche (#64) → Témoignages (#65) → Offre Fondateur (#68) → CTA Brief (#62) → Footer.

## Acceptance Criteria
- page.tsx contains exactly these sections in order: HeroSection, ProfilesSection, HowItWorksSection, TestimonialsSection, FounderOfferSection, CTASection, Footer
- No legacy inline sections remain (no stats, no old agents cards, no pricing teaser, no old how-it-works)
- Smooth scroll anchors work: href="#profiles" scrolls to ProfilesSection, href="#how-it-works" scrolls to HowItWorksSection
- All 4 locales render without errors (fr, en, zh-TW, zh-CN)
- Build passes, Lighthouse performance > 85
- Full page renders correctly light + dark, desktop + mobile
