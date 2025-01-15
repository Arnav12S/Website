<script setup lang="ts">
const { data: page } = await useAsyncData('projects', () => queryContent('/projects').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: projects } = await useAsyncData('project-list', () => 
  queryContent('projects')
    .where({ _extension: 'md', _path: /\/overview$/ })
    .sort({ date: -1 })
    .find()
)

// Add categories filter
const categories = computed(() => {
  const cats = new Set(projects.value?.map(p => p.category))
  return Array.from(cats)
})

const selectedCategory = ref('All')
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value?.filter(p => p.category === selectedCategory.value)
})

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPage>
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-4xl font-bold mb-2">Projects</h1>
            <p class="text-gray-600 dark:text-gray-300">
              Explore my latest work and projects
            </p>
          </div>
          
          <!-- Category Filter -->
          <USelect
            v-model="selectedCategory"
            :options="['All', ...categories]"
            class="w-full md:w-48"
          />
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project._path"
            :project="project"
            data-aos="fade-up"
          />
        </div>
      </div>
    </UPage>
  </UContainer>
</template>