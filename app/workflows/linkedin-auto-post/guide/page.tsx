import type { Metadata } from "next";
import Link from "next/link";
import { Linkedin, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide : LinkedIn Auto-Post — TheNoCodeGuy",
  description: "Architecture et templates du workflow de publication LinkedIn automatisée.",
  robots: { index: false },
};

const templates = [
  {
    id: "insight",
    label: "Insight technique",
    example: "J'ai testé [OUTIL] pendant 3 mois. Voici ce que personne ne dit : [OBSERVATION]. Le vrai problème avec [OUTIL], c'est [PROBLÈME]. La solution qu'on a trouvée : [SOLUTION]. Résultat : [MÉTRIQUE].",
  },
  {
    id: "mistake",
    label: "Erreur + leçon",
    example: "Erreur que j'ai faite la semaine dernière : [ERREUR]. Ce que ça m'a coûté : [COÛT]. Ce que j'aurais dû faire : [SOLUTION]. À retenir pour votre prochain projet d'automatisation.",
  },
  {
    id: "tool_review",
    label: "Revue d'outil",
    example: "Après 6 mois avec [OUTIL], voici mon verdict honnête. ✅ Ce qui marche vraiment : [POINTS_POSITIFS]. ❌ Ce qui m'a déçu : [POINTS_NÉGATIFS]. Pour qui c'est fait : [PROFIL].",
  },
  {
    id: "workflow_reveal",
    label: "Révélation de workflow",
    example: "Mon workflow exact pour [TÂCHE] (que je faisais manuellement en [DURÉE_AVANT]) : Étape 1 : [ÉTAPE1] — Étape 2 : [ÉTAPE2] — Étape 3 : [ÉTAPE3]. Maintenant : [DURÉE_APRÈS].",
  },
  {
    id: "contrarian",
    label: "Opinion à contre-courant",
    example: "Opinion impopulaire : [OUTIL_POPULAIRE] est surcoté pour [CAS_USAGE]. Pourquoi les gens le choisissent quand même : [RAISON]. Ce que j'utilise à la place : [ALTERNATIVE].",
  },
  {
    id: "client_story",
    label: "Cas client",
    example: "Un client m'a appelé la semaine dernière. Il perdait [DURÉE] par semaine sur [TÂCHE]. En [DÉLAI], on a automatisé ça. Résultat : [ÉCONOMIE] économisées par an. Comment : [SOLUTION_COURTE].",
  },
];

export default function LinkedinGuidePage() {
  return (
    <main className="min-h-screen bg-gray-950 py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/workflows"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400 print:hidden"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux workflows
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Linkedin className="h-6 w-6 text-purple-400" />
            </div>
            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              Windmill · LinkedIn API · Templates
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white print:text-black sm:text-4xl">
            LinkedIn Auto-Post
          </h1>
          <p className="text-lg text-gray-400 print:text-gray-700">
            6 templates de posts experts, planification hebdomadaire, rotation automatique.
            Votre personal branding tourne pendant que vous travaillez.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Architecture</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 print:border-gray-300 print:bg-gray-50">
            <div className="flex flex-col gap-3">
              {[
                { step: "1", title: "Cron Windmill (lundi / mercredi / vendredi 09:00)", desc: "3 posts par semaine — rythme optimal pour l'algorithme LinkedIn" },
                { step: "2", title: "Sélection du template", desc: "Rotation cyclique sur les 6 templates pour varier les formats" },
                { step: "3", title: "Personnalisation dynamique", desc: "Variables remplacées par des données contextuelles configurables" },
                { step: "4", title: "Mode dry-run (optionnel)", desc: "Simulation sans publication pour valider le contenu avant activation" },
                { step: "5", title: "Publication via LinkedIn API", desc: "Post créé avec le token d'accès configuré dans les ressources Windmill" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-sm font-bold text-purple-400">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-white print:text-black">{s.title}</div>
                    <div className="text-sm text-gray-400 print:text-gray-600">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">
            Les 6 templates inclus
          </h2>
          <div className="space-y-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-xl border border-white/5 bg-gray-900/60 p-5 print:border-gray-200"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-300">
                    {tpl.label}
                  </span>
                </div>
                <p className="text-sm italic text-gray-400 print:text-gray-600">
                  &ldquo;{tpl.example}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Script principal (TypeScript/Bun)</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900 p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-4 w-4" />
              <span>windmill · f/openclaw/linkedin_post</span>
            </div>
            <pre className="overflow-x-auto text-sm text-gray-300 print:text-gray-800">
{`export async function main(
  li_at: string,        // Cookie LinkedIn li_at
  person_urn: string,   // urn:li:person:VOTRE_ID
  template_index: number = -1,  // -1 = auto-rotation
  dry_run: boolean = true
) {
  const TEMPLATES = [
    "Insight technique", "Erreur + leçon",
    "Revue d'outil", "Révélation de workflow",
    "Opinion à contre-courant", "Cas client"
  ];
  
  // Auto-rotation basée sur le jour de la semaine
  const idx = template_index >= 0
    ? template_index
    : new Date().getDay() % TEMPLATES.length;
  
  const content = buildContent(TEMPLATES[idx]);
  
  if (dry_run) {
    console.log("DRY RUN — Post qui serait publié :");
    console.log(content);
    return { published: false, content, template: TEMPLATES[idx] };
  }
  
  // Publication via LinkedIn API
  const response = await fetch(
    "https://api.linkedin.com/v2/ugcPosts",
    {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${li_at}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: person_urn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: content },
            shareMediaCategory: "NONE"
          }
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
      })
    }
  );
  
  return { published: response.ok, status: response.status };
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Prérequis</h2>
          <ul className="space-y-3">
            {[
              "Windmill self-hosted ou Cloud",
              "Cookie li_at LinkedIn (récupérable dans Chrome DevTools)",
              "Votre LinkedIn Person URN (visible dans l'URL de votre profil)",
              "Compte LinkedIn actif — profil à jour avec photo et titre",
            ].map((req) => (
              <li key={req} className="flex items-start gap-3 text-gray-300 print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center print:hidden">
          <p className="mb-2 text-lg font-semibold text-white">
            Votre LinkedIn en pilote automatique
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Je configure ce workflow pour vous et adapte les templates à votre secteur et
            votre voix — prêt en une demi-journée.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer un projet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
