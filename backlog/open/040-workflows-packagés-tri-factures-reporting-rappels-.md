---
id: 40
title: "Workflows packagés — tri factures + reporting + rappels échéances"
priority: medium
size: M
labels: []
---

## Description
Workflows Windmill pour l'agent admin :
(1) Tri et archivage automatique des factures reçues par email
(2) Reporting mensuel (dépenses, factures en attente)
(3) Rappels automatiques deadlines TVA/charges/cotisations
(4) Envoi emails administratifs aux services (comptable, banque, fournisseurs)

Limité par plan.

## Acceptance Criteria
Un workflow tri_factures existe : reçoit un email avec pièce jointe PDF, classe la facture dans le dossier approprié et retourne le chemin d'archivage. 

Un workflow reporting_mensuel existe : génère un rapport des dépenses et factures en attente pour le mois courant et l'envoie par email. 

Un workflow rappels_echeances existe : vérifie les échéances TVA/charges/cotisations et envoie un rappel WhatsApp/email 7 jours avant. 

Un workflow envoi_email_admin existe : envoie des emails administratifs standards (comptable, banque, fournisseurs) sur demande. 

Chaque workflow est testé et retourne un résultat JSON structuré (succès/erreur + détails).


---
_Migrated from Azure DevOps #49_
