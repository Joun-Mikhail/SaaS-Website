# Phase 2 — Information architecture

Structure only. No colour, no type, no decoration. Nothing built.

---

## 1. Sitemap — every route, and the question it answers

| Route | The question a customer arrives with |
| --- | --- |
| `/` | *Mají teď otevřeno a kde to je?* — and, secondarily, what is this place |
| `/nabidka` | *Co pečou a kolik to stojí?* |
| `/nabidka/<produkt>` | *Co přesně je v tomhle chlebu?* — ingredients, allergens, weight |
| `/pobocky` | *Kam mám jít, kdy mají otevřeno, jak se ozvu?* |
| `/objednavka` | *Chci chleba ve čtvrtek.* |
| `/o-nas` | *Kdo to peče?* |
| `/404` | *Něco je špatně* → routes to `/pobocky` |
| `/en/*` | the same tree, mirrored |
| `/pitch` | Phase 9. `noindex`, excluded from the sitemap, reachable only by URL |

**No `/kontakt`.** For a two-location bakery, "contact" is two addresses, one
phone number and an Instagram handle — all of which are the substance of
`/pobocky`. A separate route would be a page that exists to be in the nav.
Contact lives at `/pobocky#kontakt`.

### The two hierarchies, adapted

The reference runs two parallel product trees: `/nase-pecivo/<slug>` to read
about a loaf, `/produkt/<slug>` to buy it. The principle is right and it is the
reason a bread with no confirmed price can still have a real page.

**Adapted rather than copied.** One canonical catalogue at `/nabidka/<produkt>`,
and the ordering flow references products by id *inside* the flow instead of
minting a second URL family. The reference needs two trees because it sells
many SKUs with variants, delivery and B2B; Bread Guy has roughly fifteen
products and one pickup mechanic, and a second tree would be structure for its
own sake.

What is preserved is the rule that matters:

- **Browse always shows price.** `/nabidka` and every product page show the
  price immediately, with no question asked first.
- **Buy asks logistics first.** `/objednavka` asks location and day before it
  shows a total, because a pickup slot is what it is selling.

A walk-in standing on Husitská never has to say what day it is to find out what
a Mišenec costs.

> **Still unverified.** I have never rendered wtbakery.cz — it returns 403 to
> every request from this environment. The two-hierarchy reading came from URL
> structure and page titles. If a rendered look shows their split works
> differently, this section is the first thing to revisit.

---

## 2. Home page — section order

Two customers arrive. **A** is standing on the street with a phone, and wants
to know whether to walk in. **B** wants bread on Thursday. The order below
answers A completely before it asks B for anything.

| # | Section | Why it is here |
| --- | --- | --- |
| 1 | **Header** — logo, nav, `Objednat` | Identity, and the order route from the first pixel |
| 2 | **Hero** — headline, both branches with full hours, addresses, phone | A is finished by the end of the first screen. This is also the hard rule: logo, headline, hours, both addresses and phone all render from plain HTML with JS off |
| 3 | **Dnes pečeme** — 4–6 products with prices, link to the full menu | The next question after "are you open" is "what have you got and how much" |
| 4 | **Objednávka** — entry block into the flow | B's turn, once A has been served |
| 5 | **Collage** — the loud moment (Phase 7 fills this) | Brand texture belongs after intent and action, not between them |
| 6 | **Pobočky** — both branches in full, maps | Detail for anyone who scrolled past the hero summary |
| 7 | **O nás** — short | Nobody arrives needing this |
| 8 | **Footer** — nav, IČO/DIČ, Instagram, language | — |

### What this fixes from the Phase 0 audit

At 390px the current site puts **opening hours at 5936px** and the **phone at
6144px** — roughly seven screens down. Both move into section 2.

The live open/closed badge is currently computed at build time and frozen into
the HTML, so with JS disabled it can assert "Otevřeno" at 3am. The structural
fix is a split:

- **Static, always correct:** the full week's hours as text, the address, the
  phone as a `tel:` link.
- **Progressive, added by JS:** a live badge — *teď otevřeno · zavíráme v 18:00*.

With JS off there is **no status badge at all**. A static page cannot know what
day it is, so it must not claim to. Absent beats wrong.

---

## 3. Navigation model

**The ordering flow is reachable from every route.** `Objednat` is a persistent
element in the header, not a nav item that scrolls away — at 390px it stays
visible beside the logo even when the menu drawer is shut.

```
Header (every route)
  [logo → /]   Nabídka   Pobočky   O nás      [ OBJEDNAT → /objednavka ]   CS|EN

Header at 390px
  [logo → /]                                  [ OBJEDNAT ]   [≡]
                                                             └ drawer:
                                                               Nabídka
                                                               Pobočky
                                                               O nás
                                                               CS | EN
```

