---
id: 25
title: "Messaging multi-canal — remplacer WhatsApp partout dans le site"
priority: high
size: M
labels: []
---

## Description
Le site dit 'WhatsApp' 7+ fois alors que les agents fonctionnent sur WhatsApp, Telegram, Slack, Teams, Discord, Signal. Corriger le wording partout et montrer les logos des apps supportées.

## Acceptance Criteria
Audit complet : grep 'WhatsApp' dans tous les fichiers messages/[locale].json et composants 

Remplacement du wording : 'via WhatsApp' → 'depuis vos apps (WhatsApp, Telegram, Slack…)' ou équivalent naturel par locale 

Composant <ChannelBadges /> créé : affiche les logos WhatsApp, Telegram, Slack, Teams, Discord, Signal côte à côte 

Ce composant est utilisé dans : hero, section agents, page pricing, pages agents/[slug] 

Logos en SVG (pas emoji), dark+light mode compatibles 

Traductions cohérentes dans les 4 locales 

Aucune mention &quot;WhatsApp only&quot; restante dans le site


---
_Migrated from Azure DevOps #97_
