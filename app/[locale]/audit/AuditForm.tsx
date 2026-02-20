"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Clock, TrendingUp, Zap, User, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Task {
  id: string;
  icon: string;
  labelKey: string;
  automationLevel: "High" | "Medium" | "Low";
  recoveryRate: number;
  hasTextInput?: boolean;
}

const TASKS: Task[] = [
  { id: "emails",     icon: "📧", labelKey: "taskEmails",     automationLevel: "Low",    recoveryRate: 0.7 },
  { id: "reporting",  icon: "📊", labelKey: "taskReporting",  automationLevel: "Medium", recoveryRate: 0.7 },
  { id: "planning",   icon: "📅", labelKey: "taskPlanning",   automationLevel: "Medium", recoveryRate: 0.7 },
  { id: "veille",     icon: "🔍", labelKey: "taskVeille",     automationLevel: "Low",    recoveryRate: 0.7 },
  { id: "devis",      icon: "💼", labelKey: "taskDevis",      automationLevel: "Medium", recoveryRate: 0.7 },
  { id: "saisie",     icon: "📦", labelKey: "taskSaisie",     automationLevel: "High",   recoveryRate: 0.9 },
  { id: "social",     icon: "📱", labelKey: "taskSocial",     automationLevel: "Medium", recoveryRate: 0.7 },
  { id: "sync",       icon: "🔄", labelKey: "taskSync",       automationLevel: "High",   recoveryRate: 0.9 },
  { id: "onboarding", icon: "📋", labelKey: "taskOnboarding", automationLevel: "Medium", recoveryRate: 0.7 },
  { id: "autre",      icon: "🤖", labelKey: "taskAutre",      automationLevel: "Low",    recoveryRate: 0.7, hasTextInput: true },
];

const HOURLY_RATE = 150;

interface TaskConfig {
  frequency: "quotidien" | "hebdomadaire" | "mensuel";
  durationMinutes: number;
}
type TaskConfigs = Record<string, TaskConfig>;

const FREQUENCY_MULTIPLIERS: Record<string, number> = {
  quotidien: 5,
  hebdomadaire: 1,
  mensuel: 1 / 4.33,
};

function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

