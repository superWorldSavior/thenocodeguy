import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'zh-TW', 'zh-CN'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed'
});
