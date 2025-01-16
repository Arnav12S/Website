// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxthub/core'
  ],

  devtools: {
    enabled: true
  },

  uiPro: {
    content: true
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    '/projects': { index: true },
    '/projects/**': { middleware: ['project-access'] },
    '/api/search.json': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: ['/',
        '/projects',
      ],
      crawlLinks: true,
      ignore: [
        '/login',
        '/signup',
        '/pricing',
        '/contact',
        '/projects/**'
      ]
    }
  },

  typescript: {
    strict: false
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    gitInfo: {
      name: 'nuxt',
      owner: 'Arnav12S',
      url: 'https://github.com/Arnav12S/Website'    
    }
  }
})
