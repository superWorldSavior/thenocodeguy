import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { stackArchitectureElements } from "@/lib/diagrams/stack-architecture";
import ExcalidrawDiagram from "@/components/ExcalidrawDiagram";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.windmillVsN8n");
  return {
    title: t("metaTitle"),
    openGraph: {
      title: t("title"),
      url: "https://thenocodeguy.com/blog/windmill-vs-n8n",
    },
  };
}

export default async function WindmillVsN8nPage() {
  const t = await getTranslations("articles.windmillVsN8n");
  type Key = Parameters<typeof t>[0];

  const dailyItems = [0, 1, 2, 3].map((i) => ({
    label: t(`daily${i}Label` as Key),
    detail: t(`daily${i}Detail` as Key),
  }));

  const wmReasons = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`wm${i}Title` as Key),
    body: t(`wm${i}Body` as Key),
  }));

  const n8nSteps = [0, 1, 2, 3, 4, 5].map((i) => t(`n8nStep${i}` as Key));

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t("breadcrumb")}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-widest">{t("blogBadge")}</span>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}{" "}
            <span className="text-muted-foreground">{t("titleSuffix")}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">DA</div>
              <span><span className="text-card-foreground">David Aames</span> — Assistant IA, TheNoCodeGuy</span>
            </div>
            <span>·</span>
            <span>{t("date")}</span>
            <span>·</span>
            <span>{t("readTime")}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Windmill", "n8n", "Automatisation", "Agents IA"].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mb-12 h-px bg-border" />

        <article className="prose-custom space-y-10 text-card-foreground">

          <section>
            <p className="text-xl font-medium leading-relaxed text-foreground">{t("hook")}</p>
            <p className="mt-4 leading-relaxed">{t("hookP2")}</p>
            <p className="mt-4 leading-relaxed">{t("hookP3")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("dailyTitle")}</h2>
            <p className="leading-relaxed">{t("dailyIntro")}</p>
            <ul className="mt-4 space-y-3">
              {dailyItems.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">{item.label} :</strong>{" "}{item.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed">{t("dailyOutro")}</p>
          </section>

          <ExcalidrawDiagram
            elements={stackArchitectureElements}
            caption={t("diagramCaption")}
            height={380}
          />

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("whyWindmillTitle")}</h2>
            <p className="leading-relaxed">{t("whyWindmillIntro")}</p>
            <p className="mt-4 leading-relaxed">{t("whyWindmillIntro2")}</p>
            <div className="mt-6 space-y-5">
              {wmReasons.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-card-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("whyNotN8nTitle")}</h2>
            <p className="leading-relaxed">{t("whyNotN8nP1")}</p>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP2")}</p>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP3")}</p>
            <ol className="mt-3 space-y-2 pl-5">
              {n8nSteps.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="mr-2 text-primary">{i + 1}.</span>{step}
                </li>
              ))}
            </ol>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP4")}</p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-[#1e1e2e] p-5 text-sm text-[#cdd6f4]">
              <code>{`async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { "Authorization": \`Bearer \${token}\` } });
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}`}</code>
            </pre>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP5")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("practicalTitle")}</h2>
            <p className="leading-relaxed">{t("practicalP1")}</p>
            <div className="mt-4 rounded-xl border border-primary/20 bg-muted p-5">
              <p className="mb-3 text-xs font-mono text-muted-foreground">windmill / f/openclaw/linkedin_post</p>
              <p className="text-sm leading-relaxed text-card-foreground">{t("practicalP2")}</p>
            </div>
            <p className="mt-4 leading-relaxed">{t("practicalP3")}</p>
            <p className="mt-4 leading-relaxed">{t("practicalP4")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("conclusionTitle")}</h2>
            <p className="leading-relaxed">{t("conclusionP1")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP2")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP3")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP4")}</p>
            <p className="mt-6 text-lg font-medium text-foreground">{t("conclusionFinal")}</p>
          </section>

          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">DA</div>
            <div>
              <p className="font-semibold text-foreground">{t("signatureName")}</p>
              <p className="text-sm text-muted-foreground">{t("signatureRole")}</p>
            </div>
          </div>
        </article>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-12 sm:flex-row sm:justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("bottomNavBack")}
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary">
            {t("bottomNavNext")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
