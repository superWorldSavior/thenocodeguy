# Feature Specification: Site Polish & Pages Domaines

**Feature Branch**: `061-site-polish-domaines`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Batch de polish et features manquantes pour thenocodeguy.com — pages domaines Commerce/Admin/Web, Lab→Blog, polish formulaire contact et cohérence générale.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Pages domaines Commerce, Admin, Web (Priority: P1)

Un visiteur arrive sur la homepage, voit les 4 cards domaines et clique sur "Recruter dans ce domaine" pour Commerce, Admin ou Web. Il atterrit sur une page dédiée qui détaille les tâches automatisables dans son secteur (format Avant/Après comme la page BTP existante), avec une section référence client et un CTA final vers /contact.

**Why this priority**: Les cards domaines pointent déjà vers `/domaines/{id}` mais seule la page BTP existe. Les 3 autres renvoient une 404. C'est un point bloquant pour la conversion.

**Independent Test**: Naviguer vers `/fr/domaines/commerce`, `/fr/domaines/admin`, `/fr/domaines/web` — chaque page doit charger avec son contenu métier, dans les 4 locales.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la homepage, **When** il clique sur "Recruter dans ce domaine" sur la card Commerce, **Then** il arrive sur `/domaines/commerce` avec un hero, des sections Avant/Après, une référence client et un CTA.
2. **Given** un visiteur sur `/domaines/admin`, **When** il change la locale en EN, **Then** toutes les traductions sont en anglais.
3. **Given** les 4 pages domaines, **When** on les affiche en mobile (< 768px), **Then** le layout est responsive sans débordement horizontal.

---

### User Story 2 — Polish formulaire contact (Priority: P2)

Un visiteur remplit le formulaire de contact. Le select des rôles inclut "BTP / Construction" comme première option (cible #1). Les selects utilisent un style cohérent avec le design system (shadcn/Tailwind) au lieu de styles inline `var()`. Le formulaire reste fonctionnel avec Formspree.

**Why this priority**: Le formulaire contact est le point de conversion principal. L'absence du BTP dans les rôles est un oubli critique. Les styles incohérents nuisent à la crédibilité.

**Independent Test**: Aller sur /contact, vérifier que le select rôle propose BTP, que les selects ont un style visuellement cohérent avec les inputs, que le formulaire s'envoie correctement.

**Acceptance Scenarios**:

1. **Given** le formulaire contact, **When** l'utilisateur ouvre le select "Rôle", **Then** "BTP / Construction" apparaît comme première option après le placeholder.
2. **Given** le formulaire, **When** on le regarde sur desktop et mobile, **Then** les selects ont un style visuellement identique aux inputs shadcn (border, radius, focus ring).
3. **Given** le formulaire, **When** on le regarde en dark mode, **Then** tous les éléments (inputs, selects, labels, bouton) respectent la charte couleurs dark.

---

### User Story 3 — Lab → Blog / Cas d'usage (Priority: P3)

Les pages Lab existantes (2 articles techniques) sont renommées sous l'URL `/blog` avec un label "Blog" dans la nav. Le contenu existant est conservé. L'ancien URL `/lab` redirige vers `/blog`.

**Why this priority**: Les articles Lab sont du contenu SEO précieux, mais "Lab" ne parle pas aux prospects BTP. "Blog" est plus universel et compréhensible.

**Independent Test**: Naviguer vers `/blog` — la page liste les articles existants. `/lab` redirige vers `/blog`. Le lien "Blog" apparaît dans la nav et le footer.

**Acceptance Scenarios**:

1. **Given** un visiteur, **When** il navigue vers `/fr/blog`, **Then** il voit la liste des articles existants.
2. **Given** un ancien lien `/fr/lab`, **When** il est suivi, **Then** il redirige (301) vers `/fr/blog`.
3. **Given** la navigation principale, **When** elle est affichée, **Then** un lien "Blog" est visible (desktop et mobile).

---

### Edge Cases

- Que se passe-t-il si un visiteur accède à `/domaines/foo` (domaine inexistant) ? → Page 404 standard.
- Que se passe-t-il si les images domaines n'existent pas ? → Les images existent déjà dans `/public/images/homepage/`.
- Que se passe-t-il si le formulaire contact est soumis sans JavaScript ? → Le formulaire utilise Formspree via fetch, nécessite JS. Comportement actuel acceptable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site DOIT avoir des pages dédiées pour les 4 domaines : BTP (existant), Commerce, Admin, Web.
- **FR-002**: Chaque page domaine DOIT suivre le même template : hero + badge, sections Avant/Après (3-6 sections × 3-4 items), section référence client anonymisée, CTA final.
- **FR-003**: Chaque page domaine DOIT être traduite dans les 4 locales (fr, en, zh-TW, zh-CN).
- **FR-004**: Les cards domaines de la homepage DOIVENT pointer vers `/domaines/{id}` (déjà implémenté).
- **FR-005**: Le formulaire contact DOIT proposer "BTP / Construction" comme première option dans le select des rôles.
- **FR-006**: Les selects du formulaire contact DOIVENT utiliser un style cohérent avec les composants shadcn/ui (pas de styles inline `var()`).
- **FR-007**: Les pages Lab DOIVENT être accessibles sous l'URL `/blog` avec le même contenu.
- **FR-008**: Les anciennes URLs `/lab` et `/lab/*` DOIVENT rediriger (301) vers `/blog` et `/blog/*`.
- **FR-009**: La navigation DOIT inclure un lien "Blog" (desktop et mobile).
- **FR-010**: Le footer DOIT inclure un lien "Blog" à la place de "Lab" (déjà supprimé, à ajouter Blog).
- **FR-011**: Le build (`npm run build`) DOIT passer sans erreur après toutes les modifications.

### Key Entities

- **Page Domaine**: URL `/domaines/{slug}`, contenu structuré (hero, sections avant/après, référence, CTA), traductions 4 locales.
- **Formulaire Contact**: Champs nom, email, entreprise, rôle (select), missions (textarea), outils, timeline. Envoi via Formspree.
- **Blog**: Anciennement "Lab". Pages d'articles techniques avec routing `/blog/{slug}`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des liens "Recruter dans ce domaine" sur la homepage mènent à une page fonctionnelle (0 page 404).
- **SC-002**: Les 3 nouvelles pages domaines (Commerce, Admin, Web) contiennent chacune au moins 4 sections Avant/Après avec un minimum de 12 items avant/après au total.
- **SC-003**: Les 4 pages domaines sont disponibles et correctement traduites dans les 4 locales.
- **SC-004**: Le formulaire contact propose BTP comme premier rôle sélectionnable et tous les éléments de formulaire ont un style visuellement cohérent.
- **SC-005**: Les URLs `/lab` et `/lab/*` redirigent vers `/blog` et `/blog/*` sans page 404.
- **SC-006**: Le build Next.js passe sans erreur ni warning critique.

## Assumptions

- Le contenu Avant/Après des pages Commerce, Admin et Web sera rédigé sur le même modèle que la page BTP (problème quotidien → solution agent IA), avec des scénarios réalistes pour chaque secteur.
- Les images domaines existent déjà dans `/public/images/homepage/`.
- La référence client sur les nouvelles pages sera générique/anonymisée (pas de nom de client réel).
- Les traductions zh-TW et zh-CN seront des traductions de qualité standard (pas de localisation culturelle poussée).
- Le contenu Lab existant est préservé tel quel, seul le routing change.
