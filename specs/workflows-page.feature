# Azure DevOps Story #22
# https://dev.azure.com/thenocodeguy/TheNoCodeGuy/_workitems/edit/22

Feature: Page /workflows — Showcase des workflows Windmill

  En tant que visiteur de thenocodeguy.com
  Je veux voir les workflows d'automatisation disponibles
  Afin de comprendre ce que l'agence peut livrer concrètement

  Background:
    Given je suis sur "https://thenocodeguy.com/workflows"
    And la page est chargée

  Scenario: Affichage de la liste des workflows
    Then je vois un titre de page clair (h1)
    And je vois au moins 3 cards de workflows
    And chaque card affiche un titre, une description courte, et une stack technique
    And le design est cohérent avec le reste du site (dark + emerald)

  Scenario: Card avec lien GitHub
    Given une card de workflow a un bouton "Voir le code"
    When je clique sur ce bouton
    Then je suis redirigé vers le repo GitHub correspondant
    And le lien s'ouvre dans un nouvel onglet

  Scenario: Card avec badge de catégorie
    Then chaque card affiche un badge de catégorie (ex: "Veille", "Monitoring", "Analytics")
    And les badges sont stylisés de façon cohérente

  Scenario: Navigation depuis la page d'accueil
    Given je suis sur la page d'accueil
    When je clique sur "Workflows" dans la navigation
    Then je suis redirigé vers "/workflows"

  Scenario: Responsive mobile
    Given je suis sur un écran de 390px de large
    Then les cards s'affichent en colonne (1 par ligne)
    And le contenu est lisible sans scroll horizontal
