/*
 * The Phase 1 design system, expressed as tokens.
 *
 * These are added to Tailwind's defaults rather than replacing them, because
 * Phase 1 builds nothing — the existing components still reference the old
 * scale and rewriting them here would be building. Phase 3 replaces
 * `theme.spacing` and `theme.fontSize` outright, which is what makes an
 * arbitrary value impossible rather than merely discouraged.
 *
 * The full rationale, including the colour sample coordinates and the
 * contrast matrix, is in DECISIONS.md and rendered in specimen/index.html.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* Sampled — never invented. See DECISIONS.md for file + coordinates. */
        brand: {
          orange: '#EA5F28',
          blue: '#293254',
          green: '#6FDC47',
          red: '#952312',
          ink: '#141413',
          chalk: '#FFFFFF',

          /* Retired in Phase 3. Kept only so the current components still
             compile until they are rebuilt onto the tokens above. */
          'orange-hover': '#D94A18',
          cream: '#FAF6F1',
          charcoal: '#2C2C2C',
          warm: '#E8E0D6',
        },
      },

      /* Fibonacci: each step is the sum of the two before it. */
      spacing: {
        s1: '4px',
        s2: '8px',
        s3: '12px',
        s4: '20px',
        s5: '32px',
        s6: '52px',
        s7: '84px',
        s8: '136px',
      },

      /* Text sizes on a tight 1.13 ratio, display sizes on 1.618.
         Body 17px to hero 72px is 4.24x. */
      fontSize: {
        t1: ['13px', { lineHeight: '1.45' }],
        t2: ['15px', { lineHeight: '1.5' }],
        t3: ['17px', { lineHeight: '1.6' }],
        t4: ['27px', { lineHeight: '1.25' }],
        t5: ['44px', { lineHeight: '1.08' }],
        t6: ['clamp(44px, 9vw, 72px)', { lineHeight: '1.0' }],
      },

      maxWidth: {
        body: '64ch',
        display: '16ch',
      },

      fontFamily: {
        display: ['Titan One', 'system-ui', 'sans-serif'],
        body: ['Work Sans', 'system-ui', 'sans-serif'],
        utility: ['Barlow Condensed', 'system-ui', 'sans-serif'],
      },

      transitionTimingFunction: {
        settle: 'cubic-bezier(0.22, 1, 0.36, 1)',
        shift: 'cubic-bezier(0.65, 0, 0.35, 1)',
        tap: 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionDuration: {
        tap: '120ms',
        move: '240ms',
        enter: '420ms',
      },
    },
  },
  plugins: [],
};
