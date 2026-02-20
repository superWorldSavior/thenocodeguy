# Roadmap — The No Code Guys

## Vue d'ensemble

```
Fév 2026          Mars 2026           Avril 2026          Mai 2026
|----M1----|-------M2-------|--------M3--------|--------M4--------|
Site Ready   Agent MVP        Premiers Clients    Scale
28 fév       15 mars          31 mars             Q2
```

---

## M1 — Site Launch Ready (28 fév 2026)

**Objectif** : Un site professionnel qui inspire confiance et convertit.

### Epics & Features
- **Epic #30** : The No Code Guys — Agent-as-a-Service
  - Feature #37 : Site vitrine (homepage, agents, pricing, legal)
  - Feature #70 : CI/CD Quality Gate

### Stories clés
| ID | Story | Priorité | Taille | Status |
|----|-------|----------|--------|--------|
| #53 | Homepage refonte | P1 | L | ✅ Done |
| #54 | Page /agents listing | P1 | M | ✅ Done |
| #55 | Pages /agents/[slug] detail | P1 | L | ✅ Done |
| #56 | Page /pricing | P1 | M | ✅ Done |
| #75 | Mentions légales + confidentialité | P1 | S | ✅ Done |
| #76 | Fix spacing pages agent detail | P2 | S | ✅ Done |
| #77 | Section sécurité visible pricing | P2 | M | ✅ Done |
| #78 | Social proof / témoignages | P1 | M | ✅ Done |
| #79 | FAQ complète (8-10 questions) | P1 | S | ✅ Done |
| #82 | Hamburger menu mobile fonctionnel | P1 | M | ✅ Done |
| #91 | Prix localisés par devise | P1 | S | ✅ Done |
| #83 | Page contact + pipeline CRM | P2 | M | 📋 Backlog |
| #84 | Lighthouse score > 90 | P2 | M | 📋 Backlog |
| #85 | Visuels agents IA | P1 | M | 📋 Backlog |
| #86 | Page À propos | P1 | M | 🔄 Sprint |
| #87 | Light/dark mode auto | P1 | L | 📋 Backlog |
| #88 | Review visuelle systématique | P1 | M | 🔄 Sprint |
| #89 | SEO complet (meta, OG, sitemap) | P1 | L | 🔄 Sprint |
| #90 | Hero image homepage + visuels | P1 | M | 📋 Backlog |
| #80 | SEO structured data JSON-LD | P3 | M | 📋 Backlog |
| #81 | Page 404/500 custom brandée | P3 | S | 📋 Backlog |

### Critères de complétion M1
- [ ] Toutes les pages retournent 200 en prod
- [ ] Score Lighthouse > 90 (perf, access, SEO)
- [ ] Mobile responsive vérifié (screenshots)
- [ ] Mentions légales + RGPD en place
- [ ] Au moins 3 témoignages (même simulés initiaux)
- [ ] Formulaire contact → pipeline CRM fonctionnel

---

## M2 — Agent MVP (15 mars 2026)

**Objectif** : Les 3 agents fonctionnent et sont déployables pour un client.

### Stories clés
| ID | Story | Priorité | Taille | Status |
|----|-------|----------|--------|--------|
| #42 | Persona & connecteurs — Commercial | P2 | M | 📋 Backlog |
| #43 | Workflows prospection LinkedIn + email + CRM | P2 | L | 📋 Backlog |
| #44 | Config OpenClaw — Commercial | P2 | M | 📋 Backlog |
| #45 | Docker template — Commercial | P2 | M | 📋 Backlog |
| #46 | README onboarding — Commercial | P2 | S | 📋 Backlog |
| #48 | Persona & connecteurs — Admin | P2 | M | 📋 Backlog |
| #49 | Workflows factures + reporting + rappels | P2 | L | 📋 Backlog |
| #50 | Config OpenClaw — Admin | P2 | M | 📋 Backlog |
| #51 | Docker template — Admin | P2 | M | 📋 Backlog |
| #52 | README onboarding — Admin | P2 | S | 📋 Backlog |
| #64 | Persona & connecteurs — Webmaster | P2 | M | 📋 Backlog |
| #65 | Workflows site Vercel + analytics | P2 | L | 📋 Backlog |
| #66 | Config OpenClaw — Webmaster | P2 | M | 📋 Backlog |
| #67 | Docker template — Webmaster | P2 | M | 📋 Backlog |
| #68 | README onboarding — Webmaster | P2 | S | 📋 Backlog |
| #60 | Process onboarding B2B — doc interne | P2 | M | 📋 Backlog |
| #92 | Onboarding premier client — Webmaster pilote | P1 | L | 📋 Backlog |
| #94 | Sécurité — isolation workspace par client | P1 | L | 📋 Backlog |
| #95 | WhatsApp multi-client routing | P1 | L | 📋 Backlog |

---

## M3 — Premiers Clients (31 mars 2026)

**Objectif** : 5 clients payants.

### Chantiers
- Pipeline commercial (outbound LinkedIn + email)
- Process de vente (démo live → essai 7j → abo)
- Facturation (Stripe ou Pennylane)
- Support client & SLA
- Témoignages réels → mise à jour site

---

## M4 — Scale (Q2 2026)

**Objectif** : Automatiser et scaler.

### Chantiers
- Dashboard client self-service
- Docker multi-tenant
- Plans Pro/Business
- Content marketing
- Nouvelles intégrations

---

## Dépendances inter-milestones

```
M1 (Site) ──→ M3 (Clients) : site nécessaire pour convertir
M2 (Agents) ──→ M3 (Clients) : agents fonctionnels pour vendre
M1 + M2 ──→ M4 (Scale) : base solide avant de scaler
```

---

*Mis à jour : 2026-02-21 par David Aames (backlog refinement)*
