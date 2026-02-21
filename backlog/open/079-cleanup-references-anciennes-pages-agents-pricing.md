---
id: 79
title: "Cleanup — supprimer toutes les références aux anciennes pages (/agents/[slug], /pricing)"
priority: high
size: S
labels: [sprint]
---

## Description
Après l'archivage des stories liées au catalog agent et au pricing, nettoyer le codebase : supprimer les composants, routes, et traductions liés à /agents/[slug], /pricing, profiles, avatars. Mettre des redirects 301 si nécessaire.

## Acceptance Criteria
- Aucune route /agents/[slug] active (commercial, admin, webmaster)
- /pricing redirige 301 vers / ou /#contact
- Aucun lien interne vers /agents/[slug] ou /pricing dans le codebase
- Composants orphelins supprimés (AgentDetail, ProfilesSection, etc.)
- sitemap.ts mis à jour (pas de URLs supprimées)
- Build passe sans erreur
