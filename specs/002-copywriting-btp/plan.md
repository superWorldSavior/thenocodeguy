# Implementation Plan: Copywriting BTP

**Branch**: `002-copywriting-btp` | **Date**: 2026-02-25 | **Spec**: [spec.md](spec.md)

## Summary

Refonte complète du copywriting orienté conversion BTP. Nouveau hero headline parlant le langage métier des assistantes admin BTP, tâches spécifiques dans la card domaine BTP, page BTP dédiée avec 6 sections avant/après miroir KellyAssist, CTAs accessibles, SEO optimisé. 4 locales synchronisées.

## Technical Context

**Language/Version**: TypeScript 5
**Primary Dependencies**: Next.js 16, next-intl, Tailwind CSS v4
**Testing**: Vitest (AC tests), visual browser testing
**Constraints**: 4 locales must work, build must pass, no KellyAssist name in public code

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. User-First, Locale-First | PASS | All 4 locales updated in same commit |
| II. Server Components by Default | PASS | BTP page is RSC |
| III. Visual Quality over Speed | PASS | Copy quality is the core of this feature |
| IV. Confidentiality | PASS | KellyAssist never mentioned, "Entreprise BTP leader" used |
| V. Simplicity | PASS | No new components, only translation keys + page restructure |
| VI. Build Must Pass | PASS | Verified after each phase |

## Phases

### Phase 1 — Hero copywriting (FR)

**File**: `messages/fr.json`

Update hero namespace keys:
```json
{
  "headline": "Votre assistante admin BTP débordée ? On lui met un bras droit IA.",
  "subline": "Relances factures, alertes Qualibat, prep compta, digest emails — un agent IA prend en charge vos tâches répétitives en 48h. Vous gardez le contrôle, il fait le travail de fond.",
  "badge": "Agence de staffing IA",
  "ctaPrimary": "Voir ce qu'on automatise",
  "ctaSecondary": "Comment ça marche",
  "trustBadge1": "Déployé en 48h",
  "trustBadge2": "Fonctionne via WhatsApp",
  "trustBadge3": "Spécialisé BTP"
}
```

### Phase 2 — Card BTP homepage (FR)

**File**: `messages/fr.json`

Update domaines namespace — btpTasks key:
```
"btpTasks": "Relance factures auto,Alertes Qualibat & décennale,Digest emails matinal,Prépa comptable,Variables de paie,Suivi appels d'offres,Rappels WhatsApp échéances"
```

### Phase 3 — Page BTP refonte (FR + composant)

**Files**:
- `messages/fr.json` — namespace `domainesBtp` enrichi avec 6 sections avant/après
- `app/[locale]/domaines/btp/page.tsx` — restructuré avec :
  1. Hero BTP spécifique (badge, titre, sous-titre, CTA)
  2. Section Admin & Conformité (4 avant/après)
  3. Section Gestion RH (4 avant/après)
  4. Section Suivi Financier (4 avant/après)
  5. Section Pilotage Chantier (4 avant/après)
  6. Section Commercial & AO (3 avant/après)
  7. CTA final avec référence client anonymisée

**SEO**: Meta title "Assistante administrative BTP augmentée par l'IA — TheNoCodeGuy", description optimisée

### Phase 4 — CTAs refonte (FR)

**Files**: `messages/fr.json`

Update CTA keys across namespaces:
- `ctaSection.title`: "Prêt à automatiser votre admin ?"
- `ctaSection.subtitle`: "Décrivez vos tâches répétitives. On vous montre ce qu'un agent IA peut gérer en 48h — sans engagement."
- `ctaSection.button`: "Demander une démo — 15 min"

### Phase 5 — Sync locales EN, ZH-TW, ZH-CN

**Files**: `messages/en.json`, `messages/zh-TW.json`, `messages/zh-CN.json`

Translate all new/modified keys from Phase 1-4 into the 3 other locales. Adapt culturally (not literal translation).

### Phase 6 — Build verification

Run `npm run build`, verify no errors, check all 4 locales visually.

## Files Modified

| File | Action |
|------|--------|
| `messages/fr.json` | Modify — hero, domaines.btp, domainesBtp, ctaSection |
| `messages/en.json` | Modify — sync all new keys |
| `messages/zh-TW.json` | Modify — sync all new keys |
| `messages/zh-CN.json` | Modify — sync all new keys |
| `app/[locale]/domaines/btp/page.tsx` | Modify — 6 sections avant/après + SEO meta |

## Complexity Tracking

No new dependencies. No new components. Only translation keys and page restructure within existing patterns.
