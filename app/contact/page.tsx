import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Décrivez votre challenge d'automatisation. On répond sous 24h avec une proposition concrète.",
  openGraph: {
    title: "Contact | TheNoCodeGuy",
    description: "Décrivez votre challenge. On répond sous 24h.",
  },
};

export default function ContactPage() {
  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Parlons de votre projet</h1>
          <p className="text-gray-400">
            Décrivez votre challenge. On répond sous 24h avec une proposition concrète.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
