"use client";

import { useState } from "react";
import { Send, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOURFORMID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
      {/* Info */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <Mail className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="font-semibold">Email direct</h3>
          </div>
          <p className="text-sm text-gray-400">hello@thenocodeguy.com</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <Clock className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="font-semibold">Temps de réponse</h3>
          </div>
          <p className="text-sm text-gray-400">
            Réponse garantie sous 24h ouvrées. Souvent beaucoup moins.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-6">
          <p className="text-sm text-emerald-300">
            💡 <strong>Conseil :</strong> Plus vous êtes précis sur votre besoin (outils utilisés,
            volume de données, fréquence), plus notre réponse sera concrète et adaptée.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="lg:col-span-3">
        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-900/20 p-12 text-center">
            <CheckCircle className="mb-4 h-12 w-12 text-emerald-400" />
            <h3 className="mb-2 text-xl font-bold">Message envoyé !</h3>
            <p className="text-gray-400">On revient vers vous sous 24h.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Nom *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  placeholder="jean@entreprise.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Type de besoin *</label>
              <select
                name="need"
                required
                className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-emerald-500/50"
              >
                <option value="">Sélectionnez...</option>
                <option value="audit">Audit automatisation</option>
                <option value="workflow">Workflow sur mesure</option>
                <option value="leadgen">Lead gen automatisée</option>
                <option value="maintenance">Maintenance & évolution</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Votre challenge *</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="Décrivez votre processus actuel, ce que vous voulez automatiser, les outils que vous utilisez..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
