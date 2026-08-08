# Feature Specification: Cal.com Booking Integration

**Feature Branch**: `003-cal-booking`
**Created**: 2026-02-26
**Status**: Draft
**Input**: Intégrer Cal.com (popup + inline) pour prise de RDV directe, avec analyse funnel marketing

## Context

Le site a ~23 CTAs pointant vers `/contact` (formulaire Formspree). Le fondateur a un compte Cal.com avec un event type "Découverte — Parlons de votre projet" (30 min, Microsoft Teams). URL : `cal.com/thenocodeguy/decouverte`.

**Problème actuel** : Le chemin de conversion est CTA → page /contact → remplir 6+ champs → attendre email → planifier appel. Trop de friction pour le public cible (assistantes BTP, pas tech-savvy).

**Solution** : Intégrer Cal.com en popup sur les CTAs haute intention + inline sur /contact. Garder le formulaire comme chemin secondaire.

## Expert Marketing Findings

Panel d'experts (Christensen, Porter, Godin, Kim & Mauborgne, Collins, Taleb, Meadows, Doumont) :

1. **Ne pas éliminer le formulaire** — certains prospects BTP veulent écrire à 22h après le chantier
2. **Le mot "démo" est interdit** — le public BTP ne veut pas voir du software, il veut expliquer son problème
3. **Incohérence 15min/30min** — les CTAs disent "15 min" mais l'event Cal.com est 30 min → aligner sur 30 min
4. **Hiérarchie CTA en 3 tiers** — haute/moyenne/basse intention
5. **Trust signals essentiels** : nom du fondateur, "sans engagement", "pas besoin d'être technique"
6. **CTAs contextuels par domaine** — BTP parle d'appels d'offres, Commerce de prospection
7. **Résilience** : Cal.com down → le formulaire reste opérationnel
8. **Ajouter 2 questions custom** au booking Cal.com : secteur + problème principal

## Functional Requirements

- **FR-001**: Composant `CalPopupButton` — client component utilisant `@calcom/embed-react` (getCalApi + data-cal-link), ouvre un popup Cal.com au clic
- **FR-002**: Composant `CalInlineEmbed` — embed inline pour la page /contact, affiche le calendrier directement dans le layout
- **FR-003**: Les deux composants supportent le theming (light/dark mode) via le design system existant
- **FR-004**: Le `calLink` est sélectionné par locale (fr → `thenocodeguy/decouverte`, en/zh-TW/zh-CN → event types créés via API)
- **FR-005**: Fallback si Cal.com est indisponible — le bouton redirige vers `/contact` classique
- **FR-006**: Refonte wording CTA : "Demander une démo — 15 min" → "Réserver un appel découverte — 30 min" (+ variantes contextuelles par domaine)
- **FR-007**: Redesign `/contact` : Cal.com inline en haut (75% poids visuel) + formulaire réduit en bas ("Vous préférez écrire ?")
- **FR-008**: Trust line sous chaque CTA booking : "30 min avec {fondateur}, gratuit, sans engagement"
- **FR-009**: Traductions 4 locales (fr, en, zh-TW, zh-CN) pour tous les nouveaux wordings
- **FR-010**: Event types Cal.com multilingues créés via API v2 pour en, zh-TW, zh-CN

## Non-Functional Requirements

- **NFR-001**: Le popup Cal.com est lazy-loaded (ne charge rien tant que le visiteur ne clique pas)
- **NFR-002**: Zero impact sur le Core Web Vitals (LCP, CLS) — pas de script Cal.com au page load
- **NFR-003**: SSR-safe — le composant Cal.com doit être client-only (dynamic import avec ssr: false si nécessaire)

## Edge Cases

- **EC-001**: Page /contact garde le formulaire Formspree comme chemin secondaire
- **EC-002**: Les liens texte "Contact" dans nav et footer restent des liens vers `/contact` (pas de popup)
- **EC-003**: Le formulaire de workflow (email capture pour guide download) ne change PAS — il reste indépendant
- **EC-004**: Si Cal.com n'a plus de créneaux, afficher un message "Tous les créneaux sont pris — laissez-nous un message" avec le formulaire

