"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Search, ShieldCheck, Linkedin, ArrowRight, X, CheckCircle, Clock, Zap,
} from "lucide-react";

const colorMap: Record<string, { border: string; bg: string; icon: string; tag: string }> = {
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/60",
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    tag: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    tag: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    tag: "border-purple-500/20 bg-purple-500/10 text-purple-300",
  },
};

export default function WorkflowsPage() {
  const t = useTranslations("workflows");
  const [modal, setModal] = useState<{ slug: string; title: string } | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const workflows = [
    {
      slug: "boamp-veille",
      icon: Search,
      title: t("wf0Title"),
      tagline: t("wf0Tagline"),
      description: t("wf0Desc"),
      tags: ["Windmill", "Python", "Email", "API Gov"],
      metrics: [
        { label: t("wf0M0Label"), value: t("wf0M0Value") },
        { label: t("wf0M1Label"), value: t("wf0M1Value") },
        { label: t("wf0M2Label"), value: t("wf0M2Value") },
      ],
      color: "blue",
    },
    {
      slug: "monitoring-serveur",
      icon: ShieldCheck,
      title: t("wf1Title"),
      tagline: t("wf1Tagline"),
      description: t("wf1Desc"),
      tags: ["Bash", "Windmill", "WhatsApp", "Docker"],
      metrics: [
        { label: t("wf1M0Label"), value: t("wf1M0Value") },
        { label: t("wf1M1Label"), value: t("wf1M1Value") },
        { label: t("wf1M2Label"), value: t("wf1M2Value") },
      ],
      color: "emerald",
    },
    {
      slug: "linkedin-auto-post",
      icon: Linkedin,
      title: t("wf2Title"),
      tagline: t("wf2Tagline"),
      description: t("wf2Desc"),
      tags: ["Windmill", "LinkedIn API", "Templates", "Scheduling"],
      metrics: [
        { label: t("wf2M0Label"), value: t("wf2M0Value") },
        { label: t("wf2M1Label"), value: t("wf2M1Value") },
        { label: t("wf2M2Label"), value: t("wf2M2Value") },
      ],
      color: "purple",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal) return;
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/meolvdkd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          workflow: modal.title,
          _subject: `Téléchargement workflow : ${modal.title}`,
        }),
      });
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal(null);
    setEmail("");
    setDone(false);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{t("badge")}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{t("pageTitle")}</h1>
          <p className="max-w-2xl text-lg text-gray-400">{t("pageSubtitle")}</p>
        </div>

        {/* Workflow cards */}
        <div className="grid gap-6">
          {workflows.map((wf) => {
            const colors = colorMap[wf.color];
            const Icon = wf.icon;
            return (
              <div
                key={wf.slug}
                className={`group rounded-2xl border ${colors.border} bg-gray-900/60 p-6 transition-all sm:p-8`}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}>
                    <Icon className={`h-7 w-7 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-1 text-xl font-bold text-white">{wf.title}</h2>
                    <p className="mb-3 text-sm font-medium text-gray-400">{wf.tagline}</p>
                    <p className="mb-5 text-gray-400">{wf.description}</p>
                    <div className="mb-5 grid grid-cols-3 gap-3">
                      {wf.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-white/5 bg-gray-800/60 p-3 text-center">
                          <div className={`text-lg font-bold ${colors.icon}`}>{m.value}</div>
                          <div className="mt-0.5 text-xs text-gray-500">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {wf.tags.map((tag) => (
                        <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${colors.tag}`}>{tag}</span>
                      ))}
                      <button
                        onClick={() => setModal({ slug: wf.slug, title: wf.title })}
                        className="ml-auto flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                      >
                        {t("getGuide")} <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <p className="mb-2 text-lg font-semibold text-white">{t("ctaTitle")}</p>
          <p className="mb-6 text-gray-400">{t("ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white">
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
                <h3 className="mb-2 text-xl font-bold text-white">{t("modalSuccessTitle")}</h3>
                <p className="mb-6 text-gray-400">{t("modalSuccessSubtitle")}</p>
                <Link
                  href={`/workflows/${modal.slug}/guide`}
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
                >
                  {t("modalSuccessButton")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-2 text-emerald-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-widest">{t("modalFreeGuide")}</span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-white">{modal.title}</h3>
                <p className="mb-6 text-sm text-gray-400">{t("modalEmailLabel")}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder={t("modalEmailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {loading ? t("modalSending") : t("modalAccessButton")}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
                <p className="mt-4 text-center text-xs text-gray-600">{t("modalNoSpam")}</p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
