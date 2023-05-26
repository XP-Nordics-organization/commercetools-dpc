const { colors, colorsList } = require('./src/design-system/design-tokens')

module.exports = {
  darkMode: false, // or 'media' or 'class'
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  safelist: colorsList.map((color) => 'bg-' + color),
}
