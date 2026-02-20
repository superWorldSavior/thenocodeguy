"""
Windmill Script: Veille BOAMP automatique
=========================================
Récupère les nouvelles publications du BOAMP (Bulletin Officiel des
Annonces des Marchés Publics), filtre par mots-clés, qualifie avec
GPT-4o mini, et envoie un digest email/WhatsApp.

Auteur : David Aames — TheNoCodeGuy
Schedule : Tous les jours à 7h00 (cron: 0 7 * * 1-5)
Windmill path : f/openclaw/boamp_veille
"""

import httpx
import json
import smtplib
import os
from datetime import datetime, timedelta, date
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from openai import OpenAI

# ─────────────────────────────────────────
# WINDMILL VARIABLES (inject via UI)
# ─────────────────────────────────────────
# wm_var:OPENAI_API_KEY     — clé OpenAI
# wm_var:SMTP_HOST          — ex: smtp.office365.com
# wm_var:SMTP_PORT          — ex: 587
# wm_var:SMTP_USER          — adresse email
# wm_var:SMTP_PASS          — mot de passe SMTP
# wm_var:NOTIFY_EMAIL       — destinataire du digest
# wm_var:KEYWORDS           — mots-clés séparés par virgule (ex: "automatisation,IA,no-code,workflow")
# ─────────────────────────────────────────

BOAMP_API_BASE = "https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records"
MAX_RESULTS = 100
GPT_MODEL = "gpt-4o-mini"


def get_keywords() -> list[str]:
    """Récupère les mots-clés depuis la variable Windmill ou utilise les défauts."""
    raw = os.environ.get("KEYWORDS", "automatisation,IA,intelligence artificielle,no-code,workflow,digital,numérique,dématérialisation")
    return [k.strip().lower() for k in raw.split(",") if k.strip()]


def fetch_boamp_publications(since_date: str) -> list[dict]:
    """
    Récupère les avis publiés depuis since_date via l'API OpenData BOAMP.
    
    Args:
        since_date: date ISO (ex: 2026-02-19)
    
    Returns:
        Liste de publications brutes
    """
    params = {
        "where": f"dateparution >= date'{since_date}'",
        "select": "idweb,objet,acheteur,nature,dateparution,url_texte_integral",
        "order_by": "dateparution desc",
        "limit": MAX_RESULTS,
        "timezone": "Europe/Paris",
    }
    
    try:
        r = httpx.get(BOAMP_API_BASE, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        return data.get("results", [])
    except Exception as e:
        print(f"[BOAMP] Erreur fetch: {e}")
        return []


def filter_by_keywords(publications: list[dict], keywords: list[str]) -> list[dict]:
    """
    Filtre les publications contenant au moins un des mots-clés dans l'objet.
    
    Args:
        publications: liste brute de l'API BOAMP
        keywords: mots-clés en minuscules
    
    Returns:
        Publications filtrées, avec champ 'matched_keywords' ajouté
    """
    results = []
    for pub in publications:
        objet = (pub.get("objet") or "").lower()
        matched = [kw for kw in keywords if kw in objet]
        if matched:
            pub["matched_keywords"] = matched
            results.append(pub)
    return results


def qualify_with_gpt(publications: list[dict], client: OpenAI) -> list[dict]:
    """
    Qualifie chaque publication avec GPT-4o mini.
    Ajoute un champ 'qualification' avec score et résumé.
    
    Args:
        publications: publications filtrées
        client: client OpenAI
    
    Returns:
        Publications enrichies avec qualification GPT
    """
    system_prompt = """Tu es un assistant de veille appels d'offres pour un consultant en automatisation IA et no-code.
Pour chaque avis de marché public, évalue sa pertinence pour une mission de conseil/développement en automatisation, IA ou transformation digitale.

Réponds UNIQUEMENT en JSON avec :
{
  "score": 1-5,
  "resume": "1-2 phrases max sur la mission et le type de prestation",
  "pertinence": "pourquoi c'est intéressant ou pas",
  "action": "candidater" | "surveiller" | "ignorer"
}

Score :
5 = Mission directement dans notre cœur de métier (automatisation, IA, no-code)
4 = Mission connexe, forte chance de correspondance
3 = À surveiller, potentiellement pertinent
2 = Peu probable mais possible
1 = Hors scope"""

    qualified = []
    for pub in publications:
        user_content = f"""
Objet : {pub.get('objet', 'N/A')}
Acheteur : {pub.get('acheteur', {}).get('nom', 'N/A') if isinstance(pub.get('acheteur'), dict) else pub.get('acheteur', 'N/A')}
Nature : {pub.get('nature', 'N/A')}
Date parution : {pub.get('dateparution', 'N/A')}
Mots-clés matchés : {', '.join(pub.get('matched_keywords', []))}
"""
        try:
            response = client.chat.completions.create(
                model=GPT_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_content},
                ],
                response_format={"type": "json_object"},
                max_tokens=200,
                temperature=0.2,
            )
            qual = json.loads(response.choices[0].message.content)
            pub["qualification"] = qual
        except Exception as e:
            print(f"[GPT] Erreur qualification pour {pub.get('idweb', '?')}: {e}")
            pub["qualification"] = {"score": 0, "resume": "Erreur qualification", "action": "ignorer"}
        
        qualified.append(pub)
    
    return qualified


