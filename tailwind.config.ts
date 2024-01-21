export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-full-bleed'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dim'],

          '--rounded-box': '0.25rem',
          '--rounded-btn': '.125rem',
          '--rounded-badge': '.125rem',

          'base-100': '#080808',
          'base-200': '#040404',
          'base-300': '#040404',

          primary: '#45AEEE',
          secondary: '#E8488A',
          accent: '#FFF232',

          info: '#42A5F5',
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#EF5350',
        },
      },
    ],
  },
};
