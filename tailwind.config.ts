import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial palette inspired by humanbeyondtech.com
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1ea',
          300: '#f0e9dd',
          400: '#ebe0cf',
          500: '#e6d7c1', // Main cream background
          600: '#d4c1a8',
          700: '#c2ab8f',
          800: '#a08e75',
          900: '#7e6f5c',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e8ebe8',
          200: '#d1d7d1',
          300: '#b1bcb1',
          400: '#8f9e8f',
          500: '#6b7c6b', // Main sage green
          600: '#5a6a5a',
          700: '#4a574a',
          800: '#3a453a',
          900: '#2b332b',
        },
        terracotta: {
          50: '#fdf6f4',
          100: '#fae8e3',
          200: '#f5d1c7',
          300: '#efb4a3',
          400: '#e89177',
          500: '#d97556', // Main terracotta accent
          600: '#c45d3f',
          700: '#a34b32',
          800: '#853d2a',
          900: '#6b3324',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
