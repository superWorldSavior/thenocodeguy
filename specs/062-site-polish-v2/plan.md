# Implementation Plan: Site Polish V2

**Branch**: `062-site-polish-v2` | **Date**: 2026-02-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/062-site-polish-v2/spec.md`

## Summary

Refonte visuelle des pages blog pour les intégrer au design system shadcn/ui (remplacement des couleurs hardcodées par des design tokens), remplacement du sélecteur de langue horizontal par un globe + dropdown, et vérification globale de cohérence (liens morts, dark mode, build).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)
**Primary Dependencies**: Next.js 16, Tailwind CSS v4, shadcn/ui, next-intl, lucide-react
**Storage**: N/A (pas de données persistantes)
**Testing**: Build gate (`npm run build`) + vérification visuelle
**Target Platform**: Web (Vercel)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: N/A (polish visuel, pas de changement fonctionnel)
**Constraints**: 4 locales obligatoires (fr, en, zh-TW, zh-CN), dark mode + light mode
**Scale/Scope**: 3 pages blog + 1 composant Navigation + vérification globale

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. User-First, Locale-First | PASS | Pas de nouvelles clés i18n — on modifie uniquement le style. Le locale switcher change d'UI mais garde les mêmes 4 locales. |
| II. Server Components by Default | PASS | Les pages blog sont déjà des Server Components. Le locale switcher est déjà client (Navigation.tsx). Le nouveau DropdownMenu sera client — minimum scope. |
| III. Visual Quality over Speed | PASS | C'est l'objet même de cette feature — aligner le blog sur le design system brand. |
| IV. Confidentiality | PASS | Aucune donnée client exposée. |
| V. Simplicity & No Over-Engineering | PASS | On remplace des couleurs hardcodées par des tokens existants. Un seul nouveau composant shadcn (DropdownMenu). |
| VI. Build Must Pass | PASS | Vérifié en fin d'implémentation. |

## Project Structure

### Documentation (this feature)

```text
specs/062-site-polish-v2/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (files to modify)

```text
# US1 — Blog refonte design system
app/[locale]/blog/page.tsx                              # Blog listing
app/[locale]/blog/comment-automatiser-veille-email/page.tsx  # Article 1
app/[locale]/blog/windmill-vs-n8n/page.tsx              # Article 2

# US2 — Globe locale switcher
components/Navigation.tsx                                # Locale switcher refonte
components/ui/dropdown-menu.tsx                          # Nouveau composant shadcn

# US3 — Vérification
# Aucun fichier spécifique — build + vérification visuelle

# i18n (si besoin de renommer des clés Lab→Blog)
messages/fr.json
messages/en.json
messages/zh-TW.json
messages/zh-CN.json
```

**Structure Decision**: Pas de nouveaux répertoires — modifications in-place dans les fichiers existants. Un seul composant UI ajouté (dropdown-menu via shadcn CLI).

## Complexity Tracking

> Aucune violation de constitution — pas de tracking nécessaire.
