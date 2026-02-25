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
  // Multi-domaines
  { id: "emails",       icon: "📧", labelKey: "taskEmails",       automationLevel: "High",   recoveryRate: 0.85 },
  { id: "relances",     icon: "💸", labelKey: "taskRelances",     automationLevel: "High",   recoveryRate: 0.9  },
  { id: "veille",       icon: "🔍", labelKey: "taskVeille",       automationLevel: "High",   recoveryRate: 0.9  },
  { id: "prospection",  icon: "🎯", labelKey: "taskProspection",  automationLevel: "High",   recoveryRate: 0.85 },
  { id: "reporting",    icon: "📊", labelKey: "taskReporting",    automationLevel: "Medium", recoveryRate: 0.7  },
  { id: "planning",     icon: "📅", labelKey: "taskPlanning",     automationLevel: "Medium", recoveryRate: 0.7  },
  { id: "saisie",       icon: "📦", labelKey: "taskSaisie",       automationLevel: "High",   recoveryRate: 0.9  },
  { id: "compta",       icon: "🧾", labelKey: "taskCompta",       automationLevel: "Medium", recoveryRate: 0.75 },
  { id: "social",       icon: "📱", labelKey: "taskSocial",       automationLevel: "High",   recoveryRate: 0.85 },
  { id: "monitoring",   icon: "🖥️", labelKey: "taskMonitoring",   automationLevel: "High",   recoveryRate: 0.9  },
  { id: "autre",        icon: "🤖", labelKey: "taskAutre",        automationLevel: "Medium", recoveryRate: 0.7, hasTextInput: true },
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
                current > s ? "bg-primary text-foreground dark:text-background"
                  : current === s ? "bg-primary text-foreground dark:text-background ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {current > s ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            <span className={`hidden text-[10px] sm:block ${current >= s ? "text-primary" : "text-muted-foreground"}`}>
              {labels[s - 1]}
            </span>
          </div>
          {s < total && (
            <div className={`mb-4 h-px w-6 sm:w-10 transition-colors ${current > s ? "bg-primary" : "bg-muted"}`} />
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
    High:   { label: t("automationHigh"),   bar: "w-full  bg-primary", badge: "border-primary/40 bg-primary/20 text-primary" },
    Medium: { label: t("automationMedium"), bar: "w-2/3   bg-amber-500",   badge: "border-amber-500/40  bg-amber-500/20  text-amber-300"   },
    Low:    { label: t("automationLow"),    bar: "w-1/3   bg-muted-foreground", badge: "border-border bg-muted text-muted-foreground" },
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
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          {t("successTitle").replace("{name}", contact.prenom)}
        </h2>
        <p className="mb-6 text-muted-foreground">
          <span className="font-semibold text-primary">{t("successSubtitle")}</span>{" "}
          {t("successSubtitleEnd")}
        </p>
        <div className="mx-auto max-w-xs rounded-xl border border-border bg-card p-4">
          <div className="flex items-start gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm italic text-muted-foreground">&ldquo;{t("successQuote")}&rdquo;</p>
              <p className="mt-1 text-xs font-semibold text-primary">TheNoCodeGuy</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 1 ────────────────────────────────────────────────────────────────

  if (step === 1) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <Stepper current={1} total={4} labels={stepLabels} />
        <h2 className="mb-2 text-xl font-bold text-foreground">{t("step1Title")}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{t("step1Subtitle")}</p>

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
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="text-xl">{task.icon}</span>
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${selected ? "border-primary bg-primary" : "border-border bg-transparent"}`}>
                    {selected && <CheckCircle className="h-3.5 w-3.5 text-foreground dark:text-background" />}
                  </div>
                </button>
                {task.hasTextInput && selected && (
                  <div className="ml-8 pl-2">
                    <input
                      type="text"
                      value={autreText}
                      onChange={(e) => setAutreText(e.target.value)}
                      placeholder={t("taskAutrePlaceholder")}
                      className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-foreground dark:text-background transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
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
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <Stepper current={2} total={4} labels={stepLabels} />
        <h2 className="mb-2 text-xl font-bold text-foreground">{t("step2Title")}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{t("step2Subtitle")}</p>

        <div className="space-y-6">
          {selectedTasks.map((task) => {
            const cfg = getConfig(task.id);
            const label = task.id === "autre" && autreText ? autreText : t(task.labelKey as Parameters<typeof t>[0]);
            return (
              <div key={task.id} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-lg">{task.icon}</span>
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t("frequencyLabel")}</label>
                  <select
                    value={cfg.frequency}
                    onChange={(e) => updateConfig(task.id, { frequency: e.target.value as TaskConfig["frequency"] })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50"
                  >
                    <option value="quotidien">{t("freqDaily")}</option>
                    <option value="hebdomadaire">{t("freqWeekly")}</option>
                    <option value="mensuel">{t("freqMonthly")}</option>
                  </select>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground">{t("durationLabel")}</label>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
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
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>5 min</span><span>1h</span><span>2h</span><span>3h</span><span>4h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("backButton")}
          </button>
          <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-foreground dark:text-background transition-colors hover:bg-primary/90">
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
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Stepper current={3} total={4} labels={stepLabels} />
          <h2 className="mb-6 text-xl font-bold text-foreground">{t("step3Title")}</h2>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent p-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">{Math.round(totalHoursYear)}h</div>
              <div className="mt-1 text-xs text-muted-foreground">{t("kpi0Label")}</div>
            </div>
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent p-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">
                {Math.round(totalValueYear).toLocaleString("fr-FR")} €
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t("kpi1Label")}</div>
            </div>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t("breakdownTitle")}</h3>
          <div className="space-y-3">
            {results.map(({ task, hoursYear, valueYear }) => {
              const lvl = LEVEL_CONFIG[task.automationLevel];
              const pct = Math.min(100, (hoursYear / (totalHoursYear || 1)) * 100);
              const label = task.id === "autre" && autreText ? autreText : t(task.labelKey as Parameters<typeof t>[0]);
              return (
                <div key={task.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{task.icon}</span>
                      <span className="truncate text-sm font-medium text-foreground">{label}</span>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${lvl.badge}`}>
                      🚀 {lvl.label}
                    </span>
                  </div>
                  <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full transition-all duration-700 ${lvl.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(hoursYear)}h {t("hoursPerYear")}</span>
                    <span className="font-semibold text-card-foreground">≈ {Math.round(valueYear).toLocaleString("fr-FR")} €</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 text-center">
          <div className="mb-3 text-lg font-bold text-foreground">{t("step3CtaTitle")}</div>
          <p className="mb-4 text-sm text-muted-foreground">{t("step3CtaSubtitle")}</p>
          <button
            onClick={() => setStep(4)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-foreground dark:text-background transition-colors hover:bg-primary/90"
          >
            {t("step3CtaButton")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={() => setStep(2)} className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> {t("editAnswers")}
        </button>
      </div>
    );
  }

  // ── STEP 4 ────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <Stepper current={4} total={4} labels={stepLabels} />
      <h2 className="mb-2 text-xl font-bold text-foreground">{t("step4Title")}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{t("step4Subtitle")}</p>

      <div className="mb-6 flex gap-3">
        <div className="flex-1 rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-lg font-bold text-primary">{Math.round(totalHoursYear)}h</div>
          <div className="text-[11px] text-muted-foreground">{t("hoursPerYearShort")}</div>
        </div>
        <div className="flex-1 rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-lg font-bold text-primary">{Math.round(totalValueYear).toLocaleString("fr-FR")} €</div>
          <div className="text-[11px] text-muted-foreground">{t("estimatedValue")}</div>
        </div>
      </div>

      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">{t("labelFirstName")}</label>
          <input
            type="text"
            required
            value={contact.prenom}
            onChange={(e) => setContact((p) => ({ ...p, prenom: e.target.value }))}
            placeholder={t("placeholderFirstName")}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">{t("labelEmail")}</label>
          <input
            type="email"
            required
            value={contact.email}
            onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
            placeholder={t("placeholderEmail")}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            {t("labelSociety")} <span className="text-muted-foreground">{t("societyOptional")}</span>
          </label>
          <input
            type="text"
            value={contact.societe}
            onChange={(e) => setContact((p) => ({ ...p, societe: e.target.value }))}
            placeholder={t("placeholderSocietyFR")}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {submitError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("backButton")}
          </button>
          <button
            type="submit"
            disabled={submitting || !contact.prenom || !contact.email}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-foreground dark:text-background transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
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
