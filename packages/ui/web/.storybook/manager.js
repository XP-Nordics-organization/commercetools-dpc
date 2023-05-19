import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'DPC Turbo-<br/>Basic Component Library',
  }),
})
