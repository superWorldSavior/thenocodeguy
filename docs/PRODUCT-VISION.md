# Product Vision — The No Code Guys

## Vision Statement

**Pour** les PME et indépendants francophones (puis internationaux)
**qui** n'ont pas les moyens ou le temps d'embaucher des spécialistes
**The No Code Guys** est un service d'agents IA autonomes
**qui** gèrent la prospection, l'admin et le web via WhatsApp, 24/7
**contrairement à** un freelance ou un employé,
**notre produit** coûte 99€/mois, ne dort jamais, et s'active en 48h.

---

## Personas

### 🎯 Pierre — Fondateur solo (cible principale)
- TPE/PME, 1-10 salariés, France
- Débordé par l'admin, la prospection et le site web
- Budget limité (<500€/mois pour des outils)
- Utilise WhatsApp au quotidien
- Veut déléguer, pas apprendre un outil de plus

### 🎯 Marie — Responsable ops en startup
- Startup 10-50 personnes
- Cherche à automatiser les tâches répétitives
- Budget moyen, décision rapide
- Sensible à la sécurité des données (RGPD)

---

## Product Goals (Q1 2026)

1. **Lancer le service** avec 3 agents fonctionnels (Commercial, Admin, Webmaster)
2. **Acquérir 5-10 clients pilotes** en B2B direct
3. **Valider le pricing** (99€/mois, fair use) avec des clients réels
4. **Construire la confiance** via le site, les témoignages, et la transparence

---

## Milestones

### 🏁 M1 — Site Launch Ready (28 fév 2026)
Le site est professionnel, trustable, et convertit.
- [x] Homepage avec proposition de valeur claire
- [x] Pages agents détaillées (commercial, admin, webmaster)
- [x] Page pricing transparente
- [x] Mentions légales + politique de confidentialité
- [ ] Section sécurité/RGPD visible
- [ ] Social proof (témoignages réels)
- [ ] Mobile parfait (hamburger menu, responsive)
- [ ] FAQ complète
- [ ] Page contact fonctionnelle avec CRM pipeline
- [ ] SEO on-page optimisé (meta, OG, structured data)

### 🏁 M2 — Agent MVP (15 mars 2026)
Les 3 agents fonctionnent réellement et sont déployables.
- [ ] Agent Commercial : prospection LinkedIn + email + CRM
- [ ] Agent Admin : tri factures + rappels + reporting
- [ ] Agent Webmaster : monitoring + analytics + deploy
- [ ] Onboarding client documenté (process interne)
- [ ] Sécurité : isolation workspace, exec deny, audit trail
- [ ] WhatsApp : routing multi-client opérationnel

### 🏁 M3 — Premiers Clients (31 mars 2026)
5 clients payants actifs.
- [ ] Pipeline commercial actif (LinkedIn + email outbound)
- [ ] Process de vente : démo → essai → abo
- [ ] Facturation automatisée (Stripe ou Pennylane)
- [ ] Support client (SLA, process d'escalade)
- [ ] Témoignages clients réels sur le site

### 🏁 M4 — Scale (Q2 2026)
Automatisation et croissance.
- [ ] Dashboard client self-service
- [ ] Docker multi-tenant (1 container par client)
- [ ] Plans Pro/Business basés sur données réelles
- [ ] Content marketing (blog, LinkedIn, vidéos)
- [ ] Intégrations supplémentaires (Notion, Airtable, etc.)

---

## Definition of Done (DoD)

Une story est "Done" quand :
1. ✅ Code implémenté et review
2. ✅ Build passe (npm run build)
3. ✅ Tests AC passent (vitest)
4. ✅ i18n complète (4 locales)
5. ✅ Design vérifié (desktop + mobile, screenshots Playwright)
6. ✅ PR mergée via CI
7. ✅ Déployé sur Vercel (vérifié avec curl)
8. ✅ PBI fermé dans Azure DevOps

## Definition of Ready (DoR)

Une story est "Ready" (prête pour un sprint) quand :
1. ✅ Titre clair et actionnable
2. ✅ Description avec contexte
3. ✅ Acceptance Criteria définies et testables
4. ✅ Dépendances identifiées et résolues (ou story bloquante planifiée avant)
5. ✅ Priorité définie
6. ✅ Estimation de complexité (S/M/L)

---

## Dépendances connues

| Story | Dépend de | Status |
|-------|-----------|--------|
| Agent Commercial MVP | Cookie LinkedIn li_at d'Erwan | ⏳ Bloqué |
| Facturation Stripe | Compte Stripe configuré | ⏳ À faire |
| Témoignages réels | Premiers clients pilotes | ⏳ Après M2 |
| Docker multi-tenant | Volume client > 3 | ⏳ M4 |

---

## Métriques de succès

- **Conversion site** : visiteurs → contact form (cible: 3%)
- **Time to first client** : < 6 semaines après M1
- **Churn mensuel** : < 10%
- **NPS clients pilotes** : > 40
- **Vélocité sprint** : > 70% stories complétées/planifiées

---

*Document vivant — mis à jour par David Aames lors des backlog refinements.*
*Dernière mise à jour : 2026-02-21*
