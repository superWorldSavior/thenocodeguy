# Support-First Positioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reposition the acquisition funnel around setup, training, support, and SAV while fixing the most damaging trust and SEO issues.

**Architecture:** Keep the existing page/component structure and concentrate changes in localized copy, page metadata, and sitemap generation. Add a lightweight regression test that asserts the new support-first copy and the critical legal/SEO invariants.

**Tech Stack:** Next.js App Router, next-intl, TypeScript, Vitest

---

### Task 1: Add failing regression tests

**Files:**
- Create: `specs/ac-tests/support-positioning-seo.test.ts`

**Step 1: Write the failing test**

Add assertions for:

- FR footer tagline mentioning accompaniment/support rather than recruitment
- FR homepage trust signals mentioning support/training
- FR contact page intro mentioning setup/training/support
- FR legal/privacy content containing no `[À COMPLÉTER]`
- Sitemap source preferring `/mentions-legales` and `/confidentialite`
- Sitemap source no longer hardcoding FR blog alternates with `getBlogPosts("fr")`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL on current copy and sitemap assertions.

### Task 2: Update positioning copy on homepage/navigation/contact

**Files:**
- Modify: `messages/fr.json`

**Step 1: Change homepage copy**

Update:

- hero CTA and trust badges
- hero slide sublines
- how-it-works steps
- homepage stats
- CTA section
- footer tagline
- contact intro copy

**Step 2: Keep the scope narrow**

Do not rewrite every business page in this pass. Keep the changes limited to acquisition-critical FR copy already consumed by existing components.

### Task 3: Fix trust-breaking FR legal/privacy placeholders

**Files:**
- Modify: `messages/fr.json`

**Step 1: Replace placeholder FR legal content**

Populate `mentionsLegales` and `confidentialite` sections with the already-known company and contact information present in the repo, removing all `[À COMPLÉTER]` placeholders.

**Step 2: Preserve honesty**

Do not invent unavailable details. Where the repo only provides partial information, phrase the section narrowly around what is known.

### Task 4: Update metadata on key acquisition pages

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/contact/page.tsx`
- Modify: `app/[locale]/blog/page.tsx`
- Modify: `app/[locale]/blog/[slug]/page.tsx`

**Step 1: Shift metadata language**

Replace "recruit an autonomous AI agent" framing with setup/support/training framing in the shared site description.

**Step 2: Add page-level descriptions**

Use existing translations already available on each page to avoid adding new i18n keys.

**Step 3: Fix localized URLs**

Use locale-aware canonical/open-graph URLs on homepage, contact, blog, and blog article pages.

### Task 5: Fix sitemap priorities and blog alternates

**Files:**
- Modify: `app/sitemap.ts`

**Step 1: Prefer the live FR trust pages**

Use `/mentions-legales` and `/confidentialite` instead of `/legal` and `/privacy` in the preferred page list.

**Step 2: Remove fake cross-locale article alternates**

Iterate blog posts per locale and emit only real URLs, instead of deriving every alternate from FR slugs.

### Task 6: Run verification

**Files:**
- None

**Step 1: Re-run tests**

Run: `npm test`

Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`

Expected: PASS

**Step 3: Run production build**

Run: `npm run build`

Expected: PASS
