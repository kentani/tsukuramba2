// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'つくらんば',
      titleTemplate: 'つくらんば',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      htmlAttrs: {
        lang: 'ja'
      },
    }
  },
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  // vite: {
  //   define: {
  //     'process.env.DEBUG': false,
  //   }
  // },
  vite: {
    ssr: {
      noExternal: ["moment"],
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectID: process.env.FIREBASE_PROJECT_ID,
      firebaseStoragebucket: process.env.FIREBASE_STORAGEBUCKET,
      firebaseMessagingSenderID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppID: process.env.FIREBASE_APP_ID,
      fetchOgpApi: process.env.FETCH_OGP_API,
    }
  },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'つくらんば',
      description: "献立表",
      theme_color: "#795548",
      lang: "ja",
      short_name: "つくらんば",
      start_url: "/",
      display: "standalone",
      background_color: "#795548",
      icons: [
        // {
        //   src: "icons/36x36.png",
        //   sizes: "36x36",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/48x48.png",
        //   sizes: "48x48",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/72x72.png",
        //   sizes: "72x72",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/96x96.png",
        //   sizes: "96x96",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/128x128.png",
        //   sizes: "128x128",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/144x144.png",
        //   sizes: "144x144",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/152x152.png",
        //   sizes: "152x152",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/192x192.png",
        //   sizes: "192x192",
        //   type: "image/png"
        // },
        {
          src: "icons/256.png",
          sizes: "256x256",
          type: "image/png"
        },
        // {
        //   src: "icons/384x384.png",
        //   sizes: "384x384",
        //   type: "image/png"
        // },
        // {
        //   src: "icons/512x512.png",
        //   sizes: "512x512",
        //   type: "image/png"
        // }
      ]
    },
    workbox: {
      navigateFallback: null
    },
    devOptions: {
      enabled: true,
      type: "module"
    },
  },
})
