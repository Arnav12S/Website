export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      secondary: 'amber',
      neutral: 'slate',
      error: 'red',
      success: 'green',
      warning: 'yellow',
      info: 'blue',
    },
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid'
      }
    },
    // Add some global radius configuration
    radius: 'rounded-lg',
    container: {
      base: 'mx-auto',
      padding: 'px-4 sm:px-6 lg:px-8',
      constrained: 'max-w-7xl'
    }
  },

  // Site metadata
  siteMetadata: {
    siteName: 'Arnav Sudhansh Portfolio',
    description: 'Strategist · Developer · Problem Solver',
    author: 'Arnav Sudhansh',
  },

  // Theme configuration
  theme: {
    colors: {
      primary: 'var(--theme-primary)',
      background: 'var(--theme-background)',
      text: 'var(--theme-text)',
    },
    fonts: {
      body: 'var(--fontSans)',
      heading: 'var(--fontMono)',
    },
  },

  // API endpoints
  apiEndpoints: {
    user: '/api/resume',
    posts: '/api/ai',
  },

  // Feature toggles
  featureToggles: {
    enableChat: true,
    betaFeatures: false,
  },

  // Animation classes
  animations: {
    fadeIn: 'animation-fadeIn 0.5s ease-in',
    fadeOut: 'animation-fadeOut 0.5s ease-out',
  },

  // Error handling configuration
  errorHandler: {
    logErrors: true,
    notifyUser: true,
  },

  // Font configuration
  fonts: {
    preload: [
      {
        href: '/IBMPlexMono-Light.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: true
      },
      {
        href: '/augillion.otf',
        as: 'font',
        type: 'font/otf',
        crossorigin: true
      }
    ],
    links: [
      { rel: 'preconnect', href: 'https://api.fontshare.com' },
      { rel: 'preconnect', href: 'https://cdn.fontshare.com' },
      { href: 'https://api.fontshare.com/css?f[]=satoshi@1&display=swap', rel: 'stylesheet' }
    ]
  },

  // Icon configuration
  icons: {
    preload: [
      {
        src: 'https://code.iconify.design/iconify-icon/2.0.0/iconify-icon.min.js',
        key: 'iconify-icon'
      }
    ]
  },

  // Head configuration
  head: {
    title: 'Arnav Sudhansh',
    meta: [
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'author', content: 'Arnav Sudhansh' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      {
        name: 'description',
        content: 'Arnav Sudhansh — strategist · developer · problem solver'
      },
      { name: 'twitter:site', content: '@arnavsudhansh' },
      { name: 'twitter:creator', content: '@arnavsudhansh' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:image:alt',
        content: 'Arnav Sudhansh — strategist · developer · problem solver'
      },
      { name: 'twitter:title', content: 'Arnav Sudhansh' },
      {
        name: 'twitter:description',
        content: 'Arnav Sudhansh — strategist · developer · problem solver'
      },
      { name: 'twitter:image', content: 'https://arnav.blog/arnav.png' },
      { property: 'og:url', content: 'https://arnav.blog' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Arnav Sudhansh' },
      {
        property: 'og:description',
        content: 'Arnav Sudhansh — strategist · developer · problem solver'
      },
      { property: 'og:image', content: 'https://arnav.blog/arnav.png' },
      { property: 'og:image:alt', content: 'Arnav Sudhansh' },
      { property: 'og:image:width', content: '1280' },
      { property: 'og:image:height', content: '720' },
      { name: 'theme-color', content: '#FFD9AD' }
    ],
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/ico',
        sizes: '256x256'
      },
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ]
  },
  nuxtIcon: {
    aliases: {
      'raspberry-pi': 'logos:raspberry-pi',
      'arduino': 'vscode-icons:file-type-arduino',
      'notion': 'simple-icons:notion',
      'devto': 'ic:outline-logo-dev',
      'html': 'vscode-icons:file-type-html',
      'css': 'vscode-icons:file-type-css',
      'tailwindcss': 'vscode-icons:file-type-tailwind',
      'javascript': 'vscode-icons:file-type-js',
      'typescript': 'vscode-icons:file-type-typescript',
      'php': 'vscode-icons:file-type-php',
      'node': 'vscode-icons:file-type-node',
      'vite': 'vscode-icons:file-type-vite',
      'vue': 'vscode-icons:file-type-vue',
      'nuxt': 'vscode-icons:file-type-nuxt',
      'vuetify': 'logos:vuetifyjs',
      'express': 'simple-icons:express',
      'fastify': 'simple-icons:fastify',
      'nestjs': 'logos:nestjs',
      'feathersjs': 'logos:feathersjs',
      'adonisjs': 'logos:adonisjs-icon',
      'laravel': 'logos:laravel',
      'rails': 'logos:rails',
      'mongo': 'vscode-icons:file-type-mongo',
      'wordpress': 'logos:wordpress-icon',
      'docker': 'vscode-icons:file-type-docker',
      'dialogflow': 'logos:dialogflow',
      'heroku': 'logos:heroku-icon',
      'netlify': 'vscode-icons:file-type-netlify',
      'digital-ocean': 'logos:digital-ocean',
      'nginx': 'vscode-icons:file-type-nginx',
      'postgresql': 'logos:postgresql',
      'mysql': 'vscode-icons:file-type-mysql',
    },
  },
})