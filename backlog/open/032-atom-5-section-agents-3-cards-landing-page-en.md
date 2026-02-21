---
id: 32
title: "[ATOM-5] Section Agents — 3 cards, landing page EN"
priority: high
size: M
labels: [sprint]
---

## Description
Section de la landing page présentant les 3 agents disponibles (Commercial, Admin, Webmaster). Cards atomiques réutilisables. Anglais uniquement. Vision cabinet RH : les agents sont des 'profils' à recruter.

## Acceptance Criteria
Fichier composant card : 
components/ui/agent-card.tsx
 

Fichier section : 
components/sections/agents-section.tsx
 

Section title : &quot;Open positions&quot; (H2) 

Section subtitle : &quot;3 specialized agents. Pick the one you need — or hire all three.&quot; 

AgentCard props : name, role, description, connectors[], slug, icon 

Layout : grid 3 colonnes desktop / 1 colonne mobile / 2 colonnes tablette 

Chaque card : shadcn Card avec icon Lucide (Briefcase/FileText/Globe), nom, rôle en badge, description 2 lignes max, liste de 3-4 connecteurs en tags, bouton &quot;View job description →&quot; 

Hover : border emerald légère, légère élévation (shadow-sm) 

Copy anglais : Commercial = &quot;Fills your pipeline while you sleep.&quot; / Admin = &quot;Never miss a deadline again.&quot; / Webmaster = &quot;Your site, running on autopilot.&quot; 

Light + dark mode complet sur la card 

Build passe. Screenshot desktop + mobile light + dark.


---
_Migrated from Azure DevOps #106_
