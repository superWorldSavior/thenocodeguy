import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflows — Automatisation IA",
  description:
    "Découvrez nos workflows d'automatisation IA : veille BOAMP, publication LinkedIn automatique, monitoring serveur et plus.",
  openGraph: {
    title: "Workflows — TheNoCodeGuy",
    description:
      "Workflows d'automatisation IA prêts à l'emploi pour votre entreprise.",
  },
};

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
