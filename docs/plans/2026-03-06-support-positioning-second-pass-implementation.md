# Support-First Positioning Second Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reframe the remaining French product and sector pages around setup, supervision, training, support, and human escalation.

**Architecture:** Preserve the existing page structure and concentrate changes in FR translation copy plus localized metadata on the affected pages. Extend the existing regression test so the new positioning is enforced on the remaining acquisition pages.

**Tech Stack:** Next.js App Router, next-intl, TypeScript, Vitest

---

### Task 1: Extend the regression test

**Files:**
- Modify: `specs/ac-tests/support-positioning-seo.test.ts`

**Step 1: Add failing assertions**

Add checks that:

- `/agent-ia` FR copy no longer uses recruitment/replacement framing
- FR sector pages no longer use "autonomous / turns by itself / without you" titles and metadata
- FR invoicing copy no longer tells users to recruit an AI agent
- FR about/blog framing no longer uses staffing or "without human intervention"
- second-pass pages expose localized metadata scaffolding

**Step 2: Run the tests**

Run: `npm test`

Expected: FAIL on the new positioning assertions.

### Task 2: Rewrite FR copy on agent, sector, and support pages

**Files:**
- Modify: `messages/fr.json`

**Step 1: Reframe `/agent-ia`**

Rewrite the hero, explainer paragraphs, types section, use cases, process, CTA, stats, and comparison table around supervised deployment and human accompaniment.

**Step 2: Reframe sector pages**

Update the titles, subtitles, metadata, support labels, references, and key FAQs for:

- `domainesBtp`
- `domainesCommerce`
- `domainesAdmin`
- `domainesWeb`
- `facture`

**Step 3: Clean remaining brand narrative**

Adjust the FR `blog` and `about` sections so they reinforce the new service-led positioning.

### Task 3: Add localized metadata on second-pass pages

**Files:**
- Modify: `app/[locale]/agent-ia/page.tsx`
- Modify: `app/[locale]/domaines/btp/page.tsx`
- Modify: `app/[locale]/domaines/commerce/page.tsx`
- Modify: `app/[locale]/domaines/admin/page.tsx`
- Modify: `app/[locale]/domaines/web/page.tsx`
- Modify: `app/[locale]/domaines/btp/facturation-electronique/page.tsx`
- Modify: `app/[locale]/a-propos/page.tsx`

**Step 1: Add locale-aware metadata**

Accept `params`, derive `locale`, and define localized canonical and open graph URLs while keeping page titles/descriptions sourced from translations.

### Task 4: Verify

**Files:**
- None

**Step 1: Re-run tests**

Run: `npm test`

Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`

Expected: PASS

**Step 3: Run build**

Run: `npm run build`

Expected: PASS