---

## User Scenarios & Testing

### User Story 1 — Le visiteur BTP réserve un appel en 3 clics (Priority: P1) 🎯 MVP

Un visiteur sur la homepage lit le hero, scrolle, voit "Réserver un appel découverte — 30 min". Il clique, le popup Cal.com s'ouvre avec le calendrier. Il choisit un créneau, entre son nom et email, confirme. Booking fait, sans quitter la page.

**Why this priority**: C'est le coeur de la feature — réduire la friction de conversion de 6-7 étapes à 3-4.

**Independent Test**: Cliquer sur le CTA hero ou CTA section bottom → popup s'ouvre → créneaux visibles → booking possible.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la homepage, **When** il clique "Réserver un appel découverte" dans le hero, **Then** un popup Cal.com s'ouvre avec le calendrier du mois en cours
2. **Given** le popup est ouvert, **When** il sélectionne un créneau et remplit nom + email, **Then** la réservation est confirmée et il voit un message de confirmation
3. **Given** le site est en dark mode, **When** le popup s'ouvre, **Then** il respecte le thème dark

---

### User Story 2 — Le wording CTA est aligné sur le funnel (Priority: P1)

Tous les CTAs "Demander une démo — 15 min" sont remplacés par un wording adapté : "Réserver un appel découverte — 30 min" pour les CTAs haute intention, avec des variantes contextuelles sur les pages domaines.

**Why this priority**: L'incohérence 15min/30min crée de la méfiance. Le mot "démo" ne parle pas au public BTP.

**Independent Test**: Grep des 4 fichiers de locale — zéro occurrence de "Demander une démo", "15 min" dans les CTAs, ni "démo" (sauf description technique).

**Acceptance Scenarios**:

1. **Given** le fichier `messages/fr.json`, **When** on grep "démo" dans les clés CTA, **Then** zéro résultat (sauf contexte non-CTA)
2. **Given** la page `/domaines/btp`, **When** on lit le CTA bottom, **Then** il dit "Parlez-nous de vos appels d'offres" ou équivalent contextualisé BTP
3. **Given** le fichier `messages/en.json`, **When** on grep "demo" dans les clés CTA, **Then** zéro résultat

---

### User Story 3 — La page /contact propose booking + formulaire (Priority: P2)

Le visiteur arrive sur /contact et voit d'abord le calendrier Cal.com inline ("Réservez un appel découverte avec Erwan"). En dessous, une section réduite "Vous préférez écrire ?" avec le formulaire Formspree simplifié.

**Why this priority**: La page /contact est la destination de plusieurs liens texte (nav, footer). Elle doit servir les deux chemins.

**Independent Test**: Ouvrir /contact → calendrier inline visible en premier → formulaire en dessous.

**Acceptance Scenarios**:

1. **Given** un visiteur sur `/contact`, **When** la page charge, **Then** le calendrier Cal.com inline est visible au-dessus de la fold
2. **Given** un visiteur sur `/contact`, **When** il scrolle, **Then** il voit "Vous préférez écrire ?" avec le formulaire réduit
3. **Given** Cal.com est indisponible, **When** la page charge, **Then** le formulaire est affiché en premier avec un message "Réservation temporairement indisponible"

---

### User Story 4 — Les CTAs booking ont des trust signals (Priority: P2)

Sous chaque bouton de booking (popup ou inline), une ligne de confiance : "30 min avec Erwan, gratuit, sans engagement" + "Pas besoin d'être technique".

**Why this priority**: Le public BTP est sceptique envers l'IA. Les trust signals réduisent l'objection principale.

**Independent Test**: Inspecter visuellement les CTAs hero, CTA section, et pages domaines — trust line visible sous chaque bouton.

**Acceptance Scenarios**:

1. **Given** le hero de la homepage, **When** on regarde sous le bouton CTA principal, **Then** une ligne "30 min avec Erwan, gratuit, sans engagement" est visible
2. **Given** la page `/domaines/btp`, **When** on regarde le CTA bottom, **Then** "Pas besoin d'être technique" est visible

---

