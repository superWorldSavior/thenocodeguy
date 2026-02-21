---
id: 22
title: "Sécurité — isolation workspace par client (exec deny, audit trail)"
priority: high
size: M
labels: []
---

## Description
Chaque agent client doit tourner dans un workspace isolé avec des permissions restreintes. Pas d accès aux données des autres clients. Audit trail de toutes les actions sensibles.

## Acceptance Criteria
Chaque client a un workspace séparé (répertoire ou container) 

exec deny activé par défaut — whitelist explicite pour les commandes autorisées 

Aucun agent client ne peut lire les fichiers d un autre client 

Audit trail : chaque action sensible (envoi email, appel API, modification fichier) est loggée avec timestamp et client_id 

Test : un agent client A ne peut pas accéder au workspace de client B


---
_Migrated from Azure DevOps #94_
