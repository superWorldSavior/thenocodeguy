import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical, ArrowRight } from "lucide-react";
import { stackArchitectureElements } from "@/lib/diagrams/stack-architecture";
import ExcalidrawDiagram from "@/components/ExcalidrawDiagram";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.windmillVsN8n");
  return {
    title: t("metaTitle"),
    openGraph: {
      title: t("title"),
      url: "https://thenocodeguy.com/lab/windmill-vs-n8n",
    },
  };
}

export default async function WindmillVsN8nPage() {
  const t = await getTranslations("articles.windmillVsN8n");

  const dailyItems = [0, 1, 2, 3].map((i) => ({
    label: t(`daily${i}Label` as any),
    detail: t(`daily${i}Detail` as any),
  }));

  const wmReasons = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`wm${i}Title` as any),
    body: t(`wm${i}Body` as any),
  }));

  const n8nSteps = [0, 1, 2, 3, 4, 5].map((i) => t(`n8nStep${i}` as any));

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
            {["Windmill", "n8n", "Automatisation", "Agents IA"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mb-12 h-px bg-white/10" />

        <article className="prose-custom space-y-10 text-gray-300">

          <section>
            <p className="text-xl font-medium leading-relaxed text-white">{t("hook")}</p>
            <p className="mt-4 leading-relaxed">{t("hookP2")}</p>
            <p className="mt-4 leading-relaxed">{t("hookP3")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("dailyTitle")}</h2>
            <p className="leading-relaxed">{t("dailyIntro")}</p>
            <ul className="mt-4 space-y-3">
              {dailyItems.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>
                    <strong className="text-white">{item.label} :</strong>{" "}{item.detail}
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
            <h2 className="mb-4 text-2xl font-bold text-white">{t("whyWindmillTitle")}</h2>
            <p className="leading-relaxed">{t("whyWindmillIntro")}</p>
            <p className="mt-4 leading-relaxed">{t("whyWindmillIntro2")}</p>
            <div className="mt-6 space-y-5">
              {wmReasons.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-gray-900/60 p-5">
                  <h3 className="mb-2 font-semibold text-emerald-400">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("whyNotN8nTitle")}</h2>
            <p className="leading-relaxed">{t("whyNotN8nP1")}</p>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP2")}</p>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP3")}</p>
            <ol className="mt-3 space-y-2 pl-5">
              {n8nSteps.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="mr-2 text-emerald-400">{i + 1}.</span>{step}
                </li>
              ))}
            </ol>
            <p className="mt-4 leading-relaxed">{t("whyNotN8nP4")}</p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-emerald-300">
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
            <h2 className="mb-4 text-2xl font-bold text-white">{t("practicalTitle")}</h2>
            <p className="leading-relaxed">{t("practicalP1")}</p>
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-gray-900 p-5">
              <p className="mb-3 text-xs font-mono text-gray-500">windmill / f/openclaw/linkedin_post</p>
              <p className="text-sm leading-relaxed text-gray-300">{t("practicalP2")}</p>
            </div>
            <p className="mt-4 leading-relaxed">{t("practicalP3")}</p>
            <p className="mt-4 leading-relaxed">{t("practicalP4")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">{t("conclusionTitle")}</h2>
            <p className="leading-relaxed">{t("conclusionP1")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP2")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP3")}</p>
            <p className="mt-4 leading-relaxed">{t("conclusionP4")}</p>
            <p className="mt-6 text-lg font-medium text-white">{t("conclusionFinal")}</p>
          </section>

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
