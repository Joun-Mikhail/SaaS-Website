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

## The system (Phase 1)

Rendered in `specimen/index.html`. Tokens live in `tailwind.config.mjs`.

- **Fonts are self-hosted, never from a CDN.** A blocked font server delayed
  first paint by 12.7 s when it was measured in Phase 0; a CDN request also
  hands the visitor's IP to Google for no benefit. 180 KB of woff2 in
  `public/fonts/`, `font-display: swap`, display face preloaded.
- **Czech needs both the `latin` and `latin-ext` subsets.** The acute vowels
  (á é í ó ú ý) are in `latin`; the carons and the ring (č ě ř š ť ž ů) are in
  `latin-ext`. Shipping one drops half of every Czech word.
- **Spacing is Fibonacci — each step is the sum of the two before it.**
  4, 8, 12, 20, 32, 52, 84, 136. The ratio converges on 1.618, the same number
  that drives the display half of the type scale, so one constant governs both.
- **The type scale has two halves.** Text sizes (13/15/17) sit on a tight 1.13
  ratio so they don't compete; display sizes (27/44/72) sit on 1.618 so they
  do. Body to hero is 4.24×.
- **Display face is Titan One.** Chosen against `logo-original.webp`, not from
  taste. Five candidates were disqualified on Czech: Bowlby One, Chewy and
  Permanent Marker have no `latin-ext` at all; Fredoka and Lilita One lack
  č ď ě ň ř ť ů; Luckiest Guy is caps-only, so Czech lowercase ť and ď render
  with a caron above instead of the correct apostrophe form.
- **Every ground has exactly one legal text colour**, fixed by measured
  contrast: orange→ink 5.41, blue→chalk 12.51, green→ink 10.54, red→chalk 8.31,
  ink→chalk 18.43. **White on orange is banned** at 3.41 — that exact pair was
  the old site's primary button and one of its 67 contrast failures.
- **Green is capped at one section per page.** It is the most aggressive value
  in the palette; used as a general ground it stops reading as an accent.
- **Motion: three curves, three durations, 420 ms ceiling.** No overshoot, no
  bounce. `--ease-settle` for arrivals, `--ease-shift` for state changes,
  `--ease-tap` for direct response.
- **The placeholder is a first-class component, not a fallback.** Orange hatch
  on ink, with the price-tag notch, so a missing field reads as a tag nobody
  has written yet rather than as a broken asset. Never grey, never a
  broken-image icon.
- **An unconfirmed allergen renders as a dashed pending chip, never as
  absence.** Empty space next to "Alergeny" can be read as "contains none",
  which is the one thing the field must never imply.

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
