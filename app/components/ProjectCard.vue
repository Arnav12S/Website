<script setup lang="ts">
interface Props {
  project: {
    title: string
    description: string
    company: string
    company_logo?: string
    company_logo_type?: 'square' | 'horizontal'
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
    class="group block"
  >
    <div class="flex flex-col h-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300">
      <!-- Header with Company Logo -->
      <div class="p-6 flex items-center justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ project.title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ project.company }}</p>
        </div>
        <div v-if="project.company_logo" class="flex-shrink-0">
          <div 
            class="bg-white rounded-lg p-2 ring-1 ring-gray-200"
            :class="{
              'w-12 h-12': project.company_logo_type === 'square',
              'w-24 h-12': project.company_logo_type === 'horizontal' || !project.company_logo_type
            }"
          >
            <img
              :src="project.company_logo"
              :alt="project.company"
              class="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6">
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {{ project.description }}
        </p>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in project.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
            class="text-xs"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>