### User Story 5 — Event types multilingues + horaires adaptés par fuseau (Priority: P2)

Chaque locale a son propre event type Cal.com avec titre/description traduit ET un schedule adapté au fuseau horaire du public cible :
- **FR** (`thenocodeguy/decouverte`) : horaires bureau France (9h-18h CET) — existant
- **EN** (`thenocodeguy/discovery-call`) : horaires US business (9am-5pm EST) — à créer via API
- **ZH-TW** (`thenocodeguy/discovery-call-zh-tw`) : horaires Taïwan locaux du fondateur — à créer via API
- **ZH-CN** (`thenocodeguy/discovery-call-zh-cn`) : horaires Chine continentale — à créer via API

Le composant CalPopupButton sélectionne le bon `calLink` selon la locale courante.

**Why this priority**: Les horaires doivent être adaptés aux fuseaux — un visiteur US ne peut pas booker à 3h du matin heure fondateur, et un visiteur chinois non plus. C'est un prérequis pour que le booking fonctionne à l'international.

**Independent Test**: Switcher la locale en EN → le popup Cal.com affiche "Discovery Call — Let's talk about your project" avec des créneaux en heures US.

**Acceptance Scenarios**:

1. **Given** le site en locale `en`, **When** le visiteur clique un CTA booking, **Then** le popup Cal.com affiche le titre en anglais avec des créneaux en heures US business
2. **Given** le site en locale `zh-TW`, **When** le visiteur clique un CTA booking, **Then** le popup affiche le titre en chinois traditionnel avec des créneaux en heures Taïwan
3. **Given** le composant CalPopupButton, **When** la locale est `fr`, **Then** le calLink est `thenocodeguy/decouverte` ; quand `en` → `thenocodeguy/discovery-call` ; etc.

---

## CTA Tier Map

### Tier 1 — Haute intention → Cal.com popup

| Composant | Fichier | CTA actuel |
|-----------|---------|------------|
| HeroCarousel primary | `components/organisms/HeroCarousel.tsx` | "Voir ce qu'on automatise" |
| CTASection button | `components/organisms/CTASection.tsx` | "Demander une démo — 15 min" |
| MissionsSection CTA | `components/organisms/MissionsSection.tsx` | (redirige /contact) |
| Navigation desktop CTA | `components/Navigation.tsx` | "Automatiser mes tâches" |
| Navigation mobile CTA | `components/Navigation.tsx` | "Automatiser mes tâches" |

### Tier 2 — Moyenne intention → Cal.com popup

| Composant | Fichier | CTA actuel |
|-----------|---------|------------|
| Domain pages bottom CTA | `app/[locale]/domaines/*/page.tsx` | "Demander une démo — 15 min" |
| Domain pages hero CTA | `app/[locale]/domaines/*/page.tsx` | "Demander une démo — 15 min" |
| Agents CTA | via messages agents.ctaButton | "Demander une démo" |
| Pricing CTA | via messages pricing.ctaButton | "Demander une démo — 15 min" |

### Tier 3 — Basse intention → Lien vers /contact (inchangé)

| Composant | Fichier | Comportement |
|-----------|---------|------------|
| Footer "Contact" | `components/Footer.tsx` | Lien texte → /contact |
| Nav "Contact" | `components/Navigation.tsx` | Lien texte → /contact |
| Blog CTAs | `app/[locale]/blog/*/page.tsx` | Lien → /contact (redesigné) |
| Workflows CTAs | `app/[locale]/workflows/*/page.tsx` | Lien → /contact (redesigné) |

## Success Criteria

- **SC-001**: Les 5 CTAs Tier 1 ouvrent le popup Cal.com au clic
- **SC-002**: Les CTAs Tier 2 ouvrent le popup Cal.com au clic
- **SC-003**: Zéro occurrence de "démo" ou "15 min" dans les CTAs publics
- **SC-004**: La page /contact affiche Cal.com inline + formulaire secondaire
- **SC-005**: Dark mode respecté sur popup et inline
- **SC-006**: `npm run build` passe sans erreur
- **SC-007**: 4 locales synchronisées
- **SC-008**: Event types multilingues créés sur Cal.com
