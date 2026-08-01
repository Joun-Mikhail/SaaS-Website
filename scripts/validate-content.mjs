/*
 * Checks the hand-edited content files for the mistakes that actually happen
 * when someone updates prices or hours: a category typo (the product silently
 * vanishes from the menu filters), an image path pointing at a file that isn't
 * there (broken picture on the live site), or opening hours in a shape the
 * open/closed logic can't read (branch shows as closed all day).
 *
 * Run with: npm run validate
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (message) => errors.push(message);

function readJson(relPath) {
  try {
    return JSON.parse(readFileSync(join(root, relPath), 'utf8'));
  } catch (err) {
    fail(`${relPath} is not valid JSON — ${err.message}`);
    return null;
  }
}

const VALID_CATEGORIES = new Set(['bread', 'sweets', 'sandwiches']);
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const HOURS_PATTERN = /^\d{1,2}:\d{2}[–—-]\d{1,2}:\d{2}$/;

const products = readJson('src/data/products.json');
if (Array.isArray(products)) {
  const seenIds = new Set();

  products.forEach((product, index) => {
    const where = `products.json[${index}] (${product?.id ?? 'no id'})`;

    if (!product.id) fail(`${where}: missing "id"`);
    else if (seenIds.has(product.id)) fail(`${where}: duplicate id "${product.id}"`);
    else seenIds.add(product.id);

    for (const locale of ['cs', 'en']) {
      if (!product.name?.[locale]) fail(`${where}: missing name.${locale}`);
      if (!product.description?.[locale]) fail(`${where}: missing description.${locale}`);
    }

    if (!VALID_CATEGORIES.has(product.category)) {
      fail(
        `${where}: category "${product.category}" is not one of ` +
          `${[...VALID_CATEGORIES].join(', ')} — the product would disappear from the filters`
      );
    }

    if (typeof product.available !== 'boolean') {
      fail(`${where}: "available" must be true or false`);
    }

    // A product carries exactly one price shape, or none at all yet.
    const shapes = [
      product.priceWhole != null || product.priceHalf != null,
      product.priceFrom != null || product.priceTo != null,
      product.price != null,
    ].filter(Boolean).length;
    if (shapes > 1) fail(`${where}: mixes more than one price shape`);

    if ((product.priceWhole == null) !== (product.priceHalf == null)) {
      fail(`${where}: priceWhole and priceHalf must be set together`);
    }
    if ((product.priceFrom == null) !== (product.priceTo == null)) {
      fail(`${where}: priceFrom and priceTo must be set together`);
    }
    if (product.priceFrom != null && product.priceTo != null && product.priceFrom >= product.priceTo) {
      fail(`${where}: priceFrom must be lower than priceTo`);
    }

    for (const [key, value] of Object.entries(product)) {
      if (key.startsWith('price') && value != null && (typeof value !== 'number' || value <= 0)) {
        fail(`${where}: "${key}" must be a positive number (no "Kč", no quotes)`);
      }
    }

    if (product.image != null) {
      if (typeof product.image !== 'string' || !product.image.startsWith('/images/')) {
        fail(`${where}: image should be a path like "/images/products/name.jpg", or null`);
      } else if (!existsSync(join(root, 'public', product.image))) {
        fail(`${where}: image "${product.image}" does not exist in public/`);
      }
    }
  });
}

const locations = readJson('src/data/locations.json');
if (Array.isArray(locations)) {
  if (locations.length === 0) fail('locations.json: at least one branch is required');

  locations.forEach((loc, index) => {
    const where = `locations.json[${index}] (${loc?.id ?? 'no id'})`;

    if (!loc.address) fail(`${where}: missing address`);
    if (!loc.mapsUrl) fail(`${where}: missing mapsUrl`);
    for (const locale of ['cs', 'en']) {
      if (!loc.label?.[locale]) fail(`${where}: missing label.${locale}`);
      if (!loc.name?.[locale]) fail(`${where}: missing name.${locale}`);
    }

    if (loc.phone != null && !/^\+\d[\d ]*$/.test(loc.phone)) {
      fail(`${where}: phone must be in international form, e.g. "+420601539515"`);
    }

    for (const day of DAY_KEYS) {
      if (!(day in (loc.hours ?? {}))) {
        fail(`${where}: hours is missing "${day}"`);
        continue;
      }
      const value = loc.hours[day];
      if (value === null) continue;
      if (typeof value !== 'string' || !HOURS_PATTERN.test(value)) {
        fail(`${where}: hours.${day} = ${JSON.stringify(value)} — expected "08:00–18:00" or null`);
        continue;
      }
      const [open, close] = value.split(/[–—-]/);
      const toMinutes = (t) => Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]);
      if (toMinutes(close) <= toMinutes(open)) {
        fail(`${where}: hours.${day} closes at or before it opens`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error(`\nContent validation failed with ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  • ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Content files look good.');
