# Tasks: Site Polish V2

**Input**: Design documents from `/specs/062-site-polish-v2/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Non demandés explicitement. Seul le build gate (`npm run build`) est requis.

**Organization**: Tasks grouped by user story — each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Vérifier la branche et installer les dépendances nécessaires.

- [x] T001 Vérifier que la branche `062-site-polish-v2` est active et que `npm run build` passe
- [x] T002 Installer le composant shadcn DropdownMenu via `npx shadcn@latest add dropdown-menu` — vérifie que `components/ui/dropdown-menu.tsx` est créé

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Aucun prérequis bloquant — les 3 user stories sont indépendantes (US1=blog, US2=nav, US3=vérif).

**Checkpoint**: Rien à bloquer — US1 et US2 peuvent démarrer en parallèle.

---

## Phase 3: User Story 1 — Refonte blog design system (Priority: P1) 🎯 MVP

**Goal**: Remplacer toutes les couleurs hardcodées (bg-gray-950, emerald) par les design tokens shadcn dans les 3 pages blog, remplacer FlaskConical par BookOpen, supprimer le lien /workflows.

**Independent Test**: Naviguer vers `/fr/blog`, `/fr/blog/comment-automatiser-veille-email`, `/fr/blog/windmill-vs-n8n` — vérifier que les couleurs suivent le design system en light ET dark mode, aucune couleur hardcodée visible, icône BookOpen, badge "Blog", pas de lien /workflows.

### Implementation for User Story 1

- [x] T003 [P] [US1] Refondre `app/[locale]/blog/page.tsx` — remplacer `bg-gray-950` par `bg-background`, `text-emerald-400` par `text-primary`, `bg-emerald-500` par `bg-primary`, `FlaskConical` par `BookOpen`, tous les gris hardcodés par tokens shadcn (`text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, etc.)
- [x] T004 [P] [US1] Refondre `app/[locale]/blog/comment-automatiser-veille-email/page.tsx` — mêmes remplacements tokens + remplacer FlaskConical par BookOpen + remplacer lien `/workflows` par `/contact` + garder code blocks en fond sombre fixe (`bg-[#1e1e2e] text-[#cdd6f4]`)
- [x] T005 [P] [US1] Refondre `app/[locale]/blog/windmill-vs-n8n/page.tsx` — mêmes remplacements tokens + remplacer FlaskConical par BookOpen + garder code blocks en fond sombre fixe
- [x] T006 [P] [US1] Mettre à jour `labBadge` → `blogBadge` dans `messages/fr.json`, `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json` (namespaces `articles.veilleEmail` et `articles.windmillVsN8n`) — changer la valeur de "Lab" à "Blog"
- [x] T007 [US1] Vérification visuelle : ouvrir `/fr/blog` + les 2 articles en light mode, dark mode, et mobile — confirmer cohérence design system, aucune couleur hardcodée, icône blog, code blocks lisibles

**Checkpoint**: Les 3 pages blog sont visuellement intégrées au design system. SC-001, SC-002 validés.

---

## Phase 4: User Story 2 — Globe locale switcher (Priority: P2)

**Goal**: Remplacer les 4 boutons horizontaux (FR | EN | 繁中 | 简中) par une icône Globe qui ouvre un dropdown avec les langues.

**Independent Test**: Cliquer sur l'icône globe dans la nav desktop — dropdown s'ouvre avec 4 langues et leurs noms complets, langue active marquée, sélection change la locale. Même test sur mobile.

### Implementation for User Story 2

- [x] T008 [P] [US2] Ajouter les clés i18n pour le locale switcher dans `messages/fr.json`, `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json` — clés `nav.switchLanguage`, `nav.langFr`, `nav.langEn`, `nav.langZhTw`, `nav.langZhCn`
- [x] T009 [US2] Refondre le locale switcher dans `components/Navigation.tsx` — remplacer les boutons horizontaux par un `DropdownMenu` (shadcn) avec trigger `Globe` (lucide), items = 4 langues avec nom complet et check pour la langue active. Desktop : dans la nav bar. Mobile : dans le menu hamburger.
- [x] T010 [US2] Vérification visuelle : tester le globe + dropdown en desktop FR, EN, mobile — confirmer que le dropdown s'ouvre, affiche les langues, change la locale, se ferme proprement

**Checkpoint**: SC-003, SC-004 validés. Le switcher occupe l'espace d'une seule icône.

---

## Phase 5: User Story 3 — Vérification globale de cohérence (Priority: P3)

**Goal**: S'assurer qu'il n'y a aucun lien mort, que le dark mode fonctionne partout, et que le build passe.

**Independent Test**: Parcourir toutes les pages en light/dark mode, vérifier les liens, lancer le build.

### Implementation for User Story 3

- [x] T011 [US3] Vérifier qu'aucun lien interne ne pointe vers `/workflows`, `/lab`, ou toute page 404 — scanner les fichiers TSX pour des href suspects
- [x] T012 [US3] Run `npm run build` — vérifier 0 erreurs (SC-006)

**Checkpoint**: SC-005, SC-006 validés.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Vérification croisée finale.

- [x] T013 Vérification croisée dark mode sur blog + navigation + homepage
- [x] T014 Vérification mobile responsive sur blog + locale switcher

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Aucune — démarrage immédiat
- **Phase 2 (Foundational)**: N/A — pas de prérequis bloquant
- **Phase 3 (US1 - Blog)**: Dépend de T001. Indépendant de US2.
- **Phase 4 (US2 - Locale Switcher)**: Dépend de T001 + T002. Indépendant de US1.
- **Phase 5 (US3 - Vérification)**: Dépend de US1 + US2
- **Phase 6 (Polish)**: Dépend de US1 + US2 + US3

### User Story Dependencies

- **US1 (Blog)**: Aucune dépendance sur US2/US3 — autonome
- **US2 (Locale Switcher)**: Dépend de T002 (shadcn DropdownMenu) — autonome sinon
- **US3 (Vérification)**: Dépend de US1 + US2 terminés
- US1 et US2 sont 100% parallélisables

### Parallel Opportunities

```text
# US1 et US2 peuvent démarrer en même temps :
Stream A (US1): T003 + T004 + T005 + T006 (tous [P]) → T007
Stream B (US2): T008 → T009 → T010
Stream C (US3): T011 + T012 (après US1/US2)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001 + T002 : Setup
2. T003-T006 : Refonte blog (parallèle)
3. T007 : Vérification visuelle
4. **STOP**: Le blog est visuellement intégré au design system

### Incremental Delivery

1. US1 (Blog refonte) → Design cohérent → Deploy
2. US2 (Globe switcher) → Nav professionnelle → Deploy
3. US3 (Vérification) → Zéro régression → Deploy prod
4. Polish final → Build propre → Deploy prod

---

## Notes

- Les 2 premières user stories sont totalement indépendantes — parallélisation maximale
- Le gros du travail est le remplacement couleur-par-couleur dans les 3 pages blog (US1)
- Le mapping de recherche (research.md R1) donne les correspondances exactes couleur→token
- Code blocks gardent un fond sombre fixe (convention UX standard) — pas de token shadcn
- Pas de tests automatisés demandés, seul le build gate est requis
