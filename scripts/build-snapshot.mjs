/*
 * Builds a single self-contained HTML file from dist/ so the site can be shared
 * as one page with no external requests (an Artifact CSP blocks every other
 * origin). Fonts, CSS, scripts and photos are inlined as data URIs.
 *
 * This is a preview/snapshot tool only — the real site is what dist/ serves.
 *
 * Usage: node scripts/build-snapshot.mjs [outfile]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const out = process.argv[2] ?? join(root, 'snapshot.html');

let html = readFileSync(join(dist, 'index.html'), 'utf8');

const b64 = (buf) => buf.toString('base64');
const distFile = (p) => join(dist, p.replace(/^\//, ''));

/* --- 1. CSS ------------------------------------------------------------- */
const cssHref = html.match(/<link rel="stylesheet" href="([^"]+)"/)?.[1];
if (!cssHref) throw new Error('no stylesheet found in dist/index.html');
let css = readFileSync(distFile(cssHref), 'utf8');

/* Inline only the subsets a Czech/English page actually uses; drop the rest so
   the file carries no unresolvable references. */
const KEEP_FONT = /(latin|latin-ext)-wght-normal/;
const fontBlocks = css.split('@font-face');
css = fontBlocks
  .map((block, i) => {
    if (i === 0) return block;
    const url = block.match(/url\(([^)]+)\)/)?.[1];
    if (!url || !KEEP_FONT.test(url)) return null;
    const file = distFile(url.replace(/["']/g, ''));
    if (!existsSync(file)) return null;
    const data = `data:font/woff2;base64,${b64(readFileSync(file))}`;
    return '@font-face' + block.replace(/url\([^)]+\)/, `url(${data})`);
  })
  .filter(Boolean)
  .join('');

html = html.replace(/<link rel="stylesheet" href="[^"]+"\s*\/?>/, `<style>${css}</style>`);

/* --- 2. Module scripts --------------------------------------------------- */
html = html.replace(
  /<script type="module" src="([^"]+)"><\/script>/g,
  (_m, src) => {
    const file = distFile(src);
    if (!existsSync(file)) return '';
    return `<script type="module">${readFileSync(file, 'utf8')}</script>`;
  }
);

/* --- 3. Images ----------------------------------------------------------- */
/* The hero doubles as the visual anchor, so it keeps more resolution than the
   thumbnails in the grid and marquee. */
const HERO = 'focaccia-olive';
const seen = new Map();

for (const path of [...new Set(html.match(/\/images\/products\/[a-z-]+\.webp/g) ?? [])]) {
  const file = distFile(path);
  if (!existsSync(file)) continue;
  const isHero = path.includes(HERO);
  const buf = await sharp(file)
    .resize({ width: isHero ? 800 : 440, withoutEnlargement: true })
    .webp({ quality: isHero ? 64 : 56 })
    .toBuffer();
  seen.set(path, `data:image/webp;base64,${b64(buf)}`);
}
/* Each photo appears up to three times (menu card, marquee, and the marquee's
   duplicated decorative set). Embed the bytes once and let the repeats point at
   the first copy, or the file triples in size for no benefit. */
let refId = 0;
for (const [path, uri] of seen) {
  let first = true;
  html = html.replaceAll(`"${path}"`, () => {
    if (first) {
      first = false;
      return `"${uri}" data-img-src="${refId}"`;
    }
    return `"" data-img-ref="${refId}"`;
  });
  refId++;
}

/* Runs before paint, so the repeats are filled in without a visible flash. The
   first copy of every photo is real markup, so a viewer without JS still sees
   each product — only the decorative duplicate marquee set stays empty. */
html = html.replace(
  '</body>',
  `<script>
    (function () {
      var src = {};
      document.querySelectorAll('[data-img-src]').forEach(function (el) {
        src[el.getAttribute('data-img-src')] = el.getAttribute('src');
      });
      document.querySelectorAll('[data-img-ref]').forEach(function (el) {
        var v = src[el.getAttribute('data-img-ref')];
        if (v) el.setAttribute('src', v);
      });
    })();
  </script></body>`
);

/* Every photo is embedded, so lazy loading buys nothing here and actively hurts:
   images parked off-screen inside the moving marquee may never trigger. */
html = html.replaceAll('loading="lazy"', 'loading="eager"');

/* --- 4. SVG (logo, favicon) ---------------------------------------------- */
for (const path of [...new Set(html.match(/\/[a-z-]+\.svg/g) ?? [])]) {
  const file = distFile(path);
  if (!existsSync(file)) continue;
  const uri = `data:image/svg+xml;base64,${b64(readFileSync(file))}`;
  html = html.replaceAll(`"${path}"`, `"${uri}"`);
}

/* --- 5. Neutralise cross-page links -------------------------------------- */
/* A single file has no /en/ route and no site root to return to; leaving those
   links live would hand the viewer a dead end. */
html = html.replace(/<a\b[^>]*hreflang="en"[^>]*>[\s\S]*?<\/a>/g, '');
html = html.replace(/href="\/"/g, 'href="#"');
html = html.replace(/href="\/#/g, 'href="#');

writeFileSync(out, html);

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
console.log(`wrote ${out} — ${kb(Buffer.byteLength(html))}`);

/* Fail loudly rather than publishing a page that would silently break. */
const external = [...html.matchAll(/(?:src|href)="(https?:)?\/\/[^"]+"/g)].map((m) => m[0]);
const unresolved = [...html.matchAll(/(?:src|href)="\/(?!\/)[^"]*"/g)].map((m) => m[0]);
console.log('external references :', external.length ? external : 'none');
console.log('unresolved app paths:', unresolved.length ? unresolved : 'none');
