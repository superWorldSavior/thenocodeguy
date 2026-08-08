# Feature Specification: Facturation Électronique BTP

**Feature ID**: 004-facturation-electronique
**Status**: Draft
**Created**: 2026-02-26
**Priority**: P1 — Timing critique (obligation septembre 2026)

---

## Context

La facturation électronique devient obligatoire en France :
- **1er septembre 2026** : réception obligatoire pour toutes les entreprises + émission pour GE/ETI
- **1er septembre 2027** : émission obligatoire pour PME/micro-entreprises

Le BTP est le secteur le plus impacté à cause de ses spécificités métier (situations de travaux, retenue de garantie 5%, auto-liquidation TVA sous-traitance, DGD). Les assistantes administratives BTP vont devoir jongler entre 3 à 5 Plateformes Agréées (PA, ex-PDP) différentes — une par client/fournisseur/comptable.

**Aucun concurrent ne propose un agent IA multi-PA spécialisé BTP pour les PME/TPE.** C'est un blue ocean.

### Marché cible
- ~400 000 entreprises BTP en France (immense majorité TPE/PME)
- Cible directe : assistantes administratives BTP (persona existante de TNCG)
- Timing : la panique va monter dans les 6 prochains mois

---

## Scope

Ce feature concerne **uniquement le marketing** — création de contenu pour le site thenocodeguy.com qui positionne TNCG comme la solution agent IA pour la facturation électronique BTP. Pas de développement produit/backend.

### In scope
- Nouvelle page domaine `/domaines/btp/facturation-electronique` (landing page dédiée)
- Nouvel article blog approfondi sur le sujet
- Mise à jour de la page `/domaines/btp` pour mentionner la facturation électronique
- Traductions 4 locales (FR prioritaire, EN/ZH-TW/ZH-CN secondaires)

### Out of scope (EC)
- EC-001 : Développement d'un vrai agent IA pour la facturation électronique
- EC-002 : Intégration avec des PA réelles (Chorus Pro, Sage, etc.)
- EC-003 : Modification des workflows existants
- EC-004 : Modification de la homepage (sections existantes)

---

## User Stories

### US1 — L'assistante BTP découvre la solution facturation électronique (P1)

**En tant qu'** assistante administrative BTP inquiète par l'arrivée de la facturation électronique obligatoire,
**je veux** trouver une page qui explique comment un agent IA peut m'aider à gérer cette transition,
**afin de** comprendre que je n'ai pas besoin d'apprendre 5 plateformes différentes.

**Acceptance Criteria:**
- SC-001 : La page `/domaines/btp/facturation-electronique` existe et est accessible depuis la navigation
- SC-002 : La page contient un hero avec le problème clairement posé ("Facturation électronique obligatoire en septembre 2026")
- SC-003 : La page contient une section "Avant/Après" montrant le quotidien sans agent vs avec agent
- SC-004 : La page contient une section listant les PA supportées (Chorus Pro, Sage, Cegid, Pennylane, Yooz, etc.)
- SC-005 : La page contient une section sur les spécificités BTP gérées (situations de travaux, retenue de garantie, auto-liquidation TVA)
- SC-006 : CTA principal → CalPopupButton ("Parlez-nous de votre facturation")
- SC-007 : Trust line sous le CTA ("Pas besoin d'être technique")
- SC-008 : La page est SEO-optimisée (meta title, description, H1-H3 structurés)
- SC-009 : Fonctionne en dark mode

### US2 — Le visiteur BTP lit l'article de fond sur la facturation électronique (P1)

**En tant que** dirigeant ou assistante BTP cherchant des informations sur la facturation électronique,
**je veux** lire un article complet qui explique le calendrier, les impacts et les solutions,
**afin de** me préparer et de considérer TNCG comme expert du sujet.

**Acceptance Criteria:**
- SC-010 : Un article blog existe à `/blog/facturation-electronique-btp-2026`
- SC-011 : L'article couvre le calendrier réglementaire (dates clés septembre 2026 / septembre 2027)
- SC-012 : L'article explique les PA (ex-PDP) et le rôle du PPF
- SC-013 : L'article détaille les spécificités BTP (situations, retenue de garantie, auto-liquidation, DGD)
- SC-014 : L'article présente les douleurs concrètes des assistantes BTP
- SC-015 : L'article propose la solution agent IA comme réponse
- SC-016 : CTA en fin d'article → CalPopupButton
- SC-017 : L'article est en FR avec traductions dans les 3 autres locales

### US3 — La page BTP mentionne la facturation électronique (P2)

**En tant que** visiteur de la page `/domaines/btp`,
**je veux** voir que TNCG gère aussi la facturation électronique,
**afin de** savoir que cette compétence est couverte et cliquer vers la page dédiée.

**Acceptance Criteria:**
- SC-018 : La page `/domaines/btp` contient une nouvelle section ou mention sur la facturation électronique
- SC-019 : Un lien vers `/domaines/btp/facturation-electronique` est présent
- SC-020 : Le wording est orienté douleur ("Septembre 2026, c'est demain")

### US4 — Les 4 locales sont synchronisées (P2)

**En tant que** visiteur non-francophone,
**je veux** que le contenu soit traduit dans ma langue,
**afin de** comprendre l'offre.

**Acceptance Criteria:**
- SC-021 : Toutes les nouvelles clés de traduction existent dans en.json, zh-TW.json, zh-CN.json
- SC-022 : Les traductions sont culturellement adaptées (pas littérales)
- SC-023 : Note : le sujet étant spécifiquement français, les versions non-FR peuvent être plus courtes/adaptées

---

## Technical Notes

- La landing page facturation électronique sera une sous-page de /domaines/btp/ → route: `app/[locale]/domaines/btp/facturation-electronique/page.tsx`
- L'article blog suivra le pattern existant des articles blog (voir `app/[locale]/blog/`)
- Réutiliser CalPopupButton pour les CTAs (déjà locale-aware)
- Réutiliser le pattern Avant/Après des pages domaines existantes
- Clés de traduction dans le namespace `facture` dans messages/*.json
- Image hero : à générer via gpt-image-1.5 (assistante BTP devant écran avec factures)
