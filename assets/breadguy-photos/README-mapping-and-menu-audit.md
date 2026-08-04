# Bread Guy — Photo Pack & Menu Audit

Two uploads, two very different kinds of value.

- **PDF 1 (IMG_5845)** — clean product photography. **Usable on the site.** 13 images, cropped, resized to 1600px long edge, exported as `.webp` (for the site) and `.jpg` (originals if you need to re-edit).
- **PDF 2 (IMG_9516)** — Instagram story screenshots at 811px with the phone status bar, story ring, and "Send message" bar burnt in. **Not usable as website images.** But they are extremely valuable as *menu intelligence*, and they show the current product list on the site is wrong. See section 3.

---

## 1. Photo pack — drop these into `public/images/products/`

| File | Product | Notes |
|---|---|---|
| `hero-focaccia-sandwich.webp` | Focaccia sandwich, held in two hands, natural light | **This is your hero.** Best photo in the set by a wide margin — real light, real hands, dark background, the crumb is readable. 62 KB. |
| `miso-walnut-rez.webp` | **Miso Walnut**, cross-section — walnuts through an open crumb | Confirmed by the owner. 862px — the smallest usable file in the pack. Fine for a product card at typical sizes, don't scale it up. ⚠️ This is the customer repost (michaela.dobi) — get her permission before it goes on a commercial site. |
| `double-g-rez.webp` | **Double G**, cross-section — confit garlic cloves, orange swirl | Confirmed by the owner. Cropped out of a phone screenshot, so it's 1090px not 1600px — still sharp enough for a product card, not for a full-bleed hero. See the description flag in section 2. |
| `misenec.webp` | Sourdough, elongated, two ears | **Mišenec** — owner-confirmed. Renamed from `loaf-sourdough-a`. |
| `bily.webp` | Sourdough, rounder, single ear | **Bílý** — owner-confirmed. Renamed from `loaf-sourdough-b`. |
| `tiramisu-babka-tray.webp` | Tiramisu babka tray, cream + cocoa | Replaces the current one. Overhead, full tray — reads as "there's a lot of it," which sells. |
| `makovy-uzlik-tray.webp` | Poppy-seed knots in crate | Matches `Makový uzlík` on the menu. |
| `slider-sesame-bun.webp` | Slider — black sesame bun, asparagus, courgette | ⚠️ Not on the menu at all. Related to the 28 Kč *máslová burgerová bulka*? |
| `focaccia-feta-olive-onion.webp` | Focaccia — olives, cherry tomato, red onion, feta, chives | Landscape. |
| `focaccia-prosciutto-rukola.webp` | Focaccia — prosciutto, rocket, yellow tomato | Replaces the current prosciutto image. |
| `focaccia-olive-tomato-herbs.webp` | Focaccia — black olive, tomato, herbs (green crate) | |
| `focaccia-lilek-parmezan.webp` | Focaccia — aubergine, parmesan | ⚠️ Not on the menu. |
| `focaccia-margherita.webp` | Focaccia — mozzarella, tomato, chives | ⚠️ Not on the menu. Landscape. |
| `sendvic-rez-a.webp` | Sandwich cross-section, ham/cheese/tomato/lettuce | Good for the `Focaccia sendvič` card — the cross-section sells it better than the exterior. |
| `sendvic-rez-b.webp` | Same product, second angle | I cropped out the black letterbox bars; it was a video screenshot, so it's the softest image in the set. Use only as a secondary. |
| `logo-original.webp` | The orange roundel | Higher-fidelity than the current `logo.svg`? Compare. Don't replace a clean SVG with a raster. |

~~Every file also exists as `.jpg` at the same size.~~ **Not true of what was
committed** — only the `.webp` files shipped. There is no re-editable JPEG
master in the repo.

**Total WebP weight: ~2.7 MB across 14 images.** That is fine as source material — your framework should be generating responsive sizes from these, not serving 1600px files to a phone. If it isn't, that's a bug to fix before launch.

---

## 2. Loaf identification — resolved, and one problem it exposed

Double G and Miso Walnut are now confirmed and named. **Resolved.** The owner confirmed `loaf-sourdough-a` is **Mišenec** and `loaf-sourdough-b` is **Bílý**. Both files are renamed to their product ids; see `content/photo-mapping.md`.

Still with no photo at all: **Žitný**, **Tousťák**, **Skořicový šnek**.

### ⚠️ The site's Double G description is probably wrong

The site says Double G is *"Dvojitě kynutý kváskový chléb"* — double-**risen**. The cross-section shows whole confit garlic cloves and a heavy orange swirl through the crumb. That is not what a double-risen plain sourdough looks like.

"Double G" almost certainly stands for two ingredients starting with G — garlic and something else (gouda? gruyère? the orange could equally be paprika or chilli oil). **Ask the owner what the two G's are.** Whatever the answer, the current description is misleading, and the allergen implications differ completely: if there's cheese in it, that's a milk allergen the site isn't declaring.

Same pattern for Miso — the site says *"kváskový chléb s miso pastou"*, but it is **Miso Walnut**, and walnuts are one of the fourteen EU-declarable allergens. That one needs fixing before launch, not after.

