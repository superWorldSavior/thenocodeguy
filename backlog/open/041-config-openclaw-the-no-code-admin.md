---
id: 41
title: "Config OpenClaw — The No Code Admin"
priority: medium
size: M
labels: []
---

## Description
Configuration OpenClaw complète pour l'agent admin: SOUL.md, HEARTBEAT.md, skills, crons (rappels mensuels/hebdo), gestion des pièces jointes.

## Acceptance Criteria
Un fichier de config OpenClaw valide existe pour l'agent Admin avec SOUL.md et HEARTBEAT.md référencés. 

Le HEARTBEAT.md définit les vérifications hebdomadaires (factures non classées, échéances à venir) et mensuelles (rapport dépenses). 

Les skills Gmail/Outlook et stockage fichiers sont activés et configurés dans la config. 

Les crons sont configurés : rappel mensuel le 1er du mois, rappel hebdo chaque lundi. 

La gestion des pièces jointes (formats acceptés, taille max) est documentée dans la config.


---
_Migrated from Azure DevOps #50_
