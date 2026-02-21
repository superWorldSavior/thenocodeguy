---
id: 49
title: "Config OpenClaw — The No Code Webmaster"
priority: medium
size: M
labels: []
---

## Description
Configuration OpenClaw complète pour l'agent webmaster client :

Sécurité (critique) :

- tools.profile: minimal
- tools.allow: web_search, web_fetch, message, cron, memory_search, memory_get, read, write, edit, session_status
- tools.exec.security: deny (ZÉRO accès shell)
- tools.elevated: disabled
- Workspace isolé (son propre dossier uniquement)

Config agent :

- SOUL.md : personnalité webmaster (créatif, orienté résultat)
- HEARTBEAT.md : check analytics, vérif uptime site
- Skills activés : Vercel API, GitHub API, Umami API
- Crons : rapport analytics hebdo, check SEO mensuel
- Tokens client stockés en variables d'environnement de l'agent (pas dans le workspace)

Routing WhatsApp :

- Connecté au numéro du client directement
- Routing rules pour ne répondre qu'aux conversations pertinentes

## Acceptance Criteria
La config OpenClaw de l'agent Webmaster a tools.exec.security défini à deny (zéro accès shell vérifiable). 

La liste tools.allow contient exactement les outils autorisés : web_search, web_fetch, message, cron, memory_search, memory_get, read, write, edit, session_status. 

Le SOUL.md de l'agent Webmaster existe avec sa personnalité et ses connecteurs documentés. 

Le HEARTBEAT.md existe et définit les checks périodiques : vérification uptime site et rapport analytics. 

Le workspace de l'agent est isolé dans son propre dossier, inaccessible aux autres agents.


---
_Migrated from Azure DevOps #66_
