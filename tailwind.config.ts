import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '66.375': '66.375rem',
        '64.25': '64.25rem',
        '34.125': '34.3125rem',
        '21.375': '21.375rem',
        '16.3125': '16.3125rem',
        '3.3125': '3.3125rem',
        '1.375': '1.375rem',
      }, 
    },
  },
  plugins: [],
}
export default config
