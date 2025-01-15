<script setup lang="ts">
interface Props {
  project: {
    title: string
    description: string
    company: string
    company_logo?: string
    image?: string
    date: string
    category: string
    tags: string[]
    _path: string
  }
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="project._path"
    class="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
  >
    <div class="aspect-video relative overflow-hidden rounded-t-xl">
      <img
        :src="project.image || '/project-placeholder.jpg'"
        :alt="project.title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
      />
      <div class="absolute top-4 right-4">
        <img
          v-if="project.company_logo"
          :src="project.company_logo"
          :alt="project.company"
          class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 p-1"
        />
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ new Date(project.date).toLocaleDateString() }}
        </span>
        <span class="text-sm text-primary-500">
          {{ project.category }}
        </span>
      </div>
      <h3 class="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {{ project.description }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>