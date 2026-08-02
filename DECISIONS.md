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

## The build (Phase 3)

- **Tailwind's spacing, fontSize and colour scales are replaced, not extended.**
  With the defaults gone, `p-4` and `text-gray-500` do not compile, so an
  off-system value fails the build instead of quietly shipping. Phase 1 could
  only document the scale; this is what makes it impossible to break.
- **Category sections, not JavaScript filters.** The old menu hid cards with
  inline `display:none`, so the page did nothing at all without JavaScript.
  Sections work with JS off, are linkable, and let a screen reader move by
  heading.
- **Branch-card heading level is a prop.** In the hero these are the first
  headings on the page and must be h2; inside the Locations section they sit
  under its h2 and must be h3. Hard-coding either one breaks reading order for
  a screen reader.
- **Three faces are preloaded, not one.** The header CTA (Barlow Condensed),
  the body text (Archivo) and the headline (Titan One) all paint above the
  fold. With only the display face preloaded, the swap from fallback to real
  face resized the header's flex row and registered as layout shift. Preloading
  all three took CLS from 0.0011 to exactly 0.

## The system (Phase 1)

Rendered in `specimen/index.html`. Tokens live in `tailwind.config.mjs`.

- **Fonts are self-hosted, never from a CDN.** A blocked font server delayed
  first paint by 12.7 s when it was measured in Phase 0; a CDN request also
  hands the visitor's IP to Google for no benefit. woff2 vendored into
  `public/fonts/` (168 KB), `font-display: swap`, display face preloaded.
- **Czech needs both the `latin` and `latin-ext` subsets.** The acute vowels
  (á é í ó ú ý) are in `latin`; the carons and the ring (č ě ř š ť ž ů) are in
  `latin-ext`. Shipping one drops half of every Czech word.
- **Spacing is Fibonacci — each step is the sum of the two before it.**
  4, 8, 12, 20, 32, 52, 84, 136. The ratio converges on 1.618, the same number
  that drives the display half of the type scale, so one constant governs both.
- **The type scale has two halves.** Text sizes (13/15/17) sit on a tight 1.13
  ratio so they don't compete; display sizes (27/44/72) sit on 1.618 so they
  do. Body to hero is 4.24×.
- **Body face is Archivo, not Work Sans.** Work Sans was the most generic
  token in the first draft. Archivo is a grotesque with more spine, it sets
  narrower — which matters for Czech, whose words run long — and it contrasts
  with the round display face instead of echoing it. Full Czech across all
  four weights tested, tabular figures present.
- **Titan One stays single-weight (400).** One display voice at every size is
  a constraint, deliberately kept. No second display face is introduced for
  weight contrast.
- **The blue is `#2B3355`, and it has only one possible source.** The deep navy
  tile appears in exactly one photograph — `sendvic-rez-b.webp`, the smallest
  and softest file in the pack, a downscaled video frame. Every other kitchen
  shot has white tiles. The sample was moved off a shadowed patch onto the
  flattest, best-lit, in-focus tile face at (420,180); the value moved by one
  or two points per channel. If a sharper photograph of that wall ever arrives,
  re-sample it.
- **Display face is Titan One.** Chosen against `logo-original.webp`, not from
  taste. Five candidates were disqualified on Czech: Bowlby One, Chewy and
  Permanent Marker have no `latin-ext` at all; Fredoka and Lilita One lack
  č ď ě ň ř ť ů; Luckiest Guy is caps-only, so Czech lowercase ť and ď render
  with a caron above instead of the correct apostrophe form.
- **Every ground has exactly one legal text colour**, fixed by measured
  contrast: orange→ink 5.41, blue→chalk 12.30, green→ink 10.54, red→chalk 8.31,
  ink→chalk 18.43. **White on orange is banned** at 3.41 — that exact pair was
  the old site's primary button and one of its 67 contrast failures.
