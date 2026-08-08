# Research: SEO Optimization

**Feature**: 005-seo-optimization | **Date**: 2026-02-26

## R1: Title Duplication Root Cause

**Decision**: Remove `template` from `app/layout.tsx`, keep only in `app/[locale]/layout.tsx`

**Rationale**: Two layout files both define `template: "%s | TheNoCodeGuy"`:
- `app/layout.tsx` (root layout, line 7)
- `app/[locale]/layout.tsx` (locale layout, line 19)

Next.js applies the closest layout's template. Since `app/[locale]/layout.tsx` is the actual renderer (with `<html>`, `<body>`, etc.), it wins. However, metaTitle translations like `"Assistante administrative BTP augmentée par l'IA — TheNoCodeGuy"` already include "— TheNoCodeGuy" as a suffix. The template then adds "| TheNoCodeGuy", creating: `"Assistante administrative BTP augmentée par l'IA — TheNoCodeGuy | TheNoCodeGuy"`.

**Fix**:
1. Remove template and default title from `app/layout.tsx` (keep it as a pass-through)
2. Keep template in `app/[locale]/layout.tsx` as `"%s | TheNoCodeGuy"`
3. Remove "— TheNoCodeGuy" suffix from ALL metaTitle translation keys (it's redundant with the template)
4. Ensure all metaTitles are under ~48 chars so that with "| TheNoCodeGuy" (~15 chars) the total stays under 60

**Alternatives considered**:
- Remove template from both layouts → loses brand consistency in browser tabs
- Keep both templates → duplicate suffix bug persists

## R2: Meta Description Strategy

**Decision**: Replace "Automatisez" with delegation/agent language in all metaDesc keys, target 120-155 characters

**Rationale**: DataForSEO audit shows "agent ia" (6,600/mo) and "assistant ia" (1,900/mo) are high-volume keywords. Current meta descriptions use "Automatisez" which doesn't match the staffing positioning or keyword targets.

**Approach**:
- BTP: Target "agent IA BTP", "assistante administrative IA BTP"
- Commerce: Target "agent IA commercial", "pipeline commercial IA"
- Admin: Target "agent IA administratif", "back-office IA"
- Web: Target "agent IA webmaster", "maintenance web IA"
- All descriptions: 120-155 chars, include CTA language ("déployé en 48h")

## R3: Pillar Page /agent-ia Architecture

**Decision**: New page at `app/[locale]/agent-ia/page.tsx` using server component + translations

**Rationale**: "agent ia" is the #1 keyword opportunity at 6,600 searches/month. No existing page targets it. A pillar page with 1,500+ words (FR) positions TheNoCodeGuy as the authority.

**Structure**:
- Hero with H1 containing "Agent IA"
- Section: Qu'est-ce qu'un agent IA ?
- Section: Types d'agents IA (commercial, admin, webmaster, BTP)
- Section: Cas d'usage par secteur (links to domain pages)
- Section: Comment ça marche chez TheNoCodeGuy
- FAQ section (structured data ready)
- CTA section (Cal.com booking)
- All content via translation keys in `agentIA` namespace

## R4: Domain Page Enrichment Strategy

**Decision**: Add FAQ and expanded use-case sections below existing before/after cards

**Rationale**: Spec requirement FR-009 mandates 1,500+ words for BTP, 1,000+ for others. Current pages have ~300-500 words (before/after cards only). Adding FAQ and detailed use cases captures long-tail keywords without breaking existing layout.

**Implementation**: New translation keys per domain (e.g., `domainesBtp.faqQ1`, `domainesBtp.useCase1Title`). New sections rendered after the existing client reference section.

## R5: External Links Strategy

**Decision**: Add 10+ authoritative external links across site pages

**Rationale**: DataForSEO flagged 0 external links. Google rewards pages that link to authoritative sources. Target French institutional/professional sites.

**Sources**:
- FFBatiment.fr (BTP federation)
- Service-public.fr (government services)
- FranceNum.gouv.fr (digital transformation)
- FNTP.fr (public works federation)
- CCI.fr (chambers of commerce)
- CNIL.fr (data privacy)
- Bpifrance.fr (business funding)
- Legifrance.gouv.fr (legal references)
- INSEE.fr (statistics)
- ADEME.fr (environmental agency)

## R6: Image Title Attributes

**Decision**: Add `title` prop to all `<Image>` components

**Rationale**: DataForSEO flagged 5 images missing title attributes. Current codebase has `alt` on all images but zero `title` attributes (grep confirms 0 matches for `title=` in TSX files). Next.js Image component supports `title` as a pass-through HTML attribute.

## R7: Blog & Contact Page Enrichment

**Decision**: Add SEO intro text via translation keys

**Rationale**: Blog listing has ~52 words, contact page ~57 words. Both flagged as low-content. Adding 200+ words (blog) and 150+ words (contact) intro text improves crawl quality.

## R8: Sitemap Gaps

**Decision**: Add missing pages to sitemap.ts

**Rationale**: Current sitemap only lists 8 pages. Missing: `/domaines/btp`, `/domaines/commerce`, `/domaines/admin`, `/domaines/web`, `/domaines/btp/facturation-electronique`, `/a-propos`, `/agent-ia` (new). Domain pages and the pillar page are critical for SEO.

**Note**: `/a-propos` IS in the sitemap. But domain pages and blog articles are not.
