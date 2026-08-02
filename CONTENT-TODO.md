# Content TODO — unconfirmed items, not published

Everything on this list is **deliberately absent or unchanged on the live site**
until the owner confirms it. Nothing here has been guessed into the product data.

Source: `breadguy-photos/README-mapping-and-menu-audit.md` (in-store menu poster
and price tags photographed from Instagram stories), plus owner confirmations.

---

## 1. Blocking — legal / rights

### 1.1 ~~Photo permission: Miso Walnut~~ — RESOLVED
The customer repost (@michaela.dobi) has been **removed from the repo** and
replaced with the bakery's own crumb shot (`miso-walnut-crumb.webp`). No
permission question remains on this image.

### 1.2 Allergen codes are not on the site
Price tags in the shop already carry codes (e.g. `A: 1, 3, 7, 11`), so the
bakery tracks them. Only **Miso Walnut** has an allergen declared, and it is
written as a word (`vlašské ořechy`), **not** as a numeric code — the shop's
numbering has not been verified, and publishing a wrong code is worse than none.

**Action:** photograph every price tag, then fill `allergens` for every product.
Confirm the exact legal obligation for unpackaged bakery goods with the owner.

### 1.3 ~~Double G may contain milk~~ — RESOLVED, but a new allergen question
The second G is **gochujang**, not a cheese, so the milk concern is closed.

**New question:** gochujang is normally made from soybeans and very often
contains wheat, and miso is normally soy-based too. That would make **soy** —
and possibly **gluten beyond the flour** — declarable on both Double G and
Miso Walnut. Neither has been confirmed, so neither is declared.

**Action:** check the gochujang and miso labels the bakery buys, then declare.

---

## 2. ~~Double G — description removed~~ — RESOLVED

Owner confirmed: **confit garlic and gochujang**. The description now reads
"Kváskový chléb s konfitovaným česnekem a gochujangem" and the card carries the
cross-section photo. See §1.3 for the outstanding soy/gluten question.

---

## 3. Products on the wall menu but missing from the site

The bread menu in the shop reads:
**MIŠENEC · DOUBLE G · BÍLÝ CHLÉB · MISO WALNUT · ŽITNÝ · TOUSŤÁK**

| Missing | Needs |
| --- | --- |
| **Žitný** (rye) | price, description, allergens, photo |
| **Tousťák** (toast loaf) | price, description, allergens, photo |

**Not added** — no confirmed price or description exists for either.

---

## 4. Batch B — possibly discontinued

Listed on the site at 65 Kč, but appears on **no** wall menu and **no** price
tag. Left on the site unchanged pending confirmation.

**Action:** confirm whether Batch B still exists. If not, delete it.

---

## 5. Focaccia price looks invented

The site shows **50–125 Kč (od)**. Observed price tags say **55** and **75**.
That range does not match anything seen in the shop, and it predates any owner
confirmation — treat it as unverified.

**Action:** confirm the real focaccia pricing. Note the tags distinguish
variants (plain 55, s rajčaty 75, s konfitovaným česnekem 75), which suggests
focaccia should be several products rather than one price range.

---

## 6. Products seen with price tags, none on the site

Not added — these have prices but no confirmed descriptions or allergens.

| Product | Price seen |
| --- | --- |
| Loupáček | 33 Kč |
| Máslová burgerová bulka | 28 Kč (allergens on tag: A: 1, 3, 7, 11) |
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

## 7. Which loaf is which

`loaf-sourdough-a.webp` and `loaf-sourdough-b.webp` are both pale sourdough and
are **most likely** Bílý and Mišenec — but the README cannot say which is which.

Neither has been assigned to a product card; putting the wrong loaf on a card is
the same error class as a wrong description. `loaf-sourdough-a` is used only in
the photo gallery, where the caption is generic ("a loaf of sourdough bread").

**Action:** identify both, then assign them.

**Update:** Bílý and Mišenec now have their own dedicated photos, so no product
card depends on this any more. `loaf-sourdough-a` is used only in the gallery
under a generic caption; `loaf-sourdough-b` is unused.

---

## 8. Products still with no photo

| Product | Status |
| --- | --- |
| **Batch B** | no photo — and may be discontinued (§4) |
| **Skořicový šnek** | no photo |

Bílý, Mišenec, Double G and Miso Walnut all have dedicated photos as of this
round. 8 of 10 products now have one.

Cards for these render with **no image area at all**. The previous logo-tile
placeholder has been removed everywhere: a logo standing in for a product photo
reads as a real card and tells the customer nothing.

Also still unshot per the README: **Žitný**, **Tousťák**.

---

## 9. Photos in the pack with no product to attach to

Real Bread Guy photos, currently used only in the gallery or not at all, because
no confirmed menu item matches them:

- `slider-sesame-bun.webp` — black sesame bun slider. Possibly related to the
  28 Kč máslová burgerová bulka?
- `focaccia-lilek-parmezan.webp` — aubergine and parmesan focaccia
- `focaccia-margherita.webp` — mozzarella, tomato, chives
- `sendvic-rez-b.webp` — softest image in the set, secondary angle only
- `loaf-sourdough-b.webp` — see §7

---

## 10. Carried over from the earlier audit

- **Third location.** An earlier brief mentioned a **Breadbar bistro on
  Josefská**. The site has two locations. Unconfirmed, so not added.
- **Invented copy still live.** The About paragraph and the hero subtitle were
  written without owner input and remain on the site: *"Poctivé suroviny, ruční
  práce…"*, *"Pečeme každé ráno"*, and the About story.
- **`A Brno Bakery`** is an English string showing in the Czech footer.
- Product descriptions for **Bílý, Mišenec, Batch B** were inferred from their
  names, never confirmed.
- **IČO / DIČ** missing from the footer.
- Rating **4.6 / 106 reviews**, both addresses, phone and all opening hours came
  from an earlier session and have not been owner-verified.

---

## 11. Provenance of the two studio loaf photos

`bily-loaf.webp` and `misenec-loaf.webp` are studio-lit shots on dark
backdrops — a noticeably different register from everything else in the pack,
which is phone photography on the shop's blue tiles, in hands, in crates.

They were supplied as Bread Guy's own product photos and are published on that
basis. Flagging only because the project rule is "no stock photography", and
these are the two images where that would be hardest to spot after the fact.

**Action:** confirm these are the bakery's own images.
