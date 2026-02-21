---
id: 24
title: "Refonte hero — split screen avec images réelles (pas fake UI)"
priority: high
size: M
labels: []
---

## Description
Remplacer le hero actuel (texte centré + gradient vague) par un split-screen : texte à gauche, mockup de conversation agent/humain à droite (style app de messagerie). Montrer l'agent en train de vraiment faire quelque chose. Inspiration : Linear.app, Intercom homepage.

## Acceptance Criteria
Layout split 50/50 desktop : copy à gauche, visuel à droite 

Visuel côté droit : 1-2 images générées avec gpt-image-1.5 (agent au travail, screenshot réel, ambiance pro) — découpées et intégrées en CSS (pas de fake UI codée) 

Style image : fond transparent ou intégré dans un cadre minimaliste (device frame léger ou flottant) 

Headline : revu selon le nouveau wording validé par Erwan (dépend de la story #101 wording) 

Ligne de logos apps sous le CTA : WhatsApp, Telegram, Slack, Teams, Discord, Signal (SVG) 

Mobile : image passe en dessous du copy, lisible 

Images WebP < 250KB, lazy-load, LCP < 2.5s 

Traduit 4 locales 

Dépend de : #101 (wording validé), #97 (multi-canal)


---
_Migrated from Azure DevOps #96_
