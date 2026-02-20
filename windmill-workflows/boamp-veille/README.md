# Workflow Windmill : Veille BOAMP automatique

Récupère les nouvelles publications du **BOAMP** (Bulletin Officiel des Annonces des Marchés Publics), filtre par mots-clés, qualifie chaque opportunité avec **GPT-4o mini**, et envoie un **digest email** chaque matin.

## Caractéristiques

- ✅ **Fetch automatique** : API OpenData BOAMP (mises à jour quotidiennes)
- ✅ **Filtrage par mots-clés** : Seulement les avis pertinents
- ✅ **Qualification GPT-4o mini** : Score 1-5 + résumé + action recommandée
- ✅ **Digest HTML** : Email formaté, lisible, avec liens directs aux avis
- ✅ **Scheduling Cron** : 7h00 du lundi au vendredi (configurable)
- ✅ **Traçabilité** : Logs détaillés dans l'interface Windmill

## ROI

| Métrique | Avant | Après |
|----------|-------|-------|
| Temps/jour | 30-45 min (consultation manuelle) | 2 min (lecture digest) |
| Opportunités ratées | Fréquent | Quasi zéro |
| Coût/mois | — | ~$0.50 OpenAI (GPT-4o mini) |
| Gain annuel | — | 80-120 heures |

## Installation

### 1. Cloner le workflow dans Windmill

```bash
# Option A: Copier le contenu de main.py dans l'UI Windmill
# Path: f/openclaw/boamp_veille (ou personnalisez)

# Option B: Déployer via API Windmill
curl -X POST http://localhost:8000/api/w/admins/scripts/create \
  -H "Authorization: Bearer YOUR_WINDMILL_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "path": "f/openclaw/boamp_veille",
  "summary": "Veille BOAMP automatique",
  "language": "python3",
  "content": "$(cat main.py)"
}
EOF
```

### 2. Configurer les variables

Dans l'UI Windmill, aller à **Settings > Variables** et créer :

| Variable | Type | Exemple |
|----------|------|---------|
| `OPENAI_API_KEY` | String | `sk-proj-...` |
| `SMTP_HOST` | String | `smtp.office365.com` |
| `SMTP_PORT` | Integer | `587` |
| `SMTP_USER` | String | `hello@example.com` |
| `SMTP_PASS` | String | `P@ssw0rd!` |
| `NOTIFY_EMAIL` | String | `erwan@example.com` (optionnel) |
| `KEYWORDS` | String | `automatisation,IA,workflow,digital` |

**⚠️ Important** : Utilisez le type "Secret" pour les clés API et mots de passe.

### 3. Scheduler le workflow

Dans Windmill, aller à **Scripts > f/openclaw/boamp_veille > Schedule** et configurer :

```
Cron: 0 7 * * 1-5  (7h00 du lundi au vendredi)
Timezone: Europe/Paris
```

Ou modifier dans `windmill.json` ligne `schedule.expr`.

### 4. Tester

```bash
# Exécution manuelle depuis l'UI
Scripts > f/openclaw/boamp_veille > Run

# Ou via API
curl -X POST http://localhost:8000/api/w/admins/jobs/run/p/f/openclaw/boamp_veille \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{}'
```

## Architecture

```
[BOAMP OpenData API]
         ↓ (HTTPx)
[Windmill Python Script]
         ↓
[Filtre mots-clés]
         ↓
[GPT-4o mini (qualification)]
         ↓
[Format HTML]
         ↓
[SMTP (email digest)]
```

### Étapes du script

1. **Fetch** : Récupère les publications des dernières 24h via l'API BOAMP OpenData
2. **Filtre** : Garde seulement les avis contenant au moins un mot-clé
3. **Qualification** : Appelle GPT-4o mini pour chaque avis (score + résumé + action)
4. **Digest** : Formate en HTML lisible, trie par score décroissant
5. **Email** : Envoie le digest par SMTP

## Personnalisation

### Ajouter des mots-clés

Modifier la variable `KEYWORDS` dans Windmill :
```
automatisation,IA,workflow,cloud,serverless,API,intégration,données
```

### Changer le timing du schedule

Modifier `windmill.json` → `schedule.expr` :
```json
"expr": "0 9 * * 1-5"  // 9h00 au lieu de 7h00
"expr": "0 7 * * *"    // Tous les jours
"expr": "0 7 * * 5"    // Vendredi uniquement
```

### Ajouter un destinataire CC

Modifier `main.py` ligne ~340, fonction `send_email()` :
```python
cc_email = os.environ.get("SMTP_CC")
if cc_email:
    msg["Cc"] = cc_email
    server.sendmail(smtp_user, [notify_email, cc_email], msg.as_string())
```

### Intégrer avec WhatsApp

Remplacer l'étape email par un appel WhatsApp API :
```python
# Au lieu de send_email(), utiliser:
import httpx
r = httpx.post(
    "https://api.whatsapp.com/send",
    json={"to": "+33612345678", "text": formatted_digest}
)
```

## Dépannage

### ❌ "OPENAI_API_KEY not found"
Vérifier que la variable est créée dans Windmill et accessible au script.

### ❌ "SMTP Connection failed"
- Vérifier SMTP_HOST et SMTP_PORT
- Pour Office 365 : `smtp.office365.com:587`
- Pour Gmail : `smtp.gmail.com:587` (et activer "App passwords")
- Tester manuellement : `telnet smtp.office365.com 587`

### ❌ "GPT timeout"
Augmenter le timeout dans `main.py` ligne ~115, fonction `qualify_with_gpt()` :
```python
timeout=60  # au lieu de 30
```

### ❌ "Aucune publication trouvée"
Vérifier que les mots-clés correspondent aux avis BOAMP actuels. Tester manuellement :
```bash
curl "https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records?limit=10"
```

## Coûts

- **OpenAI (GPT-4o mini)** : ~$0.05 par 1M input tokens, ~$0.15 par 1M output tokens
  - Exemple : 10 emails × 200 tokens = ~$0.01 par run = ~$0.20/mois
- **SMTP** : Gratuit (inclus avec Office 365, Gmail, etc.)
- **BOAMP API** : Gratuit (données publiques OpenData)

**Coût total estimé : < $1/mois**

## Évolutions futures

- [ ] Ajouter un webhook Slack/Discord au lieu d'email
- [ ] Historique : mémoriser les avis déjà vu (éviter les doublons sur 7j)
- [ ] Réponses auto-générées pour les leads potentiels
- [ ] Dashboard Umami : tracker le volume d'avis par semaine, tendances
- [ ] Intégration CRM : pousser les avis "prioritaires" vers un CRM

## Support & Questions

Fichiers :
- `main.py` : Script Python principal (~320 lignes)
- `requirements.txt` : Dépendances (httpx, openai)
- `windmill.json` : Métadonnées et schedule
- `README.md` : Cette documentation

Pour plus d'infos sur Windmill : https://windmill.dev/docs

---

**Auteur** : David Aames — TheNoCodeGuy  
**Version** : 1.0 (février 2026)  
**Status** : Production ✓
