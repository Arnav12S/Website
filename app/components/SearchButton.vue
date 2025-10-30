<template>
  <UContentSearch
    v-model:search-term="searchTerm"
    :files="enhancedFiles"
    :navigation="navigation"
    :fuse="{ resultLimit: 10 }"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'

// Fetch navigation and search sections
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('content'))

const searchTerm = ref('')

// Define the interface for search items
interface SearchItem {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  // Add any other properties that might be available
}

// Enhance the search content
const enhancedFiles = computed(() => {
  return files.value.map((item: SearchItem) => {
    // Create a searchable content string from the available properties
    const searchableContent = [
      item.title,
      item.content
    ].filter(Boolean).join(' ').toLowerCase()

    return {
      ...item,
      _searchContent: searchableContent
    }
  })
})
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>