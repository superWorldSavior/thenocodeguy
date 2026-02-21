---
id: 52
title: "Page contact fonctionnelle avec pipeline CRM"
priority: medium
size: M
labels: []
---

## Description
Vérifier que /contact envoie bien via Formspree (meolvdkd), que le cron process_formspree_leads capte les soumissions, et que le pipeline fonctionne bout en bout. 

AC 

Formulaire /contact fonctionne (test réel) 

Email reçu sur hello@thenocodeguy.com 

Cron leads détecte la soumission 

Lead ajouté dans pipeline Excel OneDrive

## Acceptance Criteria
Page /contact accessible depuis le menu principal 

Formulaire : nom, email, entreprise, message, type de besoin (select) 

Soumission envoie un email à hello@thenocodeguy.com via API 

Confirmation visuelle après envoi (toast ou page merci) 

Données sauvegardées dans un pipeline CRM (Windmill ou spreadsheet) 

Protection anti-spam (honeypot ou rate limit)


---
_Migrated from Azure DevOps #83_
