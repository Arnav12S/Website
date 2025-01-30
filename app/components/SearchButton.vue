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
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))

const searchTerm = ref('')

// Enhance the search content for CV
const enhancedFiles = computed(() => {
  return files.value.map(item => {
    if (item.path === '/cv') {
      // Combine all relevant fields into a single searchable string
      const searchableContent = [
        item.title,
        item.description,
        item.summary,
        ...item.experience.flatMap(exp => [
          exp.title,
          exp.company,
          exp.duration,
          exp.location,
          ...exp.details
        ]),
        ...item.education.flatMap(edu => [
          edu.degree,
          edu.institution,
          edu.location,
          edu.year
        ]),
        ...item.skills
      ].join(' ').toLowerCase() // Convert to lowercase for case-insensitive search

      return {
        ...item,
        _searchContent: searchableContent
      }
    }
    return item
  })
})
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>