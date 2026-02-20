# Process Product Owner — The No Code Guys

## Rôles

- **Product Owner** : Erwan — décisions produit, vision, priorités business
- **Scrum Master** : David Aames (main session) — facilitation, process, protection du sprint
- **Dev Team** : Agents cron (Tech Lead, QA, UX en planning ; Opus en exécution)

## Comment Erwan communique ses remarques

### 1. Feedback produit (par défaut)
> "Le spacing est moche", "Faudrait un CTA plus visible", "La FAQ manque de questions"

**Process :**
- David crée un item dans Azure DevOps (PBI ou Bug selon le cas)
- Tag `po-feedback` + commentaire avec le verbatim exact d'Erwan
- Priorité initiale = P2 (sauf si Erwan dit "urgent")
- Le Scrum Master le remonte au prochain sprint planning
- **Le sprint en cours N'EST PAS interrompu**

### 2. Bug critique (P1)
> "Le site est down", "500 en prod", "Le formulaire ne marche plus"

**Process :**
- David fixe immédiatement (hotfix branch → PR → merge)
- Le sprint continue en parallèle
- Notification WhatsApp quand c'est résolu
- Post-mortem dans la rétro du soir

### 3. Changement stratégique
> "On change le pricing", "On ajoute un 4ème agent", "On pivote la cible"

**Process :**
- David déclenche un refinement ad-hoc (pas besoin d'attendre lun/mer/ven)
- Met à jour PRODUCT-VISION.md et ROADMAP.md
- Email récap à Erwan pour validation
- Stories impactées réévaluées au prochain planning
- Sprint en cours peut être annulé SI le changement invalide les stories courantes

### 4. Question / discussion
> "Tu en penses quoi de X ?", "C'est quoi le status de Y ?"

**Process :**
- David répond directement sur WhatsApp
- Pas d'impact sur le sprint

## Règles

1. **Le sprint est sacré** — une fois composé, on ne change pas les stories sauf bug P1
2. **Erwan ne code pas** — il donne du feedback, David le transforme en stories
3. **Tout feedback est tracé** — même un "bof" sur WhatsApp devient un item DevOps
4. **Le verbatim PO est conservé** — le commentaire DevOps contient les mots exacts d'Erwan, pas une reformulation
5. **Pas de sur-interprétation** — si le feedback est ambigu, David demande clarification avant de créer une story
6. **Velocity = vérité** — si les carryovers s'accumulent, on réduit la capacité, on ne force pas

## Classification rapide des remarques

| Signal | Type | Action |
|--------|------|--------|
| "C'est cassé / 500 / down" | Bug P1 | Hotfix immédiat |
| "J'aime pas / c'est moche / faudrait" | Feedback | PBI + tag po-feedback |
| "On devrait / et si on / je veux" | Feature request | PBI + refinement |
| "On change / on arrête / on pivote" | Stratégique | Refinement ad-hoc |
| "C'est quoi le status / t'en penses quoi" | Question | Réponse directe |

## Template commentaire DevOps

```
[PO Feedback — {date}]
Verbatim: "{ce qu'Erwan a dit exactement}"
Context: {où/quand, quel page, quel feature}
Classification: feedback | bug | feature | strategic
Suggested priority: P1 | P2 | P3
```
