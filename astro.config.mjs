import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

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
  /* No sitemap while this is a demo: robots.txt disallows everything, and
     publishing a sitemap alongside that just hands crawlers a list of the URLs
     they have been told not to fetch. Re-add sitemap() when the site goes
     public. */
  integrations: [tailwind()],
});
