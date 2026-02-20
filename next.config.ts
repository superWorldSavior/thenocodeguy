import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/umami/script.js",
        destination: "http://164.132.207.187:3002/script.js",
      },
      {
        source: "/umami/api/send",
        destination: "http://164.132.207.187:3002/api/send",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
