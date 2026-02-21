---
id: 64
title: "Section 'Comment ça marche' — funnel intérim en 4 étapes"
priority: high
size: M
labels: [sprint, design]
dependsOn: [59, 60]
---

## Description
Section visuelle qui explique le processus de recrutement d'un agent en 4 étapes : (1) Déposez un brief de poste → (2) Appel matching 20min → (3) 7 jours d'essai sans CB → (4) Mission lancée. Style timeline horizontale (desktop) / verticale (mobile). Icônes shadcn/ui. Accent indigo. Chaque étape a un titre, une description courte, et une icône.

## Acceptance Criteria
- Section renders 4 steps with icon, title, and short description per step
- Layout: horizontal timeline on desktop (≥768px), vertical stacked on mobile
- All text sourced from messages/en.json (no hardcoded strings)
- Step titles use hiring vocabulary: "Post a brief", "Matching call", "7-day trial", "Mission starts"
- Icons from lucide-react (already in shadcn/ui)
- Accent color uses indigo CSS variable (--color-primary)
- Component at components/organisms/HowItWorksSection.tsx
- Renders correctly light + dark, desktop + mobile

## Block log — 2026-02-21 07:20 UTC
**Verdict:** CHANGES_REQUESTED — PR #68 from parallel process is broken

1. HowItWorksSection never imported on homepage — feature doesn't render
2. `howItWorks` i18n keys missing from all locale files — component will crash
3. Scope creep: PR includes TestimonialsSection (#65), story #63 backlog edits
4. Untranslated testimonials in fr/zh-CN/zh-TW (English text in non-EN locales)
5. `as any` TypeScript casts

**Fix:** Start fresh — clean branch with only story #64 scope
