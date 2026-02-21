---
id: 52
title: "Page contact — formulaire de brief structuré (Formspree)"
priority: high
size: M
labels: [sprint]
---

## Description
La page /contact remplace le simple formulaire email par un vrai brief de poste structuré, style fiche de poste intérim. Le client décrit son besoin, ses outils, son volume — on a assez d'info pour matcher en 24h.

## Formulaire — Champs

1. **Informations contact**
   - Nom / Prénom (text, requis)
   - Email pro (email, requis)
   - Entreprise (text, requis)
   - Site web (url, optionnel)

2. **Le poste à pourvoir**
   - Quel rôle ? (select : Commercial / Admin / Webmaster / Autre)
   - Si "Autre" → champ texte libre

3. **Workflows à automatiser** (checkboxes, multi-select)
   - Prospection & lead gen
   - Relances email / follow-ups
   - Gestion inbox & calendrier
   - Facturation & relances paiement
   - Monitoring site & uptime
   - SEO & reporting analytics
   - Déploiements & maintenance technique
   - Autre (champ texte)

4. **Environnement**
   - Outils déjà utilisés (text : "HubSpot, Notion, WordPress...")
   - Taille de l'équipe (select : Solo / 2-10 / 11-50 / 50+)

5. **Budget & timing**
   - Budget mensuel envisagé (select : < 200€ / 200-500€ / 500-1000€ / > 1000€ / À discuter)
   - Quand ? (select : ASAP / Ce mois / Ce trimestre / Juste en exploration)

6. **Contexte libre** (textarea, optionnel)
   - "Décrivez votre besoin en quelques lignes"

## Acceptance Criteria
- Page /contact accessible depuis nav principale + tous les CTA "Poster un brief" du site
- Formulaire structuré avec les 6 sections ci-dessus
- Soumission via Formspree (endpoint meolvdkd) → email hello@thenocodeguy.com
- Confirmation visuelle après envoi (message de succès inline ou page merci)
- Cron process_formspree_leads détecte la soumission et alerte WhatsApp si email pro
- Protection anti-spam (honeypot Formspree)
- Responsive mobile (form lisible et utilisable sur téléphone)
- Traduit 4 locales (en/fr/zh-TW/zh-CN)
- Design cohérent Slate+Indigo, shadcn/ui components (Input, Select, Checkbox, Textarea, Button)
- Validation côté client (champs requis, format email)

---
_Updated 2026-02-21 — brief structuré style fiche de poste intérim_
