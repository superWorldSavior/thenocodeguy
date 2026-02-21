---
id: 23
title: "WhatsApp multi-client routing — un numéro, plusieurs agents"
priority: high
size: M
labels: []
---

## Description
Le système doit router les messages WhatsApp entrants vers le bon agent client en fonction du numéro de l expéditeur ou d un mot-clé. Un seul numéro WhatsApp Business pour tous les clients.

## Acceptance Criteria
Un message WhatsApp entrant est routé vers le bon agent en < 2s 

Routing basé sur le numéro de téléphone du client (mapping configurable) 

Fallback : message non reconnu → notification à l équipe support 

Chaque conversation est isolée (pas de leak entre clients) 

Dashboard ou log pour voir le routing en temps réel


---
_Migrated from Azure DevOps #95_