function Stepper({ current, total, labels }: { current: number; total: number; labels: string[] }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-1 sm:gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                current > s ? "bg-emerald-500 text-gray-950"
                  : current === s ? "bg-emerald-500 text-gray-950 ring-2 ring-emerald-400/40 ring-offset-2 ring-offset-gray-900"
                  : "border border-white/20 text-gray-500"
              }`}
            >
              {current > s ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            <span className={`hidden text-[10px] sm:block ${current >= s ? "text-emerald-400" : "text-gray-600"}`}>
              {labels[s - 1]}
            </span>
          </div>
          {s < total && (
            <div className={`mb-4 h-px w-6 sm:w-10 transition-colors ${current > s ? "bg-emerald-500" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function AuditForm() {
  const t = useTranslations("audit");
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [autreText, setAutreText] = useState("");
  const [configs, setConfigs] = useState<TaskConfigs>({});
  const [contact, setContact] = useState({ prenom: "", email: "", societe: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const stepLabels = t.raw("stepLabels") as string[];

  const LEVEL_CONFIG = {
    High:   { label: t("automationHigh"),   bar: "w-full  bg-emerald-500", badge: "border-emerald-500/40 bg-emerald-500/20 text-emerald-300" },
    Medium: { label: t("automationMedium"), bar: "w-2/3   bg-amber-500",   badge: "border-amber-500/40  bg-amber-500/20  text-amber-300"   },
    Low:    { label: t("automationLow"),    bar: "w-1/3   bg-gray-500",    badge: "border-gray-500/40   bg-gray-500/20   text-gray-300"    },
  } as const;

  const selectedTasks = TASKS.filter((task) => selectedIds.includes(task.id));

  function calcHoursYear(task: Task, cfg: TaskConfig): number {
    const hoursPerOccurrence = cfg.durationMinutes / 60;
    const occurrencesPerWeek = FREQUENCY_MULTIPLIERS[cfg.frequency];
    return hoursPerOccurrence * occurrencesPerWeek * 52 * task.recoveryRate;
  }

  function getConfig(id: string): TaskConfig {
    return configs[id] ?? { frequency: "hebdomadaire", durationMinutes: 30 };
  }

  const results = selectedTasks.map((task) => {
    const cfg = getConfig(task.id);
    const hoursYear = calcHoursYear(task, cfg);
    const valueYear = hoursYear * HOURLY_RATE;
    return { task, cfg, hoursYear, valueYear };
  });

  const totalHoursYear = results.reduce((s, r) => s + r.hoursYear, 0);
  const totalValueYear = results.reduce((s, r) => s + r.valueYear, 0);

  function toggleTask(id: string) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function updateConfig(id: string, patch: Partial<TaskConfig>) {
    setConfigs((prev) => ({ ...prev, [id]: { ...getConfig(id), ...patch } }));
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const taskSummary = results
      .map((r) => `${r.task.icon} ${t(r.task.labelKey as Parameters<typeof t>[0])} — ${r.cfg.frequency}, ${formatMinutes(r.cfg.durationMinutes)} → ${Math.round(r.hoursYear)}h/an`)
      .join("\n");

    const payload = {
      prenom: contact.prenom,
      email: contact.email,
      societe: contact.societe || t("notFilled"),
      temps_recupere_an: `${Math.round(totalHoursYear)} heures`,
      valeur_estimee: `${Math.round(totalValueYear).toLocaleString("fr-FR")} €`,
      taches_selectionnees: taskSummary,
      autre_precision: autreText || undefined,
    };

    try {
      const res = await fetch("https://formspree.io/f/meolvdkd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setSubmitted(true);
    } catch {
      setSubmitError(t("submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success screen ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">
          {t("successTitle").replace("{name}", contact.prenom)}
        </h2>
        <p className="mb-6 text-gray-400">
          <span className="font-semibold text-emerald-400">{t("successSubtitle")}</span>{" "}
          {t("successSubtitleEnd")}
        </p>
        <div className="mx-auto max-w-xs rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
              <User className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm italic text-gray-300">&ldquo;{t("successQuote")}&rdquo;</p>
              <p className="mt-1 text-xs font-semibold text-emerald-400">David Aames — TheNoCodeGuy</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 1 ────────────────────────────────────────────────────────────────

  if (step === 1) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <Stepper current={1} total={4} labels={stepLabels} />
        <h2 className="mb-2 text-xl font-bold text-white">{t("step1Title")}</h2>
        <p className="mb-6 text-sm text-gray-400">{t("step1Subtitle")}</p>

        <div className="space-y-2">
          {TASKS.map((task) => {
            const selected = selectedIds.includes(task.id);
            const label = task.hasTextInput ? t("taskAutre") : t(task.labelKey as Parameters<typeof t>[0]);
            return (
              <div key={task.id} className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
                  }`}
                >
                  <span className="text-xl">{task.icon}</span>
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${selected ? "border-emerald-500 bg-emerald-500" : "border-white/20 bg-transparent"}`}>
                    {selected && <CheckCircle className="h-3.5 w-3.5 text-gray-950" />}
                  </div>
                </button>
                {task.hasTextInput && selected && (
                  <div className="ml-8 pl-2">
                    <input
                      type="text"
                      value={autreText}
                      onChange={(e) => setAutreText(e.target.value)}
                      placeholder={t("taskAutrePlaceholder")}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            disabled={selectedIds.length === 0}
            onClick={() => setStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {selectedIds.length === 1 ? t("step1Button").replace("{count}", "1") : t("step1ButtonPlural").replace("{count}", String(selectedIds.length))}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 2 ────────────────────────────────────────────────────────────────

  if (step === 2) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <Stepper current={2} total={4} labels={stepLabels} />
        <h2 className="mb-2 text-xl font-bold text-white">{t("step2Title")}</h2>
        <p className="mb-6 text-sm text-gray-400">{t("step2Subtitle")}</p>

        <div className="space-y-6">
          {selectedTasks.map((task) => {
            const cfg = getConfig(task.id);
            const label = task.id === "autre" && autreText ? autreText : t(task.labelKey as Parameters<typeof t>[0]);
            return (
              <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-lg">{task.icon}</span>
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-gray-400">{t("frequencyLabel")}</label>
                  <select
                    value={cfg.frequency}
                    onChange={(e) => updateConfig(task.id, { frequency: e.target.value as TaskConfig["frequency"] })}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50"
                  >
                    <option value="quotidien">{t("freqDaily")}</option>
                    <option value="hebdomadaire">{t("freqWeekly")}</option>
                    <option value="mensuel">{t("freqMonthly")}</option>
                  </select>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-400">{t("durationLabel")}</label>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                      {formatMinutes(cfg.durationMinutes)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={240}
                    step={5}
                    value={cfg.durationMinutes}
                    onChange={(e) => updateConfig(task.id, { durationMinutes: Number(e.target.value) })}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-500"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-gray-600">
                    <span>5 min</span><span>1h</span><span>2h</span><span>3h</span><span>4h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-white/20 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t("backButton")}
          </button>
          <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400">
            {t("calcROI")} <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 3 ────────────────────────────────────────────────────────────────

  if (step === 3) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <Stepper current={3} total={4} labels={stepLabels} />
          <h2 className="mb-6 text-xl font-bold text-white">{t("step3Title")}</h2>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400">{Math.round(totalHoursYear)}h</div>
              <div className="mt-1 text-xs text-gray-400">{t("kpi0Label")}</div>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400">
                {Math.round(totalValueYear).toLocaleString("fr-FR")} €
              </div>
              <div className="mt-1 text-xs text-gray-400">{t("kpi1Label")}</div>
            </div>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-gray-300">{t("breakdownTitle")}</h3>
          <div className="space-y-3">
            {results.map(({ task, hoursYear, valueYear }) => {
              const lvl = LEVEL_CONFIG[task.automationLevel];
              const pct = Math.min(100, (hoursYear / (totalHoursYear || 1)) * 100);
              const label = task.id === "autre" && autreText ? autreText : t(task.labelKey as Parameters<typeof t>[0]);
              return (
                <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{task.icon}</span>
                      <span className="truncate text-sm font-medium text-white">{label}</span>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${lvl.badge}`}>
                      🚀 {lvl.label}
                    </span>
                  </div>
                  <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full transition-all duration-700 ${lvl.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{Math.round(hoursYear)}h {t("hoursPerYear")}</span>
                    <span className="font-semibold text-gray-300">≈ {Math.round(valueYear).toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent p-6 text-center">
          <div className="mb-3 text-lg font-bold text-white">{t("step3CtaTitle")}</div>
          <p className="mb-4 text-sm text-gray-400">{t("step3CtaSubtitle")}</p>
          <button
            onClick={() => setStep(4)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("step3CtaButton")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={() => setStep(2)} className="flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-300">
          <ArrowLeft className="h-3.5 w-3.5" /> {t("editAnswers")}
        </button>
      </div>
    );
  }

  // ── STEP 4 ────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <Stepper current={4} total={4} labels={stepLabels} />
      <h2 className="mb-2 text-xl font-bold text-white">{t("step4Title")}</h2>
      <p className="mb-6 text-sm text-gray-400">{t("step4Subtitle")}</p>

      <div className="mb-6 flex gap-3">
        <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">{Math.round(totalHoursYear)}h</div>
          <div className="text-[11px] text-gray-500">{t("hoursPerYearShort")}</div>
        </div>
        <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">{Math.round(totalValueYear).toLocaleString("fr-FR")} €</div>
          <div className="text-[11px] text-gray-500">{t("estimatedValue")}</div>
        </div>
      </div>

      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">{t("labelFirstName")}</label>
          <input
            type="text"
            required
            value={contact.prenom}
            onChange={(e) => setContact((p) => ({ ...p, prenom: e.target.value }))}
            placeholder={t("placeholderFirstName")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">{t("labelEmail")}</label>
          <input
            type="email"
            required
            value={contact.email}
            onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
            placeholder={t("placeholderEmail")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            {t("labelSociety")} <span className="text-gray-500">{t("societyOptional")}</span>
          </label>
          <input
            type="text"
            value={contact.societe}
            onChange={(e) => setContact((p) => ({ ...p, societe: e.target.value }))}
            placeholder={t("placeholderSocietyFR")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        {submitError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-white/20 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t("backButton")}
          </button>
          <button
            type="submit"
            disabled={submitting || !contact.prenom || !contact.email}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> {t("submitAuditLoading")}</>
            ) : (
              <><Zap className="h-4 w-4" /> {t("submitAudit")}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
