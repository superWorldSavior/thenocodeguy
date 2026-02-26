"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";

const calLinks: Record<string, string> = {
  fr: "thenocodeguy/decouverte",
  en: "thenocodeguy/discovery-call",
  "zh-TW": "thenocodeguy/discovery-call-zh-tw",
  "zh-CN": "thenocodeguy/discovery-call-zh-cn",
};

interface CalPopupButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalPopupButton({
  children,
  className,
}: CalPopupButtonProps) {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const calLink = calLinks[locale] || calLinks.fr;
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "popup" });
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [theme]);

  return (
    <button
      data-cal-namespace="popup"
      data-cal-link={calLink}
      data-cal-config={`{"layout":"month_view","theme":"${theme}"}`}
      className={className}
    >
      {children}
    </button>
  );
}
