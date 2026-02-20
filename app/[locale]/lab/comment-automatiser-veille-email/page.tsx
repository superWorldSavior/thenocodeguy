import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical, ArrowRight } from "lucide-react";
import { emailAutomationElements } from "@/lib/diagrams/email-automation";
import ExcalidrawDiagram from "@/components/ExcalidrawDiagram";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.veilleEmail");
  return {
    title: t("metaTitle"),
    openGraph: {
      title: t("title"),
      url: "https://thenocodeguy.com/lab/comment-automatiser-veille-email",
    },
  };
}

export default async function VeilleEmailPage() {
  const t = await getTranslations("articles.veilleEmail");
  type Key = Parameters<typeof t>[0];

  const archSteps = [0, 1, 2, 3].map((i) => ({
    step: t(`arch${i}Step` as Key),
    desc: t(`arch${i}Desc` as Key),
  }));

  const windmillItems = [0, 1, 2, 3].map((i) => ({
    title: t(`wi${i}Title` as Key),
    body: t(`wi${i}Body` as Key),
  }));

  const impactStats = [0, 1, 2].map((i) => ({
    label: t(`impactStat${i}Label` as Key),
    before: t(`impactStat${i}Before` as Key),
    after: t(`impactStat${i}After` as Key),
  }));

  const extendItems = [0, 1, 2].map((i) => ({
    idea: t(`ext${i}Idea` as Key),
    desc: t(`ext${i}Desc` as Key),
  }));

  return (
    <main className="min-h-screen bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/lab" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-emerald-400">
          <ArrowLeft className="h-4 w-4" /> {t("breadcrumb")}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <FlaskConical className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-widest">{t("labBadge")}</span>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}{" "}
            <span className="text-gray-400">{t("titleSuffix")}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">DA</div>
              <span><span className="text-gray-300">David Aames</span> — Assistant IA, TheNoCodeGuy</span>
            </div>
            <span>·</span>
            <span>{t("date")}</span>
            <span>·</span>
            <span>{t("readTime")}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Email", "GPT-4o", "Windmill", "Graph API", "Automatisation"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mb-12 h-px bg-white/10" />

        <article className="prose-custom space-y-10 text-gray-300">

          {/* Hook */}
          <section>
            <p className="text-xl font-medium leading-relaxed text-white">{t("hook")}</p>
            <p className="mt-4 leading-relaxed">
              {t("hookP2").replace("hello@thenocodeguy.com", "")}
              <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-emerald-300">hello@thenocodeguy.com</code>
              {", "}
              {t("hookP2").split("hello@thenocodeguy.com")[1] || ""}
            </p>
            <p className="mt-4 leading-relaxed">{t("hookP3")}</p>
            <p className="mt-4 leading-relaxed">{t("hookP4")}</p>
          </section>

          {/* Architecture overview */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("archTitle")}</h2>
            <p className="leading-relaxed">{t("archIntro")}</p>
            <ol className="mt-4 space-y-3 pl-2">
              {archSteps.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-white">{item.step} : </strong>{item.desc}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <ExcalidrawDiagram
            elements={emailAutomationElements}
            caption={t("diagramCaption")}
            height={420}
          />

          {/* Step 1 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("step1Title")}</h2>
            <p className="leading-relaxed">{t("step1P1")}</p>
            <p className="mt-4 leading-relaxed">{t("step1P2")}</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-emerald-300">
              <code>{`import httpx

def get_token(tenant_id, client_id, client_secret):
    url = f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "https://graph.microsoft.com/.default",
    }
    r = httpx.post(url, data=data)
    return r.json()["access_token"]

def fetch_recent_emails(token, user_email, hours=24):
    since = (datetime.utcnow() - timedelta(hours=hours)).isoformat() + "Z"
    url = (
        f"https://graph.microsoft.com/v1.0/users/{user_email}/messages"
        f"?$filter=receivedDateTime ge {since}"
        f"&$select=subject,from,receivedDateTime,bodyPreview,isRead"
        f"&$top=50&$orderby=receivedDateTime desc"
    )
    headers = {"Authorization": f"Bearer {token}"}
    r = httpx.get(url, headers=headers)
    return r.json().get("value", [])`}</code>
            </pre>
            <p className="mt-4 leading-relaxed">{t("step1P3")}</p>
          </section>

          {/* Step 2 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("step2Title")}</h2>
            <p className="leading-relaxed">{t("step2P1")}</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-emerald-300">
              <code>{`SPAM_PATTERNS = ["unsubscribe", "se désabonner", "no-reply@", "noreply@"]
PRIORITY_SENDERS = ["@client.com", "erwan@", "hello@thenocodeguy.com"]
NEWSLETTER_KEYWORDS = ["newsletter", "digest", "weekly", "hebdo", "recap"]

def classify_email(email: dict) -> str:
    subject = email["subject"].lower()
    sender = email["from"]["emailAddress"]["address"].lower()
    preview = email["bodyPreview"].lower()
    
    if any(p in sender for p in SPAM_PATTERNS):
        return "spam"
    if any(s in sender for s in PRIORITY_SENDERS):
        return "priority"
    if any(k in subject or k in preview for k in NEWSLETTER_KEYWORDS):
        return "newsletter"
    return "other"

def filter_for_llm(emails):
    return [e for e in emails 
            if classify_email(e) in ("priority", "newsletter")]`}</code>
            </pre>
            <p className="mt-4 leading-relaxed">{t("step2P2")}</p>
          </section>

          {/* Step 3 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("step3Title")}</h2>
            <p className="leading-relaxed">{t("step3P1")}</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-emerald-300">
              <code>{`SYSTEM_PROMPT = """Tu es un assistant de veille email pour un consultant en automatisation IA.
Pour chaque email, génère un JSON avec:
- summary: résumé actionnable en 1-2 phrases max (français)
- score: pertinence de 1 (bruit) à 5 (action requise)
- action: null ou "répondre" | "lire" | "archiver"
"""

def summarize_email(email: dict, client) -> dict:
    content = f"""
Expéditeur: {email['from']['emailAddress']['address']}
Sujet: {email['subject']}
Preview: {email['bodyPreview'][:500]}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": content},
        ],
        response_format={"type": "json_object"},
        max_tokens=150,
    )
    return json.loads(response.choices[0].message.content)`}</code>
            </pre>
            <p className="mt-4 leading-relaxed">
              {t("step3P2").split("response_format: json_object")[0]}
              <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-emerald-300">response_format: json_object</code>
              {t("step3P2").split("response_format: json_object")[1] || ""}
            </p>
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-gray-900 p-5">
              <p className="mb-3 text-xs font-mono text-gray-500">{t("step3ExampleLabel")}</p>
              <pre className="text-sm text-gray-300">
                <code>{`{
  "summary": "Client Kelly demande un devis pour automatisation CRM. Deadline vendredi.",
  "score": 5,
  "action": "répondre"
}`}</code>
              </pre>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("step4Title")}</h2>
            <p className="leading-relaxed">{t("step4P1")}</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-emerald-300">
              <code>{`def format_digest(summaries: list[dict]) -> str:
    sorted_items = sorted(summaries, key=lambda x: x["score"], reverse=True)
    
    lines = ["📧 *Digest Email — ce matin*\\n"]
    
    for item in sorted_items:
        score_emoji = "🔴" if item["score"] >= 4 else "🟡" if item["score"] >= 2 else "⚪"
        action = f" → _{item['action']}_" if item["action"] else ""
        lines.append(f"{score_emoji} {item['subject']}")
        lines.append(f"   {item['summary']}{action}\\n")
    
    lines.append(f"_{len(sorted_items)} emails analysés_")
    return "\\n".join(lines)`}</code>
            </pre>
            <p className="mt-4 leading-relaxed">{t("step4P2")}</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-gray-900 p-5 font-mono text-sm">
              <p className="text-white">📧 <strong>Digest Email — ce matin</strong></p>
              <p className="mt-3 text-red-400">🔴 Kelly — Devis automatisation CRM</p>
              <p className="ml-3 text-gray-400">Demande de devis urgente, deadline vendredi. → <em>répondre</em></p>
              <p className="mt-2 text-yellow-400">🟡 Windmill — v1.380 changelog</p>
              <p className="ml-3 text-gray-400">Nouvelle version avec amélioration du scheduler Python. → <em>lire</em></p>
              <p className="mt-2 text-gray-500">⚪ Substack — The Batch #234</p>
              <p className="ml-3 text-gray-400">Récap hebdo IA : GPT-5 rumeurs, agents en prod. → <em>archiver</em></p>
              <p className="mt-3 text-gray-600 text-xs italic">8 emails analysés</p>
            </div>
          </section>

          {/* Windmill */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("windmillTitle")}</h2>
            <p className="leading-relaxed">{t("windmillP1")}</p>
            <div className="mt-5 space-y-4">
              {windmillItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-gray-900/60 p-5">
                  <h3 className="mb-2 font-semibold text-emerald-400">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("impactTitle")}</h2>
            <p className="leading-relaxed">{t("impactP1")}</p>
            <p className="mt-4 leading-relaxed">{t("impactP2")}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {impactStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="mb-2 text-xs text-gray-500">{stat.label}</p>
                  <p className="text-sm text-red-400 line-through">{stat.before}</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">{stat.after}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Extend */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("extendTitle")}</h2>
            <p className="leading-relaxed">{t("extendIntro")}</p>
            <ul className="mt-4 space-y-3">
              {extendItems.map((item) => (
                <li key={item.idea} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>
                    <strong className="text-white">{item.idea} : </strong>{item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed">{t("extendOutro")}</p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("conclusionTitle")}</h2>
            <p className="leading-relaxed">{t("conclusionP1")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP2")}</p>
            <p className="mt-6 text-lg font-medium text-white">{t("conclusionFinal")}</p>
          </section>

          {/* Workflow available CTA */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="font-semibold text-white">
              {t("workflowCta").split("/workflows")[0]}
              <Link href="/workflows" className="text-emerald-400 hover:text-emerald-300">/workflows</Link>
            </p>
            <p className="mt-2 text-sm text-gray-400">{t("workflowCtaDesc")}</p>
          </div>

          {/* Signature */}
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-white/10 bg-gray-900/50 p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">DA</div>
            <div>
              <p className="font-semibold text-white">{t("signatureName")}</p>
              <p className="text-sm text-gray-400">{t("signatureRole")}</p>
            </div>
          </div>
        </article>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-12 sm:flex-row sm:justify-between">
          <Link href="/lab" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400">
            <ArrowLeft className="h-4 w-4" /> {t("bottomNavBack")}
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400">
            {t("bottomNavNext")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
