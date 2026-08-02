# Content TODO — unconfirmed, deliberately not published

Everything here is **absent or unchanged on the live site** until the owner
confirms it. Nothing on this list has been guessed into the product data.

Sources: the in-store wall menu and price tags photographed from Instagram
stories (`README-mapping-and-menu-audit.md` in the photo pack), plus owner
statements in the project thread.

---

## 1. 🔴 HIGH — Double G: soy and gluten allergens undeclared

The description is now **owner-confirmed and live**: *"Kváskový chléb s
konfitovaným česnekem a gochujangem."* — confit garlic and gochujang, which
matches the cross-section photo.

Confirming the recipe created a new allergen exposure:

**Gochujang almost always contains soybeans, and most commercial brands contain
wheat or barley malt.** If that holds for the tub this bakery uses, Double G has
**undeclared soy** — and possibly **gluten from a source other than the flour** —
on a live page right now.

`allergens` is deliberately **left empty**. Soy has *not* been declared, because
declaring an allergen from an inference about a product nobody has read the
label on is the same failure this work exists to correct. A wrong or guessed
declaration is worse than an absent one: it invites trust it hasn't earned.

**Action (owner):** read the label on the actual gochujang tub in the bakery and
send the codes. Same for the miso used in Miso Walnut — miso is normally
soy-based too, and only walnuts are declared there.

**Until then:** Double G shows name, photo and price, with no allergen line.

---

## 2. 🔴 HIGH — Allergen codes for every remaining product

Only **Miso Walnut** has an allergen declared (`vlašské ořechy` / `walnuts`), and
even that is a word rather than a numeric code.

**The shop already tracks this.** The price tags carry codes — `A: 1, 3, 7, 11`
was clearly legible on the máslová burgerová bulka. So this is **a walk around
the shop with a phone, not research**: photograph every tag and the names,
prices and allergen codes all come back in one pass.

Every product except Miso Walnut currently has `allergens: null`, which renders
nothing at all rather than implying the product is allergen-free.

**Action (owner):** photograph every price tag, then fill `allergens` for each
product. Confirm with the owner what the numbering maps to before any numeric
code is published — an unverified code is worse than none.

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
