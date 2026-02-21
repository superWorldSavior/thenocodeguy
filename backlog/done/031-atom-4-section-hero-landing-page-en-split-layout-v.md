---
id: 31
title: "[ATOM-4] Section Hero — landing page EN, split layout, vision cabinet RH"
priority: high
size: M
labels: [sprint]
---

## Description
Section hero de la landing page. Layout split desktop : copy + CTA à gauche, visuel à droite. Vision 'Hire an agent, not a tool'. Anglais uniquement. Utilise les composants ATOM-1/2/3. Image placeholder d'abord (gpt-image-1.5 après validation du wording).

## Acceptance Criteria
Fichier : 
components/sections/hero.tsx
 

Layout desktop (≥1024px) : grid 2 colonnes 55/45, texte gauche, visuel droite 

Layout mobile : stack vertical, visuel en dessous du copy 

Badge : &quot;AI Staffing Agency&quot; (shadcn Badge, variant secondary) 

Headline H1 : &quot;Hire an agent, not a tool.&quot; — font-extrabold, text-5xl desktop / text-3xl mobile 

Subline : &quot;Pick a role. We staff it with an autonomous AI agent — operational in 48h. No setup, no training, no contract.&quot; — text-lg, text-muted-foreground 

CTA primaire : &quot;Browse open roles →&quot; → /agents (shadcn Button, variant default, size lg) 

CTA secondaire : &quot;See how it works&quot; → #how (shadcn Button, variant outline, size lg) 

ChannelBadges (ATOM-3, size md, showLabel=true) sous les CTAs 

Visuel droite : image placeholder (div gris avec icône Robot Lucide) — remplacé par gpt-image-1.5 après wording validé 

Background : gradient radial subtil emerald/slate en haut à gauche 

Light mode : fond blanc, texte slate-900 / Dark : fond slate-950, texte white 

LCP < 2.5s — pas d'image lourde dans cette story 

Build passe. Screenshot desktop + mobile light + dark.


---
_Migrated from Azure DevOps #105_
