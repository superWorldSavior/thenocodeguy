---
id: 48
title: "Workflows packagés — site Vercel + apps Windmill + analytics Umami"
priority: medium
size: M
labels: []
---

## Description
Workflows Windmill pour l'agent webmaster :
(1) Création et publication site client via 
API Vercel
 (token client)
(2) Mise à jour contenu, blog posts, landing pages sur commande WhatsApp
(3) Gestion repo via 
API GitHub
 (PAT client) — push, commits, PR
(4) Création dashboards et mini-apps via Windmill Apps
(5) Suivi analytics via 
API Umami
 — rapports hebdo/mensuel automatiques
(6) SEO basique : meta tags, sitemap, robots.txt

IMPORTANT : tout passe par des appels API HTTP. Zéro accès shell. L'agent utilise web_fetch + skills dédiés, jamais exec/bash.

Tokens nécessaires par client : GitHub PAT, Vercel API token, Umami site ID.

## Acceptance Criteria
Un workflow creation_site_vercel existe : reçoit un template et un token Vercel client, crée et déploie le site, retourne l'URL de production. 

Un workflow mise_a_jour_contenu existe : reçoit un chemin de fichier et du contenu, effectue un commit GitHub et déclenche le redéploiement Vercel. 

Un workflow gestion_repo_github existe : supporte push, commit et création de PR via API GitHub (PAT client). 

Un workflow rapport_analytics_umami existe : génère un rapport hebdomadaire/mensuel via API Umami et l'envoie par WhatsApp/email. 

Tous les workflows passent exclusivement par des appels API HTTP (zéro accès shell).


---
_Migrated from Azure DevOps #65_
