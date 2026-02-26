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
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Honeypot anti-spam */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Section 1: Vous */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">{t("sectionYou")}</legend>
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
      </fieldset>

      {/* Section 2: Le poste */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">{t("sectionRole")}</legend>
        <div className="space-y-1.5">
          <Label htmlFor="role">{t("labelRole")}</Label>
          <select
            id="role"
            name="role"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">{t("selectDefault")}</option>
            <option value="btp">{t("roleBtp")}</option>
            <option value="commercial">{t("roleCommercial")}</option>
            <option value="administratif">{t("roleAdmin")}</option>
            <option value="webmaster">{t("roleWebmaster")}</option>
            <option value="autre">{t("roleOther")}</option>
          </select>
        </div>
      </fieldset>

      {/* Section 3: Les missions */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">{t("sectionMissions")}</legend>
        <div className="space-y-1.5">
          <Label htmlFor="missions">{t("labelMissions")}</Label>
          <Textarea
            id="missions"
            name="missions"
            required
            rows={6}
            placeholder={t("placeholderMissions")}
            className="min-h-[150px]"
          />
        </div>
      </fieldset>

      {/* Section 4: Contexte (optionnel) */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">{t("sectionContext")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="tools">{t("labelTools")}</Label>
            <Input id="tools" type="text" name="tools" placeholder={t("placeholderTools")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="timeline">{t("labelTimeline")}</Label>
            <select
              id="timeline"
              name="timeline"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="">{t("selectDefault")}</option>
              <option value="asap">{t("timelineAsap")}</option>
              <option value="month">{t("timelineMonth")}</option>
              <option value="quarter">{t("timelineQuarter")}</option>
              <option value="exploring">{t("timelineExploring")}</option>
            </select>
          </div>
        </div>
      </fieldset>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? t("submitting") : t("submitButton")}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
