# `Vite + Vue 3 + Tailwind CSS`

![Vite, Vue, Tailwind CSS](https://user-images.githubusercontent.com/11320080/111277027-a9384c00-8640-11eb-8323-21889bd7c609.png)

Libraries:
- [Tailwind CSS v3.0.0-alpha ⚠](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.0-alpha.1)
- [Vue Router 4.x](https://github.com/vuejs/vue-router-next)
- [Vuex 4.x](https://next.vuex.vuejs.org/)
- [Inter var font](https://github.com/rsms/inter) (self-hosted, woff2, v3.19, with 'preload' attr, check out index.html)
- [Headless UI](https://headlessui.dev/vue/menu) - unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS
- [Heroicons](https://github.com/tailwindlabs/heroicons#vue) - beautiful hand-crafted SVG icons
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

Plugins needed for Tailwind UI:
- [tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
- [tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [tailwindcss/line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)
- [tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

Structure:
- Api (Communications to API)
- Assets (CSS/SCSS)
- Components (Custom Vue Components)
- Data Bags (Static variable for json data)
- Layouts
- Libraries
- Middleware
- Mixins
- Pages
- Store (Vuex Modular)

### Getting Started 🚀

npm:
```sh
npm i
npm run dev
npm run build
npm run serve
```

yarn:
```sh
yarn
yarn dev
yarn build
yarn serve
```

#### Bonus links
- [Enabling https on localhost](https://github.com/web2033/vite-vue3-tailwind-starter/discussions/112) (dev notes)
- [Vite dev server with netlify dev support](https://github.com/web2033/vite-vue3-tailwind-starter/discussions/113) (dev notes)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - recommended (instead of Vetur) VSCode extension built specifically for Vue 3
- [Pinia](https://pinia.esm.dev/introduction.html) - state-management alternative to Vuex 4 with a similar to upcoming Vuex 5 API
- [VueUse](https://vueuse.org/functions.html) - collection of essential Vue Composition Utilities