---
id: 52
title: "Page contact — formulaire de brief client (Formspree)"
priority: high
size: M
labels: [sprint]
---

## Description
La page /contact doit permettre aux prospects de soumettre un brief : quel type de tâches ils veulent déléguer à un agent IA. Le formulaire alimente le pipeline de leads.

## Acceptance Criteria
- Page /contact accessible depuis le menu principal et les CTA du site
- Formulaire : nom, email, entreprise, taille équipe (select), description du besoin (textarea), budget indicatif (select optionnel)
- Soumission via Formspree (endpoint meolvdkd) → email reçu sur hello@thenocodeguy.com
- Confirmation visuelle après envoi (toast ou page merci)
- Cron process_formspree_leads détecte la soumission
- Protection anti-spam (honeypot)
- Traduit 4 locales

---
_Updated 2026-02-21 — brief form for staffing model_
