import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("workflows");
  return {
    title: t("metaTitle"),
    description: t("pageSubtitle"),
    openGraph: {
      title: t("metaTitle"),
      description: t("pageSubtitle"),
    },
  };
}

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