Four secondary routes into the flow, so it is never a single point of failure:

1. Home section 4 — the entry block.
2. Every product page — an order CTA in context, on the item being read.
3. Footer — a plain link.
4. `/404` — alongside the route to `/pobocky`.

**Language.** `CS|EN` sits at the end of the nav, never in the drawer only.
Switching preserves the current route (`/nabidka/misenec` ↔ `/en/menu/misenec`).

**404 routes to Pobočky**, per the brief — a lost visitor is usually looking
for an address or an opening time.

---

## 4. Wireframes — 390px

Structure only. `═` marks the fold.

### `/` home

```
┌──────────────────────────────────────┐
│ [logo]              [OBJEDNAT]  [≡]  │  header
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐  │
│  │  H1                            │  │  2 lines max at 390
│  │  headline                      │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ KRÁLOVO POLE                   │  │  branch 1 — static
│  │ Husitská 8, Brno               │  │
│  │ Po–Pá  8:00–18:00              │  │
│  │ So     8:00–12:00              │  │
│  │ Ne     zavřeno                 │  │
│  │ ‹live badge — JS only›         │  │  absent without JS
│  │ [ Navigovat ]  [ 601 539 515 ] │  │  tel: link
│  ├────────────────────────────────┤  │
│  │ ČERNOVICE                      │  │  branch 2 — static
│  │ Charbulova 30, Brno            │  │
│  │ Po–Pá  8:00–18:00              │  │
│  │ So     8:00–12:00              │  │
│  │ Ne     zavřeno                 │  │
│  │ ‹live badge — JS only›         │  │
│  │ [ Navigovat ]                  │  │
│  └────────────────────────────────┘  │
│                                      │
│ ═══════════ fold ~844 ══════════════ │
│                                      │
│  DNES PEČEME                         │  section 3
│  ┌────────────────────────────────┐  │
│  │ [photo or placeholder]         │  │
│  │ Název              117 / 59 Kč │  │  price always visible
│  │ ‹allergen chip›                │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ …                              │  │  4–6 cards, 1 col
│  └────────────────────────────────┘  │
│  [ Celá nabídka → ]                  │
│                                      │
│  ┌────────────────────────────────┐  │  section 4
│  │  CHCETE CHLEBA VE ČTVRTEK?     │  │
│  │  Vyberte pobočku, den a čas.   │  │
│  │  [ OBJEDNAT → ]                │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │  section 5 — collage
│  │  ‹static collage, Phase 3›     │  │  physics added Phase 7
│  │  ‹falls back to this always›   │  │
│  └────────────────────────────────┘  │
│                                      │
│  POBOČKY                             │  section 6
│  ┌────────────────────────────────┐  │
│  │ branch card + map link         │  │
│  ├────────────────────────────────┤  │
│  │ branch card + map link         │  │
│  └────────────────────────────────┘  │
│                                      │
│  O NÁS                               │  section 7
│  ‹short paragraph or placeholder›    │
│                                      │
├──────────────────────────────────────┤
│ FOOTER                               │
│  Nabídka · Pobočky · O nás           │
│  Objednávka                          │
│  IČO ‹placeholder› DIČ ‹placeholder› │
│  Instagram        CS | EN            │
└──────────────────────────────────────┘
```

### `/nabidka` menu

