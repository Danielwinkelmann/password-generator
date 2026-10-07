import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/icon',
  ],

  icon: {
    // Inline SVGs so icon paths can be animated; bundle them so the PWA works offline
    mode: 'svg',
    clientBundle: {
      scan: true,
    },
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'The Password App',
      short_name: 'Password Generator',
      theme_color: '#040F2D',
      background_color: '#040F2D',
      display: 'standalone',
      lang: 'en',
    },
    pwaAssets: {
      image: 'public/pwa-512x512.png',
      preset: 'minimal-2023',
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },

  // Emit the SPA shell as static index.html so the service worker can serve it offline
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  app: {
    head: {
      title: 'Password Generator',
      // cover lets the dark background run under the notch and home indicator
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'description', content: 'My amazing site.' },
        { name: 'theme-color', content: '#040F2D' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Password Generator' },
      ],
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.yml',
        name: 'English',
      },
      {
        code: 'de',
        language: 'de-DE',
        file: 'de.yml',
        name: 'Deutsch',
      },
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.yml',
        name: 'Français',
      },
      {
        code: 'es',
        language: 'es-ES',
        file: 'es.yml',
        name: 'Español',
      },
      {
        code: 'pl',
        language: 'pl-PL',
        file: 'pl.yml',
        name: 'Polski',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
    },
  },

  compatibilityDate: '2026-10-07',
})
