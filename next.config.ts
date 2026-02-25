import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/agents",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agents/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/lab/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
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
