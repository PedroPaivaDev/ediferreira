/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'blackShadowInset': 'inset 0 0 100px 50px black',
        'whiteShadowInset': 'inset 0 0 100px 50px white',
        'blackShadowInsetBottom': 'inset 0 -150px 150px -100px black'
      },
      colors: {
        'mood': {
          'light': '#faf0e9',
          'primary': '#1e4d2a',
          'secondary': '#6f8474',
          'tertiary': '#cb97a5',
          'quaternary': '#c6aec3',
          'quintenary': '#745070'
        }
      }
    },
  },
  plugins: [],
}