# Implementation Plan: Site Polish & Pages Domaines

**Branch**: `061-site-polish-domaines` | **Date**: 2026-02-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/061-site-polish-domaines/spec.md`

## Summary

Créer les 3 pages domaines manquantes (Commerce, Admin, Web) sur le même template Avant/Après que la page BTP existante, avec traductions 4 locales. Polish le formulaire contact (ajout BTP dans les rôles, fix styles selects). Renommer Lab → Blog avec redirections 301.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Next.js 16 (App Router)
**Primary Dependencies**: next-intl, shadcn/ui, Tailwind CSS v4, lucide-react
**Storage**: N/A (contenu statique dans les fichiers i18n)
**Testing**: Vitest (`specs/ac-tests/`), build gate (`npm run build`)
**Target Platform**: Web (Vercel), responsive desktop + mobile
**Project Type**: Web application (marketing site)
**Performance Goals**: N/A (pages statiques SSG)
**Constraints**: 4 locales obligatoires, build must pass, pas de secrets dans le repo
**Scale/Scope**: 3 nouvelles pages, 1 form polish, 1 rename route + redirections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. User-First, Locale-First | PASS | Toutes les pages seront traduites dans les 4 locales (fr, en, zh-TW, zh-CN) |
| II. Server Components by Default | PASS | Les pages domaines sont des server components. Le formulaire contact reste un client component (nécessaire pour les handlers). |
| III. Visual Quality over Speed | PASS | Même template visuel que BTP, images existantes, dark mode vérifié. |
| IV. Confidentiality | PASS | Références clients anonymisées ("Entreprise leader", "Client retail"). Pas de noms réels. |
| V. Simplicity & No Over-Engineering | PASS | Réutilisation du template BTP existant. Pas de nouvelle abstraction. |
| VI. Build Must Pass | PASS | Build vérifié à chaque étape. |

## Project Structure

### Documentation (this feature)

```text
specs/061-site-polish-domaines/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/[locale]/
├── domaines/
│   ├── btp/page.tsx           # Existant
│   ├── commerce/page.tsx      # NOUVEAU — même template que BTP
│   ├── admin/page.tsx         # NOUVEAU — même template que BTP
│   └── web/page.tsx           # NOUVEAU — même template que BTP
├── blog/                      # RENOMMÉ depuis lab/
│   ├── page.tsx               # Copié depuis lab/page.tsx
│   ├── comment-automatiser-veille-email/page.tsx
│   └── windmill-vs-n8n/page.tsx
└── lab/                       # SUPPRIMÉ (redirections via middleware/proxy)

components/
├── Navigation.tsx             # Ajout lien Blog
├── Footer.tsx                 # Lab → Blog (déjà supprimé Lab, ajouter Blog)
└── organisms/
    └── (pas de nouveau composant)

app/[locale]/contact/
└── ContactForm.tsx            # Fix styles selects + ajout rôle BTP

messages/
├── fr.json                    # +domainesCommerce, +domainesAdmin, +domainesWeb, +blog namespace
├── en.json                    # Sync
├── zh-TW.json                # Sync
└── zh-CN.json                # Sync
```

**Structure Decision**: Pas de nouveau composant partagé. Chaque page domaine est une page server component autonome avec le même pattern que `btp/page.tsx`. Les articles Lab sont déplacés sous `/blog/` avec le même code.
