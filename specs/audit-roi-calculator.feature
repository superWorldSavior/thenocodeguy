# Azure DevOps Story — Audit ROI Calculator
# https://dev.azure.com/thenocodeguy/TheNoCodeGuy/_workitems

Feature: Page /audit — Calculateur ROI automatisation

  En tant que dirigeant/responsable ops
  Je veux calculer le temps perdu en tâches répétitives
  Afin de quantifier le ROI d'une automatisation avant de contacter l'agence

  Background:
    Given je suis sur "https://thenocodeguy.com/audit"
    And la page est chargée

  Scenario: Étape 1 — Sélection des tâches
    Then je vois une liste de tâches répétitives avec des icônes
    And je peux sélectionner plusieurs tâches
    And un bouton "Suivant" apparaît dès qu'au moins une tâche est sélectionnée

  Scenario: Étape 2 — Saisie du temps
    Given j'ai sélectionné au moins une tâche à l'étape 1
    When je passe à l'étape 2
    Then je vois un slider de durée pour chaque tâche sélectionnée
    And je vois un sélecteur de fréquence (quotidien/hebdo/mensuel)
    And le bouton "Calculer" est actif

  Scenario: Étape 3 — Résultats instantanés
    Given j'ai rempli les données de l'étape 2
    When je clique sur "Calculer"
    Then je vois le nombre d'heures économisées par an
    And je vois la valeur estimée en euros (base 150€/h)
    And je vois un niveau d'automatisation par tâche (Élevé/Moyen/Faible)
    And les résultats s'affichent sans rechargement de page

  Scenario: Étape 4 — Capture de contact
    Given je vois les résultats
    When je clique sur "Recevoir mon audit détaillé"
    Then je vois un formulaire avec Prénom, Email, Société (optionnel)
    When je soumets le formulaire avec des données valides
    Then je vois un message de confirmation personnalisé
    And le formulaire est envoyé à Formspree

  Scenario: Validation du formulaire
    Given je suis à l'étape 4
    When je tente de soumettre sans email
    Then un message d'erreur apparaît sur le champ email
    And le formulaire n'est pas soumis