- **Green is capped at one section per page.** It is the most aggressive value
  in the palette; used as a general ground it stops reading as an accent.
  It also comes from a **crate, not from the food** — authentic to the shop,
  but packaging rather than product. If it starts fighting the orange in
  Phase 3, it is the first thing to cut.
- **Motion: three curves, three durations, 420 ms ceiling.** No overshoot, no
  bounce. `--ease-settle` for arrivals, `--ease-shift` for state changes,
  `--ease-tap` for direct response.
- **Reduced motion collapses duration to near-zero — never `animation: none`.**
  `none` cancels the animation, so any element whose visible end state comes
  from a keyframe (opacity 0→1, a transform settling from an offset) stays at
  its *start* state permanently. That hides content from precisely the people
  who asked for less movement. `0.01ms` with `animation-iteration-count: 1`
  runs it to completion instantly, so the end state still applies.
- **STANDING RULE, audited every phase: no element's visible or interactive
  state may depend on an animation having run.** Everything is visible and
  usable at rest; animation only changes how it arrives. This is what makes
  the rule above safe rather than merely careful — if it ever stops holding,
  reduced-motion users lose content.
- **The placeholder is a first-class component, not a fallback.** Orange hatch
  on ink, with the price-tag notch, so a missing field reads as a tag nobody
  has written yet rather than as a broken asset. Never grey, never a
  broken-image icon.
- **An unconfirmed allergen renders as a dashed pending chip, never as
  absence.** Empty space next to "Alergeny" can be read as "contains none",
  which is the one thing the field must never imply.

## Information architecture (Phase 2)

- **The ordering flow asks location before day.** Slots depend on the branch:
  Královo Pole is closed on Sunday, so asking for a day first would offer a day
  that cannot be served, then take it away. Logistics before products, but only
  inside the flow — the public menu shows every price with no question asked.
- **Browse and buy are two hierarchies with two rules.** `/nabidka` and every
  product page show price immediately; `/objednavka` asks location and day
  before a total. A walk-in standing on Husitská never has to say what day it
  is to find out what a Mišenec costs.
- **No `/kontakt` route.** For a two-location bakery, contact is two addresses,
  a phone number and an Instagram handle — the substance of `/pobocky`. A
  separate route would exist only to fill the nav.
- **The open/closed badge is progressive, never server-rendered.** Static
  markup carries the full week's hours as text; the live badge is added by
  script and is absent without it. A static page cannot know what day it is,
  so it must not claim to. The previous build froze a build-time status into
  the HTML and could assert "Otevřeno" at 3am.

## Truthfulness

- **STANDING RULE: where a fact is missing, the placeholder ships.** We never
  fill a gap with something plausible, and we never quietly drop a field to
  avoid showing the gap. Both are ways of lying. On a pitch page the visible
  gap is the product — it turns what is missing into an item the owner is
  buying rather than a defect he has to discover.

- **An allergen is published when someone has read the label, never inferred
  from an ingredient name.** Not soy from miso, not soy or wheat from
  gochujang, however likely. `allergens: null` renders nothing; an empty array
  is rejected by `scripts/validate-content.mjs` because it would quietly assert
  "contains no allergens".
- **No native speaker has validated any Czech on this site.** Every Czech
  string is logged in `CONTENT-TODO.md` §1 for bakery staff to read, and every
  new one gets appended there. The client's Czech is A2; treating his approval
  as native validation would be the same error as inferring an allergen.
- **No `aggregateRating` until the owner supplies a real figure.** A star
  rating published under a real business's name is a factual claim about that
  business. The 4.6 / 106 that was live was never owner-supplied.
- **The demo is `noindex, nofollow` with `Disallow: /`, and emits no sitemap.**
  It must not rank against the bakery's real listing. Publishing a sitemap
  beside a blanket disallow would hand crawlers the list of URLs they were just
  told not to fetch. Reversed only on the owner's written go-ahead.
