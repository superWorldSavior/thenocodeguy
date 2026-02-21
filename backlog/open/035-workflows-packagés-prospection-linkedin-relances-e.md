---
id: 35
title: "Workflows packagés — prospection LinkedIn + relances email + suivi CRM"
priority: medium
size: M
labels: []
---

## Description
Workflows Windmill pour l'agent commercial :
(1) Scraping prospects LinkedIn selon critères
(2) Envoi email de prospection personnalisé
(3) Relance automatique J+3 et J+7
(4) Mise à jour CRM

Limité par plan (nombre de workflows).

## Acceptance Criteria
Un workflow Windmill prospection_linkedin existe, accepte des critères de ciblage en paramètres et retourne une liste de prospects. 

Un workflow envoi_email_prospection existe, envoie un email personnalisé à un contact et retourne un statut succès/échec. 

Un workflow relance_automatique existe, planifie des relances J+3 et J+7 et met à jour le CRM après chaque relance. 

Un workflow mise_a_jour_crm existe et met à jour le statut d'un contact dans le CRM configuré. 

Chaque workflow est documenté avec ses paramètres d'entrée/sortie dans Windmill.


---
_Migrated from Azure DevOps #43_
