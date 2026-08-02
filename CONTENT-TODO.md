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

## 1. 🔴 HIGH — Czech copy, needs native review

**No native speaker has read any Czech on this site.** Everything below was
written or translated without native validation, and it must be read by the
bakery staff before the pitch. This applies retroactively to every string
already live, not only to new ones.

**Every Czech string added from here on gets appended to this section.**

### Placeholder component (Phase 1 — new)

| String | Intent |
| --- | --- |
| `FOTO DOPLNÍME` | photo to come |
| `POPIS DOPLNÍME` | description to come |
| `CENU DOPLNÍME` | price to come |
| `ALERGENY · ČEKAJÍ NA POTVRZENÍ` | allergens awaiting confirmation |
| `Chléb je na denní nabídce v obou pobočkách.` | filler line under a missing description |
| `Ptejte se na prodejně.` | filler line under a missing price |

### Navigation and ordering flow (Phase 2 — new)

| String | Intent |
| --- | --- |
| `Objednat` | the persistent order CTA |
| `Objednávka` | the flow's own name |
| ~~`Dnes pečeme`~~ → `Naše pečivo` | home preview heading — reworded in Phase 3 so it states no schedule |
| `Celá nabídka` | link to the full menu |
| `Chcete chleba ve čtvrtek?` | order entry block heading |
| `Vyberte pobočku, den a čas vyzvednutí.` | order entry block subheading |
| `Pokračovat` · `Zpět` · `Zpět na nabídku` | flow and page navigation |
| `Další chleby` | related products |
| `Složení` | ingredients (distinct from allergens) |
| `Kontakt` | contact anchor on the locations page |
| `Krok 1 ze 6` | step indicator |
| route slugs | `/nabidka` `/pobocky` `/objednavka` `/o-nas` |

### Interface strings — `src/data/i18n.ts`

The four invented sentences (`hero.subtitle`, `menu.subtitle`, `about.story`,
`sellOutWarning`) and the `hero.badge` were **deleted in Phase 3**, not
rewritten. So did `footer.tagline` — the English `A Brno Bakery` that was
rendering in the Czech footer.

What remains needs reading:

| Key | String |
| --- | --- |
| `hero.title` | Kváskový chléb a pečivo z Brna. |
| `branch.*` | Otevírací doba · Navigovat · Zavolat · Otevřeno · Zavřeno · otevíráme v · zavíráme v · zavřeno · Po–Ne |
| `nav.*` | Nabídka · Pobočky · O nás · Objednat · Přejít na obsah · Přepnout na angličtinu · Otevřít menu |
| `menu.*` | Naše pečivo · Celá nabídka · Vše · Chleby · Sladké · Sendviče · celý · půlka · Filtrovat podle kategorie · Alergeny · Složení · Gramáž · Zpět na nabídku · Další pečivo |
| `locations.*` | Pobočky · Kontakt · Telefon |
| `placeholder.*` | all eleven placeholder strings, listed above |
| `meta.*` | every page title and meta description, both languages |

### Product descriptions — `src/data/products.json`

Owner-confirmed wording, but nobody has checked the Czech: Double G's
*Kváskový chléb s konfitovaným česnekem a gochujangem.* and Miso Walnut's
*Kváskový chléb s miso pastou a vlašskými ořechy*. The rest were invented and
are being deleted anyway (§8).

### `src/pages/404.astro`

*Tuto stránku nemáme* · *Odkaz možná zastaral nebo v adrese chybí písmeno.* ·
*Zpět na úvod* · *Otevírací doba a pobočky*

**Action (owner):** have bakery staff read the list above and mark anything
that sounds wrong, machine-translated, or too formal. Product names and
addresses are excluded — those are never altered.

---

## 2. 🔴 HIGH — Hours, addresses and phone are not owner-verified

Both addresses, the phone number and every opening hour on the site came from
an early session and have **never been confirmed in writing by the owner**.
They are also asserted in JSON-LD `openingHoursSpecification`.

They stay on the site as-is — they are the best information available and the
site is behind `noindex` — but they are the highest-value correction on this
list. Wrong hours on the owner's phone ends the pitch.

**Action (owner):** confirm in writing. Until then this line stays.

---

## 3. 🔴 HIGH — Allergen codes for every product

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

## 4. Batch B — removed from the site

Listed at 65 Kč, but it appeared on **no** wall menu and **no** price tag in any
photograph. **Deleted from `products.json`.**

