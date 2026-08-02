/*
 * The site can be served from the root of a domain (breadguy.cz) or from a
 * subpath (a GitHub Pages project site lives at /BreadGuy-web/). Internal links
 * are written as root-relative routes — "/", "/en/", "/#nabidka" — and passed
 * through withBase() so they resolve correctly either way.
 */

/** Configured base, without a trailing slash: "" at the root, "/BreadGuy-web" otherwise. */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative route or asset path with the deployment base. */
export function withBase(path: string): string {
  if (/^([a-z]+:|\/\/|#|mailto:|tel:)/i.test(path)) return path;
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Strip the base off a real URL pathname, giving the route the page thinks in.
 * "/BreadGuy-web/en/" -> "/en/"
 */
export function toRoute(pathname: string): string {
  const route = BASE_PATH && pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  return route || '/';
}
