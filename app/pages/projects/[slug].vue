<template>
  <NuxtLayout name="projects">
    <template #content>
      <UCard class="bg-white dark:bg-gray-800 shadow-xl">
        <template #header>
          <h1 class="text-3xl font-bold mt-4 px-4">{{ data?.title }}</h1>
        </template>
        <div class="p-4">
          <ContentDoc :path="`/projects/${slug}`" />
        </div>
      </UCard>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'projects'
})

const route = useRoute()
const slug = route.params.slug as string
const { data } = await useAsyncData(`project-${slug}`, () => queryContent('projects', slug).findOne())
</script>