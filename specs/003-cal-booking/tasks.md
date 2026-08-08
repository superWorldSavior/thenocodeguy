# Tasks: Cal.com Booking Integration

**Input**: Design documents from `/specs/003-cal-booking/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup

**Purpose**: Install dependency and create foundational Cal.com components

- [x] T001 Install `@calcom/embed-react@1.5.3` via `npm install @calcom/embed-react`
- [x] T002 Create `CalPopupButton` client component in `components/molecules/CalPopupButton.tsx` — uses `getCalApi` from `@calcom/embed-react`, `data-cal-link` attribute, `namespace: "popup"`, theme sync with `next-themes` (set in both `config` and `cal("ui")`), accepts `calLink`, `children`, and optional `className` props
- [x] T003 Create `CalInlineEmbed` client component in `components/molecules/CalInlineEmbed.tsx` — uses dynamic import of `Cal` from `@calcom/embed-react` with `ssr: false`, `namespace: "inline"`, theme sync, accepts `calLink` prop, min-height 600px, loading placeholder

**Checkpoint**: Both Cal.com components exist and are importable. `npm run build` passes.

---

## Phase 2: User Story 1 — Le visiteur BTP réserve un appel en 3 clics (Priority: P1) 🎯 MVP

**Goal**: Les 5 CTAs Tier 1 ouvrent le popup Cal.com au clic

**Independent Test**: Cliquer sur le CTA hero ou CTA section bottom → popup Cal.com s'ouvre → créneaux visibles

### Implementation for User Story 1

- [x] T004 [US1] Replace primary CTA `<Link>` in `components/organisms/HeroCarousel.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep existing button styling, remove `href="/contact"`
- [x] T005 [US1] Replace CTA button in `components/organisms/CTASection.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep existing yellow accent styling
- [x] T006 [US1] Replace CTA in `components/organisms/MissionsSection.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep existing styling
- [x] T007 [US1] Replace desktop CTA button in `components/Navigation.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep nav button styling, remove `href="/contact"`
- [x] T008 [US1] Replace mobile CTA button in `components/Navigation.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep mobile menu button styling
- [x] T009 [US1] Verify `npm run build` passes with all Tier 1 CTAs using CalPopupButton

**Checkpoint**: SC-001 met. 5 Tier 1 CTAs open Cal.com popup.

---

## Phase 3: User Story 2 — Le wording CTA est aligné sur le funnel (Priority: P1)

**Goal**: Zéro "démo" ou "15 min" dans les CTAs. Wording adapté au public BTP.

**Independent Test**: Grep `messages/fr.json` — zéro "démo" ou "15 min" dans les clés CTA.

### Implementation for User Story 2

- [x] T010 [US2] Update `home.ctaSectionButton` in `messages/fr.json` — change from "Demander une démo — 15 min" to "Réserver un appel découverte"
- [x] T011 [US2] Update `home.pricingTeaserCta` in `messages/fr.json` — change from "Demander une démo" to "Réserver un appel découverte"
- [x] T012 [US2] Update `agents.ctaButton` in `messages/fr.json` — change from "Demander une démo" to "Réserver un appel découverte"
- [x] T013 [US2] Update `pricing.ctaButton` in `messages/fr.json` — change from "Demander une démo — 15 min" to "Réserver un appel découverte"
- [x] T014 [US2] Update `pricing.starterCta` in `messages/fr.json` — change from "Demander une démo" to "Réserver un appel découverte"
- [x] T015 [US2] Update `blog.ctaButton` in `messages/fr.json` — change from "Demander une démo" to "Réserver un appel découverte"
- [x] T016 [P] [US2] Update domain page CTA keys in `messages/fr.json` — change `domainesBtp.ctaTop`, `domainesBtp.cta`, `domainesCommerce.ctaTop`, `domainesCommerce.cta`, `domainesAdmin.ctaTop`, `domainesAdmin.cta`, `domainesWeb.ctaTop`, `domainesWeb.cta` — replace all "Demander une démo — 15 min" with contextual wording per domain (BTP: "Parlez-nous de vos appels d'offres", Commerce: "Parlez-nous de votre prospection", Admin: "Parlez-nous de votre admin", Web: "Parlez-nous de votre site")
- [x] T017 [P] [US2] Update blog article CTA keys in `messages/fr.json` — change `btpAdmin.ctaButton`, `btpEmail.ctaButton` and any other article-level CTA with "démo" to "Réserver un appel découverte"
- [x] T018 [US2] Validate: grep `messages/fr.json` for "démo" and "15 min" in CTA-related keys — zero matches expected (description/body text may contain "démo" and is OK)

