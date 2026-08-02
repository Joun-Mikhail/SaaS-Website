# Bread Guy — brnenská pekárna / a Brno bakery

Statický web pekárny Bread Guy postavený na Astro + Tailwind CSS.
Česky jako výchozí jazyk (`/`), anglicky na `/en/`.

Static website for Bread Guy bakery, built with Astro + Tailwind CSS.
Czech is the default language (`/`), English lives at `/en/`.

---

## Pro obsluhu: jak upravit web / For staff: how to edit the site

Všechno, co se běžně mění — ceny, dostupnost, otevírací doba — je ve dvou
souborech. **Nemusíte umět programovat.** Stačí upravit text a uložit.

Everything you normally need to change — prices, availability, opening hours —
lives in two files. **You don't need to write code.** Just edit the text and save.

| Co chcete změnit / What you want to change | Soubor / File |
| --- | --- |
| Ceny, názvy produktů, vyprodáno | `src/data/products.json` |
| Adresy, telefony, otevírací doba | `src/data/locations.json` |
| Texty webu (nadpisy, tlačítka) | `src/data/i18n.ts` |

> ⚠️ V těchto souborech vždy zachovejte uvozovky `"` a čárky `,` přesně tak,
> jak jsou. Když se jedna smaže, web se nepostaví.
>
> ⚠️ Keep the quotes `"` and commas `,` exactly as they are. Deleting one will
> break the build.

### Označit produkt jako vyprodaný / Mark a product as sold out

Najděte produkt v `src/data/products.json` a přepište `true` na `false`:

```json
"available": false
```

Na kartě se místo zeleného „Dostupné" objeví červené „Vyprodáno".
Až se produkt vrátí, přepište zpět na `true`.

The card switches from a green "Available" badge to a red "Sold out" one.
Change it back to `true` when the product returns.

### Změnit cenu / Change a price

Ceny jsou v korunách, bez `Kč` — to se doplní automaticky.
Prices are in Czech koruna; the `Kč` suffix is added automatically.

Produkty mají jeden ze tří tvarů ceny / Products use one of three price shapes:

```json
"priceWhole": 117, "priceHalf": 59   // celý / půlka — whole / half loaf
"price": 65                          // jedna cena — a single price
"priceFrom": 50, "priceTo": 125      // rozsah — a range
```

Pokud cena zatím není známá, nechte `"price": null` — cena se na kartě
nezobrazí vůbec (lepší než uvést špatnou).

If a price isn't settled yet, leave `"price": null` — the card simply shows no
price, which is better than showing a wrong one.

### Přidat nový produkt / Add a new product

Zkopírujte celý blok `{ ... }` existujícího produktu, vložte ho před poslední
`]` a upravte hodnoty. `id` musí být unikátní, `category` jedna z:
`bread`, `sweets`, `sandwiches`.

Copy a whole `{ ... }` block from an existing product, paste it before the
final `]`, and edit the values. `id` must be unique; `category` must be one of
`bread`, `sweets`, `sandwiches`.

### Fotky produktů / Product photos

Fotky leží v `public/images/products/`. V `products.json` se na ně odkazuje
cestou, např. `"image": "/images/products/bily.jpg"`.

Photos live in `public/images/products/` and are referenced by path.

**Produkty bez vlastní fotky mají `"image": null`** a zobrazí se s decentní
šedou dlaždicí s logem. Je to záměr — raději žádná fotka než fotka jiného
produktu. Až fotku pořídíte, nahrajte ji do složky a doplňte cestu.

**Products without their own photo have `"image": null`** and render a subtle
grey logo tile instead. This is deliberate — no photo beats a photo of a
different product. When you take the real photo, drop it in the folder and fill
in the path.

Momentálně chybí fotky / Currently missing photos: **Double G, Miso, Batch B,
Skořicový šnek.**

Doporučení pro fotky / Photo guidance: poměr stran 4:3, šířka 800 px, JPEG.

### Změnit otevírací dobu / Change opening hours

