// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    // Other modules
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    // The correct configuration for vee-validate
    ["@vee-validate/nuxt", { autoImports: true }],
  ],
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    locales: [
      { code: "en", file: "en.json", iso: "en-US", name: "English" },
      { code: "ar", file: "ar.json", iso: "ar-EG", name: "العربية" },
    ],
    strategy: "no_prefix",
    defaultLocale: "en",
    langDir: "lang/",
    detectBrowserLanguage: {
      useCookie: true, // يخزن اللغة في Cookie
      cookieKey: "i18n_redirected", // اسم الكوكي
      redirectOn: "root", // يوجّه للغة الصح عند الدخول
      alwaysRedirect: false, // مش كل مرة يعمل Redirect
    },
  },

  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    baseURL: import.meta.env.NUXT_APP_BASE_URL || "/",
  },

  nitro: {
    preset: import.meta.env.NUXT_PRESET || undefined,
  },

  // colorMode: {
  //   preference: "light",
  //   fallback: "light",
  //   classSuffix: "",
  //   storageKey: "nuxt-color-mode",
  // },
});
