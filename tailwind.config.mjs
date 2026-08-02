/*
 * The Phase 1 design system, enforced.
 *
 * `spacing`, `fontSize` and `colors` REPLACE Tailwind's defaults rather than
 * extending them. That is the whole point: with the default scale gone, `p-4`
 * and `text-gray-500` do not compile, so an off-system value fails the build
 * instead of quietly shipping. Phase 1 could only document the scale; this is
 * where it becomes impossible to break.
 *
 * Colour sample coordinates, the contrast matrix and the reasoning are in
 * DECISIONS.md, rendered in specimen/index.html.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    /* Six values, four sampled from the bakery's own photographs. Tailwind's
       default palette is deliberately absent — there is no gray-500 to reach
       for at 2am. */
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      brand: {
        orange: '#EA5F28',
        blue: '#2B3355',
        green: '#6FDC47',
        red: '#952312',
        ink: '#141413',
        chalk: '#FFFFFF',
      },
    },

    /* Fibonacci: each step is the sum of the two before it. Governs every
       margin, padding, gap and offset on the site. */
    spacing: {
      0: '0px',
      px: '1px',
      s1: '4px',
      s2: '8px',
      s3: '12px',
      s4: '20px',
      s5: '32px',
      s6: '52px',
      s7: '84px',
      s8: '136px',
    },

    /* Text on a tight 1.13 so sizes do not compete; display on 1.618 so they
       do. Body 17px to hero 72px is 4.24x. */
    fontSize: {
      t1: ['13px', { lineHeight: '1.45' }],
      t2: ['15px', { lineHeight: '1.5' }],
      t3: ['17px', { lineHeight: '1.6' }],
      t4: ['27px', { lineHeight: '1.25' }],
      t5: ['44px', { lineHeight: '1.08' }],
      t6: ['clamp(44px, 9vw, 72px)', { lineHeight: '1.0' }],
    },

    extend: {
      fontFamily: {
        display: ['Titan One', 'Titan One Fallback', 'system-ui', 'sans-serif'],
        body: ['Archivo', 'Archivo Fallback', 'system-ui', 'sans-serif'],
        utility: ['Barlow Condensed', 'Barlow Condensed Fallback', 'system-ui', 'sans-serif'],
      },

      maxWidth: {
        body: '64ch',
        display: '16ch',
        page: '1180px',
      },

      /* Image and icon dimensions are not spacing, so they live apart from the
         Fibonacci scale rather than bending it. */
      width: { icon: '20px', logo: '40px', 'logo-lg': '56px' },
      height: { icon: '20px', logo: '40px', 'logo-lg': '56px', header: '64px' },

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