V `src/data/locations.json`, formát `"08:00–18:00"` (pomlčka je „en dash" –).
Zavřený den zapište jako `null`:

In `src/data/locations.json`, use the format `"08:00–18:00"` (that dash is an
en dash –). Write a closed day as `null`:

```json
"hours": {
  "mon": "08:00–18:00",
  "sat": "08:00–12:00",
  "sun": null
}
```

Web podle toho **sám počítá, jestli je právě otevřeno**, v čase Europe/Prague,
a přepočítává to přímo v prohlížeči návštěvníka — takže údaj platí i dlouho po
nasazení. Nic dalšího není potřeba měnit.

The site **works out whether each branch is open right now** from this, in the
Europe/Prague timezone, and recomputes it in the visitor's browser — so the
badge stays correct long after deploy. Nothing else needs changing.

### Než změnu nasadíte / Before you deploy a change

```bash
npm run validate
```

Zkontroluje, že jsou soubory v pořádku — chybějící čárka, překlep v kategorii,
cena v uvozovkách, odkaz na neexistující fotku, špatný formát otevírací doby.
Stejná kontrola běží automaticky u každého pull requestu.

Checks the content files for a missing comma, a category typo, a quoted price,
a link to a photo that isn't there, or hours in the wrong format. The same check
runs automatically on every pull request.

---

## Pro vývojáře / For developers

```bash
npm install
npm run dev       # http://localhost:4321
npm run validate  # kontrola obsahových souborů
npm test          # testy logiky otevírací doby
npm run build     # -> dist/
npm run preview   # náhled produkčního buildu
```

CI (`.github/workflows/ci.yml`) spouští `validate`, `test` a `build` u každého
pull requestu. / CI runs all three on every pull request.

### Struktura / Structure

```
src/
  data/         products.json, locations.json, i18n.ts,
                hours.ts + hours.test.ts
  components/   Header, Hero, BranchStrip, SellOutBanner, Gallery,
                MenuSection, LocationsSection, AboutSection, Footer
  layouts/      BaseLayout.astro  — meta, OG, hreflang, schema.org
  pages/        index.astro (cs), en/index.astro (en), 404.astro
  styles/       global.css
scripts/        validate-content.mjs
public/         logo.svg, favicon.svg, robots.txt, images/products/
```

### Poznámky / Notes

- **i18n** — cesta určuje jazyk (`/` = cs, `/en/` = en). Každý řetězec je
  v `src/data/i18n.ts` v obou jazycích; komponenty dostávají `locale` propem.
- **Otevírací status** — `src/data/hours.ts` (`getStatus`) je čistá funkce,
  které lze předat čas, takže je testovatelná (`hours.test.ts`). Stav se
  vykreslí při buildu (kvůli SEO a prohlížečům bez JS) a hned po načtení se
  v prohlížeči přepočítá, aby nezastaral. Denní doba i letní/zimní čas se řeší
  přes `Intl.DateTimeFormat`, žádný napevno zapsaný posun.
- **SEO** — `schema.org/Bakery` JSON-LD pro každou pobočku, kanonické URL,
  `hreflang` cs/en/x-default, Open Graph a Twitter karty, sitemap.
- **Přístupnost** — odkaz „Přejít na obsah", viditelné focus stavy,
  `prefers-reduced-motion` zastaví posun galerie, popisné `alt` texty.
- **Nasazení** — push do `main` spustí `.github/workflows/deploy.yml`, který web
  postaví a publikuje na GitHub Pages.
- **Doména a podadresář** — build je hostitelsky nezávislý. `SITE_URL` určuje
  doménu a `BASE_PATH` podadresář (GitHub Pages projekt běží na `/BreadGuy-web`),
  obojí předává deploy workflow automaticky. Odkazy se skládají přes
  `withBase()` v `src/lib/paths.ts`, takže po nasměrování `breadguy.cz` na
  repozitář se nemusí měnit nic v kódu — stačí custom doména v nastavení Pages.
- **Obrázky** — fotky na stránce jsou WebP (o ~28 % menší než původní JPEG);
  náhled pro sdílení na sítích zůstává JPEG, protože ne všechny scrapery
  WebP zvládnou.
- **Bez JS frameworku** — jediný klientský skript obsluhuje mobilní menu
  a filtr kategorií.

### Záměrně mimo rozsah / Deliberately out of scope

Objednávky, platby ani uživatelské účty web neřeší. Cílem je, aby zákazník
zjistil, co je dnes k dispozici, která pobočka má otevřeno, a došel tam.

No ordering, payments, or user accounts. The goal is that a customer can see
what's available, which branch is open, and walk there.