**Checkpoint**: SC-003 partially met (FR done). Zero jargon in FR CTAs.

---

## Phase 4: User Story 1 continued — Brancher les CTAs Tier 2 (Priority: P1)

**Goal**: Les CTAs Tier 2 (domaines, agents, pricing) ouvrent aussi le popup Cal.com

**Independent Test**: Cliquer sur le CTA bottom de `/domaines/btp` → popup Cal.com s'ouvre

### Implementation for User Story 1 (Tier 2)

- [x] T019 [P] [US1] Replace hero + bottom CTAs in `app/[locale]/domaines/btp/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">` — keep existing styling
- [x] T020 [P] [US1] Replace hero + bottom CTAs in `app/[locale]/domaines/commerce/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">`
- [x] T021 [P] [US1] Replace hero + bottom CTAs in `app/[locale]/domaines/admin/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">`
- [x] T022 [P] [US1] Replace hero + bottom CTAs in `app/[locale]/domaines/web/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">`
- [x] T023 [US1] Replace CTA in `app/[locale]/agents/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">`
- [x] T024 [US1] Replace CTA in `app/[locale]/pricing/page.tsx` with `<CalPopupButton calLink="thenocodeguy/decouverte">`
- [x] T025 [US1] Verify `npm run build` passes with all Tier 1 + Tier 2 CTAs using CalPopupButton

**Checkpoint**: SC-001 + SC-002 met. All high/medium intent CTAs open Cal.com popup.

---

## Phase 5: User Story 4 — Trust signals sous les CTAs booking (Priority: P2)

**Goal**: Trust line visible sous chaque bouton de booking

**Independent Test**: Inspecter le hero homepage — trust line "30 min avec Erwan — gratuit, sans engagement" visible sous le CTA

### Implementation for User Story 4

- [x] T026 [US4] Add trust line translation keys in `messages/fr.json` — add `booking.trustLine`: "30 min avec Erwan — gratuit, sans engagement", `booking.trustLineTech`: "Pas besoin d'être technique"
- [x] T027 [US4] Trust lines added directly in parent components (not CalPopupButton) to preserve flex layouts
- [x] T028 [US4] Add trust line below CalPopupButton in `components/organisms/HeroCarousel.tsx` — passed via `trustLine` prop from HeroSection
- [x] T029 [US4] Add trust line below CalPopupButton in `components/organisms/CTASection.tsx` — uses booking.trustLine
- [x] T030 [P] [US4] Add trust line below CalPopupButton in domain pages (`app/[locale]/domaines/btp/page.tsx`, `commerce/page.tsx`, `admin/page.tsx`, `web/page.tsx`) — uses `booking.trustLineTech`

**Checkpoint**: SC-001 visually complete with trust signals.

---

## Phase 6: User Story 3 — La page /contact propose booking + formulaire (Priority: P2)

**Goal**: /contact affiche Cal.com inline en haut + formulaire réduit en bas

**Independent Test**: Ouvrir /contact → calendrier Cal.com visible above the fold → "Vous préférez écrire ?" avec formulaire en dessous

### Implementation for User Story 3

- [x] T031 [US3] Add contact page translation keys in `messages/fr.json` — added bookingTitle, bookingSubtitle, formFallback, formFallbackSubtitle
- [x] T032 [US3] Redesign `app/[locale]/contact/page.tsx` — CalInlineEmbed at top + divider + ContactForm below
- [x] T033 [US3] Simplify `app/[locale]/contact/ContactForm.tsx` — kept name, email, company, message; removed role/timeline selectors
- [x] T034 [US3] Verify `npm run build` passes with redesigned /contact page

**Checkpoint**: SC-004 met. /contact has both booking paths.

---

## Phase 7: User Story 5 — Event types multilingues + horaires adaptés (Priority: P2)

**Goal**: Chaque locale a son propre event type Cal.com avec horaires adaptés au fuseau du public cible

**Independent Test**: Switcher en locale EN → le popup affiche "Discovery Call" avec des créneaux en heures US

### Implementation for User Story 5

