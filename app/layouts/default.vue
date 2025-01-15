<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
provide('files', files)
</script>

<template>
  <div>
    <UMain>
      <slot />
    </UMain>
  </div>
</template>
