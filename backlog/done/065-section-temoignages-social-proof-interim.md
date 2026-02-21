---
id: 65
title: "Section témoignages — social proof framing recrutement d'agent"
priority: medium
size: S
labels: [sprint, design]
dependsOn: [60]
---

## Description
3 témoignages courts de clients fictifs (early adopters type) avec le bon framing : ils ont "recruté" un agent, pas "souscrit à un service". Noms fictifs crédibles, rôle + entreprise, citation concrète sur ce que l'agent fait pour eux. Style : cards épurées, avatar initiales colorées, étoiles (5/5).

## Acceptance Criteria
- Section renders 3 testimonial cards with: avatar (colored initials), full name, role + company, star rating (5/5), quote text
- All text via messages/en.json (no hardcoded strings)
- Quotes use hiring framing: "hired", "my agent handles", "since onboarding my agent"
- Cards use slate palette + indigo accent stars
- Layout: 3 columns desktop, 1 column mobile
- Component at components/organisms/TestimonialsSection.tsx

## Block log — 2026-02-21 07:53 UTC
**Verdict:** CHANGES_REQUESTED

1. Palette violation: bg-sky-* and bg-violet-* break slate+indigo-only rule → use bg-primary/10 variants
2. Dead i18n keys: old home.testimonial0* keys not cleaned up
3. Mixed language in zh: "cold邮件" should be fully translated