- [x] T041 [US5] Created Cal.com schedules: US Prospects (1277152, America/New_York 8-10am), Créneaux Chine (1277155, Asia/Shanghai), Taiwan reuses existing (1277058)
- [x] T042 [US5] Created Cal.com event types: discovery-call (4874069, EN, US schedule), discovery-call-zh-tw (4874070, ZH-TW, Taiwan schedule), discovery-call-zh-cn (4874072, ZH-CN, China schedule)
- [x] T043 [US5] CalPopupButton already has locale-aware mapping since creation (useLocale + calLinks record)
- [x] T044 [US5] CalInlineEmbed already has locale-aware mapping since creation (useLocale + calLinks record)
- [x] T045 [US5] No hardcoded calLink props in codebase — components resolve internally via locale

**Checkpoint**: SC-008 met. Each locale has its own Cal.com event type with adapted schedule.

---

## Phase 8: Sync locales EN, ZH-TW, ZH-CN (renumbered)

**Purpose**: Translate all modified/added keys to the 3 other locales

- [x] T035 [P] Synced all CTA + booking + contact keys to `messages/en.json` — "Book a discovery call", contextual domain CTAs
- [x] T036 [P] Synced all CTA + booking + contact keys to `messages/zh-TW.json` — Traditional Chinese, formal tone
- [x] T037 [P] Synced all CTA + booking + contact keys to `messages/zh-CN.json` — Simplified Chinese, professional tone

**Checkpoint**: SC-007 met. All 4 locales synchronized.

---

## Phase 9: Polish & Validation

**Purpose**: Build verification, wording validation, final checks

- [x] T038 Run `npm run build` — zero errors
- [x] T039 Final validation: grep all 4 locale files — zero "démo"/"15 min"/"demo" in CTA keys
- [x] T040 Dark mode: CalPopupButton/CalInlineEmbed set theme via `resolvedTheme` in both config and cal("ui") — verified in code

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — install + create components first
- **Phase 2 (US1 Tier 1)**: Depends on Phase 1 (CalPopupButton must exist)
- **Phase 3 (US2 Wording)**: Independent of Phase 2 — modifies only messages/fr.json
- **Phase 4 (US1 Tier 2)**: Depends on Phase 1 (CalPopupButton must exist), can run parallel to Phase 3
- **Phase 5 (US4 Trust)**: Depends on Phase 2 + Phase 4 (CTAs must be CalPopupButton already)
- **Phase 6 (US3 Contact)**: Depends on Phase 1 (CalInlineEmbed must exist)
- **Phase 7 (US5 Multilingue)**: Depends on Phase 1 (CalPopupButton must exist). Can run after Phase 2.
- **Phase 8 (Sync)**: Depends on Phase 3 + Phase 5 + Phase 6 + Phase 7 (all FR changes + event types created)
- **Phase 9 (Polish)**: Depends on Phase 8

### Parallel Opportunities

- T019, T020, T021, T022 (domain pages) can all run in parallel
- T035, T036, T037 (locale sync) can all run in parallel
- Phase 3 (wording) and Phase 4 (Tier 2 CTAs) can run in parallel
- Phase 5 (trust) and Phase 6 (contact redesign) can run in parallel after their dependencies

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (install + 2 components)
2. Complete Phase 2: Wire Tier 1 CTAs to CalPopupButton
3. Complete Phase 3: Fix wording in messages/fr.json
4. **STOP and VALIDATE**: Homepage hero + CTA section open Cal.com popup, wording is clean
5. Deploy if ready for immediate conversion improvement

### Full Delivery

6. Complete Phase 4: Wire Tier 2 CTAs (domaines, agents, pricing)
7. Complete Phase 5: Trust signals under CTAs
8. Complete Phase 6: Redesign /contact
9. Complete Phase 7: Sync 4 locales
10. Complete Phase 8: Build + final validation

---

## Notes

- `calLink` is locale-aware: fr → `thenocodeguy/decouverte`, en → `thenocodeguy/discovery-call`, zh-TW → `thenocodeguy/discovery-call-zh-tw`, zh-CN → `thenocodeguy/discovery-call-zh-cn`
- Event types EN/ZH-TW/ZH-CN are created via Cal.com API v2 with timezone-adapted schedules (US EST, Taiwan local, China hours)
- Tier 3 CTAs (footer, nav text links, blog, workflows) stay as `/contact` links — they benefit from the /contact redesign (Phase 6)
- The `CAL_API_KEY` in `.env.local` is NOT used client-side — the embed uses only the public `calLink`
- Contact form (Formspree) is NOT removed — it becomes the secondary path on /contact
- Workflow email capture modals are NOT touched (EC-003)
