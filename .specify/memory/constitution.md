<!--
  Sync Impact Report
  Version change: 0.0.0 → 1.0.0
  Added principles: I–VI (all new)
  Added sections: Stack & Constraints, Development Workflow
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ compatible (Constitution Check section aligns)
    - .specify/templates/spec-template.md ✅ compatible (user stories + acceptance criteria align)
    - .specify/templates/tasks-template.md ✅ compatible (phase structure aligns)
  Follow-up TODOs: none
-->

# TheNoCodeGuy Constitution

## Core Principles

### I. User-First, Locale-First

Every page, component, and feature MUST work across all 4 supported locales (fr, en, zh-TW, zh-CN) from day one. French is the primary locale. All user-facing strings MUST use `next-intl` translation keys — no hardcoded text. New features MUST include translation keys in all 4 `messages/*.json` files before merging.

### II. Server Components by Default

All components MUST be React Server Components unless they require client-side interactivity (event handlers, hooks, browser APIs). Client components MUST include the `'use client'` directive and be kept to the minimum scope necessary. Data fetching MUST happen on the server via `getTranslations`, `getMessages`, or server actions — never in client components.

### III. Visual Quality over Speed

The site represents a professional AI staffing agency. Generic AI aesthetics (blue holograms, translucent figures, sci-fi effects) are BANNED. All generated images MUST look like real corporate photography. The brand identity is navy blue (`#05004b`) + yellow (`#ffde59`). Every visual change MUST be verified in both light and dark mode, on desktop and mobile viewports, before merging.

### IV. Confidentiality

Real client names, internal project details, and business-sensitive information MUST NOT appear in public-facing code or content. Use anonymized references ("Entreprise BTP leader", "Client retail") instead. This applies to component code, translation files, image filenames, alt text, comments, and commit messages.

### V. Simplicity & No Over-Engineering

Start with the simplest solution that works. No premature abstractions, no feature flags for one-time operations, no unnecessary wrapper components. Tailwind utility classes are preferred over custom CSS unless a utility is reused across 3+ components. New dependencies MUST be justified — the stack is already complete for most needs.

### VI. Build Must Pass

`npm run build` MUST pass with zero errors before any commit to `main`. New pages and components MUST be verified by the build. Hydration mismatches MUST be fixed immediately (use `suppressHydrationWarning` only for known `next-themes` behavior on `<html>`). Unused imports and dead code MUST be removed.

## Stack & Constraints

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with `@theme inline` blocks, shadcn/ui components
- **i18n**: next-intl with file-based routing (`/[locale]/...`)
- **Locales**: fr (primary), en, zh-TW, zh-CN
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + Umami (self-hosted)
- **Image generation**: OpenAI GPT Image API (gpt-image-1.5) — one-shot script, not runtime
- **Brand colors**: Primary `#05004b` (navy), Accent `#ffde59` (yellow)
- **Dark mode**: `next-themes` with `attribute="class"`, navy background `#0a0040`, yellow as primary
- **Testing**: Vitest for acceptance criteria tests (`specs/ac-tests/`)
- **Project documentation**: GitHub Spec Kit (`.specify/`, `.claude/commands/speckit.*.md`)

## Development Workflow

1. **Spec first**: New features MUST start with `/speckit.specify` to define user stories and acceptance criteria before any code is written.
2. **Plan before code**: Use `/speckit.plan` to define technical approach and file structure. Get plan approval before implementation.
3. **Atomic commits**: Each logical change is one commit. Commit messages follow conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
4. **Visual verification**: Every UI change MUST be reviewed in the browser (dev server on port 3005) before committing. Screenshot or confirm in Chrome.
5. **Translation sync**: When adding/modifying translation keys, ALL 4 locale files MUST be updated in the same commit.
6. **No secrets in repo**: API keys in `.env.local` only. Never commit `.env.local`, credentials, or client-identifying data.
7. **Branch strategy**: `main` is the production branch. Feature work uses feature branches when the scope exceeds a single commit.

## Governance

This constitution is the authoritative reference for all development decisions on thenocodeguy.com. When a proposed change conflicts with a principle, the principle wins unless the constitution is amended first.

**Amendment process**:
1. Propose the change with rationale via `/speckit.constitution`.
2. Document the version bump (MAJOR for principle removal/redefinition, MINOR for additions, PATCH for clarifications).
3. Update dependent templates if affected.

**Compliance**: Every PR and code review MUST verify alignment with these principles. The build gate (Principle VI) is enforced automatically.

**Version**: 1.0.0 | **Ratified**: 2026-02-25 | **Last Amended**: 2026-02-25
