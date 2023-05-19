const {
  colors,
  colorsList,
} = require('@commercetools-dpc/web-ui/src/design-system/design-tokens')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/web/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  safelist: colorsList.map((color) => 'bg-' + color),
}
