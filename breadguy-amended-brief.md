# Bread Guy — Amended Brief: Structure & Finish

**Supersedes `breadguy-demo-build-brief.md`.** Same phase discipline, recalibrated target.

---

## What changed and why

The reference is now **wtbakery.cz** — a real Brno competitor with a branch on Josefská, two streets from Breadbar.

Read what WT actually is before copying anything from it. Under the design sits a full commerce product: seven locations with pickup time-slot selection, delivery across Brno and Praha, a loyalty programme, a B2B portal, merch, vouchers, and a headless CMS. **The impression of quality comes from structure and finish, not from effects.** There is no physics, no custom cursor, no WebGL on that site. It feels expensive because the typography is disciplined, the spacing is generous and consistent, the photography is professional, the transitions are quiet, and the information architecture answers questions in the order a customer asks them.

That is the target. Not WT's aesthetic — WT's *level*.

### What we are NOT doing

Copying WT's visual language. It's French-artisan restraint: elegant, serif, calm, muted. Bread Guy is a fat orange roundel with marker lettering and "A BRNO BAKERY" hand-painted on a steel counter. Grafting WT's register onto that brand produces something that looks borrowed, and a bakery owner who sees his competitor's site wearing his own logo will say no.

### The actual instruction

**WT's structure and finish. Bread Guy's identity.** Loud brand, disciplined execution. The orange stays, the marker lettering stays, the crate colours stay — but every spacing decision, every type size, every transition is held to the standard of a site with a real budget.

### The physics

Demoted, not deleted. One moment on the home page — a collage section where the bread cutouts can be thrown — rather than a philosophy applied everywhere. It's the thing you hand someone across a counter. It is not the reason the site looks professional, and treating it as such is what produced the last two rejected designs.

---

## THE PROMPT

```
Bread Guy bakery website. I'm the client, you're the developer. Work in
phases; I'll tell you which phase to start. Never begin the next without
being asked.

READ FIRST: `breadguy-amended-brief.md` in the repo root. It supersedes
`breadguy-demo-build-brief.md`.

CONTEXT: this is a SPEC DEMO to pitch the bakery owner, not a launch build.
Placeholders are part of the offer — they must look deliberate and designed,
never broken. Log content gaps in CONTENT-TODO.md and keep building; do not
stop to ask me for descriptions, prices, or ingredients.

Exceptions that must be real: opening hours, both addresses, phone, product
names, and a working allergens field (schema present and validating, values
empty and visibly flagged). Wrong hours on his phone ends the pitch.

REFERENCE: wtbakery.cz — a direct Brno competitor. Study its STRUCTURE and
FINISH, not its aesthetic:
  - Information architecture: what a customer is asked, and in what order.
  - Typographic discipline: a small type scale, used consistently, never
    improvised per section.
  - Spacing: generous, rhythmic, obviously systematic rather than eyeballed.
  - Quiet transitions: nothing announces itself.
  - The commerce spine: pickup location, day, time slot — an ordering flow
    that treats the customer as someone who wants bread on Thursday.

DO NOT copy WT's visual language. It's French-artisan restraint — elegant
serif, muted, calm. Bread Guy is a fat orange roundel with chunky hand-drawn
marker lettering and "A BRNO BAKERY" painted on a steel counter. Keep that
identity. Apply WT's level of execution to it.

ANTI-BRIEF — if any appears, you've gone wrong: cream background, thin serif
display face, terracotta accent (#D97757 or near), hairline rules, the words
"artisan" / "craft" / "passion for bread". Also wrong: anything that looks
like a WT clone with an orange swap.

HOW WE WORK
- One branch, one PR per phase: `feat/phase-N-name`. Conventional commits.
- End of each phase: STOP. Screenshots at 390px and 1440px, exit criteria
  with pass/fail against each, and anything you guessed. Then wait.
- Disagree with the brief? Argue before deviating.
- Keep DECISIONS.md — every non-obvious choice, one line, with the reason.

HARD RULES, EVERY PHASE
- Czech default. English at /en/, don't break it.
- Never alter an opening hour, address, phone number, or product name.
- No stock photography.
- First screen — logo, headline, hours, both addresses, phone — renders from
  plain HTML and CSS with JavaScript disabled. Heavy libraries load after it
  paints. Survives every phase.
- prefers-reduced-motion: reduce turns animation off, not down.
- Keyboard focus visible. DOM order sane.
- No secrets in the repo.
```