def format_email_digest(publications: list[dict], run_date: str) -> str:
    """
    Formate le digest HTML pour l'email.
    
    Args:
        publications: publications qualifiées, triées par score
        run_date: date du run
    
    Returns:
        HTML de l'email
    """
    # Trier par score décroissant, garder seulement score >= 3
    relevant = [p for p in publications if p.get("qualification", {}).get("score", 0) >= 3]
    relevant.sort(key=lambda x: x.get("qualification", {}).get("score", 0), reverse=True)
    
    if not relevant:
        return f"""<html><body style="font-family: sans-serif; color: #333;">
<h2>📋 Veille BOAMP — {run_date}</h2>
<p>Aucun appel d'offres pertinent trouvé aujourd'hui.</p>
<p style="color: #999; font-size: 12px;">Généré par David Aames — TheNoCodeGuy</p>
</body></html>"""
    
    score_colors = {5: "#dc2626", 4: "#ea580c", 3: "#ca8a04"}
    score_labels = {5: "🔴 Prioritaire", 4: "🟠 Pertinent", 3: "🟡 À surveiller"}
    
    items_html = ""
    for pub in relevant:
        qual = pub.get("qualification", {})
        score = qual.get("score", 0)
        color = score_colors.get(score, "#6b7280")
        label = score_labels.get(score, "⚪")
        
        acheteur = pub.get("acheteur", {})
        acheteur_nom = acheteur.get("nom", "N/A") if isinstance(acheteur, dict) else str(acheteur)
        
        url = pub.get("url_texte_integral", "#")
        
        items_html += f"""
<div style="border: 1px solid #e5e7eb; border-left: 4px solid {color}; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
    <span style="background: {color}; color: white; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 12px;">{label}</span>
    <span style="color: #6b7280; font-size: 12px;">{pub.get('dateparution', 'N/A')[:10]}</span>
  </div>
  <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #111;">{pub.get('objet', 'N/A')[:120]}...</h3>
  <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">📍 {acheteur_nom}</p>
  <p style="margin: 8px 0; font-size: 13px; color: #374151;">{qual.get('resume', '')}</p>
  <p style="margin: 4px 0; font-size: 12px; color: #6b7280; font-style: italic;">{qual.get('pertinence', '')}</p>
  <a href="{url}" style="display: inline-block; margin-top: 8px; font-size: 12px; color: #10b981; text-decoration: none;">
    Voir l'avis complet →
  </a>
</div>"""
    
    total = len(publications)
    
    return f"""<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #064e3b; border-radius: 12px; padding: 20px; margin-bottom: 24px; color: white;">
    <h1 style="margin: 0; font-size: 22px;">📋 Veille BOAMP</h1>
    <p style="margin: 4px 0 0 0; opacity: 0.8; font-size: 14px;">{run_date} — {len(relevant)} opportunité(s) sur {total} analysée(s)</p>
  </div>
  
  {items_html}
  
  <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
    Généré automatiquement par David Aames — TheNoCodeGuy<br>
    <a href="https://thenocodeguy.com/workflows" style="color: #10b981;">Voir les workflows</a>
  </div>
</body>
</html>"""


def send_email(html_content: str, subject: str) -> bool:
    """Envoie le digest par email via SMTP."""
    smtp_host = os.environ.get("SMTP_HOST", "smtp.office365.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    notify_email = os.environ.get("NOTIFY_EMAIL", smtp_user)
    
    if not smtp_user or not smtp_pass:
        print("[SMTP] Variables SMTP_USER/SMTP_PASS manquantes — email non envoyé")
        return False
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = notify_email
    msg.attach(MIMEText(html_content, "html"))
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.ehlo()
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, notify_email, msg.as_string())
        print(f"[SMTP] Email envoyé à {notify_email}")
        return True
    except Exception as e:
        print(f"[SMTP] Erreur envoi: {e}")
        return False


def main():
    """Point d'entrée principal du workflow Windmill."""
    
    run_date = datetime.now().strftime("%d/%m/%Y")
    since_date = (date.today() - timedelta(days=1)).isoformat()
    
    print(f"[BOAMP] Démarrage veille — {run_date} (publications depuis {since_date})")
    
    # ── 1. Fetch publications ──────────────────────────────────────────────
    publications = fetch_boamp_publications(since_date)
    print(f"[BOAMP] {len(publications)} publications récupérées")
    
    if not publications:
        print("[BOAMP] Aucune publication — fin du job")
        return {"status": "ok", "publications": 0, "relevant": 0}
    
    # ── 2. Filtre par mots-clés ───────────────────────────────────────────
    keywords = get_keywords()
    print(f"[BOAMP] Mots-clés actifs : {keywords}")
    
    filtered = filter_by_keywords(publications, keywords)
    print(f"[BOAMP] {len(filtered)} publications correspondent aux mots-clés")
    
    if not filtered:
        print("[BOAMP] Aucun match — fin du job")
        return {"status": "ok", "publications": len(publications), "relevant": 0}
    
    # ── 3. Qualification GPT ──────────────────────────────────────────────
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("[GPT] OPENAI_API_KEY manquante — qualification ignorée")
        for pub in filtered:
            pub["qualification"] = {"score": 3, "resume": pub.get("objet", "")[:100], "action": "surveiller"}
    else:
        client = OpenAI(api_key=api_key)
        filtered = qualify_with_gpt(filtered, client)
        print(f"[GPT] Qualification terminée pour {len(filtered)} publications")
    
    # ── 4. Digest email ───────────────────────────────────────────────────
    html = format_email_digest(filtered, run_date)
    relevant_count = len([p for p in filtered if p.get("qualification", {}).get("score", 0) >= 3])
    
    subject = f"[BOAMP] {relevant_count} opportunité(s) — {run_date}"
    email_sent = send_email(html, subject)
    
    result = {
        "status": "ok",
        "run_date": run_date,
        "total_publications": len(publications),
        "keyword_matches": len(filtered),
        "relevant_score_3plus": relevant_count,
        "email_sent": email_sent,
    }
    
    print(f"[BOAMP] Terminé : {result}")
    return result


if __name__ == "__main__":
    main()