```
┌──────────────────────────────────────┐
│ [logo]              [OBJEDNAT]  [≡]  │
├──────────────────────────────────────┤
│  NABÍDKA                             │
│  ‹one line of context›               │
│                                      │
│  [Vše][Chleby][Sladké][Sendviče]     │  filters, horizontal scroll
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [photo | placeholder]          │  │
│  │ Název 500 g                    │  │  weight in the name
│  │ ‹description | placeholder›    │  │
│  │ ‹allergens: chip | pending›    │  │
│  │ 117 / 59 Kč     celý / půlka   │  │
│  └────────────────────────────────┘  │
│  … 1 column                          │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [ OBJEDNAT → ]                 │  │  after the list, not floating
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### `/nabidka/<produkt>` product

```
┌──────────────────────────────────────┐
│ [logo]              [OBJEDNAT]  [≡]  │
├──────────────────────────────────────┤
│  ‹ Zpět na nabídku                   │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [photo — full bleed]           │  │  or placeholder
│  └────────────────────────────────┘  │
│                                      │
│  H1 Název                            │
│  500 g                               │
│  117 / 59 Kč      celý / půlka       │  price, no question asked
│                                      │
│  ‹description | placeholder›         │
│                                      │
│  SLOŽENÍ                             │  ingredients — a description
│  ‹list | placeholder›                │
│                                      │
│  ALERGENY                            │  allergens — a legal claim
│  ‹chips | ČEKAJÍ NA POTVRZENÍ›       │  separate field, always
│                                      │
│  [ OBJEDNAT → ]                      │
│                                      │
│  DALŠÍ CHLEBY                        │
│  ‹2–3 cards›                         │
└──────────────────────────────────────┘
```

### `/pobocky` locations

```
┌──────────────────────────────────────┐
│ [logo]              [OBJEDNAT]  [≡]  │
├──────────────────────────────────────┤
│  POBOČKY                             │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ KRÁLOVO POLE                   │  │
│  │ Husitská 8, 612 00 Brno        │  │
│  │ ┌────────────────────────────┐ │  │
│  │ │ Po  8:00–18:00             │ │  │  full week, static
│  │ │ …                          │ │  │
│  │ │ Ne  zavřeno                │ │  │
│  │ └────────────────────────────┘ │  │
│  │ ‹live badge — JS only›         │  │
│  │ [ Navigovat ] [ Zavolat ]      │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ ČERNOVICE …                    │  │
│  └────────────────────────────────┘  │
│                                      │
│  #kontakt                            │
│  KONTAKT                             │
│  Telefon · Instagram                 │
│  IČO ‹placeholder› DIČ ‹placeholder› │
└──────────────────────────────────────┘
```

---

## 5. Wireframes — 1440px

### `/` home

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo]        Nabídka   Pobočky   O nás          [ OBJEDNAT ]     CS | EN  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌──────────────────────────────────┐   ┌──────────────────────────────┐  │
│   │                                  │   │ KRÁLOVO POLE                 │  │
│   │  H1                              │   │ Husitská 8, Brno             │  │
│   │  headline                        │   │ Po–Pá 8:00–18:00             │  │
│   │                                  │   │ So    8:00–12:00             │  │
│   │                                  │   │ Ne    zavřeno                │  │
│   │                                  │   │ ‹live badge — JS only›       │  │
│   │                                  │   │ [Navigovat] [601 539 515]    │  │
│   │                                  │   ├──────────────────────────────┤  │
│   │                                  │   │ ČERNOVICE                    │  │
│   │                                  │   │ Charbulova 30, Brno          │  │
│   │                                  │   │ Po–Pá 8:00–18:00             │  │
│   │                                  │   │ So    8:00–12:00             │  │
│   │                                  │   │ Ne    zavřeno                │  │
│   │                                  │   │ ‹live badge — JS only›       │  │
│   │                                  │   │ [Navigovat]                  │  │
│   └──────────────────────────────────┘   └──────────────────────────────┘  │
│ ══════════════════════════════ fold ~900 ═════════════════════════════════ │
│                                                                            │
│   DNES PEČEME                                          [ Celá nabídka → ]  │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│   │ card       │ │ card       │ │ card       │ │ card       │   4 col      │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘              │
│                                                                            │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │  CHCETE CHLEBA VE ČTVRTEK?      Vyberte pobočku, den a čas.          │ │
│   │                                                    [ OBJEDNAT → ]    │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │  ‹collage — static in Phase 3, physics in Phase 7›                   │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│   POBOČKY                                                                  │
│   ┌───────────────────────────────────┐ ┌────────────────────────────────┐ │
│   │ branch + full hours + map         │ │ branch + full hours + map      │ │
│   └───────────────────────────────────┘ └────────────────────────────────┘ │
│                                                                            │
│   O NÁS   ‹short›                                                          │
├────────────────────────────────────────────────────────────────────────────┤
│ FOOTER   Nabídka · Pobočky · O nás · Objednávka    IČO/DIČ    IG   CS | EN  │
└────────────────────────────────────────────────────────────────────────────┘
```

