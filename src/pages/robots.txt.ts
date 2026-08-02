import type { APIRoute } from 'astro';

/*
 * Specification demo, not the bakery's public site. Nothing here should be
 * crawled, indexed, or allowed to rank against the owner's real listing.
 *
 * To go public: restore `Allow: /`, re-enable the sitemap integration in
 * astro.config.mjs, and drop the robots meta tags in BaseLayout.astro. Only on
 * the owner's written go-ahead.
 */
export const GET: APIRoute = () =>
  new Response('User-agent: *\nDisallow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
