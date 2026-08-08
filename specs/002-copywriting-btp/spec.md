# Feature Specification: Copywriting BTP — Refonte wording orienté conversion

**Feature Branch**: `002-copywriting-btp`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Refonte complète du copywriting homepage + page BTP pour convertir les assistantes administratives BTP (première cible mailing). Basé sur l'analyse Mercator (STP, AIDA) et le benchmark KellyAssist.fr.

## Contexte business

TheNoCodeGuy est une agence de staffing IA. La première campagne mailing cible les **assistantes administratives BTP** en France (PME/TPE 5-50 salariés). Le client référence est une entreprise BTP leader qui utilise déjà nos agents IA pour automatiser son admin.

**Problème actuel** : le wording du site ("Nous plaçons un No Code Guy dans votre équipe") ne parle pas à la cible. Une assistante BTP ne sait pas ce qu'est un "No Code Guy", ne se reconnaît pas dans le message, et quitte en 5 secondes.

**Benchmark** : KellyAssist.fr propose 6 pôles d'expertise BTP (Admin/Conformité, RH, Financier, Pilotage Chantier, Commercial/AO, Formations) avec des humains. TheNoCodeGuy propose d'automatiser ces mêmes tâches par l'IA.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — L'assistante BTP comprend immédiatement la proposition (Priority: P1)

Une assistante administrative BTP reçoit un email froid et clique sur le lien vers thenocodeguy.com. En 5 secondes, elle comprend que ce site propose d'automatiser les tâches répétitives qu'elle fait chaque jour (relances factures, conformité, prépa compta).

**Why this priority**: C'est le scénario principal de la campagne mailing. Si la cible ne comprend pas en 5 secondes, le taux de rebond sera catastrophique.

**Independent Test**: Montrer la homepage à 3 assistantes BTP et leur demander "Qu'est-ce que cette entreprise propose ?" — 3/3 doivent répondre correctement.

**Acceptance Scenarios**:

1. **Given** la homepage chargée, **When** je lis le headline, **Then** il mentionne explicitement l'administration BTP et les tâches automatisables
2. **Given** la homepage, **When** je lis le sous-titre, **Then** il liste des tâches concrètes que je fais chaque jour (relances, Qualibat, compta, emails)
3. **Given** les trust badges, **When** je les vois, **Then** au moins un mentionne une fonctionnalité que je comprends (ex: WhatsApp, BTP, 48h)

---

### User Story 2 — La card BTP parle le langage métier (Priority: P1)

Sur la homepage, la card du domaine BTP liste des tâches que l'assistante BTP reconnaît immédiatement comme faisant partie de son quotidien.

**Why this priority**: Le BTP est la première cible commerciale.

**Independent Test**: Comparer les tâches listées dans la card BTP avec les 6 pôles d'expertise de KellyAssist. Chaque tâche listée doit correspondre à une activité réelle et reconnaissable.

**Acceptance Scenarios**:

1. **Given** la section domaines, **When** je vois la card BTP, **Then** les tâches incluent au minimum : relances factures, alertes échéances (Qualibat/décennale), prépa comptable, variables de paie
2. **Given** la card BTP, **When** je clique sur le CTA, **Then** j'arrive sur la page BTP dédiée avec le détail

---

### User Story 3 — La page BTP dédiée montre l'avant/après concret (Priority: P1)

La page `/domaines/btp` présente 5-6 sections correspondant aux pôles d'expertise BTP. Chaque section montre un format "Avant (manuel) → Après (agent IA)" avec des tâches concrètes.

**Why this priority**: C'est la page de conversion principale pour la campagne BTP. L'assistante doit se dire "c'est exactement ce que je fais, et ça peut être automatisé".

**Independent Test**: Chaque section doit contenir au moins 3 tâches avec le format avant/après. Les acronymes BTP utilisés doivent être corrects (PPSPS, DOE, DICT, DUERP, Qualibat, décennale, RGE, CACES, OPCO, DPAE).

**Acceptance Scenarios**:

