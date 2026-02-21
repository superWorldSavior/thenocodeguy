---
id: 59
title: "Refonte thème — Slate + Indigo (remplace emerald/dark)"
priority: high
size: M
labels: [sprint, design]
dependsOn: [57]
---

## Description
Le thème actuel emerald/dark crie "AI SaaS startup". On repositionne comme agence d'intérim : le thème doit transmettre confiance, professionnalisme, légèrement tech. Remplacement complet par Slate + Indigo en light mode.

## Acceptance Criteria
- All CSS custom properties using green/emerald are replaced by slate (primary) and indigo (accent) tokens in globals.css
- The site renders in light mode by default with slate-based neutral palette (slate-50 background, slate-900 text)
- Primary action color (buttons, links, highlights) uses indigo-600 (light) / indigo-400 (dark)
- No emerald, green, or teal color remains in globals.css, tailwind.config, or any component
- The Header, HeroSection, and ChannelBadges components render correctly with the new palette
- Dark mode variant remains functional using CSS variable overrides (not hardcoded dark colors)
