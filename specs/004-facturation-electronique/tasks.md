# Tasks: Facturation Electronique BTP

**Input**: Design documents from `/specs/004-facturation-electronique/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by phase matching plan.md. FR translation keys first, then pages, then locale sync, then polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: FR Translation Keys

**Purpose**: Add all French translation keys needed for landing page, blog article, blog listing, and BTP page mention

- [x] T001 [US1] Add `facture` namespace to `messages/fr.json` — all landing page keys: metaTitle, metaDesc, badge, title, subtitle, ctaTop, problemTitle, problem1-4, beforeLabel, afterLabel, beforeAfterTitle, ba1Before-ba5After, btpTitle, btp1Title-btp5Desc, paTitle, pa1-pa9, howTitle, how1Label-how3Desc, ctaBottom, ctaSubtext
- [x] T002 [US2] Add `articles.factureBtp` namespace to `messages/fr.json` — all blog article keys: metaTitle, metaDesc, badge, title, author, date, readTime, hookP1-hookP2, calTitle-calP1-calP2-calList1-calList4, paTitle-paP1-paP2, btpTitle-btpP1, btp1Title-btp5Desc, douleursTitle-douleursList1-douleursList6, solutionTitle-solutionP1-solutionP2-solutionList1-solutionList4, ctaTitle-ctaButton-ctaSubtext, signatureAuthor-signatureRole
- [x] T003 [US2] Add blog listing keys to `blog` namespace in `messages/fr.json` — article2Title, article2Excerpt, article2Date, article2ReadTime
- [x] T004 [US3] Add BTP page mention keys to `domainesBtp` namespace in `messages/fr.json` — factureTitle ("Facturation electronique obligatoire des septembre 2026"), factureDesc (pitch court fragmentation PA), factureCta ("Decouvrir notre solution")

**Checkpoint**: All FR keys exist. `npm run build` passes (no missing key errors in other locales yet — Phase 5 handles sync).

---

## Phase 2: Landing Page (US1)

**Purpose**: Create the dedicated facturation electronique landing page under /domaines/btp/

- [x] T005 [US1] Create `app/[locale]/domaines/btp/facturation-electronique/page.tsx` — Server Component with `generateMetadata()` using `getTranslations("facture")`, import CalPopupButton + lucide-react icons (AlertTriangle, Check, X, ArrowRight, FileText, Shield, Clock, Building2, Calculator, Receipt)
- [x] T006 [US1] Implement Hero section — badge urgence ("Obligation septembre 2026"), H1 with "facturation electronique BTP" for SEO (SC-002), subtitle, CalPopupButton with ctaTop, trust line with ctaSubtext (SC-006, SC-007)
- [x] T007 [US1] Implement Problem section — H2 problemTitle "Ce qui vous attend en septembre 2026", 4 pain points with AlertTriangle icons (3-5 PA, formation, erreurs, non-conformite)
- [x] T008 [US1] Implement Before/After section (SC-003) — H2 beforeAfterTitle, 5 comparison rows using X/Check pattern from `app/[locale]/domaines/btp/page.tsx`, ba1-ba5 before/after pairs
- [x] T009 [US1] Implement BTP Specifics section (SC-005) — H2 btpTitle, 5 cards grid (situations de travaux, retenue de garantie 5%, auto-liquidation TVA, acomptes chantier, DGD) with icons
- [x] T010 [US1] Implement PA Grid section (SC-004) — H2 paTitle, 3x3 grid layout displaying 9 Plateformes Agreees (Chorus Pro, Sage/Batigest, Cegid, Pennylane, Batappli/Cecurity, Yooz, Dext, Docaposte/SERES, Qonto)
- [x] T011 [US1] Implement How It Works section — H2 howTitle, 3 steps (brief, matching, deploiement) with numbered labels, same pattern as existing domain pages
- [x] T012 [US1] Implement CTA Bottom section — CalPopupButton with ctaBottom, trust line with ctaSubtext below (SC-006, SC-007)
- [x] T013 [US1] Ensure all sections use design tokens only (bg-background, text-foreground, bg-card, border-border, bg-primary, text-primary, bg-muted) — zero hardcoded colors (SC-009)

**Checkpoint**: SC-001 through SC-009 met. Landing page renders in light + dark mode with all 7 sections.

---

## Phase 3: Blog Article (US2)

**Purpose**: Create the in-depth blog article on facturation electronique BTP

- [x] T014 [US2] Create `app/[locale]/blog/facturation-electronique-btp-2026/page.tsx` — Server Component with `generateMetadata()` using `getTranslations("articles.factureBtp")`, breadcrumb Link back to `/blog`, header with badge, H1, author, date, readTime, tags array ["Facturation", "BTP", "IA", "2026", "Conformite"] (SC-010)
- [x] T015 [US2] Implement article body sections inside `<article>` with `<section>` wrappers — Hook (urgence sept 2026), Calendrier reglementaire (SC-011), PA et PPF explanation (SC-012), Specificites BTP (SC-013), Douleurs concretes assistantes (SC-014), Solution agent IA (SC-015)
- [x] T016 [US2] Implement CTA encart at end of article — bg-primary/5 container with CalPopupButton (SC-016), trust line below
- [x] T017 [US2] Implement author signature block — TheNoCodeGuy branding, consistent with existing blog article pattern from `comment-automatiser-veille-email/page.tsx`

**Checkpoint**: SC-010 through SC-016 met. Article accessible at `/blog/facturation-electronique-btp-2026`.

---

## Phase 4: Update Existing Pages (US3)

**Purpose**: Add facturation electronique mention to BTP page and new article to blog listing

### 4a — BTP Page

- [x] T018 [US3] Modify `app/[locale]/domaines/btp/page.tsx` — add new section between last avant/apres and CTA reference client: H2 with domainesBtp.factureTitle, paragraph with domainesBtp.factureDesc, Link to `/domaines/btp/facturation-electronique` with domainesBtp.factureCta (SC-018, SC-019, SC-020)

### 4b — Blog Listing

- [x] T019 [US2] Modify `app/[locale]/blog/page.tsx` — add new article entry to `articles` array: `{ slug: "facturation-electronique-btp-2026", title: t("article2Title"), excerpt: t("article2Excerpt"), date: t("article2Date"), readTime: t("article2ReadTime"), tags: ["Facturation", "BTP", "IA", "2026", "Conformite"] }`

**Checkpoint**: SC-018, SC-019, SC-020 met. Link from BTP page works. Article visible in blog listing.

---

## Phase 5: Locale Sync (US4)

**Purpose**: Translate all new keys from Phases 1-4 to EN, ZH-TW, ZH-CN

- [x] T020 [P] [US4] Synced all new keys to `messages/en.json` — culturally adapted English translations
- [x] T021 [P] [US4] Synced all new keys to `messages/zh-TW.json` — Traditional Chinese translations
- [x] T022 [P] [US4] Synced all new keys to `messages/zh-CN.json` — Simplified Chinese translations

**Checkpoint**: SC-021, SC-022, SC-023 met. All 4 locales have every key. Build should pass.

---

## Phase 6: Polish & Validation

**Purpose**: Build verification, SEO check, dark mode check, final validation

- [x] T023 `npm run build` — zero errors, both new routes confirmed in output
- [x] T024 SEO validation — meta titles contain "facturation électronique BTP", meta descriptions present, H1-H3 structured
- [x] T025 Dark mode — zero hardcoded colors, all sections use design tokens
- [x] T026 Link validation — BTP page links to /facturation-electronique, article in blog listing, CalPopupButton on both pages
- [x] T027 Confidentiality check — zero real client names found

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (FR Keys)**: No dependencies — translation keys first
- **Phase 2 (Landing Page)**: Depends on Phase 1 (facture namespace must exist)
- **Phase 3 (Blog Article)**: Depends on Phase 1 (articles.factureBtp namespace must exist), can run parallel to Phase 2
- **Phase 4 (Update Pages)**: Depends on Phase 1 (domainesBtp.facture* and blog.article2* keys), can run parallel to Phase 2 + 3
- **Phase 5 (Locale Sync)**: Depends on Phase 1 + 2 + 3 + 4 (all FR content finalized)
- **Phase 6 (Polish)**: Depends on Phase 5

### Parallel Opportunities

- T005-T013 (landing page sections) are sequential within Phase 2 but Phase 2 and Phase 3 can run in parallel
- T018, T019 (BTP page update, blog listing update) can run in parallel
- T020, T021, T022 (locale sync EN, ZH-TW, ZH-CN) can all run in parallel

---

## Notes

- No new dependencies needed — reuses CalPopupButton (already locale-aware), lucide-react icons, existing design patterns
- CalPopupButton resolves calLink internally via locale (fr: decouverte, en: discovery-call, etc.)
- Image hero mentioned in spec (assistante BTP devant ecran avec factures) — to be generated separately via gpt-image-1.5 if needed, not a blocking task
- The `facture` namespace is new; `articles.factureBtp` follows the existing pattern of `articles.veilleEmail`
- Blog listing uses `article2*` keys following the existing `article0*`, `article1*` convention
- Total: 27 tasks across 6 phases
