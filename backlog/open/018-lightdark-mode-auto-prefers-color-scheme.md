---
id: 18
title: "Light/dark mode auto (prefers-color-scheme)"
priority: high
size: M
labels: []
---

## Description
Le site est full dark actuellement. Implémenter le support auto light/dark basé sur prefers-color-scheme du device. 

Tailwind: darkMode media est natif. Le challenge est de réécrire toutes les couleurs hardcodées (bg-gray-950, text-white, border-white/10, etc.) en classes qui switchent. 

Approche technique 

Tailwind v4 : darkMode: media (détection auto) 

Définir palette light : bg-white/gray-50, text-gray-900, border-gray-200, accent emerald-600 

Préfixer les classes dark existantes avec dark: 

Tous les composants : Nav, Footer, Hero, Cards, FAQ, Pricing, Agent detail, Legal, Privacy 
 

AC 

En mode light OS : fond clair, texte sombre, accents emerald 

En mode dark OS : thème actuel conservé 

Transition smooth (pas de flash) 

Toutes les pages cohérentes dans les deux modes 

Aucune régression visuelle en dark mode 

Screenshots Playwright des deux modes

## Acceptance Criteria
Le site détecte prefers-color-scheme et applique le thème correspondant au premier chargement 

Un toggle manuel permet de basculer light/dark et persiste en localStorage 

Toutes les pages (homepage, agents, pricing, contact, legal) sont lisibles dans les deux modes 

Pas de flash blanc (FOUC) au chargement en mode dark 

Contraste WCAG AA respecté dans les deux modes


---
_Migrated from Azure DevOps #87_
