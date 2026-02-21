---
id: 37
title: "Docker template déploiement — The No Code Commercial"
priority: medium
size: M
labels: []
---

## Description
Docker Compose + scripts d'installation pour déployer l'agent commercial chez un client en moins de 10 minutes. Variables d'environnement documentées, secrets management.

## Acceptance Criteria
Un fichier docker-compose.yml existe et démarre l'agent Commercial sans erreur avec docker-compose up. 

Toutes les variables d'environnement requises sont documentées dans un fichier .env.example. 

Un script d'installation permet le déploiement complet en moins de 10 minutes sur une machine vierge. 

Les secrets (PAT, tokens API) sont gérés via variables d'environnement et jamais hardcodés dans le docker-compose.yml.


---
_Migrated from Azure DevOps #45_

## Archive Note — 2026-02-21
**Status:** OBSOLETE — positioning change to AI staffing agency model (Randstad de l'IA). No agent catalog, no profiles, no avatars, no pricing displayed, custom agents only.
