"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  User,
  Loader2,
} from "lucide-react";

interface AuditResult {
  score_potentiel: number;
  temps_recuperable_semaine: number;
  roi_estime_annuel: number;
  priorite: "haute" | "moyenne" | "faible";
  quick_wins: string[];
  outils_recommandes: string[];
  message: string;
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-300";

function CircularScore({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  const color =
    value >= 70 ? "#10b981" : value >= 40 ? "#f59e0b" : "#6b7280";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#ffffff10"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease-in-out" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-white">{value}%</div>
        <div className="text-xs text-gray-400">potentiel</div>
      </div>
    </div>
  );
}

function PrioriteBadge({ priorite }: { priorite: string }) {
  const config: Record<string, { label: string; className: string }> = {
    haute: {
      label: "🔴 Priorité haute",
      className: "bg-red-500/20 border-red-500/40 text-red-300",
    },
    moyenne: {
      label: "🟡 Priorité moyenne",
      className: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    },
    faible: {
      label: "🟢 Priorité faible",
      className: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    },
  };
  const c = config[priorite] ?? config.moyenne;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${c.className}`}
    >
      {c.label}
    </span>
  );
}

export default function AuditForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    process_name: "",
    time_per_week_hours: "",
    team_size: "1",
    tools_used: "",
    repetitive_tasks: "",
    email: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function nextStep() {
    if (!form.process_name || !form.time_per_week_hours) return;
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          process_name: form.process_name,
          time_per_week_hours: parseFloat(form.time_per_week_hours),
          tools_used: form.tools_used,
          repetitive_tasks: form.repetitive_tasks,
          team_size: parseInt(form.team_size) || 1,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur inattendue");
      }

      const data: AuditResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const roiK = Math.round(result.roi_estime_annuel / 1000);
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        {/* Header rapport */}
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent p-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <CheckCircle className="h-3.5 w-3.5" />
            Rapport d&apos;audit personnalisé
          </div>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Votre analyse est prête
          </h2>
          <p className="mt-2 text-gray-400">
            Process analysé :{" "}
            <span className="font-semibold text-white">{form.process_name}</span>
          </p>
        </div>

        {/* Score + Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Score circulaire */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6">
            <CircularScore value={result.score_potentiel} />
            <p className="mt-3 text-center text-sm text-gray-400">
              Potentiel d&apos;automatisation
            </p>
          </div>

          {/* Heures récupérables */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <Clock className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold text-emerald-400">
              {result.temps_recuperable_semaine}h
            </div>
            <p className="mt-2 text-sm text-gray-400">par semaine récupérables</p>
          </div>

          {/* ROI */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold text-emerald-400">
              {roiK}k€
            </div>
            <p className="mt-2 text-sm text-gray-400">ROI estimé / an</p>
          </div>
        </div>

        {/* Priorité + Quick wins + Outils */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick wins */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">⚡ Quick wins identifiés</h3>
              <PrioriteBadge priorite={result.priorite} />
            </div>
            <ul className="space-y-3">
              {result.quick_wins.map((win, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-gray-300">{win}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outils recommandés */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 font-semibold">
              <span className="mr-2">
                <Wrench className="inline h-4 w-4 text-emerald-400" />
              </span>
              Outils recommandés
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.outils_recommandes.map((outil, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300"
                >
                  <Zap className="h-3.5 w-3.5" />
                  {outil}
                </span>
              ))}
            </div>

            {/* Avertissement priorité haute */}
            {result.priorite === "haute" && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-xs text-red-300">
                  Potentiel élevé détecté — chaque semaine sans automatisation = pertes évitables.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Message de David Aames */}
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
              <User className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm italic text-gray-300">
                &ldquo;{result.message}&rdquo;
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-400">
                David Aames — TheNoCodeGuy
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer le projet
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => {
              setResult(null);
              setStep(1);
              setForm({
                process_name: "",
                time_per_week_hours: "",
                team_size: "1",
                tools_used: "",
                repetitive_tasks: "",
                email: "",
              });
            }}
            className="text-sm text-gray-400 underline hover:text-white"
          >
            Analyser un autre process
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                step >= s
                  ? "bg-emerald-500 text-gray-950"
                  : "border border-white/20 text-gray-500"
              }`}
            >
              {step > s ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            <span
              className={`hidden text-sm sm:block ${
                step >= s ? "text-white" : "text-gray-500"
              }`}
            >
              {s === 1 ? "Le process" : "Les détails"}
            </span>
            {s < 2 && (
              <div
                className={`h-px w-12 transition-colors ${
                  step > s ? "bg-emerald-500" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">
            Étape 1 — Le process à automatiser
          </h3>

          <div>
            <label className={labelClass}>
              Quel process voulez-vous automatiser ? *
            </label>
            <input
              type="text"
              name="process_name"
              value={form.process_name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Ex : traitement des devis, onboarding clients..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Heures/semaine consacrées à ce process ? *
              </label>
              <input
                type="number"
                name="time_per_week_hours"
                value={form.time_per_week_hours}
                onChange={handleChange}
                required
                min="0.5"
                step="0.5"
                className={inputClass}
                placeholder="Ex : 5"
              />
            </div>
            <div>
              <label className={labelClass}>
                Personnes impliquées
              </label>
              <input
                type="number"
                name="team_size"
                value={form.team_size}
                onChange={handleChange}
                min="1"
                step="1"
                className={inputClass}
                placeholder="1"
              />
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!form.process_name || !form.time_per_week_hours}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-lg font-semibold text-white">
            Étape 2 — Les détails du process
          </h3>

          <div>
            <label className={labelClass}>Outils utilisés actuellement *</label>
            <input
              type="text"
              name="tools_used"
              value={form.tools_used}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Excel, Gmail, Notion, HubSpot..."
            />
          </div>

          <div>
            <label className={labelClass}>
              Décrivez les tâches répétitives *
            </label>
            <textarea
              name="repetitive_tasks"
              value={form.repetitive_tasks}
              onChange={handleChange}
              required
              rows={4}
              className={inputClass}
              placeholder="Ex : copier-coller des données entre Excel et l'ERP, envoyer des emails de relance manuellement..."
            />
          </div>

          <div>
            <label className={labelClass}>
              Email pour recevoir le rapport *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="vous@entreprise.com"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
            <button
              type="submit"
              disabled={
                loading ||
                !form.tools_used ||
                !form.repetitive_tasks ||
                !form.email
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  Générer mon rapport IA
                  <Zap className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
