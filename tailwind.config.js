/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'bangla-sans': ['var(--font-bangla-sans)'],
        'bangla-display': ['var(--font-bangla-display)'],
      },
      fontSize: {
        'bangla-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'bangla-base': ['1.0625rem', { lineHeight: '1.7' }],
        'bangla-lg': ['1.1875rem', { lineHeight: '1.75' }],
      }
    },
  },
  plugins: [],
}