**Action (owner):** confirm whether Batch B exists. If it does, it comes back
with a confirmed price and description.

---

## 5. Rating removed — 4.6 / 106 reviews

Was displayed on the Královo Pole card and asserted as `aggregateRating` in
structured data. Never owner-supplied. **Removed from both.**

**Action (owner):** supply the real figure and it returns.

---

## 6. Focaccia — split into three ✅ done in Phase 3

The site's **50–125 Kč (od)** range matches nothing seen in the shop and was
never real. It has been replaced by three products:

| Product | Price observed on the tag |
| --- | --- |
| Focaccia | 55 Kč |
| Focaccia s rajčaty | 75 Kč |
| Focaccia s konfitovaným česnekem | 75 Kč |

These prices are **observed, not owner-confirmed**.

---

## 7. Products added with placeholders ✅ done in Phase 3

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

## 8. Invented copy — deleted, not rewritten ✅ done in Phase 3

Written without owner input and currently reading as real:

- the hero subtitle *"Poctivé suroviny, ruční práce…"*
- the badge *"Pečeme každé ráno"*
- the whole About paragraph
- descriptions for **Bílý** and **Mišenec**, inferred from the product names

All replaced by the placeholder component in Phase 3. Invented copy that reads as real is
worse than an obvious gap; on a pitch page the gap is the product.

---

## 9. Photos

Missing entirely: **Double G**, **Miso Walnut**, **Skořicový šnek**, and both
new breads (Žitný, Tousťák).

**Unresolved:** which of the two pale loaf photographs is **Bílý** and which is
**Mišenec**. They are currently assigned by guess.

**Action (owner):** identify the two pale loaves.

---

## 10. Two cutouts deleted — reclassified as full-bleed

Measured on the alpha channel of all fifteen, not eyeballed from the contact
sheet:

| Cutout | Fully opaque pixels | Mean alpha | Outcome |
| --- | --- | --- | --- |
| `focaccia-prosciutto-rukola.webp` | **0.0 %** | 6 / 255 | Deleted |
| `tiramisu-babka-tray.webp` | **24.8 %** | 73 / 255 | Deleted |
| `focaccia-margherita.webp` | 49.8 % | 144 / 255 | Kept — borderline, a chunk missing from one edge |

The remaining thirteen sit between 50 % and 80 % opaque with clean 2–9 % soft
edges, which is what a good cutout looks like.

**Not a re-cut job.** Both failures are overhead shots where the food fills
the whole frame, so there is no background for a segmentation model to remove
and it carves an arbitrary region out of the middle instead. Two models
produced the same result. Those two products use their rectangular original as
a **full-bleed** image; the general rule is in `DECISIONS.md`.

**No action outstanding.**

---

## 11. Smaller items

- **IČO / DIČ** missing from the footer — owner to supply, placeholder meanwhile.
- **`A Brno Bakery`** is an English string rendering in the Czech footer.
- An unconfirmed allergen field currently renders **nothing**. It should read as
  *pending* rather than silent — Phase 1 deliverable, deliberately not patched
  ahead of the placeholder component being designed.

---

## 12. Resolved in Phase 3 — all three the same way

Each was a case where the honest empty state makes a better demo than a
plausible fill. None was solved with invented content.

- **`/o-nas` — route kept, copy deleted.** The invented paragraph is gone and
  the placeholder ships in its place. An About page that visibly says the story
  is waiting to be written is a stronger pitch artefact than a paragraph the
  owner never said, because it makes the gap an item he is buying.
  **Action (owner): a short interview.** If nothing real arrives before launch,
  the route is cut then — not now.
- **`Dnes pečeme` → `Naše pečivo`.** A heading implying a daily rotation we
  cannot back is a claim, not a layout label, so the wording no longer states
  a schedule. Subject to the same native review as every other Czech string.
- **Product weights — schema kept, values empty.** Every product carries a
  `weightGrams` field rendered through the placeholder. No gram figure is
  estimated from a photograph.
  **Action (owner):** they are on the tags, or the staff know them.

### Not a defect — a completion feature

**A per-product baking-day field.** Knowing which breads are baked which day is
genuinely useful for this business: it drives a real "today" section, it makes
the ordering flow able to say what is available on a chosen day, and it is the
sort of thing that belongs in what the owner is paying for. It is scoped as
part of completion, not as a gap in the demo.