1. **Given** la page BTP, **When** je vois la section Admin & Conformité, **Then** je vois des tâches comme tri emails, alertes PPSPS, rappels Qualibat avec leur version automatisée
2. **Given** la page BTP, **When** je vois la section Suivi Financier, **Then** je vois relances factures automatiques, classement, transmission expert-comptable
3. **Given** la page BTP, **When** je vois la section RH, **Then** je vois variables de paie, visites médicales, formations CACES/OPCO
4. **Given** la page BTP, **When** je vois le CTA, **Then** le bouton dit "Voir la démo — 15 min, sans engagement" (pas du jargon startup)

---

### User Story 4 — Les CTAs convertissent (Priority: P2)

Les boutons d'action utilisent un langage accessible et concret, pas du jargon tech/startup ("poster un brief", "recruter un agent").

**Why this priority**: Le taux de conversion dépend directement de la clarté des CTAs.

**Independent Test**: Aucun CTA ne contient les mots "brief", "agent", "recruter", "embaucher un No Code Guy". Tous les CTAs sont explicites sur ce qui se passe au clic.

**Acceptance Scenarios**:

1. **Given** le hero CTA principal, **When** je le lis, **Then** il indique clairement l'action (ex: "Voir ce qu'on automatise", "Demander une démo")
2. **Given** le CTA de la page BTP, **When** je le lis, **Then** il mentionne "démo" ou "15 min" ou "sans engagement"
3. **Given** le CTA footer/section, **When** je le lis, **Then** il est humain et rassurant (pas "poster un brief")

---

### User Story 5 — SEO BTP optimisé (Priority: P2)

Le copy intègre naturellement les requêtes SEO cibles : "assistante administrative BTP", "automatisation administrative BTP", "gestion administrative BTP IA".

**Why this priority**: Le référencement naturel sur ces requêtes de longue traîne apportera du trafic qualifié.

**Independent Test**: Vérifier que le meta title, H1, et au moins 3 H2 de la page BTP contiennent les mots-clés cibles.

**Acceptance Scenarios**:

1. **Given** la page BTP, **When** je regarde le meta title, **Then** il contient "assistante administrative BTP" et "IA"
2. **Given** la page BTP, **When** je regarde les headings, **Then** les mots "automatisation", "BTP", "admin" apparaissent naturellement

---

### Edge Cases

- Le wording doit rester cohérent avec les 3 autres domaines (Commerce, Admin, Web & Digital) même si le BTP est prioritaire
- Le branding "TheNoCodeGuy" / "No Code Guy" reste dans le logo et la nav, mais n'est PAS la proposition de valeur du hero
- Les 4 locales doivent être mises à jour (FR prioritaire, EN/ZH-TW/ZH-CN adaptées)
- Le CTA "Poster un brief" sur la page contact ne change PAS (c'est la page interne, pas le landing)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le hero headline DOIT mentionner l'administration BTP et les tâches automatisables de manière concrète
- **FR-002**: Les trust badges DOIVENT inclure au moins un élément BTP-spécifique (WhatsApp, BTP, ou technologie reconnue)
- **FR-003**: La card BTP homepage DOIT lister au minimum 6 tâches reconnaissables par une assistante BTP
- **FR-004**: La page BTP DOIT contenir 5-6 sections avant/après couvrant les pôles : Admin, RH, Finance, Chantier, Commercial
- **FR-005**: Tous les CTAs DOIVENT utiliser un langage accessible (pas de jargon startup/tech)
- **FR-006**: Le meta title et la meta description de la page BTP DOIVENT contenir les mots-clés SEO cibles
- **FR-007**: Les 4 fichiers de traduction DOIVENT être mis à jour avec le nouveau wording
- **FR-008**: Le `npm run build` DOIT passer sans erreur

### Key Entities

- **Traductions** : fichiers `messages/{fr,en,zh-TW,zh-CN}.json` — clés hero.*, domaines.btp*, domainesBtp.*
- **Page BTP** : `app/[locale]/domaines/btp/page.tsx` — sections avant/après
- **Composants homepage** : HeroSection, DomainesSection, CTASection — wording des clés

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des CTAs utilisent un langage accessible (aucun jargon startup/tech)
- **SC-002**: La page BTP contient au minimum 5 sections avec format avant/après
- **SC-003**: Le meta title de la page BTP contient "assistante administrative BTP" et "IA"
- **SC-004**: Les 4 locales sont synchronisées avec le nouveau wording
- **SC-005**: Le build passe sans erreur
