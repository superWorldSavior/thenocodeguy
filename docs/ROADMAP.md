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
| #76 | Fix spacing pages agent detail | P2 | S | 🔄 Sprint |
| #77 | Section sécurité visible pricing | P2 | M | 🔄 Sprint |
| #78 | Social proof / témoignages | P2 | M | 🔄 Sprint |
| TBD | FAQ complète (8-10 questions) | P2 | S | 📋 Backlog |
| TBD | SEO structured data (JSON-LD) | P3 | M | 📋 Backlog |
| TBD | Page 404/500 custom brandée | P3 | S | 📋 Backlog |

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

### Stories clés (à raffiner)
| Story | Priorité | Dépendance |
|-------|----------|------------|
| Agent Commercial : scraping LinkedIn | P1 | Cookie li_at |
| Agent Commercial : séquences email | P1 | — |
| Agent Admin : tri factures (Pennylane) | P1 | — |
| Agent Admin : rappels deadlines | P2 | — |
| Agent Webmaster : monitoring uptime | P1 | — |
| Agent Webmaster : Vercel auto-deploy | P2 | — |
| Onboarding process documenté | P1 | — |
| Security : workspace isolation | P1 | — |
| WhatsApp multi-client routing | P1 | — |

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

*Mis à jour : 2026-02-20 par David Aames*