### `/nabidka` menu

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo]        Nabídka   Pobočky   O nás          [ OBJEDNAT ]     CS | EN  │
├────────────────────────────────────────────────────────────────────────────┤
│   NABÍDKA                                                                  │
│   [Vše] [Chleby] [Sladké] [Sendviče]                                       │
│                                                                            │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐                             │
│   │ photo/ph   │ │ photo/ph   │ │ photo/ph   │   3 col                     │
│   │ Název 500g │ │ …          │ │ …          │                             │
│   │ ‹desc›     │ │            │ │            │                             │
│   │ ‹allergen› │ │            │ │            │                             │
│   │ 117/59 Kč  │ │            │ │            │                             │
│   └────────────┘ └────────────┘ └────────────┘                             │
│   … same grid continues                                                    │
│                                                                            │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │  [ OBJEDNAT → ]                                                      │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### `/nabidka/<produkt>` product

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo]        Nabídka   Pobočky   O nás          [ OBJEDNAT ]     CS | EN  │
├────────────────────────────────────────────────────────────────────────────┤
│   ‹ Zpět na nabídku                                                        │
│   ┌───────────────────────────────────┐  ┌───────────────────────────────┐ │
│   │                                   │  │ H1 Název                      │ │
│   │  [photo]                          │  │ 500 g                         │ │
│   │                                   │  │ 117 / 59 Kč   celý / půlka    │ │
│   │                                   │  │                               │ │
│   │                                   │  │ ‹description | placeholder›   │ │
│   │                                   │  │                               │ │
│   │                                   │  │ SLOŽENÍ                       │ │
│   │                                   │  │ ‹list | placeholder›          │ │
│   │                                   │  │                               │ │
│   │                                   │  │ ALERGENY                      │ │
│   │                                   │  │ ‹chips | ČEKAJÍ NA POTVRZENÍ› │ │
│   │                                   │  │                               │ │
│   │                                   │  │ [ OBJEDNAT → ]                │ │
│   └───────────────────────────────────┘  └───────────────────────────────┘ │
│                                                                            │
│   DALŠÍ CHLEBY   ┌──────┐ ┌──────┐ ┌──────┐                                │
│                  └──────┘ └──────┘ └──────┘                                │
└────────────────────────────────────────────────────────────────────────────┘
```

### `/pobocky` locations

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo]        Nabídka   Pobočky   O nás          [ OBJEDNAT ]     CS | EN  │
├────────────────────────────────────────────────────────────────────────────┤
│   POBOČKY                                                                  │
│   ┌───────────────────────────────────┐ ┌────────────────────────────────┐ │
│   │ KRÁLOVO POLE                      │ │ ČERNOVICE                      │ │
│   │ Husitská 8, 612 00 Brno           │ │ Charbulova 30, 618 00 Brno     │ │
│   │ ┌───────────────────────────────┐ │ │ ┌────────────────────────────┐ │ │
│   │ │ Po  8:00–18:00                │ │ │ │ Po  8:00–18:00             │ │ │
│   │ │ …            full week        │ │ │ │ …                          │ │ │
│   │ │ Ne  zavřeno                   │ │ │ │ Ne  zavřeno                │ │ │
│   │ └───────────────────────────────┘ │ │ └────────────────────────────┘ │ │
│   │ ‹live badge — JS only›            │ │ ‹live badge — JS only›         │ │
│   │ [ Navigovat ] [ Zavolat ]         │ │ [ Navigovat ]                  │ │
│   └───────────────────────────────────┘ └────────────────────────────────┘ │
│                                                                            │
│   KONTAKT  #kontakt                                                        │
│   Telefon · Instagram · IČO ‹placeholder› · DIČ ‹placeholder›              │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. `/objednavka` — entry and step order only

Phase 4 builds this. Phase 2 fixes only where it sits and what order it asks in.

```
   location  →  day  →  time slot  →  products  →  name + phone  →  summary
      1           2         3             4             5              6
```

Location first because slots depend on it: Sunday at Královo Pole has no slots
at all, and asking for a day before a branch would offer a day that cannot be
served. Products come after logistics **inside the flow only** — the public
menu has already shown every price without asking anything.

```
┌──────────────────────────────────────┐
│ [logo]                    [ ← Zpět ] │   flow chrome, not site nav
├──────────────────────────────────────┤
│  KROK 1 ze 6                         │   step indicator
│  ┌────────────────────────────────┐  │
│  │ ○ Královo Pole · Husitská 8    │  │
│  │ ○ Černovice · Charbulova 30    │  │
│  └────────────────────────────────┘  │
│  [ Pokračovat → ]                    │
└──────────────────────────────────────┘
```

---

## 7. New Czech strings introduced here

Logged in `CONTENT-TODO.md` §1 for native review, per the standing rule.

`Objednat` · `Objednávka` · `Dnes pečeme` · `Celá nabídka` ·
`Chcete chleba ve čtvrtek?` · `Vyberte pobočku, den a čas.` · `Pokračovat` ·
`Zpět` · `Zpět na nabídku` · `Další chleby` · `Složení` · `Kontakt` ·
`Krok 1 ze 6` · route slugs `/nabidka`, `/pobocky`, `/objednavka`, `/o-nas`

---

## 8. Open questions

1. **`/o-nas` has no confirmed content.** The current About paragraph was
   invented and is being deleted in Phase 3. The route stays in the structure;
   whether it survives to launch depends on the owner giving us something true.
2. **`Dnes pečeme` implies daily rotation** we cannot yet back with data —
   nothing records which products are baked on which day. Either the owner
   confirms a rotation, or the heading changes to something static.
3. **The reference site is still unrendered.** §1's two-hierarchy adaptation
   rests on URL structure alone.
