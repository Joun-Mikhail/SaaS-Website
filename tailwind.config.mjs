/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          /* The logo orange. Keeps its punch on large display text and as a
             fill, but only reaches 3.2:1 on cream — too low for small text. */
          orange: '#F4551E',
          /* Interactive fills carrying white text (5.1:1 against white). */
          'orange-deep': '#C44214',
          'orange-hover': '#A83A10',
          /* Small orange text on a light background (5.9:1 on white). */
          'orange-text': '#B23C10',
          cream: '#FAF6F1',
          charcoal: '#2C2C2C',
          /* Secondary text. Replaces charcoal at 40–60% opacity, which landed
             between 2.3:1 and 3.9:1 and failed WCAG AA. */
          muted: '#6B6B6B',
          warm: '#E8E0D6',
          /* Open/closed status, legible on white (5.0:1 and 4.8:1). */
          open: '#15803D',
          closed: '#DC2626',
        },
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
