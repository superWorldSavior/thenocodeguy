---
id: 60
title: "Wording v2 — positionnement agence d'intérim IA"
priority: high
size: M
labels: [sprint, wording]
---

## Description
Réécriture complète du copy EN et FR pour coller au positionnement "agence d'intérim pour agents IA". Remplacer tout le vocabulaire SaaS (subscribe, plan, trial) par le vocabulaire recrutement (hire, profile, brief, mission, onboarding). Mettre à jour les prix : 99€ → 149€ fondateur / 249€ public.

## Acceptance Criteria
- messages/en.json updated: hero headline uses "Hire an AI agent", CTA uses "Post a job brief", pricing shows "from 149€/month (founder offer)"
- messages/fr.json updated: "Embauchez un agent IA", "Déposer un brief de poste", "à partir de 149€/mois (offre fondateur)"
- All references to "99€" removed from all locale files (fr, en, zh-TW, zh-CN)
- zh-TW and zh-CN locale files updated with translated equivalents
- No SaaS vocabulary remains: no "subscribe", "plan", "free trial" — replaced by hiring/recruitment framing
- The hero subtitle explains the interim model in 1 sentence (brief → matching → trial → hire)
