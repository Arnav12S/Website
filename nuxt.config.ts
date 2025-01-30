// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxthub/core'
  ],

  devtools: {
    enabled: true
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    '/projects': { index: true },
    '/projects/**': { middleware: ['project-access'] }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    experimental: {
      openAPI: true
    },
    prerender: {
      routes: [
        '/',          // Home page
        '/projects'   // Projects page
      ],
      crawlLinks: true,
      ignore: [
        '/login',     // Ignore login page
        '/signup',    // Ignore signup page
        '/pricing',   // Ignore pricing page
        '/contact',   // Ignore contact page
        '/projects/**' // Ignore all sub-routes under projects
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
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  }
})
