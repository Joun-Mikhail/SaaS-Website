# Jak upravit web — návod pro obsluhu

Tenhle návod je pro člověka, který **neumí programovat**. Nepotřebujete nic
instalovat. Všechno se dá změnit přímo na GitHubu v prohlížeči.

Co se dá měnit bez programátora:

| Chci změnit | Soubor |
| --- | --- |
| Cenu, název produktu, „vyprodáno" | `src/data/products.json` |
| Adresu, telefon, otevírací dobu | `src/data/locations.json` |
| Texty webu (nadpisy, tlačítka) | `src/data/i18n.ts` |
| Fotky | složka `public/images/products/` |

---

## Než začnete — tři pravidla

1. **Uvozovky `"` a čárky `,` musí zůstat přesně tak, jak jsou.** Když jednu
   smažete, web se nepostaví a změna se neprojeví.
2. **Ceny se píšou jen číslem.** Správně `117`. Špatně `"117"`, `117 Kč`, `117,-`.
   Slovo „Kč" se na web doplní samo.
3. **Když si nejste jistí, nic nevymýšlejte.** Prázdné je lepší než špatné.
   Špatná cena nebo špatná otevírací doba naštve zákazníka víc než chybějící údaj.

---

## Postup krok za krokem (platí pro každou změnu)

1. Otevřete repozitář na GitHubu.
2. Klikněte na soubor, který chcete upravit (podle tabulky nahoře).
3. Vpravo nahoře klikněte na ikonu **tužky** (Edit this file).
4. Upravte text.
5. Dole klikněte na zelené tlačítko **Commit changes**.
6. Do políčka napište krátce, co jste změnili — např. `Bílý nová cena`.
7. Potvrďte **Commit changes**.

Web se sám znovu postaví a za 1–2 minuty je změna online.

> Kontrola proběhne automaticky. Když uděláte překlep (chybí čárka, cena
> v uvozovkách, kategorie s překlepem), **změna se nenasadí** a u commitu se
> objeví červený křížek ❌. Web zůstane v pořádku tak, jak byl. Opravte překlep
> a commitněte znovu.

---

## Označit produkt jako vyprodaný

V `src/data/products.json` najděte produkt a přepište `true` na `false`:

```json
"available": false
```

Na kartě se místo zeleného **Dostupné** objeví červené **Vyprodáno**.
Až se produkt vrátí, přepište zpět na `true`.

---

## Změnit cenu

Ceny jsou v korunách, jen číslo. Produkt má jeden ze tří tvarů:

```json
"priceWhole": 117, "priceHalf": 59      celý bochník / půlka
"price": 65                             jedna cena
"priceFrom": 50, "priceTo": 125         rozsah (od–do)
```

Pokud cena zatím není daná, nechte `"price": null` — na kartě se pak
nezobrazí žádná cena. To je v pořádku a je to lepší než hádat.

---

## Přidat nový produkt

Zkopírujte celý blok od `{` po `},` u existujícího produktu, vložte ho pod něj
a upravte hodnoty.

- `id` musí být jedinečné (nesmí se opakovat), bez mezer a diakritiky
- `category` musí být přesně jedno z: `bread`, `sweets`, `sandwiches`
- `name` a `description` vyplňte v `cs` i `en`

```json
{
  "id": "novy-chleb",
  "name": { "cs": "Nový chléb", "en": "New Bread" },
  "category": "bread",
  "description": { "cs": "Popis česky", "en": "Description in English" },
  "price": 120,
  "image": null,
  "available": true
}
```

---

## Fotky

Fotky leží ve složce `public/images/products/`. V `products.json` se na ně
odkazuje cestou:

```json
"image": "/images/products/bily.webp"
```

**Produkt bez vlastní fotky má `"image": null`** a zobrazí se decentní šedá
dlaždice s logem. Je to schválně — raději žádná fotka než fotka jiného
produktu. Zákazník si pak objedná něco jiného, než čekal.

Zatím chybí fotka u: **Double G, Miso, Batch B, Skořicový šnek.**

Když fotku pořídíte: nahrajte ji do složky (tlačítko *Add file → Upload files*)
a v `products.json` doplňte cestu místo `null`. Nejlépe poměr stran 4:3.

---

## Změnit otevírací dobu

V `src/data/locations.json`. Formát je `"08:00–18:00"`. Zavřený den se píše
`null` (bez uvozovek):

```json
"hours": {
  "mon": "08:00–18:00",
  "tue": "08:00–18:00",
  "wed": "08:00–18:00",
  "thu": "08:00–18:00",
  "fri": "08:00–18:00",
  "sat": "08:00–12:00",
  "sun": null
}
```

Web z toho **sám pozná, jestli je zrovna otevřeno**, a ukáže to zákazníkovi
zeleným nebo červeným puntíkem. Počítá se to v prohlížeči návštěvníka, takže
údaj platí i dlouho po nasazení. Nic dalšího nastavovat nemusíte.

---

## Změnit text na webu

Všechny texty (nadpisy, tlačítka, popisky) jsou v `src/data/i18n.ts`.
Každý text je dvakrát — jednou v české sekci (`cs:`), jednou v anglické (`en:`).
Měňte jen text mezi apostrofy `'...'`.

---

## Když se něco pokazí

Nic není nevratné. Každá změna je uložená v historii.

1. Otevřete soubor na GitHubu → **History**.
2. Najděte verzi před vaší změnou.
3. Klikněte na `...` → **Revert** (nebo si zkopírujte starý obsah zpátky).

Web mezitím běží dál v poslední funkční verzi.
