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
        light: {
          ...require('daisyui/src/theming/themes')['cmyk'],

          '--rounded-box': '0.25rem',
          '--rounded-btn': '.125rem',
          '--rounded-badge': '.125rem',

          primary: '#45AEEE',
          secondary: '#E8488A',
          accent: '#FFF232',

          info: '#0288D1',
          success: '#2E7D32',
          warning: '#ED6C02',
          error: '#D32F2F',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dim'],

          '--rounded-box': '0.25rem',
          '--rounded-btn': '.125rem',
          '--rounded-badge': '.125rem',

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