---

## The phases

### Phase 0 — Audit and competitive teardown
No code.

- Full repo report: routes, components, content sources, styling, build and deploy.
- **Record the current live site's Lighthouse mobile scores, all four categories, real numbers.** You cannot recover this later and it's the strongest line in the pitch.
- **Teardown of wtbakery.cz:** its information architecture as a sitemap; the order of questions in its ordering flow; its type scale and spacing system as measured values; every structural pattern worth stealing. Explicitly separate *structure worth taking* from *aesthetic we're rejecting*.
- List what's blocked on a decision only I can make.

**Exit:** written report, zero code changes.

### Phase 1 — The system
Written plan plus a rendered specimen. No components touched.

This phase is where "expensive" is decided. WT looks costly because someone built a system and then obeyed it.

- **Spacing scale.** One scale, 6–8 steps, geometric. Every margin and padding on the site comes from it. No arbitrary values, ever. This single discipline separates professional work from AI-generated work more reliably than any other choice.
- **Type scale.** 5–6 sizes, a 4× minimum jump from body to hero, consistent line heights and measure. Small and obeyed beats large and improvised.
- **Three typefaces:** display carrying the logo's marker energy (rounded, chunky, irregular — not a serif); body comfortable at 16px; utility for prices and allergen codes. Verify `ě š č ř ž ý á í é ú ů ň ť ď` render correctly in all three and show a specimen.
- **Palette:** brand orange sampled from `logo-original.webp`, supporting colours pulled from the photographs themselves — kitchen-tile blue, crate green and red. That palette is uncopyable because it's his actual shop.
- **Motion vocabulary:** two or three easing curves and two or three durations, named, used everywhere. Quiet by default.
- **The placeholder component,** designed as a first-class citizen. It's a demo deliverable.

Then critique your own plan: for each token, would you have produced this for any bakery, or for this one? Revise what's generic and report what changed.

**Exit:** approved system plus specimen. Nothing built.

### Phase 2 — Information architecture
Structure before pixels. This is the WT lesson.

- Sitemap: every route, and what question each one answers.
- Home page section order, justified by what a customer wants first. Hours and nearest location stay above the fold on mobile.
- Navigation model, including how the ordering flow is reached from anywhere.
- Wireframes in ASCII at 390px and 1440px. No colour, no type, no decoration — structure only.

**Exit:** approved wireframes. Still nothing built.

### Phase 3 — Static build
The whole visual direction, zero JavaScript. **This is the decision point** — if the design is wrong, it's wrong here.

Every spacing and type value from the Phase 1 system, no exceptions. Colour-blocked sections, sticker collage from the cutouts, oversized display type, signature product cards, CSS-only hover states.

**Exit:** Lighthouse mobile ≥ 90 performance, 100 accessibility. Fully functional with JS disabled. Zero layout shift. Screenshots both widths.

**Do not** install GSAP, Lenis, or matter.js in this phase.

### Phase 4 — The ordering flow
**The pitch centrepiece.** This is what WT has and your boss doesn't.

A mock pickup-order flow, front-end only, no payments, no backend:

- Choose location → day → time slot. Slots respect the real opening hours per location, which means Sunday at Královo Pole has to behave correctly.
- Choose products and quantities from the real menu.
- Name and phone.
- A summary screen stating exactly what happens next.
- Submission is mocked: a confirmation screen and a clearly-labelled note that connecting a real inbox and payment is part of completion.
- State persists across a page refresh.
- Every step keyboard-navigable, every error message specific and in Czech.

Build it in Bread Guy's voice — chalkboard tags, marker lettering, orange — not WT's.

**Exit:** the full flow completes on a phone without a dead end. Screenshots of every step at 390px. Validation and error states demonstrated.

### Phase 5 — Motion foundation
Invisible plumbing. Gets the rest right or makes it painful.

