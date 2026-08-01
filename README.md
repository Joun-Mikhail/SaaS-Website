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

Web podle toho **sám počítá, jestli je právě otevřeno**, v čase Europe/Prague.
Nic dalšího není potřeba měnit.

The site **works out whether each branch is open right now** from this, in the
Europe/Prague timezone. Nothing else needs changing.

---

## Pro vývojáře / For developers

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # náhled produkčního buildu
```

### Struktura / Structure

```
src/
  data/         products.json, locations.json, i18n.ts, hours.ts
  components/   Header, Hero, BranchStrip, SellOutBanner, Gallery,
                MenuSection, LocationsSection, AboutSection, Footer
  layouts/      BaseLayout.astro  — meta, OG, hreflang, schema.org
  pages/        index.astro (cs), en/index.astro (en)
  styles/       global.css
public/         logo.svg, favicon.svg, images/products/
```

### Poznámky / Notes

- **i18n** — cesta určuje jazyk (`/` = cs, `/en/` = en). Každý řetězec je
  v `src/data/i18n.ts` v obou jazycích; komponenty dostávají `locale` propem.
- **Otevírací status** — `src/data/hours.ts` (`getStatus`) počítá stav v zóně
  Europe/Prague. Renderuje se při buildu, takže po delší době je vhodné web
  přestavět (nasazení přes CI při každém pushi to řeší samo).
- **SEO** — `schema.org/Bakery` JSON-LD pro každou pobočku, kanonické URL,
  `hreflang` cs/en/x-default, Open Graph a Twitter karty, sitemap.
- **Přístupnost** — odkaz „Přejít na obsah", viditelné focus stavy,
  `prefers-reduced-motion` zastaví posun galerie, popisné `alt` texty.
- **Doména** — `astro.config.mjs` má nastaveno `site: 'https://breadguy.cz'`;
  při změně domény upravte i konstantu `SITE` v `src/layouts/BaseLayout.astro`.
- **Bez JS frameworku** — jediný klientský skript obsluhuje mobilní menu
  a filtr kategorií.

### Záměrně mimo rozsah / Deliberately out of scope

Objednávky, platby ani uživatelské účty web neřeší. Cílem je, aby zákazník
zjistil, co je dnes k dispozici, která pobočka má otevřeno, a došel tam.

No ordering, payments, or user accounts. The goal is that a customer can see
what's available, which branch is open, and walk there.
