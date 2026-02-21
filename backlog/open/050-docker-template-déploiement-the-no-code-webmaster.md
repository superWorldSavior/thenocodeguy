---
id: 50
title: "Docker template déploiement — The No Code Webmaster"
priority: medium
size: M
labels: []
---

## Description
Docker Compose + scripts pour déployer l'agent webmaster. Inclut Umami instance, connexion Vercel, accès Windmill Apps.

## Acceptance Criteria
Un fichier docker-compose.yml existe pour l'agent Webmaster et démarre sans erreur avec docker-compose up. 

Le compose inclut un service Umami (instance propre) configuré et accessible. 

Les variables d'environnement pour Vercel (API token) et Windmill Apps sont documentées dans .env.example. 

La connexion à l'instance Umami est vérifiable : la page de login Umami est accessible après docker-compose up.


---
_Migrated from Azure DevOps #67_
