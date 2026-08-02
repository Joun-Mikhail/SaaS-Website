# Reference only — never served to a user

Phone screenshots taken from Instagram stories. Every one of them has
**Instagram UI burnt into the pixels** — status bar, story ring, "Send
message" bar, and in one case a video scrubber.

**These images must never appear on the site.** Not cropped, not resized, not
as a background. They are source material to read, not to publish.

## What they are for

They are the evidence behind the observed prices, product names and allergen
codes recorded in `CONTENT-TODO.md` — the wall menu, the price tags, the
shelf. Keep them so the shop walk has something to check against: the tags
carry allergen codes (`A: 1, 3, 7, 11` was legible on the máslová burgerová
bulka) and prices that do not match what the site currently shows.

## Why they are not in the build

`assets/` sits outside `public/`, and Astro only copies `public/` into
`dist/`. Nothing in this folder can reach the built site by accident. The
sitemap integration is disabled for the demo, so there is nothing to exclude
there either.

23 files, ~35 MB.
