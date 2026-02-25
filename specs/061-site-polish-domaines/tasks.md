# Tasks: Site Polish & Pages Domaines

**Input**: Design documents from `/specs/061-site-polish-domaines/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Non demandés explicitement dans la spec. Seul le build gate (`npm run build`) est requis.

**Organization**: Tasks grouped by user story — each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Aucune infrastructure à créer — le projet existe déjà. Vérification de la branche.

- [x] T001 Vérifier que la branche `061-site-polish-domaines` est active et que `npm run build` passe

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Aucun prérequis bloquant — les pages domaines, le formulaire et le blog sont indépendants les uns des autres.

**Checkpoint**: Rien à bloquer — les 3 user stories peuvent démarrer en parallèle.

---

## Phase 3: User Story 1 — Pages domaines Commerce, Admin, Web (Priority: P1) 🎯 MVP

**Goal**: Créer les 3 pages domaines manquantes avec contenu Avant/Après traduit en 4 locales, pour que tous les liens "Recruter dans ce domaine" de la homepage fonctionnent.

**Independent Test**: Naviguer vers `/fr/domaines/commerce`, `/fr/domaines/admin`, `/fr/domaines/web` — chaque page charge avec hero, sections Avant/Après, référence client, CTA. Vérifier aussi en EN et mobile.

### Implementation for User Story 1

- [x] T002 [P] [US1] Créer les traductions Commerce (namespace `domainesCommerce`) dans `messages/fr.json` — 5 sections × 3 items avant/après + hero + référence + CTA
- [x] T003 [P] [US1] Créer les traductions Admin (namespace `domainesAdmin`) dans `messages/fr.json` — 5 sections × 3 items avant/après + hero + référence + CTA
- [x] T004 [P] [US1] Créer les traductions Web (namespace `domainesWeb`) dans `messages/fr.json` — 5 sections × 3 items avant/après + hero + référence + CTA
- [x] T005 [P] [US1] Sync traductions Commerce dans `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [x] T006 [P] [US1] Sync traductions Admin dans `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [x] T007 [P] [US1] Sync traductions Web dans `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [x] T008 [P] [US1] Créer `app/[locale]/domaines/commerce/page.tsx` — copier le pattern de `btp/page.tsx` avec icône ShoppingCart, namespace `domainesCommerce`, sections config adaptées
- [x] T009 [P] [US1] Créer `app/[locale]/domaines/admin/page.tsx` — copier le pattern de `btp/page.tsx` avec icône FileStack, namespace `domainesAdmin`, sections config adaptées
- [x] T010 [P] [US1] Créer `app/[locale]/domaines/web/page.tsx` — copier le pattern de `btp/page.tsx` avec icône Globe, namespace `domainesWeb`, sections config adaptées
- [x] T011 [US1] Vérification visuelle : ouvrir les 3 pages en FR desktop, EN desktop, FR mobile — confirmer hero, sections, CTA, responsive, dark mode

**Checkpoint**: Les 4 pages domaines (BTP + 3 nouvelles) sont fonctionnelles et traduites. SC-001, SC-002, SC-003 validés.

---

## Phase 4: User Story 2 — Polish formulaire contact (Priority: P2)

**Goal**: Ajouter "BTP / Construction" comme premier rôle dans le select, fixer les styles inline des selects pour cohérence shadcn.

**Independent Test**: Aller sur `/fr/contact`, vérifier le select rôle, le style des selects, le dark mode.

### Implementation for User Story 2

- [x] T012 [US2] Ajouter l'option "BTP / Construction" (value `btp`) en première position et fixer les styles des selects dans `app/[locale]/contact/ContactForm.tsx` — remplacer les classes inline `var()` par des classes Tailwind cohérentes avec shadcn Input
- [x] T013 [P] [US2] Ajouter les traductions `roleBtp` dans `messages/fr.json`, `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json` (namespace `contact`)
- [x] T014 [US2] Vérification visuelle : formulaire contact en FR desktop, dark mode, mobile — confirmer style cohérent et option BTP visible

**Checkpoint**: SC-004 validé. Le formulaire est visuellement cohérent et propose BTP.

---

