import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bigdogdig.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/dog-lab') })],
  prefetch: { prefetchAll: true },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
