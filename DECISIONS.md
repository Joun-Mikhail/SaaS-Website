# Decisions

Every non-obvious choice, one line, with the reason. Newest section last.

**Source of truth for design is `breadguy-amended-brief.md` in this folder.**
Where any other document disagrees with it — including the photo pack's
`README-mapping-and-menu-audit.md` — the brief wins and the conflict gets
flagged rather than silently resolved.

---

## Identity

- **Brand orange is sampled from `assets/breadguy-photos/logo-original.webp`,
  never picked from a framework palette.** It is a colour the bakery already
  owns; a Tailwind orange would be a colour anyone owns.
- **The display face carries the logo's marker-lettering energy** — rounded,
  chunky, irregular. Not a serif. The brand voice is a marker pen on a
  chalkboard and that is more distinctive than the tasteful-artisan register
  every other bakery site uses.
- **The signature element is the shop's own handwritten chalkboard price tag,
  used as the product card.** Handwritten label, scrawled price, allergen code
  underneath. It is true to the shop, nobody else has it, and it answers "how
  do I make a price look interesting."
- **Neutral grounds are out.** Not warm white, off-white, cream, or soft
  off-orange. The palette is saturated and blocked — brand orange, kitchen-tile
  blue, crate green and red, all sampled from the photographs. A cream ground
  is explicitly in the brief's anti-brief.

## Imagery

- **Overhead full-frame shots get full-bleed treatment; isolated subjects get
  cutout treatment.** A background-removal model needs a background to remove.
  On an overhead shot where food fills the frame it carves an arbitrary region
  out of the middle, which is why `focaccia-prosciutto-rukola` and
  `tiramisu-babka-tray` came back at 0 % and 25 % opaque coverage and were
  deleted rather than re-cut. Those two are full-width section backgrounds or
  edge-to-edge blocks. This is a layout principle, not a workaround.
- **`_reference-instagram-screenshots/` is read-only source material.** Phone
  screenshots with Instagram UI burnt in. Never served to a user. They are the
  evidence behind the observed prices and allergen codes in `CONTENT-TODO.md`.

## Truthfulness

- **An allergen is published when someone has read the label, never inferred
  from an ingredient name.** Not soy from miso, not soy or wheat from
  gochujang, however likely. `allergens: null` renders nothing; an empty array
  is rejected by `scripts/validate-content.mjs` because it would quietly assert
  "contains no allergens".
- **No `aggregateRating` until the owner supplies a real figure.** A star
  rating published under a real business's name is a factual claim about that
  business. The 4.6 / 106 that was live was never owner-supplied.
- **The demo is `noindex, nofollow` with `Disallow: /`, and emits no sitemap.**
  It must not rank against the bakery's real listing. Publishing a sitemap
  beside a blanket disallow would hand crawlers the list of URLs they were just
  told not to fetch. Reversed only on the owner's written go-ahead.
