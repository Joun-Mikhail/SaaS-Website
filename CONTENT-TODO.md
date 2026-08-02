# Content TODO — unconfirmed, deliberately not published

Everything here is **absent or unchanged on the live site** until the owner
confirms it. Nothing on this list has been guessed into the product data.

Sources: the in-store wall menu and price tags photographed from Instagram
stories (`README-mapping-and-menu-audit.md` in the photo pack), plus owner
statements in the project thread.

---

## 1. Double G — what are the two G's?

The description **"Dvojitě kynutý kváskový chléb"** (double-*risen*) has been
**removed**. The cross-section photo shows whole confit garlic cloves and a
heavy orange swirl, which is not what a double-risen plain sourdough looks
like, so the old text was wrong.

**The description is now empty. No replacement has been written.**

⚠️ **Conflicting statements on record — needs settling:**

| When | What was said |
| --- | --- |
| Earlier in the thread | *"first photo is double G ( conflict garlic and gochujang)"* |
| Latest instruction | *"I don't know what the two G's are yet and neither do you — do not write a replacement"* |

The latest instruction is what has been followed. If confit garlic + gochujang
is in fact confirmed, the description can be written in one line.

**Allergen consequence:** if the second G is a cheese, **milk** is undeclared.
If it is gochujang, that is normally soy-based and often contains wheat, so
**soy** would be declarable. `allergens` is `null` until this is answered.

---

## 2. Allergen codes for every other product

Only **Miso Walnut** has an allergen declared. It is written as a word
(`vlašské ořechy` / `walnuts`), **not** as a numeric code: the shop's price
tags use codes such as `A: 1, 3, 7, 11`, but that numbering has not been
verified against the products, and publishing a wrong code is worse than
publishing none.

Every other product has `allergens: null` — the field renders nothing rather
than implying the product is allergen-free.

**Action:** photograph every price tag, then fill `allergens` for each product.
Confirm the legal obligation for unpackaged bakery goods with the owner.

Note: **miso is normally soy-based**, so Miso Walnut may need soy declared in
addition to walnuts. Not added without confirmation.

---

## 3. Batch B — does it still exist?

Listed on the site at **65 Kč**, but it appears on **no** wall menu and **no**
price tag anywhere in the photographs.

Left on the site unchanged, because "probably discontinued" is not a fact.

**Action:** confirm whether Batch B still exists. If not, delete it.

---

## 4. Focaccia price does not match the shop

| Source | Price |
| --- | --- |
| The site | **50–125 Kč (od)** |
| Observed price tags | **55 Kč** plain · **75 Kč** s rajčaty · **75 Kč** s konfitovaným česnekem |

The range on the site matches nothing seen in the shop and predates any owner
confirmation. It is **unchanged pending confirmation** rather than corrected to
a guess.

The tags distinguishing variants suggests focaccia should probably be several
products rather than one price range.

**Action:** confirm the real focaccia pricing and whether to split the product.

---

## 5. Two breads missing from the site entirely

The bread menu on the shop wall reads:

**MIŠENEC · DOUBLE G · BÍLÝ CHLÉB · MISO WALNUT · ŽITNÝ · TOUSŤÁK**

| Missing | Needs before it can be added |
| --- | --- |
| **Žitný** (rye) | price, description, allergens, photo |
| **Tousťák** (toast loaf) | price, description, allergens, photo |

**Not added** — no confirmed price or description exists for either.

---

## 6. Other products seen with price tags, none on the site

Not added: prices are visible but descriptions and allergens are not confirmed.

| Product | Price seen |
| --- | --- |
| Loupáček | 33 Kč |
| Máslová burgerová bulka | 28 Kč (tag shows `A: 1, 3, 7, 11`) |
| Focaccia (plain) | 55 Kč |
| Focaccia s rajčaty | 75 Kč |
| Focaccia s konfitovaným česnekem | 75 Kč |
| Pizza koláč se šunkou | 80 Kč |
| Borůvkový koláč s tvarohem | 55 / 100 Kč |
| Jablečný řez s karamelem a pekany | 95 Kč |
| Formaggi (tag partly obscured) | 80 Kč |

Photographed but unpriced: koláčky, makový koláč s pečenou švestkou a mandlovou
drobenkou, makovo-citronový chlebík, Uganda banana bread, mák & švestka žitný
chlebík.

---

## 7. Carried over, still unverified

- **Third location.** An earlier brief mentioned a **Breadbar bistro on
  Josefská**. The site has two locations. Not added.
- **Invented copy still live:** the hero subtitle *"Poctivé suroviny, ruční
  práce…"*, the badge *"Pečeme každé ráno"*, and the whole About paragraph were
  written without owner input.
- **`A Brno Bakery`** is an English string rendering in the Czech footer.
- Descriptions for **Bílý, Mišenec, Batch B** were inferred from product names,
  never confirmed.
- **IČO / DIČ** missing from the footer.
- Rating **4.6 / 106 reviews**, both addresses, the phone number and all opening
  hours came from an early session and have never been owner-verified.
- **Skořicový šnek** has no photo.
