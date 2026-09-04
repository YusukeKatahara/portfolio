import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 英語版のみのワンページ構成。日本語版は将来 `/ja/` として追加する想定。
export default defineConfig({
  site: 'https://bigdogdig.com',
  integrations: [sitemap()],
});
