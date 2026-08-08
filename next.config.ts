import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

import type { NextConfig } from "next";

const LOCALE_RE = "fr|en|zh-TW|zh-CN";
const CASYS_BLOG = "https://casys.ai/blog";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy AaaS marketing pages → home (single entity page).
      { source: `/:locale(${LOCALE_RE})/agent-ia`, destination: "/:locale", permanent: true },
      { source: `/:locale(${LOCALE_RE})/a-propos`, destination: "/:locale", permanent: true },
      { source: `/:locale(${LOCALE_RE})/contact`, destination: "/:locale", permanent: true },
      { source: `/:locale(${LOCALE_RE})/workflows/:path*`, destination: "/:locale", permanent: true },
      { source: `/:locale(${LOCALE_RE})/domaines/:path*`, destination: "/:locale", permanent: true },
      // Blog is maintained on casys.ai — funnel the old TNCG blog there.
      { source: `/:locale(${LOCALE_RE})/blog/:path*`, destination: CASYS_BLOG, permanent: true },
      { source: `/:locale(${LOCALE_RE})/blog`, destination: CASYS_BLOG, permanent: true },
      // Legacy non-localized paths
      { source: "/pricing", destination: "/", permanent: true },
      { source: "/agents", destination: "/", permanent: true },
      { source: "/agents/:slug", destination: "/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/lab", destination: CASYS_BLOG, permanent: true },
      { source: "/lab/:slug", destination: CASYS_BLOG, permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/umami/script.js",
        destination: "https://analytics.casys.ai/script.js",
      },
      {
        source: "/umami/api/send",
        destination: "https://analytics.casys.ai/api/send",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
