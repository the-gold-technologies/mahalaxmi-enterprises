import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hpRed: '#eb1e25',
        hpRedHover: '#c4141a',
        hpNavy: '#002b5c',
        hpDarkBlue: '#07192f',
        hpLightGrey: '#f4f6f9',
      },
    },
  },
  plugins: [],
};
export default config;
