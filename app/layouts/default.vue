<script setup lang="ts">

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), { default: () => [] })
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))

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