/*
 * Generates the responsive sizes the site actually serves.
 *
 * The source photographs are 1000–1600px on the long edge, which is the right
 * size to keep as a master and the wrong size to send to a phone. Lighthouse
 * measured 424 KB of waste on the old build from shipping 800px files into
 * 378px slots.
 *
 * Run with: npm run images
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'assets/breadguy-photos');
const out = join(root, 'public/images');

/* Which photograph belongs to which product is recorded in
   assets/breadguy-photos/README-mapping-and-menu-audit.md. Only owner-confirmed
   pairings are here — the two pale loaves are deliberately absent because
   nobody has said which is Bílý and which is Mišenec. */
const PRODUCTS = [
  'double-g-rez',
  'miso-walnut-rez',
  'makovy-uzlik-tray',
  'sendvic-rez-a',
  'focaccia-olive-tomato-herbs',
  'hero-focaccia-sandwich',
];

/* Overhead full-frame shots. No cutout exists for these — a model with no
   background to remove carves a hole in the middle — so they are used
   edge to edge. See DECISIONS.md. */
const FULL = ['focaccia-prosciutto-rukola', 'tiramisu-babka-tray'];

const WIDTHS = { products: [400, 800], cutouts: [320, 640], full: [800, 1600] };

async function emit(file, dir, widths, from = src) {
  const name = basename(file, '.webp');
  mkdirSync(join(out, dir), { recursive: true });
  for (const w of widths) {
    const target = join(out, dir, `${name}-${w}.webp`);
    const meta = await sharp(join(from, file)).metadata();
    await sharp(join(from, file))
      // never upscale: a 900px master stays 900px in the "1600" slot
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(target);
  }
}

for (const p of PRODUCTS) await emit(`${p}.webp`, 'products', WIDTHS.products);
for (const f of FULL) await emit(`${f}.webp`, 'full', WIDTHS.full);

const cutSrc = join(src, 'cutouts');
if (existsSync(cutSrc)) {
  for (const f of readdirSync(cutSrc).filter((x) => x.endsWith('.webp'))) {
    await emit(f, 'cutouts', WIDTHS.cutouts, cutSrc);
  }
}

console.log('responsive images written to public/images/');
