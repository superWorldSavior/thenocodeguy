import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TheNoCodeGuy — Automatisation IA sur mesure",
    template: "%s | TheNoCodeGuy",
  },
  description:
    "Agence spécialisée en workflows IA agentiques et automatisation no-code. On automatise ce que vous répétez.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
