<template>
  <main>
    <nav v-if="$route.meta.title !== 'notfound'" class="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="flex justify-between items-center max-w-3xl mx-auto">
        <nuxt-link to="/">
          <img 
            draggable="false" 
            class="w-20 h-15 hidden dark:block" 
            src="/logo-dark.png" 
            alt="logo" 
          />
          <img 
            draggable="false" 
            class="w-20 h-15 block dark:hidden" 
            src="/logo-light.png" 
            alt="logo" 
          />
        </nuxt-link>
        <div class="hidden md:flex items-center space-x-4">
          <nuxt-link 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="text-lg transition-colors duration-200 text-neutral hover:text-secondary [&.router-link-exact-active]:text-primary"
          >
            {{ link.text }}
          </nuxt-link>
          
          <SearchButton />
          <ThemeToggle />
        </div>
        <div class="flex items-center md:hidden">
          <SearchButton />
          <ThemeToggle />
          <button class="ml-2" @click="nav = !nav">
            <UIcon 
              name="i-lucide-menu" 
              class="h-6 w-6 text-neutral dark:text-white" 
              alt="Open navbar" 
            />
          </button>
        </div>
      </div>
    </nav>

    <transition 
      enter-active-class="transition-opacity duration-200 ease-in"
      leave-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="nav" class="fixed inset-0 bg-white dark:bg-neutral-950 z-20">
        <div class="p-4">
          <div class="flex justify-between items-center mt-2">
            <h1>&nbsp;</h1>
            <button class="md:hidden" @click="nav = !nav">
              <UIcon 
                name="i-lucide-x" 
                class="h-6 w-6 text-neutral dark:text-white" 
                alt="Close navbar" 
              />
            </button>
          </div>

          <div class="mt-12">
            <div class="flex flex-col space-y-4">
              <nuxt-link 
                v-for="link in navLinks" 
                :key="link.to"
                :to="link.to" 
                @click="nav = !nav"
                class="text-4xl mb-3 transition-colors duration-200 text-neutral hover:text-secondary [&.router-link-exact-active]:text-primary"
              >
                {{ link.text }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition 
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0 blur-lg"
      leave-to-class="opacity-0 blur-lg"
    >
      <NuxtPage />
    </transition>

    <div v-if="$route.meta.title !== 'notfound'" class="mt-24 mb-16">
      <Footer
        :class="[
          'footer px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto',
          $route.meta.title === 'Home' ? 'mt-16' : '',
          $route.meta.title === 'Projects' ? 'mt-8' : '',
          'md:mb-24'
        ]"
      />
    </div>
    <AskAI />
  </main>
</template>

<script setup>
import SearchButton from '~/components/SearchButton.vue'
import AskAI from '~/components/AskAI.vue'
const nav = ref(false)

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/projects', text: 'Projects' },
  { to: '/explore', text: 'Explore' },
  { to: '/cv', text: 'CV' },
  { to: '/blog', text: 'Blog' },
  { to: '/contact', text: 'Contact' }
]

watch(nav, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})
</script>

<style scoped>
/* Add any necessary styles here */
</style>

