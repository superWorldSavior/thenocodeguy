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


## Block log — 2026-02-21 06:54 UTC
**Verdict:** CHANGES_REQUESTED — visual inconsistency

- 3 images use different illustration styles (cel-shaded cartoon vs flat monochrome vs semi-painterly)
- Commercial: too cartoonish (thick outlines)
- Admin: gray/lifeless (looks like an icon)
- Webmaster: busy background (floating code snippets)
- Technical implementation is clean — only visual quality blocked

**Fix:** Regenerate all 3 with unified style prompt, targeting semi-painterly digital art as baseline
