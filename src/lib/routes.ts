/*
 * Route table. Czech slugs are canonical; English lives under /en/ with its own
 * slugs so an English URL reads as English.
 *
 * Every internal link goes through `route()` so the language switch can map a
 * page to its counterpart without string surgery at the call site.
 */
import { withBase } from './paths';
import type { Locale } from '../data/i18n';

export type PageKey = 'home' | 'menu' | 'product' | 'locations' | 'about' | 'order';

const SLUGS: Record<PageKey, Record<Locale, string>> = {
  home: { cs: '/', en: '/en/' },
  menu: { cs: '/nabidka/', en: '/en/menu/' },
  product: { cs: '/nabidka/', en: '/en/menu/' },
  locations: { cs: '/pobocky/', en: '/en/locations/' },
  about: { cs: '/o-nas/', en: '/en/about/' },
  order: { cs: '/objednavka/', en: '/en/order/' },
};

/** Public URL for a page, base path included. */
export function route(key: PageKey, locale: Locale, slug?: string): string {
  const base = SLUGS[key][locale];
  return withBase(slug ? `${base}${slug}/` : base);
}

/** The same page in the other language. */
export function alternate(key: PageKey, locale: Locale, slug?: string): string {
  return route(key, locale === 'cs' ? 'en' : 'cs', slug);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'cs' ? 'en' : 'cs';
}
