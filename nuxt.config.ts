// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    icon: {
      source: './public/pwa-512x512.png',
    },
    meta: {
      name: 'Password Generator',
      appleStatusBarStyle: 'black-translucent',
    },
  },
  app: {
    head: {
      title: 'Password Generator',
      meta: [
        { name: 'description', content: 'My amazing site.' },
        { name: 'theme-color', content: '#040F2D' },
      ],
    },
  },
  i18n: {
    // locales: ['de', 'en', 'es', 'fr', 'pl'],
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.yml',
        name: 'English',
      },
      {
        code: 'de',
        iso: 'de-DE',
        file: 'de.yml',
        name: 'Deutsch',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.yml',
        name: 'Français',
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.yml',
        name: 'Spanisch',
      },
      {
        code: 'pl',
        iso: 'pl-PL',
        file: 'pl.yml',
        name: 'Polnisch',
      },
    ],
    langDir: 'locales',
    strategy: 'no_prefix',
    debug: false,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      // alwaysRedirect: true
      // cookieKey: 'i18n_redirected',
      // // cookieKey: 'my_custom_cookie_name',
      // redirectOn: 'root'
    },
  },
})