Single motion entry point, dynamically imported after first paint. One global reduced-motion check every later effect reads from. Lenis behind the same gate. A capability module testing viewport, reduced-motion, `saveData`, WebGL, coarse pointer — every heavy feature asks it for permission. A budget file recording current bundle size.

**Exit:** first screen identical with JS off. Lighthouse unchanged from Phase 3.

**Do not** add a visible animation.

### Phase 6 — Finish
The quiet layer that reads as expensive.

Page transitions. Product card lift with the image scaling inside a fixed frame — crop stays put, photo grows. Staggered section reveals, subtle. Marquee band of product names in the logo lettering. Sticky header carrying the ordering CTA.

Every value from the Phase 1 motion vocabulary. If an animation announces itself, it's wrong.

### Phase 7 — The one loud moment
Physics, contained to a single home-page collage section.

matter.js, bread cutouts as draggable bodies with mass and friction tuned to feel like bread. **Touch drag with momentum is the priority** — this gets demoed on a phone. Bodies settle, never escape the viewport, never pile up unusably. Canvas behind the text layer, text stays selectable. Pauses off-screen. Skipped under reduced-motion, save-data, or narrow viewport, falling back to the Phase 3 static collage, which must read as deliberate.

**Exit:** 60fps on a mid-range Android, measured. Bundle cost against budget. Video of the touch interaction.

**Do not** put physics on the hero or anywhere else.

### Phase 8 — The rest of the site
Locations, menu, about, contact, 404, and the `/en/` mirror. One motion vocabulary throughout. 404 routes to Locations. Empty and placeholder states written in the interface's voice: what's missing, what happens next, no apologising.

### Phase 9 — The pitch route
`/pitch`, reachable by URL, `noindex`, excluded from the sitemap.

- His current site's Lighthouse scores against ours. Real numbers, plainly presented.
- **Side by side with wtbakery.cz on the things that matter:** ordering flow, mobile performance, allergen information, structured data. Name the competitor. He knows exactly who they are and where they are.
- What's built: ordering flow, allergen system, bilingual, mobile-first, structured data.
- What's placeholder and why, framed as what completion covers.
- What completion includes: private domain, product descriptions, allergen values, photography for the missing items, connecting the order flow to a real inbox, Google Business integration, handover training.
- Built in the site's own visual language. **Designed for a phone held at arm's length across a counter** — big type, short lines, ninety seconds to read.

Leave prices out. I'll write those.

### Phase 10 — Hardening
Real-device testing on mid-range Android and iOS Safari. Throttled 4G: first screen usable under 1.5s, non-negotiable. Full axe pass on every route, both languages, reduced-motion on. Lighthouse mobile: performance ≥ 85 loaded, accessibility 100, SEO ≥ 95 — the bar is higher than the earlier maximalist brief because the physics is now one section instead of a philosophy. schema.org `Bakery` per location with `openingHoursSpecification`, `geo`, `telephone`. Unique Czech titles and meta descriptions, sitemap, robots.txt, real Open Graph image. Memory-leak check across twenty route navigations.

### Phase 11 — Portfolio hardening
Runs whether he buys or not. `README.md` written for a hiring manager: real Brno bakery, two locations, the problem, the stack, the ordering flow, the allergen system, Lighthouse before → after with real numbers, screenshots, live link. `DECISIONS.md` finalised into something you can talk through in an interview. `EDITING.md` in Czech for a non-developer, with screenshots.

---

## Your jobs, not the build's

1. **A domain that isn't a vercel.app subdomain.** Half of what you're selling is "this looks like a company."
2. **Merge or close the open PRs**, commit this brief to the repo root, commit `assets/breadguy-photos/` including `cutouts/`.
3. **Check the cutout contact sheet** — the shots with hands may have come out badly, and the collage is the loud moment.
4. **Record his current Lighthouse mobile score before Phase 3.** Unrecoverable later.
5. **Screenshot wtbakery.cz's ordering flow on your phone** before the pitch. Showing him what the competitor two streets from Breadbar can do, then showing him yours, is the whole argument.
6. **Rehearse.** Hand your phone to someone cold. Watch whether they find the ordering flow without being told. If they don't, that's a Phase 2 failure, not a Phase 4 one.
