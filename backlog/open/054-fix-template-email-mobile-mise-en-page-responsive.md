---
id: 54
title: "Fix template email mobile — mise en page responsive"
priority: medium
size: M
labels: []
---

## Description
Les emails envoyés via Graph API (rapports, rétros, visions produit) ont un template HTML avec des div imbriqués trop narrow sur mobile. Illisibles sur petit écran. 

AC 

Template HTML responsive (max-width 100%, padding adaptatif) 

Lisible sur iPhone SE (375px) et Android standard 

Structure simple : header, body, footer — pas de div nested complexes 

Testé sur Gmail mobile + Apple Mail

## Acceptance Criteria
Template email s affiche correctement sur mobile (iOS Mail, Gmail app, Outlook mobile) 

Largeur max 600px, texte lisible sans zoom 

Boutons CTA cliquables (min 44x44px touch target) 

Images responsives avec max-width:100%


---
_Migrated from Azure DevOps #93_
