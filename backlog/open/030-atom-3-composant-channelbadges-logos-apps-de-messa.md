---
id: 30
title: "[ATOM-3] Composant ChannelBadges — logos apps de messagerie"
priority: high
size: M
labels: [sprint]
---

## Description
Composant réutilisable affichant les logos des apps supportées (WhatsApp, Telegram, Slack, Teams, Discord, Signal). Utilisé dans le hero et les pages agents. Light + dark mode. SVG inline pour performance.

## Acceptance Criteria
Fichier : 
components/ui/channel-badges.tsx
 

Props : 
size?: 'sm' | 'md' | 'lg'
, 
showLabel?: boolean
 

Logos en SVG inline (pas d'images externes) pour les 6 apps : WhatsApp, Telegram, Slack, Microsoft Teams, Discord, Signal 

Chaque logo dans un wrapper rond avec fond adapté au mode (light/dark) 

Disposition : flex row, gap-2, wrap sur mobile 

Si showLabel=true : label texte sous les logos &quot;Works with your favorite apps&quot; 

Accessible : aria-label sur chaque logo avec le nom de l'app 

Light mode : fond logos blanc avec border slate-200 / Dark : slate-800 

Tailles : sm=24px, md=32px, lg=40px 

Test : composant rendu isolément en light ET dark mode dans un test Playwright 

Build passe.


---
_Migrated from Azure DevOps #104_
