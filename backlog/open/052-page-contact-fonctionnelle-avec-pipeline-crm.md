---
id: 52
title: "Page contact — formulaire de brief structuré (Formspree)"
priority: high
size: M
labels: [sprint]
---

## Description
Un formulaire de brief simple, style agence d'intérim. Le client décrit le poste et les missions qu'il veut déléguer. On s'occupe du reste.

## Formulaire — Champs

1. **Vous**
   - Nom (text, requis)
   - Email pro (email, requis)
   - Entreprise (text, requis)

2. **Le poste**
   - Quel type de poste ? (select : Commercial / Administratif / Webmaster / Autre)

3. **Les missions**
   - Décrivez les missions à confier (textarea, requis)
   - Placeholder : "Ex: Relancer mes prospects, gérer mes factures, maintenir mon site..."

4. **Contexte** (optionnel)
   - Outils que vous utilisez déjà (text, optionnel, placeholder : "HubSpot, Notion, WordPress...")
   - Quand ? (select : ASAP / Ce mois / Ce trimestre / Juste en exploration)

## Acceptance Criteria
- Page /contact accessible depuis nav + tous les CTA "Poster un brief"
- Formulaire 4 sections, max 6 champs — simple et rapide
- Le champ missions (textarea) est le cœur du brief — large et invitant
- Soumission via Formspree (endpoint meolvdkd) → email hello@thenocodeguy.com
- Confirmation après envoi (message inline)
- Cron process_formspree_leads détecte et alerte WhatsApp si email pro
- Honeypot anti-spam
- Responsive mobile
- Traduit 4 locales (en/fr/zh-TW/zh-CN)
- Design Slate+Indigo, shadcn/ui (Input, Select, Textarea, Button)
- Validation côté client (champs requis, format email)

---
_Updated 2026-02-21 — simplifié style brief intérim, focus missions_
