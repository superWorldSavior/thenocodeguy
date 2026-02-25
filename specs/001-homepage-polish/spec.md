# Feature Specification: Homepage Polish

**Feature Branch**: `001-homepage-polish`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Polish homepage visuals, fix AI-generated images, improve Tailwind v4 usage, verify dark mode and responsive. Site = agence de staffing IA, cible #1 = assistantes admin BTP.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Images réalistes sans artefacts IA (Priority: P1)

Un visiteur arrive sur la homepage et voit des images corporate réalistes (pas de fantômes bleus, pas d'hologrammes). Le petit overlay workflow blanc avec la tête stylisée est visible de manière cohérente sur chaque image.

**Why this priority**: Les images actuelles de BTP et Web & Digital ont encore des éléments bleutés/sci-fi qui nuisent à la crédibilité d'une agence de staffing professionnelle. C'est le premier problème visible.

**Independent Test**: Ouvrir la homepage, scroller les 4 domaines et la section case study. Aucune image ne doit contenir d'éléments translucides, bleus néon ou holographiques. L'overlay workflow blanc doit être visible en bas à droite de chaque image.

**Acceptance Scenarios**:

1. **Given** la homepage chargée, **When** je regarde l'image hero, **Then** je vois une photo corporate réaliste d'une équipe en coworking avec un petit overlay workflow blanc
2. **Given** la section domaines, **When** je regarde chaque card, **Then** les 4 images sont réalistes, cohérentes entre elles, avec overlay workflow contextuel
3. **Given** la section case study, **When** je vois l'image split chantier/bureau, **Then** aucun élément sci-fi n'est présent

---

### User Story 2 - Dark mode cohérent (Priority: P2)

Un visiteur utilisant le dark mode voit un site cohérent avec la charte bleu nuit + jaune. Toutes les sections sont lisibles, les contrastes sont suffisants, les images s'intègrent bien sur fond sombre.

**Why this priority**: Le dark mode est activé par défaut sur beaucoup d'appareils. Un dark mode cassé fait amateur.

**Independent Test**: Basculer en dark mode et scroller toute la homepage. Chaque section doit être lisible et esthétiquement cohérente.

**Acceptance Scenarios**:

1. **Given** le dark mode activé, **When** je lis la section stats, **Then** le texte blanc est lisible sur le fond bleu nuit
2. **Given** le dark mode activé, **When** je regarde les cards domaines, **Then** les bordures et arrière-plans s'adaptent correctement
3. **Given** le dark mode activé, **When** je vois le CTA section, **Then** le bouton jaune est visible et contrasté

---

### User Story 3 - Responsive mobile parfait (Priority: P2)

Un visiteur sur mobile (< 768px) voit un site parfaitement adapté : images proportionnées, texte lisible, cards empilées, CTA accessibles au pouce.

**Why this priority**: La majorité du trafic BTP vient du mobile (chefs de chantier, assistantes en déplacement).

**Independent Test**: Ouvrir le site en viewport 375px et scroller. Aucun débordement horizontal, tous les CTA sont cliquables, les images ne sont pas coupées.

**Acceptance Scenarios**:

1. **Given** un écran 375px, **When** je vois la section hero, **Then** l'image est sous le texte (pas côte à côte) et le CTA est pleine largeur
2. **Given** un écran 375px, **When** je vois les domaines, **Then** les 4 cards sont empilées en colonne unique
3. **Given** un écran 375px, **When** je vois la timeline HowItWorks, **Then** les étapes sont empilées verticalement

---

### User Story 4 - Tailwind v4 optimisé (Priority: P3)

Le CSS utilise les patterns Tailwind v4 modernes : variables CSS natives via `@theme`, utility classes préférées aux `@apply`, suppression de CSS custom redondant avec des utilities Tailwind existantes.

**Why this priority**: Réduire la dette technique et profiter de la performance de Tailwind v4.

**Independent Test**: Auditer `globals.css` — les classes custom ne doivent exister que si aucune utility Tailwind native ne les remplace. Le build doit passer sans warning Tailwind.

**Acceptance Scenarios**:

1. **Given** le fichier `globals.css`, **When** j'audite les classes custom, **Then** chaque classe est soit irremplaçable par Tailwind soit correctement définie dans `@theme`
2. **Given** le build, **When** je lance `npm run build`, **Then** aucun warning Tailwind n'apparaît

---

### Edge Cases

- Que se passe-t-il en mode print ? (non critique, mais pas de CSS cassé)
- Comment les images se comportent-elles sur écran Retina vs standard ?
- Le site fonctionne-t-il sur Safari iOS (WebP support) ?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Les 6 images homepage DOIVENT être des photos réalistes sans éléments holographiques/sci-fi
- **FR-002**: L'overlay workflow blanc DOIT être cohérent en style (tête identique, lignes identiques) mais contextuel en contenu
- **FR-003**: Le dark mode DOIT fonctionner sur toutes les 7 sections homepage sans problème de contraste
- **FR-004**: Le responsive DOIT être vérifié sur 3 breakpoints : mobile (375px), tablette (768px), desktop (1280px)
- **FR-005**: Les classes CSS custom DOIVENT être minimales — préférer les utilities Tailwind v4 natives
- **FR-006**: Le `npm run build` DOIT passer sans erreur ni warning

### Key Entities

- **Image homepage** : fichier WebP dans `/public/images/homepage/`, généré par script `generate-homepage-images.ts`
- **Section homepage** : composant React Server Component dans `/components/organisms/`
- **Theme tokens** : variables CSS dans `app/globals.css` sous `@theme inline`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des images homepage sont jugées "réalistes et professionnelles" (aucun artefact IA visible)
- **SC-002**: 100% des sections passent le test dark mode sans problème de lisibilité
- **SC-003**: Aucun débordement horizontal sur viewport 375px
- **SC-004**: Le nombre de classes CSS custom dans `globals.css` est réduit d'au moins 30%
- **SC-005**: Le build passe en moins de 60 secondes sans erreur
