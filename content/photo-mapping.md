# Photo mapping — which photograph is which product

Owner-confirmed only. A photograph is wired to a product when the owner has
said so, and not before — a plausible guess about which loaf is which puts the
wrong bread next to the wrong price and the wrong allergens.

Filenames match product ids, so an unmapped photograph cannot drift back into
being "probably that one".

| File | Product | id | Confirmed |
| --- | --- | --- | --- |
| `misenec.webp` | Mišenec | `misenec` | owner |
| `bily.webp` | Bílý | `bily` | owner |
| `double-g-rez.webp` | Double G | `double-g` | owner |
| `miso-walnut-rez.webp` | Miso Walnut | `miso-walnut` | owner |
| `makovy-uzlik-tray.webp` | Makový uzlík | `makovy-uzlik` | from the pack audit |
| `sendvic-rez-a.webp` | Focaccia sendvič | `focaccia-sendvic` | from the pack audit |
| `focaccia-olive-tomato-herbs.webp` | Focaccia s rajčaty | `focaccia-rajcata` | cherry tomatoes visible on the tray |

`misenec.webp` and `bily.webp` were `loaf-sourdough-a` and `loaf-sourdough-b`
until the owner identified them. Both names are retired so the ambiguity cannot
return.

## Not mapped to any product

Used in the collage, where they claim nothing:

`focaccia-feta-olive-onion` · `focaccia-lilek-parmezan` · `focaccia-margherita` ·
`slider-sesame-bun` · `sendvic-rez-b` · `hero-focaccia-sandwich`

The three focaccia variants and the slider are **not on the confirmed menu**.
`slider-sesame-bun` may be the 28 Kč máslová burgerová bulka; nobody has said
so, so it is not wired to it.

## Full-bleed, no cutout

`focaccia-prosciutto-rukola` · `tiramisu-babka-tray`

Overhead shots where the food fills the frame. See `DECISIONS.md` — these get
full-bleed treatment because there is no background for a cutout to remove.

## Open

**The product name may be wrong.** `products.json` says **Bílý**, the shop's
wall menu says **BÍLÝ CHLÉB**, and the owner's photo confirmation called it
**Bílý pšeničný**. Three different names for the same loaf. The name has not
been changed, because the owner was confirming *which photograph it is*, not
renaming the product, and product names are never altered on inference.
Logged in `CONTENT-TODO.md` for confirmation.
