<script setup lang="ts">
import SearchButton from '~/components/SearchButton.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import { useLinks } from '~/composables/useLinks'

const { links } = useLinks()
</script>

<template>
  <nav 
    v-if="$route.meta.title !== 'notfound'" 
    class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-6 px-6 sm:px-8 lg:px-10"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center">
        <!-- Logo - Always visible -->
        <nuxt-link to="/" class="flex-shrink-0">
          <img 
            draggable="false" 
            class="w-20 h-15 hidden dark:block" 
            src="/logo-dark.png" 
            alt="Arnav Sudhansh" 
          />
          <img 
            draggable="false" 
            class="w-20 h-15 block dark:hidden" 
            src="/logo-light.png" 
            alt="Arnav Sudhansh" 
          />
        </nuxt-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <nuxt-link 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            class="text-lg transition-colors duration-200 text-neutral hover:text-secondary [&.router-link-exact-active]:text-primary"
          >
            {{ link.label }}
          </nuxt-link>
          
          <SearchButton />
          <ThemeToggle />
        </div>

        <!-- Mobile Controls - Right aligned -->
        <div class="flex items-center space-x-4 md:hidden">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add any necessary styles here */
</style>
