---
id: 67
title: "Supprimer ChannelBadges du hero — nettoyer HeroSection"
priority: high
size: S
labels: [sprint, design]
dependsOn: [66]
---

## Description
Le composant ChannelBadges (logos WhatsApp/Telegram/Slack/Teams/Discord/Signal) ne doit plus apparaître dans le hero. Il véhicule un message "outil SaaS qui s'intègre à vos apps" — le contraire d'une agence de recrutement. Retirer l'import et l'usage dans HeroSection.tsx. Le composant reste dans le repo (usage potentiel en page détail agent).

## Acceptance Criteria
- ChannelBadges is no longer rendered in HeroSection
- No import of ChannelBadges remains in HeroSection.tsx
- Hero layout adapts cleanly without the badges row (no empty gap or broken layout)
- Build passes, light + dark, desktop + mobile renders correctly
