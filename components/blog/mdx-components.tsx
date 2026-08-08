"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  Layers,
  ShieldAlert,
  Lock,
  Mail,
  FileWarning,
  ShieldCheck,
  Calculator,
  Search,
  Brain,
  MessageCircle,
  Clock,
  TrendingUp,
  Zap,
  Calendar,
  Building2,
  Check,
  Quote as QuoteIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CalPopupButton from "@/components/molecules/CalPopupButton";

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  "shield-alert": ShieldAlert,
  lock: Lock,
  mail: Mail,
  "file-warning": FileWarning,
  "shield-check": ShieldCheck,
  calculator: Calculator,
  search: Search,
  brain: Brain,
  "message-circle": MessageCircle,
  clock: Clock,
  "trending-up": TrendingUp,
  zap: Zap,
  calendar: Calendar,
  building2: Building2,
  check: Check,
};

/* ─── Checklist ─────────────────────────────────────────── */
export function Checklist({
  items,
}: {
  items: { ok: boolean; text: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
            item.ok
              ? "border-green-500/20 bg-green-500/5"
              : "border-destructive/20 bg-destructive/5"
          }`}
        >
          {item.ok ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
          )}
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── BlockQuote ────────────────────────────────────────── */
export function BlockQuote({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-5">
      <div className="mb-2 flex items-center gap-2">
        <QuoteIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-2 italic text-muted-foreground">{children}</div>
    </div>
  );
}

/* ─── ProblemCard ───────────────────────────────────────── */
export function ProblemCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const Icon = iconMap[icon] || Layers;
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── QuestionCard ──────────────────────────────────────── */
export function QuestionCard({
  number,
  question,
  redFlag,
}: {
  number: number;
  question: string;
  redFlag: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {number}
        </div>
        <div>
          <p className="font-semibold text-foreground">{question}</p>
          <div className="mt-2 flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-yellow-500" />
            <p className="text-sm text-muted-foreground">{redFlag}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FeatureList ───────────────────────────────────────── */
export function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <span className="text-sm text-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── SolutionList (Check icon variant) ─────────────────── */
export function SolutionList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <span className="text-sm text-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── CTASection ────────────────────────────────────────── */
export function CTASection({
  title,
  description,
  buttonText,
  subtext,
  useCal = false,
}: {
  title: string;
  description: string;
  buttonText: string;
  subtext?: string;
  useCal?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
      <h2 className="mb-3 text-2xl font-bold text-foreground">{title}</h2>
      <p className="mx-auto mb-6 max-w-md text-muted-foreground">
        {description}
      </p>
      {useCal ? (
        <CalPopupButton className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary">
          {buttonText} <ArrowRight className="h-4 w-4" />
        </CalPopupButton>
      ) : (
        <NextLink
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary"
        >
          {buttonText} <ArrowRight className="h-4 w-4" />
        </NextLink>
      )}
      {subtext && (
        <p className="mt-3 text-sm text-muted-foreground">{subtext}</p>
      )}
    </section>
  );
}

/* ─── SourcesList ───────────────────────────────────────── */
type SourceItem = string | { label: string; href?: string };

export function SourcesList({
  title,
  sources,
}: {
  title: string;
  sources: SourceItem[];
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-foreground">{title}</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {sources.map((source, i) => {
          const item = typeof source === "string" ? { label: source } : source;
          return (
            <li key={i} className="flex items-start gap-2">
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ─── BeforeAfter (task card with before/after columns) ── */
export function BeforeAfter({
  title,
  icon,
  before,
  after,
  beforeLabel = "Avant",
  afterLabel = "Après (avec agent IA)",
}: {
  title: string;
  icon: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const Icon = iconMap[icon] || Mail;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-4 border-b border-border bg-muted/50 px-6 py-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="border-b border-border px-6 py-5 sm:border-b-0 sm:border-r">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
            {beforeLabel}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {before}
          </p>
        </div>
        <div className="px-6 py-5">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {afterLabel}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── ROIGrid ───────────────────────────────────────────── */
export function ROIGrid({
  items,
}: {
  items: { stat: string; label: string; icon?: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.icon ? iconMap[item.icon] || Clock : [Clock, TrendingUp, Zap][i];
        return (
          <div
            key={i}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <Icon className="mx-auto mb-3 h-6 w-6 text-primary" />
            <p className="text-2xl font-bold text-foreground">{item.stat}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── BeforeAfterStats (small stat cards with arrow) ──── */
export function BeforeAfterStats({
  items,
}: {
  items: { label: string; before: string; after: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {stat.label}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-red-400 line-through">
              {stat.before}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold text-primary">{stat.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── HighlightBox ──────────────────────────────────────── */
export function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
      <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
      <p className="text-sm font-medium text-foreground">{children}</p>
    </div>
  );
}

/* ─── Testimonial ───────────────────────────────────────── */
export function Testimonial({
  title,
  quote,
  initials,
  author,
  role,
}: {
  title: string;
  quote: string;
  initials: string;
  author: string;
  role: string;
}) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>
      <div className="relative rounded-xl border border-border bg-card p-6">
        <QuoteIcon className="absolute -top-3 left-5 h-6 w-6 text-primary/30" />
        <blockquote className="mt-2 text-lg italic leading-relaxed text-foreground">
          {quote}
        </blockquote>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PainList (AlertTriangle items in a box) ───────────── */
export function PainList({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-5">
      {title && (
        <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── StepCards ──────────────────────────────────────────── */
export function StepCards({
  steps,
}: {
  steps: {
    icon: string;
    label: string;
    title: string;
    description: string;
    color?: string;
    bg?: string;
  }[];
}) {
  const defaultColors = [
    { color: "text-blue-500", bg: "bg-blue-500/10" },
    { color: "text-purple-500", bg: "bg-purple-500/10" },
    { color: "text-green-500", bg: "bg-green-500/10" },
  ];
  return (
    <div className="space-y-6">
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || Mail;
        const colors = defaultColors[i] || defaultColors[0];
        return (
          <div
            key={i}
            className="flex gap-5 rounded-xl border border-border bg-card p-5"
          >
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${step.bg || colors.bg}`}
            >
              <Icon
                className={`h-6 w-6 ${step.color || colors.color}`}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {step.label}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── WhatsAppDigest ────────────────────────────────────── */
export function WhatsAppDigest({
  items,
  footer,
}: {
  items: {
    priority: "urgent" | "action";
    title: string;
    detail: string;
  }[];
  footer: string;
}) {
  return (
    <div className="rounded-xl border border-green-500/20 bg-green-50/5 p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
        WhatsApp - 7h30
      </p>
      <div className="mt-3 space-y-3 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span
              className={`mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${
                item.priority === "urgent" ? "bg-red-500" : "bg-yellow-500"
              }`}
            />
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
        <div className="h-px bg-border" />
        <p className="text-xs text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

/* ─── CalendarEvent ─────────────────────────────────────── */
export function CalendarEvent({
  date,
  description,
}: {
  date: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{date}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

/* ─── BtpSpecCard ───────────────────────────────────────── */
export function BtpSpecCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Building2 className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── GoodStudentList ───────────────────────────────────── */
export function GoodStudentList({
  items,
}: {
  items: { name: string; description: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
          <div>
            <span className="text-sm font-semibold text-foreground">
              {item.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {" — "}
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── BlogImage ─────────────────────────────────────────── */
export function BlogImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-border">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="mx-auto max-w-full object-contain"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
