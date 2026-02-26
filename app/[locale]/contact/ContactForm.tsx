"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mkovyjba", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-primary/10 p-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-xl font-bold">{t("successTitle")}</h3>
        <p className="text-muted-foreground">{t("successSubtitle")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      {/* Honeypot anti-spam */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("labelName")}</Label>
          <Input id="name" type="text" name="name" required placeholder={t("placeholderName")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("labelEmail")}</Label>
          <Input id="email" type="email" name="email" required placeholder={t("placeholderEmail")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">{t("labelCompany")}</Label>
        <Input id="company" type="text" name="company" required placeholder={t("placeholderCompany")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="missions">{t("labelMissions")}</Label>
        <Textarea
          id="missions"
          name="missions"
          required
          rows={4}
          placeholder={t("placeholderMissions")}
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? t("submitting") : t("submitButton")}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
