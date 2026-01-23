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
        // Duende color palette
        cloud: {
          50: '#ffffff',
          100: '#fafaf9',
          200: '#f7f7f5',
          300: '#f4f3ee', // Cloud Dancer - main background
          400: '#eeeee8',
          500: '#e5e4dd',
          600: '#d4d3ca',
          700: '#b8b7ad',
          800: '#8f8e84',
          900: '#6b6a62',
        },
        royal: {
          50: '#e6eaf8',
          100: '#ccd5f1',
          200: '#99abe3',
          300: '#6681d5',
          400: '#3357c7',
          500: '#00239D', // Deep royal blue - main color
          600: '#001c7e',
          700: '#00155e',
          800: '#000e3f',
          900: '#00071f',
        },
        orange: {
          50: '#fff4ed',
          100: '#ffe8db',
          200: '#ffd1b7',
          300: '#ffba93',
          400: '#ffa36f',
          500: '#FF5C00', // Orange - accent color
          600: '#cc4a00',
          700: '#993700',
          800: '#662500',
          900: '#331200',
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
