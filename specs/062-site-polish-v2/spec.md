# Feature Specification: Site Polish V2

**Feature Branch**: `062-site-polish-v2`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Deuxième batch de polish — refonte blog design system, globe locale switcher, cohérence globale

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Refonte blog : intégration au design system (Priority: P1)

Un visiteur accède aux pages blog (`/blog`, articles individuels). Actuellement, ces pages utilisent un fond noir codé en dur et des accents verts (emerald) qui tranchent avec le reste du site (navy + jaune). Le visiteur perçoit une rupture visuelle : les pages blog semblent appartenir à un autre site. Après la refonte, les pages blog utilisent les mêmes couleurs, tokens et conventions que le reste du site, et le dark mode fonctionne correctement.

**Why this priority** : Les pages blog sont publiques et visibles par tout visiteur. Une incohérence visuelle nuit directement à la crédibilité et au professionnalisme perçu de l'agence. C'est le correctif le plus impactant.

**Independent Test** : Naviguer vers `/fr/blog` et chaque article — les couleurs, fonds, accents et boutons correspondent au design system du site. Le dark mode et le light mode fonctionnent tous les deux.

**Acceptance Scenarios**:

1. **Given** la page blog listing (`/blog`), **When** un visiteur l'ouvre en light mode, **Then** le fond utilise la couleur d'arrière-plan du site (pas un gris/noir codé en dur), les accents utilisent les couleurs brand (navy/jaune), et l'icône est une icône blog (pas FlaskConical)
2. **Given** un article de blog (ex: `/blog/comment-automatiser-veille-email`), **When** un visiteur l'ouvre en dark mode, **Then** le fond, les accents, les code blocks, les badges et les boutons CTA sont visuellement cohérents avec le reste du site en dark mode
3. **Given** un article de blog, **When** un visiteur cherche le badge catégorie, **Then** il voit "Blog" (pas "Lab") et aucun lien ne pointe vers `/workflows` ou toute page inexistante
4. **Given** les boutons CTA dans le blog, **When** un visiteur les survole, **Then** les styles de hover correspondent au pattern du reste du site (hover jaune brand)

---

### User Story 2 - Language switcher : globe avec dropdown (Priority: P2)

Un visiteur multilingue veut changer la langue du site. Actuellement, 4 boutons horizontaux (FR | EN | 繁中 | 简中) encombrent la barre de navigation. Après modification, une icône globe discrète ouvre un dropdown avec les 4 langues disponibles, la langue active étant clairement identifiée.

**Why this priority** : Le switcher actuel prend trop de place dans la navigation et n'est pas professionnel pour un site d'agence. Un globe + dropdown est le standard UX attendu.

**Independent Test** : Cliquer sur l'icône globe dans la navigation — un dropdown s'ouvre listant les 4 langues avec leur nom complet. Sélectionner une langue change la locale de la page.

**Acceptance Scenarios**:

1. **Given** la navigation desktop, **When** un visiteur clique sur l'icône globe, **Then** un dropdown apparaît avec les 4 langues et leurs noms complets, la langue active est marquée d'un indicateur visuel (check ou highlight)
2. **Given** le dropdown langue ouvert, **When** un visiteur sélectionne une autre langue, **Then** la page se recharge dans la locale choisie et le dropdown se ferme
3. **Given** la navigation mobile (hamburger), **When** un visiteur ouvre le menu, **Then** le même pattern globe + dropdown est disponible (pas les 4 boutons horizontaux)
4. **Given** le dropdown, **When** l'utilisateur clique en dehors, **Then** le dropdown se ferme proprement

---

### User Story 3 - Vérification globale de cohérence (Priority: P3)

Un développeur ou le fondateur passe en revue le site complet pour s'assurer qu'il n'y a aucun lien mort, que le dark mode fonctionne sur toutes les pages, et que le build passe sans erreur.

**Why this priority** : Filet de sécurité — s'assurer que les changements des US1 et US2 + les changements précédents (061) n'ont pas laissé de régressions.

**Independent Test** : Parcourir toutes les pages principales du site en light mode, dark mode et mobile — aucune incohérence visuelle, aucun lien mort, aucune erreur de build.

**Acceptance Scenarios**:

1. **Given** toutes les pages du site, **When** on vérifie les liens internes, **Then** aucun lien ne pointe vers une page 404 (notamment `/workflows`, `/lab`)
2. **Given** le site complet, **When** on bascule entre dark mode et light mode, **Then** toutes les pages affichent des couleurs cohérentes avec le design system
3. **Given** le code source, **When** on lance le build, **Then** le build réussit sans erreur ni warning bloquant

---

### Edge Cases

- Que se passe-t-il si le dropdown langue est ouvert et que l'utilisateur navigue vers une autre page ? Le dropdown doit se fermer automatiquement.
- Que se passe-t-il si les code blocks dans les articles sont très longs en dark mode ? Les couleurs de syntaxe doivent rester lisibles.
- Que se passe-t-il si un visiteur arrive sur un ancien lien `/lab/*` ? Les redirections 301 existantes (feature 061) gèrent ce cas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** : Les pages blog (listing + articles) DOIVENT utiliser les design tokens du site pour les fonds, textes, accents et bordures — pas de couleurs hardcodées
- **FR-002** : L'icône/badge de catégorie sur les pages blog DOIT afficher "Blog" et utiliser une icône appropriée (pas FlaskConical/Lab)
- **FR-003** : Tout lien vers `/workflows` dans les articles DOIT être supprimé ou remplacé par un lien vers `/contact`
- **FR-004** : Les boutons CTA dans le blog DOIVENT utiliser le même style que le reste du site (primary + hover brand-yellow)
- **FR-005** : Les code blocks dans les articles DOIVENT être lisibles en light mode ET en dark mode
- **FR-006** : Le sélecteur de langue DOIT être un bouton icône (globe) qui ouvre un dropdown listant les 4 langues
- **FR-007** : Le dropdown langue DOIT afficher le nom complet de chaque langue et indiquer visuellement la langue active
- **FR-008** : Le sélecteur de langue DOIT fonctionner sur desktop ET mobile (dans le menu hamburger)
- **FR-009** : Le build DOIT passer sans erreur après tous les changements
- **FR-010** : Aucun lien interne ne DOIT pointer vers une page inexistante

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001** : 100% des pages blog (listing + 2 articles) utilisent les design tokens du site — aucune couleur hardcodée visible
- **SC-002** : Le dark mode et le light mode fonctionnent correctement sur les 3 pages blog sans rupture visuelle
- **SC-003** : Le sélecteur de langue occupe l'espace d'une seule icône dans la navigation (pas 4 boutons)
- **SC-004** : Le changement de langue fonctionne en moins de 2 clics (1 clic globe, 1 clic langue)
- **SC-005** : 0 lien mort détecté sur l'ensemble du site
- **SC-006** : Le build passe sans erreur

## Assumptions

- Les redirections 301 `/lab` → `/blog` sont déjà en place (feature 061)
- Les 4 locales (fr, en, zh-TW, zh-CN) restent inchangées — on ne change que l'UI du switcher
- Les composants shadcn/ui DropdownMenu sont disponibles dans le projet ou installables
- Le contenu textuel des articles ne change pas — seul le style visuel est modifié
- L'auteur "David Aames" reste inchangé dans les articles

## Out of Scope

- Ajout de nouveaux articles de blog
- Refonte du contenu rédactionnel des articles existants
- Ajout de fonctionnalités blog (recherche, filtres, catégories, pagination)
- Modification du SEO ou des métadonnées
- Ajout de nouveaux composants sur la homepage
