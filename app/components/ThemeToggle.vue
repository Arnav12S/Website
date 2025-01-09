<template>
  <UButton
    :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
    color="gray"
    variant="ghost"
    aria-label="Toggle dark mode"
    @click="toggleDark"
  />
</template>

<script setup>
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script> 