# Tasks: SEO Optimization

**Feature**: 005-seo-optimization | **Date**: 2026-02-26

## Phase 1: Setup & Technical Fixes

- [ ] T001 Fix duplicate title template — remove template from `app/layout.tsx`, keep only in `app/[locale]/layout.tsx`
- [ ] T002 Update default title in `app/layout.tsx` and `app/[locale]/layout.tsx` to use delegation wording
- [ ] T003 Remove "— TheNoCodeGuy" suffix from ALL metaTitle keys in `messages/fr.json` (template handles it)
- [ ] T004 [P] Remove "— TheNoCodeGuy" suffix from ALL metaTitle keys in `messages/en.json`
- [ ] T005 [P] Remove "— TheNoCodeGuy" suffix from ALL metaTitle keys in `messages/zh-TW.json`
- [ ] T006 [P] Remove "— TheNoCodeGuy" suffix from ALL metaTitle keys in `messages/zh-CN.json`
- [ ] T007 Add title attributes to all Image components in `components/organisms/MissionsSection.tsx`, `DomainesSection.tsx`, `HeroCarousel.tsx`
- [ ] T008 Add title attributes to all Image components in domain pages `app/[locale]/domaines/*/page.tsx` and `app/[locale]/a-propos/page.tsx`
- [ ] T009 Update `app/sitemap.ts` to include domain pages, agent-ia, facturation-electronique, and blog articles
- [ ] T010 Build check — `npm run build` must pass

## Phase 2: [US1] Fix Technical SEO Bugs

- [ ] T011 [US1] Verify all metaTitle values are under ~48 chars in `messages/fr.json` (template adds " | TheNoCodeGuy")
- [ ] T012 [P] [US1] Verify all metaTitle values under ~48 chars in `messages/en.json`
- [ ] T013 [P] [US1] Verify all metaTitle values under ~48 chars in `messages/zh-TW.json`
- [ ] T014 [P] [US1] Verify all metaTitle values under ~48 chars in `messages/zh-CN.json`
- [ ] T015 [US1] Ensure every page has exactly one H1 tag — audit all `page.tsx` files
- [ ] T016 [US1] Build check — `npm run build` must pass

## Phase 3: [US2] Optimize Meta Descriptions

- [ ] T017 [US2] Rewrite all metaDesc keys in `messages/fr.json` — delegation language, 120-155 chars, include target keywords
- [ ] T018 [P] [US2] Rewrite all metaDesc keys in `messages/en.json` — English equivalents, 120-155 chars
- [ ] T019 [P] [US2] Rewrite all metaDesc keys in `messages/zh-TW.json` — Traditional Chinese, 120-155 chars
- [ ] T020 [P] [US2] Rewrite all metaDesc keys in `messages/zh-CN.json` — Simplified Chinese, 120-155 chars
- [ ] T021 [US2] Build check — `npm run build` must pass

## Phase 4: [US3] Create Pillar Page /agent-ia

- [ ] T022 [US3] Add `agentIA` namespace with all translation keys (~40) in `messages/fr.json` — 1,500+ words FR
- [ ] T023 [P] [US3] Add `agentIA` namespace in `messages/en.json` — English translation
- [ ] T024 [P] [US3] Add `agentIA` namespace in `messages/zh-TW.json` — Traditional Chinese translation
- [ ] T025 [P] [US3] Add `agentIA` namespace in `messages/zh-CN.json` — Simplified Chinese translation
- [ ] T026 [US3] Create page at `app/[locale]/agent-ia/page.tsx` — server component with H1, structured sections, FAQ, CTA, internal links, external links
- [ ] T027 [US3] Build check — `npm run build` must pass

## Phase 5: [US4] Enrich Domain Pages

- [ ] T028 [US4] Add FAQ + use cases + external links translation keys for BTP in `messages/fr.json` (~25 keys, 1,500+ words total)
- [ ] T029 [P] [US4] Add FAQ + use cases keys for BTP in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T030 [US4] Update `app/[locale]/domaines/btp/page.tsx` — add FAQ section, use cases section, external links after existing content
- [ ] T031 [US4] Add FAQ + use cases + external links translation keys for Commerce in `messages/fr.json` (~20 keys, 1,000+ words)
- [ ] T032 [P] [US4] Add FAQ + use cases keys for Commerce in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T033 [US4] Update `app/[locale]/domaines/commerce/page.tsx` — add FAQ + use cases sections
- [ ] T034 [US4] Add FAQ + use cases + external links translation keys for Admin in `messages/fr.json` (~20 keys, 1,000+ words)
- [ ] T035 [P] [US4] Add FAQ + use cases keys for Admin in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T036 [US4] Update `app/[locale]/domaines/admin/page.tsx` — add FAQ + use cases sections
- [ ] T037 [US4] Add FAQ + use cases + external links translation keys for Web in `messages/fr.json` (~20 keys, 1,000+ words)
- [ ] T038 [P] [US4] Add FAQ + use cases keys for Web in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T039 [US4] Update `app/[locale]/domaines/web/page.tsx` — add FAQ + use cases sections
- [ ] T040 [US4] Build check — `npm run build` must pass

## Phase 6: [US5] Enrich Blog & Contact Pages

- [ ] T041 [US5] Add blog intro SEO content keys in `messages/fr.json` (~200+ words)
- [ ] T042 [P] [US5] Add blog intro keys in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T043 [US5] Update `app/[locale]/blog/page.tsx` — add intro section before articles list
- [ ] T044 [US5] Add contact page contextual content keys in `messages/fr.json` (~150+ words)
- [ ] T045 [P] [US5] Add contact keys in `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [ ] T046 [US5] Update `app/[locale]/contact/page.tsx` — add contextual content section
- [ ] T047 [US5] Build check — `npm run build` must pass

## Phase 7: Polish & Validation

- [ ] T048 Final build check — `npm run build` must pass with zero errors
- [ ] T049 Verify all metaTitle < 60 chars total (with template suffix)
- [ ] T050 Verify all metaDesc between 120-155 chars
- [ ] T051 Verify zero "Automatisez" in any metaTitle/metaDesc
- [ ] T052 Verify 10+ external links across site
- [ ] T053 Commit and push to main

## Dependencies

- T001-T009 (Setup) → must complete before US phases
- T010 (build) → gates Phase 2
- US1-US5 are sequential (each builds on previous fixes)
- [P] tasks within a phase can run in parallel
- T048-T053 (Polish) → after all US phases complete

## Summary

- **Total tasks**: 53
- **Phase 1 (Setup)**: 10 tasks
- **Phase 2 (US1 Tech fixes)**: 6 tasks
- **Phase 3 (US2 Meta desc)**: 5 tasks
- **Phase 4 (US3 Pillar page)**: 6 tasks
- **Phase 5 (US4 Domain enrichment)**: 13 tasks
- **Phase 6 (US5 Blog/Contact)**: 7 tasks
- **Phase 7 (Polish)**: 6 tasks
