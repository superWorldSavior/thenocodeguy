# Implementation Plan: Homepage Polish

**Branch**: `001-homepage-polish` | **Date**: 2026-02-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-homepage-polish/spec.md`

## Summary

Polish the thenocodeguy.com homepage to production quality: fix AI-generated images that still have blue/holographic artefacts, verify dark mode across all 7 sections, ensure responsive design on mobile/tablet, and optimize Tailwind v4 usage by replacing custom CSS with native utilities.

## Technical Context

**Language/Version**: TypeScript 5
**Primary Dependencies**: Next.js 16, Tailwind CSS v4, next-intl, next-themes, shadcn/ui
**Storage**: N/A
**Testing**: Vitest (for AC tests), visual browser testing
**Target Platform**: Web (Vercel), all modern browsers + Safari iOS
**Project Type**: web-service (Next.js App Router)
**Performance Goals**: LCP < 2.5s, build < 60s
**Constraints**: 4 locales must work identically, images must be WebP, dark mode must work
**Scale/Scope**: 7 homepage sections, 6 images, 1 CSS file, 7 components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. User-First, Locale-First | PASS | All changes are locale-independent (CSS/images) |
| II. Server Components by Default | PASS | All homepage sections are already RSC |
| III. Visual Quality over Speed | PASS | This feature IS about visual quality |
| IV. Confidentiality | PASS | KellyAssist already anonymized |
| V. Simplicity | PASS | Goal is to reduce complexity (less custom CSS) |
| VI. Build Must Pass | PASS | Will verify after each phase |

## Project Structure

### Documentation (this feature)

```text
specs/001-homepage-polish/
├── spec.md
├── plan.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (files to modify)

```text
app/globals.css                              # Tailwind v4 theme + custom utilities
components/organisms/HeroSection.tsx         # Responsive + dark mode fixes
components/organisms/StatsSection.tsx        # Dark mode verification
components/organisms/DomainesSection.tsx     # Image display + dark mode
components/organisms/HowItWorksSection.tsx   # Responsive timeline
components/organisms/MissionsSection.tsx     # Case study dark mode
components/organisms/TestimonialsSection.tsx # Dark mode cards
components/organisms/CTASection.tsx          # Dark mode CTA
scripts/generate-homepage-images.ts          # Image prompts refinement
public/images/homepage/*.webp                # Regenerated images
```

## Complexity Tracking

No violations. All changes are within existing files, no new dependencies or abstractions needed.
