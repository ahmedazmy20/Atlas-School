# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## ⚙️ Project Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install

Start the development server on http://localhost:3000:

# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev

Build the application for production:

# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build

Preview the production build locally:

# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

# Nuxt Minimal Starter - Products Management Project

This is a **Products Management** web application built using Nuxt 4, Vue 3, and other modern web technologies. It allows users to view, add, edit, and delete products, with multi-language support.

---

## 🛠️ Technologies Used

- **Nuxt 4**  
  Server-side rendering (SSR) framework with excellent developer experience and SEO benefits.

- **Vue 3 (Composition API)**  
  Modern reactive component-based architecture for building interactive UIs.

- **NuxtUI (Tailwind CSS)**  
  Rapid UI styling with utility-first CSS.

- **Pinia**  
  State management library for Vue 3 to manage products globally.

- **Nuxt i18n**  
  Multi-language support (Arabic & English).

- **VeeValidate**  
  Custom form validation in forms.

- **Fetch API / fetch**  
  For handling API requests and retrieving product data.

---

## 🚀 Features Implemented

- Dynamic routing using Nuxt 4 file-based router.
- Server-Side Rendering (SSR) for SEO and performance.
- State management with Pinia.
- Styled UI with Tailwind CSS (via NuxtUI).
- Product management features:
  - View product details in a modal.
  - Add new products.
  - Edit existing products.
  - Delete products with confirmation modal.
- Search and filter products by name or category.
- Multi-language support (Arabic & English) using Nuxt i18n.
- Form validation with VeeValidate.
- API integration with fetch.

---

## ⚠️ Known Issues / Limitations

- Most data and operations are performed on shared API data, while some data is manually stored in Pinia, which may lead to conflicts or data loss on page refresh.
- Filtering by category is implemented using **U-Dropdown** in plain HTML rather than a standalone Vue component, reducing reusability and flexibility.
- Some challenges with TypeScript, especially defining types in Pinia and handling API data interfaces.

## 📖 References

- [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction)
- [NuxtUI CSS Documentation](https://ui.nuxt.com/docs/getting-started)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/v4/)

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

```
