---
id: 45
title: "Monitoring agents clients — tableau de bord"
priority: medium
size: M
labels: []
---

## Description
Dashboard simple (Windmill ou Umami) pour monitorer l'activité des agents déployés chez les clients: uptime, nombre de tâches exécutées, erreurs, workflows déclenchés.

## Acceptance Criteria
Un dashboard Windmill ou Umami accessible via navigateur affiche l'uptime de chaque agent client déployé. 

Le dashboard affiche le nombre de tâches exécutées par agent (jour/semaine/mois). 

Le dashboard affiche les erreurs des dernières 24h avec le message d'erreur et l'agent concerné. 

Le dashboard affiche les workflows déclenchés par agent avec horodatage. 

Une alerte (email ou WhatsApp) est envoyée si un agent est down depuis plus de 15 minutes.


---
_Migrated from Azure DevOps #61_
