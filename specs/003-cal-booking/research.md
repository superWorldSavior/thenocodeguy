# Research: 003-cal-booking

## Decision 1: Package d'embedding Cal.com

**Decision**: Utiliser `@calcom/embed-react@1.5.3`
**Rationale**: Package officiel Cal.com, supporte React 19 (peer deps `^18.2.0 || ^19.0.0`), fournit à la fois l'inline embed (`Cal` component) et le popup (`getCalApi`). ~26 KB ajoutés au bundle, le calendrier se charge en iframe depuis le CDN Cal.com.
**Alternatives considered**:
- Script vanilla (`embed.js` injecté manuellement) — plus fiable mais pas de type safety, plus de code custom
- iframe direct — pas de popup possible, UX limitée
- API custom + UI maison — over-engineering massif

## Decision 2: SSR handling

**Decision**: `next/dynamic` avec `ssr: false` pour tous les composants Cal.com
**Rationale**: L'embed utilise `window` et des APIs DOM. Sans `ssr: false`, erreurs `ReactCurrentDispatcher` en SSR. Issues documentées : #15772, #20814, Next.js discussion #71995.
**Alternatives considered**:
- Import direct avec `"use client"` seul — peut fonctionner mais risque de crash SSR intermittent
- `useEffect` guard avec `typeof window` — fragile, le module lui-même touche `window` à l'import

## Decision 3: Dark mode / theming

**Decision**: Passer `theme` dans DEUX endroits — `config` prop ET `cal("ui", { theme })` dans useEffect
**Rationale**: Bug de flickering connu (#15922, #16806) — l'embed a un interval de 50ms qui détecte le color scheme et peut overrider notre choix. Setter dans les deux endroits empêche le loop.
**Alternatives considered**:
- `theme: "auto"` — suit le système mais conflit avec next-themes qui toggle via class, pas media query

## Decision 4: Locale / i18n + fuseaux horaires

**Decision**: Créer 4 event types Cal.com (un par locale) avec des schedules adaptés aux fuseaux horaires du public cible. Le composant CalPopupButton sélectionne le bon `calLink` selon la locale courante via `useLocale()`.
**Rationale**: L'argument principal n'est pas la langue de l'UI (qui suit le navigateur) mais les **horaires de disponibilité**. Le fondateur est basé à Taïwan — un visiteur français doit voir des créneaux en heures France, un visiteur US en heures US, un visiteur Taïwan en heures locales. Sans event types séparés, le même calendrier afficherait des créneaux à 3h du matin pour certains fuseaux.
**Implementation**:
- FR : `thenocodeguy/decouverte` (existant, schedule France)
- EN : `thenocodeguy/discovery-call` (à créer via API, schedule US EST)
- ZH-TW : `thenocodeguy/discovery-call-zh-tw` (à créer, schedule Taïwan)
- ZH-CN : `thenocodeguy/discovery-call-zh-cn` (à créer, schedule Chine)
- Chaque event type a `interfaceLanguage` défini (en, zh-TW, zh-CN) — cela contrôle au moins le titre/description, l'UI suit le navigateur
**Alternatives considered**:
- Un seul event type pour toutes les locales — les créneaux seraient inadaptés selon le fuseau
- Paramètre `?locale=` dans calLink — non documenté, ne résout pas le problème des horaires

## Decision 5: Popup vs inline — où utiliser quoi

**Decision**: Popup pour les CTAs disséminés sur le site, inline pour la page /contact uniquement
**Rationale**: Le popup est lazy-loaded (rien ne charge tant que le visiteur ne clique pas) → zéro impact perf sur les 15+ pages qui ont un CTA. L'inline sur /contact donne une UX dédiée "je suis venu pour prendre RDV".
**Alternatives considered**:
- Inline partout — lourd, casse le layout des pages existantes
- Popup partout y compris /contact — rate l'opportunité de montrer le calendrier "above the fold" sur la page dédiée

## Decision 6: Fallback si Cal.com est down

**Decision**: Pas de fallback technique automatique. Le bouton popup ne fait rien si Cal.com ne répond pas — le lien /contact reste toujours accessible en nav/footer.
**Rationale**: Détecter la disponibilité de Cal.com ajouterait de la complexité (health check, state management). Le risque de downtime Cal.com est faible. Le formulaire Formspree sur /contact reste toujours accessible via les liens texte nav/footer (Tier 3 CTAs non modifiés).
**Alternatives considered**:
- Health check API → toggle entre popup et /contact redirect — over-engineering
- `try/catch` dans getCalApi → fallback vers `window.location = '/contact'` — fragile, UX confuse

## Decision 7: Namespace

**Decision**: Utiliser `namespace: "popup"` pour le popup et `namespace: "inline"` pour l'embed /contact
**Rationale**: Sans namespace, plusieurs embeds sur la même page causent des conflits (#10628, #12983). Même si aujourd'hui on n'a qu'un embed par page, le namespace prévient les bugs futurs.

## Decision 8: Wording CTA

**Decision**: Remplacer "Demander une démo — 15 min" par "Réserver un appel découverte" avec trust line "30 min avec Erwan — gratuit, sans engagement"
**Rationale**: Panel d'experts marketing unanime — "démo" sonne tech/logiciel, le public BTP veut expliquer son problème pas voir un screen share. L'incohérence 15min/30min crée de la méfiance. Nommer le fondateur crée de la confiance (BTP = business de relations).
**Alternatives considered**:
- "Planifier un échange" — trop vague
- "Prendre rendez-vous" — OK mais pas d'urgence/valeur
- Garder "Demander une démo" — rejeté par les experts
