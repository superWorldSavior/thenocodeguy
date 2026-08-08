# Implementation Plan: Facturation Electronique BTP

**Branch**: `004-facturation-electronique` | **Date**: 2026-02-26 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-facturation-electronique/spec.md`

## Summary

Creer du contenu marketing qui positionne TNCG comme la solution agent IA pour la facturation electronique BTP. Une landing page dediee sous `/domaines/btp/facturation-electronique` (sous-page du domaine BTP existant), un article blog approfondi a `/blog/facturation-electronique-btp-2026`, et une mise a jour de la page BTP existante avec mention + lien. Pitch principal : fragmentation des PA (jongler entre 3-5 Plateformes Agreees), pas la simple conformite. 4 locales synchronisees, FR prioritaire.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)
**Primary Dependencies**: Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, next-intl, lucide-react
**Storage**: N/A (contenu statique dans les fichiers i18n)
**Testing**: Build gate (`npm run build`) + verification visuelle
**Target Platform**: Web (Vercel), responsive desktop + mobile
**Project Type**: Web application (marketing site)
**Performance Goals**: N/A (pages statiques SSG)
**Constraints**: 4 locales obligatoires (fr, en, zh-TW, zh-CN), dark mode + light mode, build must pass
**Scale/Scope**: 1 nouvelle landing page, 1 nouvel article blog, 1 page modifiee, 4 fichiers i18n modifies

**New dependencies needed**: Aucune. Reutilisation de CalPopupButton, lucide-react icons, patterns de pages existantes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. User-First, Locale-First | PASS | Toutes les nouvelles cles dans les 4 locales (fr, en, zh-TW, zh-CN). FR prioritaire, traductions adaptees (pas litterales). |
| II. Server Components by Default | PASS | Landing page et article blog sont des Server Components (getTranslations). Seul CalPopupButton est client (existant). |
| III. Visual Quality over Speed | PASS | Reprend le design system existant (tokens shadcn, pas de couleurs hardcodees). Verification dark mode + mobile obligatoire. |
| IV. Confidentiality | PASS | Aucun nom de client reel. References anonymisees ("Entreprise BTP leader"). |
| V. Simplicity & No Over-Engineering | PASS | Aucun nouveau composant partage. Reutilisation des patterns existants (avant/apres BTP, structure article blog). Pas de nouvelle dependance. |
| VI. Build Must Pass | PASS | `npm run build` verifie en Phase 6 avant commit final. |

## Project Structure

### Documentation (this feature)

```text
specs/004-facturation-electronique/
├── spec.md              # Feature specification
├── research.md          # Research & decisions
├── plan.md              # This file
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
# US1 — Landing page facturation electronique
app/[locale]/domaines/btp/facturation-electronique/page.tsx   # NOUVEAU

# US2 — Article blog
app/[locale]/blog/facturation-electronique-btp-2026/page.tsx  # NOUVEAU

# US3 — Mise a jour page BTP existante
app/[locale]/domaines/btp/page.tsx                            # MODIFIE

# US2 — Mise a jour listing blog
app/[locale]/blog/page.tsx                                     # MODIFIE

