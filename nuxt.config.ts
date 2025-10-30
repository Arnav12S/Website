// https://nuxt.com/docs/api/configuration/nuxt-config
const isCloudflare = process.env.NITRO_PRESET?.startsWith('cloudflare') || process.env.CLOUDFLARE === 'true'

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    isCloudflare && '@nuxthub/core'
  ].filter(Boolean) as string[],

  css: ['@/assets/css/main.css'],

  devtools: {
    enabled: true
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    '/projects': { prerender: true },
    '/projects/**': { prerender: false }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    preset: process.env.NITRO_PRESET || 'github_pages',
    experimental: {
      openAPI: true
    },
    prerender: {
      routes: [
        '/',
        '/projects'
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
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton', 'UIcon'].includes(c.pascalName))
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
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        },
        remarkPlugins: {
          'remark-emoji': {},
          'remark-squeeze-paragraphs': {}
        }
      }
    },
    renderer: {
      anchorLinks: {
        h2: true,
        h3: true,
        h4: true
      }
    },
    watch: {
      enabled: true
    },
    preview: {
      api: 'https://api.nuxt.studio'
    },
    ...(isCloudflare ? {
      database: {
        type: 'd1',
        bindingName: 'DB'
      }
    } : {})
  },

  // Nuxt Hub configuration (Cloudflare only)
  ...(isCloudflare ? {
    hub: {
      ai: true,
      blob: true,
      browser: true,
      database: true,
    }
  } : {}),

})
