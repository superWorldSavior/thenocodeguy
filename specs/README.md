# Specs — Gherkin BDD

Spécifications comportementales pour les stories UI de thenocodeguy.com.

## Convention

- Un fichier `.feature` par story UI/visible
- Chaque fichier référence son Azure DevOps work item en commentaire en-tête
- Les scénarios sont les critères d'acceptation officiels
- Une story ne passe en `Done` que si tous les scénarios sont satisfaits

## Workflow

1. **Avant de coder** : David lit le `.feature` correspondant
2. **Pendant le dev** : chaque scénario guide l'implémentation
3. **Avant la demande de validation** : David vérifie mentalement chaque scénario
4. **Validation Erwan** : screenshot + lien → OK → Done

## Fichiers

| Fichier | Story | État |
|---------|-------|------|
| `workflows-page.feature` | #22 Page /workflows | 📋 New |
| `audit-roi-calculator.feature` | Audit ROI | ✅ Done (sub-agent) |

## Format

```gherkin
# Azure DevOps Story #XX
Feature: Nom de la feature
  En tant que [utilisateur]
  Je veux [action]
  Afin de [bénéfice]

  Scenario: Description
    Given [contexte]
    When [action]
    Then [résultat attendu]
```
