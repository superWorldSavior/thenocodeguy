---
id: 63
title: "Avatars agents — illustrations gpt-image-1.5 pour Commercial, Admin, Webmaster"
priority: high
size: S
labels: [sprint, design]
dependsOn: [59]
---

## Description
Générer 3 illustrations d'agents IA avec gpt-image-1.5. Style : portrait carré, fond neutre slate, look professionnel mais légèrement tech — pas un humain réaliste, pas un robot cartoon. Quelque chose entre les deux : agent augmenté. Formats : PNG 512x512, optimisés Next.js (public/agents/).

## Acceptance Criteria
- 3 images générées : commercial-agent.png, admin-agent.png, webmaster-agent.png dans public/agents/
- Style cohérent entre les 3 (même palette, même traitement)
- Chaque image pèse < 200KB après optimisation
- Les images sont référencées dans messages/en.json (clés: agents.commercial.avatar, agents.admin.avatar, agents.webmaster.avatar)
- La section ProfilesSection (#61) utilise ces images (next/image, width=128, height=128)
