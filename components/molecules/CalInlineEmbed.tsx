"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
});

const calLinks: Record<string, string> = {
  fr: "thenocodeguy/decouverte",
  en: "thenocodeguy/discovery-call",
  "zh-TW": "thenocodeguy/discovery-call-zh-tw",
  "zh-CN": "thenocodeguy/discovery-call-zh-cn",
};

export default function CalInlineEmbed() {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const calLink = calLinks[locale] || calLinks.fr;
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <Cal
      namespace="inline"
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "auto", minHeight: "600px" }}
      config={{
        theme,
        layout: "month_view" as const,
        ...(typeof window !== "undefined" && {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      }}
    />
  );
}
