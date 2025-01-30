<template>
  <UContainer>
    <UPageHeader
      title="My Projects"
      description="A collection of projects I've worked on, from business analysis to web development."
      class="py-12"
    >
      <template #headline>
        <!-- Category Filter -->
        <USelect
          v-model="selectedCategory"
          :options="['All', ...categories]"
          size="sm"
          class="w-48"
        />
      </template>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <UPageGrid>
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.path"
            :project="project"
          />
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Get projects list directly without needing a projects.md file
const { data: projects } = await useAsyncData('project-list', () => 
    queryCollection('projects')
    .where({ _extension: 'md' })
    .sort({ date: -1 })
    .first()
)

// Categories for filtering
const categories = computed(() => {
  const cats = new Set(projects.value?.map(p => p.category))
  return Array.from(cats)
})

const selectedCategory = ref('All')

// Filtered projects based on selected category
const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === selectedCategory.value)
})

useSeoMeta({
  title: 'My Projects',
  ogTitle: 'My Projects',
  description: 'A collection of projects I\'ve worked on, from business analysis to web development'
})
</script>