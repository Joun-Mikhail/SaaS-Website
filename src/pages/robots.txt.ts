import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';

/* Generated rather than static, so the sitemap URL follows whichever host the
   site is built for (GitHub Pages today, breadguy.cz later). */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
