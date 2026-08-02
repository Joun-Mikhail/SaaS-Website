# Content TODO — unconfirmed, deliberately not published

This build is a **specification demo** shown to the bakery owner. It is
`noindex, nofollow` with `Disallow: /` in robots.txt, so nothing here competes
with the bakery's real listing in search.

Two rules govern this file:

1. **Nothing on this list is guessed into the product data.** Empty and flagged
   beats wrong and confident.
2. **Allergens are never inferred from an ingredient name.** Not soy from miso,
   not soy or wheat from gochujang, however likely. An allergen is published
   when someone has read the label, and not before.

Sources: the in-store wall menu and price tags photographed from Instagram
stories (`README-mapping-and-menu-audit.md` in the photo pack), plus owner
statements in the project thread.

---

## 1. 🔴 HIGH — Hours, addresses and phone are not owner-verified

Both addresses, the phone number and every opening hour on the site came from
an early session and have **never been confirmed in writing by the owner**.
They are also asserted in JSON-LD `openingHoursSpecification`.

They stay on the site as-is — they are the best information available and the
site is behind `noindex` — but they are the highest-value correction on this
list. Wrong hours on the owner's phone ends the pitch.

**Action (owner):** confirm in writing. Until then this line stays.

---

## 2. 🔴 HIGH — Allergen codes for every product

Only **Miso Walnut** carries a declared allergen (`vlašské ořechy` / `walnuts`),
and that one is owner-confirmed. Every other product is `allergens: null`, which
renders nothing at all rather than implying the product is allergen-free.

Two specific exposures, both known and both deliberately undeclared:

| Product | Suspected, not declared |
| --- | --- |
| **Double G** | Gochujang is normally soy-based and commonly contains wheat or barley malt |
| **Miso Walnut** | Miso is normally soy-based; only walnuts are declared |

These are inferences about tubs nobody has read the label on, so they are not on
the site. See rule 2 above.

**The shop already tracks this.** The price tags carry codes — `A: 1, 3, 7, 11`
was legible on the máslová burgerová bulka. This is **a walk around the shop
with a phone, not research**.

**Action (owner):** photograph the gochujang and miso tubs, and every price tag.
Confirm what the numeric codes map to before any code is published — an
unverified code is worse than none.

---

## 3. Batch B — removed from the site

Listed at 65 Kč, but it appeared on **no** wall menu and **no** price tag in any
photograph. **Deleted from `products.json`.**

**Action (owner):** confirm whether Batch B exists. If it does, it comes back
with a confirmed price and description.

---

## 4. Rating removed — 4.6 / 106 reviews

Was displayed on the Královo Pole card and asserted as `aggregateRating` in
structured data. Never owner-supplied. **Removed from both.**

**Action (owner):** supply the real figure and it returns.

---

## 5. Focaccia — split into three (Phase 1)

The site's **50–125 Kč (od)** range matches nothing seen in the shop and was
never real. It is being replaced by three products:

| Product | Price observed on the tag |
| --- | --- |
| Focaccia | 55 Kč |
| Focaccia s rajčaty | 75 Kč |
| Focaccia s konfitovaným česnekem | 75 Kč |

These prices are **observed, not owner-confirmed**.

---

## 6. Products to add with placeholders (Phase 1)

Names are real. Everything missing uses the placeholder component — a visible,
designed gap rather than an invention.

**On the wall menu, missing from the site entirely:**

| Product | Has | Needs |
| --- | --- | --- |
| **Žitný** (rye) | name | price, description, allergens, photo |
| **Tousťák** (toast loaf) | name | price, description, allergens, photo |

**Seen with a price tag, not yet on the site** — prices observed, not confirmed:

| Product | Price seen |
| --- | --- |
| Loupáček | 33 Kč |
| Máslová burgerová bulka | 28 Kč (tag shows `A: 1, 3, 7, 11`) |
| Pizza koláč se šunkou | 80 Kč |
| Borůvkový koláč s tvarohem | 55 / 100 Kč |
| Jablečný řez s karamelem a pekany | 95 Kč |
| Formaggi (tag partly obscured) | 80 Kč |

Photographed but unpriced, so not added: koláčky, makový koláč s pečenou
švestkou a mandlovou drobenkou, makovo-citronový chlebík, Uganda banana bread,
mák & švestka žitný chlebík.

---

## 7. Invented copy — being deleted, not rewritten (Phase 1)

Written without owner input and currently reading as real:

- the hero subtitle *"Poctivé suroviny, ruční práce…"*
- the badge *"Pečeme každé ráno"*
- the whole About paragraph
- descriptions for **Bílý** and **Mišenec**, inferred from the product names

All replaced by the placeholder component. Invented copy that reads as real is
worse than an obvious gap; on a pitch page the gap is the product.

---

## 8. Photos

Missing entirely: **Double G**, **Miso Walnut**, **Skořicový šnek**, and both
new breads (Žitný, Tousťák).

**Unresolved:** which of the two pale loaf photographs is **Bílý** and which is
**Mišenec**. They are currently assigned by guess.

**Action (owner):** identify the two pale loaves.

---

## 9. Two cutouts failed background removal

Measured on the alpha channel of all fifteen in `assets/breadguy-photos/cutouts/`,
not eyeballed from the contact sheet:

| Cutout | Fully opaque pixels | Mean alpha | Verdict |
| --- | --- | --- | --- |
| `focaccia-prosciutto-rukola.webp` | **0.0 %** | 6 / 255 | Subject erased. Unusable. |
| `tiramisu-babka-tray.webp` | **24.8 %** | 73 / 255 | Most of the tray lost, remainder semi-transparent. |
| `focaccia-margherita.webp` | 49.8 % | 144 / 255 | Borderline — a bite-shaped chunk is missing from one edge. |

The other twelve sit between 58 % and 80 % opaque with clean 2–9 % soft
edges, which is what a good cutout looks like.

**Action:** re-cut the first two (the pack README suggests remove.bg's free
tier for the tricky ones) and drop them back under the same filenames. Until
then those two products use the rectangular original, not the cutout.

---

## 10. Smaller items

- **IČO / DIČ** missing from the footer — owner to supply, placeholder meanwhile.
- **`A Brno Bakery`** is an English string rendering in the Czech footer.
- An unconfirmed allergen field currently renders **nothing**. It should read as
  *pending* rather than silent — Phase 1 deliverable, deliberately not patched
  ahead of the placeholder component being designed.