## Phase 5: User Story 3 — Lab → Blog (Priority: P3)

**Goal**: Renommer Lab en Blog — déplacer les fichiers, ajouter les redirections 301, mettre à jour nav et footer.

**Independent Test**: Naviguer vers `/fr/blog` (articles visibles), `/fr/lab` (redirect 301 → `/fr/blog`). Lien "Blog" visible dans la nav et le footer.

### Implementation for User Story 3

- [x] T015 [US3] Déplacer `app/[locale]/lab/` vers `app/[locale]/blog/` (page.tsx + 2 sous-pages articles)
- [x] T016 [P] [US3] Renommer le namespace `lab` en `blog` dans `messages/fr.json`, `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`
- [x] T017 [P] [US3] Renommer les namespaces articles (`articles.veilleEmail`, `articles.windmillVsN8n`) si nécessaire — vérifier que les pages blog référencent les bons namespaces
- [x] T018 [US3] Ajouter les redirections 301 `/lab` → `/blog` et `/lab/*` → `/blog/*` dans `middleware.ts` ou `proxy.ts`
- [x] T019 [US3] Ajouter le lien "Blog" dans `components/Navigation.tsx` (desktop + mobile) et `components/Footer.tsx`
- [x] T020 [US3] Vérification visuelle : `/fr/blog` charge, `/fr/lab` redirige, lien Blog visible dans nav et footer

**Checkpoint**: SC-005 validé. Blog fonctionne, redirections OK.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build final et vérification globale.

- [x] T021 Run `npm run build` — vérifier 0 erreurs (SC-006)
- [x] T022 Vérification croisée : homepage FR → cliquer chaque card domaine → page charge — confirmer SC-001
- [x] T023 Vérification dark mode sur les 3 nouvelles pages domaines + formulaire contact + blog

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Aucune — démarrage immédiat
- **Phase 2 (Foundational)**: N/A — pas de prérequis bloquant
- **Phase 3 (US1 - Domaines)**: Indépendant — peut démarrer immédiatement
- **Phase 4 (US2 - Contact)**: Indépendant — peut démarrer en parallèle de US1
- **Phase 5 (US3 - Blog)**: Indépendant — peut démarrer en parallèle de US1/US2
- **Phase 6 (Polish)**: Dépend de US1 + US2 + US3

### User Story Dependencies

- **US1 (Domaines)**: Aucune dépendance — autonome
- **US2 (Contact)**: Aucune dépendance — autonome
- **US3 (Blog)**: Aucune dépendance — autonome
- Les 3 stories sont 100% parallélisables

### Within US1 (Pages domaines)

- T002/T003/T004 (traductions FR) peuvent tourner en parallèle
- T005/T006/T007 (sync locales) peuvent tourner en parallèle après T002/T003/T004
- T008/T009/T010 (pages TSX) peuvent tourner en parallèle, dépendent des traductions
- T011 (vérification) dépend de tout le reste

### Parallel Opportunities

```text
# US1, US2, US3 peuvent tous démarrer en même temps :
Stream A (US1): T002→T005→T008→T011
Stream B (US1): T003→T006→T009  (merge into T011)
Stream C (US1): T004→T007→T010  (merge into T011)
Stream D (US2): T012→T013→T014
Stream E (US3): T015→T016→T018→T019→T020
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001 : Vérifier le build
2. T002-T010 : Créer les 3 pages domaines + traductions
3. T011 : Vérifier visuellement
4. **STOP**: Les liens homepage fonctionnent, plus de 404

### Incremental Delivery

1. US1 (Domaines) → Les liens homepage marchent → Deploy
2. US2 (Contact polish) → Le formulaire est propre → Deploy
3. US3 (Lab → Blog) → Le SEO est préservé → Deploy
4. Polish final → Build propre → Deploy prod

---

## Notes

- Les 3 user stories sont totalement indépendantes — parallélisation maximale possible
- Le contenu Avant/Après est le gros du travail (rédaction métier × 4 locales × 3 domaines)
- La vérification visuelle (T011, T014, T020) est critique — Constitution Principe III
- Pas de tests automatisés demandés, seul le build gate est requis