---

## 3. Menu audit — the site's product list is out of date

From the in-store menu poster and price tags visible in the story screenshots. Everything below needs owner confirmation before it goes live, but the direction is clear.

### The bread menu on the wall reads:
**MIŠENEC · DOUBLE G · BÍLÝ CHLÉB · MISO WALNUT · ŽITNÝ · TOUSŤÁK**

Compared to the live site:

| Site says | Reality | Action |
|---|---|---|
| Miso — "kváskový chléb s miso pastou" | **MISO WALNUT** — miso *and* walnut. A customer repost confirms it (`02-miso-walnut-rez.jpg`). | Rename + fix description |
| Batch B — 65 Kč | Appears nowhere on the wall menu or any price tag | ⚠️ Verify — discontinued? |
| — | **Žitný** (rye) | Missing entirely |
| — | **Tousťák** (toast loaf) | Missing entirely |

### Products with visible price tags, none of which are on the site:

| Product | Price |
|---|---|
| Loupáček | 33 Kč |
| Máslová burgerová bulka (allergens A: 1, 3, 7, 11) | 28 Kč |
| Focaccia (plain) | 55 Kč |
| Focaccia s rajčaty | 75 Kč |
| Focaccia s konfitovaným česnekem | 75 Kč |
| Pizza koláč se šunkou | 80 Kč |
| Borůvkový koláč s tvarohem | 55 / 100 Kč |
| Jablečný řez s karamelem a pekany | 95 Kč |
| Formaggi (partially visible) | 80 Kč |

Plus, unpriced but photographed: koláčky, makový koláč s pečenou švestkou a mandlovou drobenkou, makovo-citronový chlebík, Uganda banana bread, mák & švestka žitný chlebík.

**Your site currently shows focaccia as "50–125 Kč (od)".** The real tags say 55 and 75. That range looks invented — check it.

### Allergens
The price tags carry allergen codes (`A: 1, 3, 7, 11`). So the bakery already tracks them. The site has an allergen field per product and it's empty. Get the codes off the tags — that's a walk around the shop with a phone, and it's a legal expectation for food sold this way in the EU. Confirm the exact obligation with the owner.

---

## 4. Design direction — superseded

This section previously carried design direction. It is **dead**. The single
source of design truth is `breadguy-amended-brief.md` in the repo root; the
three points from here that survive are recorded in `DECISIONS.md`.

If this README and the brief ever disagree, the brief wins.

---

## 5. What to do next, in order

1. ~~Tell me which loaf is which in the two sourdough files.~~ **Done** — see `content/photo-mapping.md`.
2. **Walk the shop with your phone.** Photograph every price tag — that gives you names, prices, and allergens in one pass. Twenty minutes.
3. **Get the missing five products shot**: Double G, Miso Walnut, Žitný, Tousťák, Skořicový šnek. Same setup as the two loaves — daylight, hands, plain background.
4. **Confirm with the owner** whether Batch B still exists, and get the full current product list.
5. Then hand the photo pack plus this audit to the build.

The `_reference-instagram-screenshots/` folder is for *reading* only. Do not put any of those images on the site — they have Instagram UI burnt into them.

---

## 6. Cutouts — `cutouts/`

Every product photo with the background removed, saved as WebP with an alpha
channel and trimmed to the subject's bounding box. These are the assets the
sticker-collage direction needs — rectangular photos can't do that layout.

- **13 files**, max 1200px on the long edge. Two of the original fifteen were
  deleted — see below.
- `_contact-sheet.jpg` shows all of them composited on magenta. **Look at this
  first.** Magenta makes bad alpha edges obvious — halos, chewed outlines,
  missing chunks. It still shows the two deleted cutouts.
- Segmentation was automatic (u2net + alpha matting), so it will not be
  perfect on all of them. The likely failure points:
  - **Photos with a hand holding the bread.** The model may have kept the hand,
    cut it at the wrist, or removed it entirely. A hand holding a loaf is
    genuinely good for this direction; a floating severed wrist is not. Check
    `misenec`/`bily`, `hero-focaccia-sandwich`, `slider-sesame-bun`,
    `sendvic-rez-a/b`, `double-g-rez`, `miso-walnut-rez`.
  - **Crate photos.** `focaccia-*` shots were taken in coloured crates, so the
    model had to decide whether the crate is subject or background. Whichever
    it chose may not be what you want.
- Originals are untouched — the rectangular `.webp` files in the parent folder
  are still there for any layout that wants a framed photo.

### The two deleted cutouts

`focaccia-prosciutto-rukola` and `tiramisu-babka-tray` came back at 0 % and
25 % opaque coverage respectively. Re-cutting was tried through two models and
did not improve them, because the cause is structural rather than a bad run:
both are **overhead shots where the food fills the entire frame**. There is no
background to remove, so a segmentation model carves an arbitrary region out
of the middle. A cutout of these two is meaningless.

They are reclassified as **full-bleed photographs** — full-width section
backgrounds or edge-to-edge blocks, which suits an overhead shot better than a
collage sticker would. The general rule is in `DECISIONS.md`: overhead
full-frame shots get full-bleed treatment, isolated subjects get cutout
treatment.
