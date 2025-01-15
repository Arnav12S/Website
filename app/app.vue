<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '~/components/AppHeader.vue'
import Footer from '~/components/AppFooter.vue'
import AskAI from '~/components/AskAI.vue'
import { useLinks } from './composables/useLinks'
import type { ParsedContent } from '@nuxt/content'

const { links } = useLinks()
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
provide('files', files)

// Color Mode Handling
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Arnav Sudhansh',
  ogImage: 'https://arnav.blog/social-card.png',
  twitterImage: 'https://arnav.blog/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator />
    <Header :links="links" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AskAI />
    <Footer />
    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
    </ClientOnly>
    <UNotifications />
  </div>
</template>
