import UnpluginComponentsVite from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // css
  css: [
    "~/assets/sass/vendor.scss",
    "~/assets/sass/app.scss",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],

  // build
  build: {
    transpile: ["@headlessui/vue", "primevue"],
    // @ts-ignore`
    extend(config: any, ctx: any) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
  },

  // modules
  modules: [
    "unplugin-icons/nuxt",
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@nuxt/content",
    "@vueuse/nuxt",
    "nuxt-windicss",
  ],

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
    ],
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "id", "ja", "ko"],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },

  // content
  content: {
    documentDriven: true,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: "github-dark",
    },
  },

  runtimeConfig: {
    FIREBASE_API_KEY: process.env.NUXT_PUBLIC_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.NUXT_PUBLIC_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NUXT_PUBLIC_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.NUXT_PUBLIC_MEASUREMENT_ID,
  },
});
