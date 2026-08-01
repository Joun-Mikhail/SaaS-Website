import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/*
 * Host is configurable so the same build works on GitHub Pages today and on
 * breadguy.cz once the domain points at it:
 *   SITE_URL  — origin, e.g. https://breadguy.cz
 *   BASE_PATH — subpath, e.g. /SaaS-Website (leave unset when served at root)
 */
const site = process.env.SITE_URL ?? 'https://breadguy.cz';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [tailwind(), sitemap()],
});
