# Support-First Positioning Third Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the remaining French copy that contradicts the support-first positioning across secondary pages, offer copy, and selected FR blog content.

**Architecture:** Keep existing structures and update only the FR copy and a small amount of metadata scaffolding. Extend the regression test to guard the remaining sections and specific FR articles that still contain replacement-oriented language.

**Tech Stack:** Next.js App Router, next-intl, TypeScript, Vitest, MDX content

---

### Task 1: Extend the regression suite

**Files:**
- Modify: `specs/ac-tests/support-positioning-seo.test.ts`

**Step 1: Add failing assertions**

Assert that:

- `agents`, `pricing`, `profiles`, and `workflows` FR sections no longer use autonomous/recruitment language
- `cgv` wording no longer describes the service as staffing/placement
- selected FR blog articles no longer contain explicit recruitment or employee-replacement language

**Step 2: Run the tests**

Run: `npm test`

Expected: FAIL on the new assertions.

### Task 2: Rewrite remaining FR messages

**Files:**
- Modify: `messages/fr.json`

**Step 1: Update offer/package copy**

Rewrite `agents`, `pricing`, and `profiles` to describe supervised assistants, onboarding, support, and fair use.

**Step 2: Update workflow framing**

Keep the workflow details but remove "pilot automatique" and similar unsupported framing.

**Step 3: Finish legal consistency**

Rewrite remaining CGV/legal/privacy phrases that still refer to staffing or placement.

### Task 3: Patch the most visible FR blog mismatches

**Files:**
- Modify: `content/blog/fr/facturation-electronique-btp-2026.mdx`
- Modify: `content/blog/fr/agent-ia-telegram-pme.mdx`

**Step 1: Remove recruitment/replacement framing**

Preserve the article structure and case-study value, but replace the strongest "hire an agent / 24/7 instead of a human" lines.

### Task 4: Adjust visible metadata scaffolding where still generic

**Files:**
- Modify: `app/[locale]/workflows/layout.tsx`
- Modify: `app/[locale]/cgv/page.tsx`

**Step 1: Make metadata locale-aware**

Add localized canonical/open-graph URLs and keep descriptions sourced from translations.

### Task 5: Verify

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
