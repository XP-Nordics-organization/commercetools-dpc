# Project: @commercetools-dpc

Based on DPC Turbo _Mini_ Starter Project

It contains a _NextJS_ App with a UI Library package.


## Packages source files:

- The web app (_@commercetools-dpc/web_) - /apps/web
- UI lib (_@commercetools-dpc/web-ui_) - /packages/ui/web-ui

---

First of course is to install all packages:

`yarn install`

## Start development server for web app

`yarn dev:web`

Available at http://localhost:3000

---

## Run development server for ui lib using Storybook

`yarn dev:storybook`

Available at http://localhost:6006

---

## To build the web app for deploy

`yarn build:web`

Generated app can be found at: /apps/web/.next

---

## Building storybook for deploy

`yarn build:storybook`

### Special notes

- algolia products URL: http://localhost:3000/algolia
- commercetools products URL: http://localhost:3000/commercetools
- redirecting happens from page "/" to "/algolia" in next.config.js inside app/web folder
- run development mode (root dir):  yarn dev:web (this will also build packages before running dev mode)
- build all packages (root dir): yarn build:packages
- UI components are inside packages/ui/web
- Remember to update your algolia + commercetools tokens inside ".env.development" in apps/web folder
- tailwindcss is enabled both for the app (nextjs application) and the ui components (react + typescript)
- headlessui library is being utilised for some part of the overall UI but there are no limits. use whatever you want.
- all HTTP request are cached by default - except those that are being requested in client components - inside the app (nextjs application - apps/web folder). you can use https://tanstack.com/query/v3/ to handle client-side fetching and caching. pretty nice library

---

For questions contact bjorn.allvin@accenture.com
