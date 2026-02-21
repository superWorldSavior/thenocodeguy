---
id: 71
title: "Refonte Footer — tagline et liens agence de recrutement"
priority: medium
size: S
labels: [sprint, design]
dependsOn: [60]
---

## Description
Mettre à jour Footer.tsx : tagline recrutement ("Your AI staffing agency" / "Votre agence de recrutement d'agents IA"), supprimer lien Pricing, ajouter lien Lab. Corriger les couleurs hardcodées (emerald → var(--primary)). Vérifier rendu mobile.

## Acceptance Criteria
- Footer tagline updated to recruitment framing in en.json and fr.json
- No "Pricing" / "Tarifs" link in footer
- "Lab" link present in footer
- No hardcoded emerald/green colors — all using CSS variables
- Footer renders correctly light + dark, mobile + desktop
