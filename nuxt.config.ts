import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    experimental: {
      websocket: true,
      openAPI: true
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxthq/studio'
  ],

  css: ['~/assets/css/main.css'],

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, 'public/content')
      }
    }
  },

  mdc: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: [
        'json',
        'js',
        'ts',
        'html',
        'css',
        'vue',
        'bash',
        'markdown'
      ]
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-08',
})