# i18n — toutes les phases
messages/fr.json                                               # MODIFIE (+facture, +articles.factureBtp, +blog article2*)
messages/en.json                                               # MODIFIE (sync)
messages/zh-TW.json                                            # MODIFIE (sync)
messages/zh-CN.json                                            # MODIFIE (sync)
```

**Structure Decision**: La landing page est une sous-page de `/domaines/btp/` (route `app/[locale]/domaines/btp/facturation-electronique/page.tsx`) — coherent avec la hierarchie domaine > sous-domaine. L'article blog suit le pattern identique aux articles existants (`comment-automatiser-veille-email`, `windmill-vs-n8n`).

## Files Modified — Resume

| File | Action | Scope |
|------|--------|-------|
| `messages/fr.json` | MODIFY | +namespace `facture` (landing page), +namespace `articles.factureBtp` (blog), +blog listing keys `article2*`, +domainesBtp mention |
| `messages/en.json` | MODIFY | Sync toutes les nouvelles cles |
| `messages/zh-TW.json` | MODIFY | Sync toutes les nouvelles cles |
| `messages/zh-CN.json` | MODIFY | Sync toutes les nouvelles cles |
| `app/[locale]/domaines/btp/facturation-electronique/page.tsx` | CREATE | Landing page dediee (Server Component) |
| `app/[locale]/blog/facturation-electronique-btp-2026/page.tsx` | CREATE | Article blog approfondi (Server Component) |
| `app/[locale]/domaines/btp/page.tsx` | MODIFY | Ajout section/mention facturation electronique + lien |
| `app/[locale]/blog/page.tsx` | MODIFY | Ajout du nouvel article dans le listing |

## Phases

### Phase 1 — Cles de traduction FR (namespace `facture`)

**Files**: `messages/fr.json`

Ajouter le namespace `facture` pour la landing page. Structure des cles :

```json
{
  "facture": {
    "metaTitle": "Facturation electronique BTP 2026 — Agent IA multi-plateforme | TheNoCodeGuy",
    "metaDesc": "Obligation sept. 2026 : votre agent IA gere Chorus Pro, Sage, Pennylane... pour vous. Specialise BTP.",
    "badge": "Obligation septembre 2026",
    "title": "Facturation electronique obligatoire : ne laissez pas votre assistante jongler avec 5 plateformes",
    "subtitle": "...",
    "ctaTop": "Parlez-nous de votre facturation",
    "problemTitle": "Ce qui vous attend en septembre 2026",
    "problem1": "...", "problem2": "...", "problem3": "...", "problem4": "...",
    "beforeLabel": "Avant",
    "afterLabel": "Apres",
    "beforeAfterTitle": "Votre quotidien facturation : avant et apres l'agent IA",
    "ba1Before": "...", "ba1After": "...",
    "ba2Before": "...", "ba2After": "...",
    "ba3Before": "...", "ba3After": "...",
    "ba4Before": "...", "ba4After": "...",
    "ba5Before": "...", "ba5After": "...",
    "btpTitle": "Les specificites BTP gerees nativement",
    "btp1Title": "Situations de travaux", "btp1Desc": "...",
    "btp2Title": "Retenue de garantie 5%", "btp2Desc": "...",
    "btp3Title": "Auto-liquidation TVA", "btp3Desc": "...",
    "btp4Title": "Acomptes chantier", "btp4Desc": "...",
    "btp5Title": "DGD", "btp5Desc": "...",
    "paTitle": "Compatible avec vos plateformes",
    "pa1": "Chorus Pro", "pa2": "Sage / Batigest",
    "pa3": "Cegid", "pa4": "Pennylane",
    "pa5": "Batappli / Cecurity", "pa6": "Yooz",
    "pa7": "Dext", "pa8": "Docaposte / SERES", "pa9": "Qonto",
    "howTitle": "Comment ca marche",
    "how1Label": "Etape 1", "how1Title": "...", "how1Desc": "...",
    "how2Label": "Etape 2", "how2Title": "...", "how2Desc": "...",
    "how3Label": "Etape 3", "how3Title": "...", "how3Desc": "...",
    "ctaBottom": "Parlez-nous de votre facturation",
    "ctaSubtext": "Pas besoin d'etre technique — on s'occupe de tout"
  }
}
```

Cles exactes a rediger avec le contenu final lors de l'implementation. Structure ci-dessus = squelette valide.

### Phase 2 — Landing page `/domaines/btp/facturation-electronique`

**File**: `app/[locale]/domaines/btp/facturation-electronique/page.tsx`

Server Component. Pattern identique a `app/[locale]/domaines/btp/page.tsx` :
- `generateMetadata()` avec `getTranslations("facture")`
- Import `CalPopupButton` pour CTAs
- Import icons lucide-react (AlertTriangle, Check, X, ArrowRight, FileText, Shield, etc.)

**Sections (7)** — conformes a la Decision 7 du research.md :

1. **Hero** : Badge urgence ("Obligation septembre 2026") + H1 centrant sur la fragmentation PA + sous-titre + CalPopupButton + trust line
2. **Le probleme** : 4 points de douleur concrets (3-5 PA, formation, erreurs, non-conformite)
3. **Avant/Apres** : 5 comparaisons concretes (pattern X/Check existant de la page BTP)
4. **Specificites BTP** : 5 cards (situations, retenue garantie, auto-liquidation, acomptes, DGD)
5. **PA compatibles** : Grille 3x3 avec les 9 PA (Decision 3 research.md)
6. **Comment ca marche** : 3 etapes simples (brief → matching → deploiement)
7. **CTA bottom** : CalPopupButton + trust line

**SEO** : H1 contient "facturation electronique BTP", meta title/description optimises pour les mots-cles cibles (Decision 8 research.md).

**Dark mode** : Utilise exclusivement des design tokens shadcn (bg-background, text-foreground, bg-card, border-border, bg-primary, text-primary, bg-muted, etc.) — pas de couleurs hardcodees.

### Phase 3 — Article blog `/blog/facturation-electronique-btp-2026`

**Files** :
- `messages/fr.json` — namespace `articles.factureBtp` (pattern existant : `articles.veilleEmail`)
- `app/[locale]/blog/facturation-electronique-btp-2026/page.tsx`

Server Component. Pattern identique a `app/[locale]/blog/comment-automatiser-veille-email/page.tsx` :
- `generateMetadata()` avec `getTranslations("articles.factureBtp")`
- Breadcrumb retour vers `/blog`
- Header : badge, H1, auteur, date, readTime, tags
- Article structure en `<article>` avec sections `<section>`

**Sections article** (conformes aux acceptance criteria SC-010 a SC-017) :

1. **Hook** : accroche sur l'urgence septembre 2026
2. **Calendrier reglementaire** : dates cles, qui est concerne, difference reception/emission
3. **PA et PPF** : explication du systeme, role des Plateformes Agreees (ex-PDP), PPF
4. **Le probleme specifique BTP** : 5 specificites detaillees (situations, retenue, auto-liquidation, acomptes, DGD)
5. **Les douleurs concretes** : liste a puces du quotidien de l'assistante BTP face a 3-5 PA
6. **La solution agent IA** : pitch multi-PA + specialise BTP + PME/TPE
7. **CTA** : CalPopupButton dans un encart primary/5
8. **Signature** : auteur TheNoCodeGuy

**Tags** : ["Facturation", "BTP", "IA", "2026", "Conformite"]

### Phase 4 — Mise a jour page BTP + listing blog

**Files** :
- `app/[locale]/domaines/btp/page.tsx` — MODIFY
- `app/[locale]/blog/page.tsx` — MODIFY
- `messages/fr.json` — MODIFY (cles supplementaires)

#### 4a — Page BTP

Ajouter une section entre le dernier avant/apres et le CTA reference client. Contenu :

- H2 : cle `domainesBtp.factureTitle` ("Facturation electronique obligatoire des septembre 2026")
- Paragraphe : cle `domainesBtp.factureDesc` (pitch court sur la fragmentation PA)
- Lien : `<Link href="/domaines/btp/facturation-electronique">` avec cle `domainesBtp.factureCta` ("Decouvrir notre solution →")

Le wording est oriente douleur conformement a SC-020 ("Septembre 2026, c'est demain").

#### 4b — Blog listing

Ajouter le nouvel article dans le tableau `articles` de `app/[locale]/blog/page.tsx` :

```typescript
{
  slug: "facturation-electronique-btp-2026",
  title: t("article2Title"),
  excerpt: t("article2Excerpt"),
  date: t("article2Date"),
  readTime: t("article2ReadTime"),
  tags: ["Facturation", "BTP", "IA", "2026", "Conformite"],
}
```

Ajouter les cles correspondantes `article2Title`, `article2Excerpt`, `article2Date`, `article2ReadTime` dans le namespace `blog` de `messages/fr.json`.

### Phase 5 — Sync locales EN, ZH-TW, ZH-CN

**Files** : `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`

Traduire toutes les nouvelles cles des Phases 1, 3 et 4 :
- Namespace `facture` (landing page)
- Namespace `articles.factureBtp` (article blog)
- Cles `blog.article2*` (listing blog)
- Cles `domainesBtp.facture*` (mention page BTP)

**Adaptation culturelle** (SC-022, SC-023) :
- **EN** : Adaptation au contexte e-invoicing international. Le sujet reste pertinent (obligation francaise expliquee pour un public international). Versions potentiellement plus courtes.
- **ZH-TW / ZH-CN** : Adaptation au contexte tarifaire/reglementaire. Focus sur l'aspect "agent IA specialise" plutot que sur les details reglementaires francais. Versions plus courtes acceptables (SC-023).

Toutes les cles doivent exister dans les 4 locales pour que le build passe (Principe I).

### Phase 6 — Build verification + SEO validation

**Commandes** :
```bash
npm run build
```

**Verifications** :
1. Build passe sans erreur (Principe VI)
2. Les 2 nouvelles routes sont generees : `/domaines/btp/facturation-electronique` et `/blog/facturation-electronique-btp-2026`
3. Les 4 locales fonctionnent (FR, EN, ZH-TW, ZH-CN)
4. Dark mode OK sur les 2 nouvelles pages
5. Mobile responsive OK
6. CalPopupButton fonctionne sur la landing page
7. Lien depuis `/domaines/btp` vers la landing page fonctionne
8. Nouvel article visible dans le listing `/blog`
9. Meta title/description presentes et optimisees SEO (mots-cles Decision 8)
10. Pas de couleurs hardcodees (Principe III)
11. Aucun nom de client reel expose (Principe IV)

## Complexity Tracking

> Aucune violation de constitution. Pas de tracking necessaire.

Pas de nouvelle dependance. Pas de nouveau composant partage. Deux nouvelles pages server component suivant les patterns existants, modifications mineures sur 2 pages existantes, et cles i18n dans les 4 locales.
