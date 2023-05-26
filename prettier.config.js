// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './apps/web/tailwind.config.js',
  tailwindAttributes: ['class', 'className', 'tw'],
}
