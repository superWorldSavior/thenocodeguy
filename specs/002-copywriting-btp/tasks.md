# Tasks: Copywriting BTP — Refonte wording orienté conversion

**Input**: Design documents from `/specs/002-copywriting-btp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup

**Purpose**: Verify current state and identify all keys to update

- [x] T001 Audit all CTA keys in `messages/fr.json` containing "brief", "recruter", "agent", "embaucher", "No Code Guy" — document the full list of keys and current values

**Checkpoint**: Full inventory of keys to modify is known.

---

## Phase 2: User Story 1 — L'assistante BTP comprend immédiatement la proposition (Priority: P1) 🎯 MVP

**Goal**: Hero section speaks directly to assistantes BTP with concrete tasks and accessible CTAs

**Independent Test**: Read the hero headline + subtitle + trust badges — they mention BTP administration and concrete tasks (relances, Qualibat, compta, emails)

### Implementation for User Story 1

- [x] T002 [US1] Update hero CTA keys in `messages/fr.json` — change `hero.ctaPrimary` from "Poster un brief" to "Voir ce qu'on automatise"
- [x] T003 [US1] Update hero trust badges in `messages/fr.json` — change `hero.trustBadge2` from "Disponible 24/7" to "Fonctionne via WhatsApp", change `hero.trustBadge3` from "Sans engagement" to "Spécialisé BTP"
- [x] T004 [US1] Update home hero keys in `messages/fr.json` — change `home.heroTitle` + `home.heroHighlight` + `home.heroSubtitle` to BTP-oriented wording per plan.md Phase 1
- [x] T005 [US1] Update home CTA keys in `messages/fr.json` — change `home.ctaPrimary` from "Recruter un agent" to "Voir ce qu'on automatise", change `home.ctaSecondary` from "Poster un brief" to "Comment ça marche"

**Checkpoint**: Hero section uses BTP language, no jargon. SC-001 partially met.

---

## Phase 3: User Story 2 — La card BTP parle le langage métier (Priority: P1)

**Goal**: BTP card in domaines section lists tasks recognizable by an assistante BTP

**Independent Test**: Card BTP lists minimum 6 concrete BTP tasks (relances factures, Qualibat, compta, paie, AO, WhatsApp)

### Implementation for User Story 2

- [x] T006 [US2] Verify `domaines.btpTasks` in `messages/fr.json` already contains correct BTP-specific tasks — confirm at least 6 items matching spec FR-003
- [x] T007 [US2] Update `domaines.ctaButton` in `messages/fr.json` — change from "Recruter dans ce domaine" to "Découvrir les automatisations"

**Checkpoint**: BTP card speaks métier language. FR-003 met.

---

## Phase 4: User Story 3 — La page BTP montre l'avant/après concret (Priority: P1)

**Goal**: `/domaines/btp` page has 5-6 sections with before/after format covering Admin, RH, Finance, Chantier, Commercial

**Independent Test**: Each section has 3+ tasks with before/after. Acronymes are correct (PPSPS, DOE, Qualibat, CACES, OPCO, DPAE).

### Implementation for User Story 3

- [x] T008 [US3] Verify `domainesBtp.*` section keys in `messages/fr.json` — confirm 6 sections with correct avant/après content and BTP acronyms per spec FR-004
- [x] T009 [US3] Verify `app/[locale]/domaines/btp/page.tsx` structure — confirm 6 sections rendered with before/after format, hero, reference stats, CTA

**Checkpoint**: BTP page has 6 sections avant/après. FR-004, SC-002 met.

---

## Phase 5: User Story 4 — Les CTAs convertissent (Priority: P2)

**Goal**: All CTAs use accessible language — no "brief", "recruter", "agent", "No Code Guy"

**Independent Test**: grep all CTA keys across `messages/fr.json` — zero matches for forbidden words in public-facing CTAs.

### Implementation for User Story 4

- [x] T010 [US4] Update `home.ctaSectionTitle` in `messages/fr.json` — change from "Prêt à recruter votre premier agent ?" to "Prêt à automatiser votre admin ?"
- [x] T011 [US4] Update `home.ctaSectionSubtitle` in `messages/fr.json` — change from "Postez votre brief..." to "Décrivez vos tâches répétitives. On vous montre ce qu'un agent IA peut gérer en 48h — sans engagement."
- [x] T012 [US4] Update `home.ctaSectionButton` in `messages/fr.json` — change from "Poster un brief" to "Demander une démo — 15 min"
- [x] T013 [US4] Update `home.pricingTeaserCta` in `messages/fr.json` — change from "Poster un brief" to "Demander une démo"
- [x] T014 [US4] Update `home.howSubtitle` and `home.how0Title` in `messages/fr.json` — replace "Brief → Recrutement → Onboarding" and "Poster un brief" with accessible wording
- [x] T015 [US4] Update `agents.ctaTitle`, `agents.ctaButton`, `agents.ctaHire` in `messages/fr.json` — replace "recruter"/"brief" with accessible wording
- [x] T016 [US4] Update `pricing.ctaTitle`, `pricing.ctaButton`, `pricing.starterCta` in `messages/fr.json` — replace "recruter"/"brief" with accessible wording
- [x] T017 [US4] Update `blog.ctaButton` in `messages/fr.json` — change from "Poster un brief" to "Demander une démo"
- [x] T018 [US4] Update `missions.studyCta` in `messages/fr.json` — change from "Lancer une mission similaire" to accessible wording
- [x] T019 [US4] Update `common.getStarted` in `messages/fr.json` — change from "Recruter" to "Commencer"
- [x] T020 [US4] Update blog article CTA keys (articles `btpAdmin` and `btpEmail`) `ctaButton` in `messages/fr.json` — change from "Poster un brief" to "Demander une démo"
- [x] T021 [US4] Validate: grep `messages/fr.json` for "Poster un brief", "Recruter", "embaucher" in CTA keys — only `contact` namespace may retain "brief" per spec edge case

**Checkpoint**: SC-001 fully met. Zero jargon in public-facing CTAs.

---

## Phase 6: User Story 5 — SEO BTP optimisé (Priority: P2)

**Goal**: Meta title and headings of BTP page contain target SEO keywords

**Independent Test**: meta title contains "assistante administrative BTP" + "IA". At least 3 H2s contain "BTP", "automatisation", or "admin".

### Implementation for User Story 5

- [x] T022 [US5] Verify `domainesBtp.metaTitle` in `messages/fr.json` — confirm it contains "assistante administrative BTP" and "IA" per FR-006, SC-003
- [x] T023 [US5] Verify `domainesBtp.metaDesc` in `messages/fr.json` — confirm it contains SEO target keywords per FR-006

**Checkpoint**: SC-003 met. SEO keywords in place.

---

## Phase 7: Sync locales EN, ZH-TW, ZH-CN

**Purpose**: Translate all modified keys to the 3 other locales

- [x] T024 [P] Sync all modified hero/home/domaines/agents/pricing/blog/missions/common CTA keys to `messages/en.json` — culturally adapted translations (not literal)
- [x] T025 [P] Sync all modified hero/home/domaines/agents/pricing/blog/missions/common CTA keys to `messages/zh-TW.json` — culturally adapted translations
- [x] T026 [P] Sync all modified hero/home/domaines/agents/pricing/blog/missions/common CTA keys to `messages/zh-CN.json` — culturally adapted translations

**Checkpoint**: SC-004 met. All 4 locales synchronized.

---

## Phase 8: Polish & Validation

**Purpose**: Build verification and final checks

- [x] T027 Run `npm run build` — verify zero errors per FR-008, SC-005
- [x] T028 Final validation: grep all 4 locale files for forbidden CTA words ("brief", "recruter", "embaucher") in non-contact namespaces

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — audit first
- **Phases 2-4 (US1-US3, P1)**: Depend on Phase 1. Can be parallelized since US2 and US3 are mostly verification tasks.
- **Phase 5 (US4, P2)**: Depends on Phase 2 (hero CTAs set first), then updates remaining CTAs
- **Phase 6 (US5, P2)**: Independent — verification only
- **Phase 7 (Sync)**: Depends on all FR changes (Phases 2-6) being complete
- **Phase 8 (Polish)**: Depends on Phase 7

### Parallel Opportunities

- T024, T025, T026 (locale sync) can all run in parallel
- Within Phase 5, most tasks target different JSON keys and could run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1-3)

1. Complete Phase 1: Audit
2. Complete Phases 2-4: Hero + BTP card + BTP page (all P1)
3. **STOP and VALIDATE**: Homepage hero + BTP page speak BTP language
4. Deploy if ready for mailing campaign

### Full Delivery

5. Complete Phase 5: All CTAs refactored (US4)
6. Complete Phase 6: SEO verified (US5)
7. Complete Phase 7: 4 locales synced
8. Complete Phase 8: Build passes, final validation

---

## Notes

- `domainesBtp.*` content and `domaines.btpTasks` are ALREADY correct from a previous update — tasks T006-T009 are verification only
- `hero.slide0Headline/Subline` are ALREADY correct — no changes needed
- Contact page CTAs ("Poster un brief") do NOT change per spec edge case
- KellyAssist name must NEVER appear in code — use "Entreprise BTP leader"
