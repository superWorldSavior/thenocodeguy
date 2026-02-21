---
id: 72
title: "Supprimer la page /pricing — pricing intégré dans landing"
priority: medium
size: S
labels: [backlog, sprint]
dependsOn: [68, 69]
---

## Description
La page /pricing standalone n'a plus de raison d'être — le pricing est dans la section FounderOffer de la landing. Deux options : (a) redirect 301 /pricing → /#pricing, ou (b) supprimer le fichier et mettre à jour sitemap.ts. Préférer la redirection pour ne pas casser les liens existants.

## Acceptance Criteria
- Navigating to /pricing redirects to /#pricing (301 redirect in next.config.js)
- sitemap.ts no longer includes /pricing URL
- No broken links in the codebase pointing to /pricing
