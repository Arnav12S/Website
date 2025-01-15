<template>
  <Transition name="fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-30 flex justify-center items-start pt-[10vh] backdrop-blur-sm bg-black/20 dark:bg-black/40" 
      @click.self="closeDrawer"
      @keydown="handleKeydown"
    >
      <div 
        class="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg w-11/12 max-w-lg p-6 relative focus:outline-none shadow-lg border border-gray-200 dark:border-gray-700"
        tabindex="-1"
        ref="drawer"
      >
        <!-- Header with shortcuts - Hide on small screens -->
        <div class="hidden sm:flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-400" />
            <span class="text-sm text-gray-500">
              Search
            </span>
          </div>
          <div class="flex items-center gap-2">
            <kbd class="inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
              ↑↓
            </kbd>
            <span class="text-xs text-gray-500">to navigate</span>
            <kbd class="inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
              esc
            </kbd>
            <span class="text-xs text-gray-500">to close</span>
          </div>
        </div>

        <!-- Search Input -->
        <input 
          type="text" 
          v-model="searchQuery" 
          ref="searchInput"
          class="w-full px-4 py-2 mb-6 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          :placeholder="isMobileScreen ? 'Search...' : 'Type to search...'"
          @input="performSearch"
        />

        <!-- Navigation Sections - Hide on small screens -->
        <ul class="hidden sm:block space-y-2">
          <li 
            v-for="(item, index) in filteredItems" 
            :key="index" 
            :class="[
              'p-2 rounded cursor-pointer flex items-center justify-between',
              currentIndex === index ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
            @click="selectItem(item)"
            :tabindex="0"
            @keydown.enter="selectItem(item)"
            @mouseover="currentIndex = index"
          >
            <span>{{ item.text }}</span>
            <span 
              v-if="item.type"
              :class="[
                'text-xs px-2 py-1 rounded',
                item.type === 'blog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 
                item.type === 'project' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
              ]"
            >
              {{ item.type }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const searchQuery = ref('')
const items = ref([
  { text: 'Home', to: '/' },
  { text: 'Projects', to: '/projects' },
  { text: 'Explore', to: '/explore' },
  { text: 'CV', to: '/cv' },
  { text: 'Blog', to: '/blog' },
  { text: 'Contact', to: '/contact' },
  // Add more items as needed
])

const filteredItems = ref([...items.value])
const currentIndex = ref(-1)
const drawer = ref(null)
const searchInput = ref(null)
const router = useRouter()

const focusableElements = ref([])
const firstFocusableElement = ref(null)
const lastFocusableElement = ref(null)

const isMobileScreen = ref(false)

// Add these new refs for content search
const allItems = ref([])


// Fetch content when component mounts
onMounted(async () => {
  // Fetch blog posts
  const { data: posts } = await useAsyncData('blog-posts', () => queryContent('blog').find())
  // Fetch projects
  const { data: projects } = await useAsyncData('project-list', () => queryContent('projects').find())
  
  // Combine navigation items with content items
  allItems.value = [
    ...items.value,
    ...(posts.value || []).map(post => ({
      text: post.title,
      to: `/blog/${post._path.split('/').pop()}`,
      type: 'blog'
    })),
    ...(projects.value || []).map(project => ({
      text: project.title,
      to: `/projects/${project._path.split('/').pop()}`,
      type: 'project'
    }))
  ]
})

const performSearch = () => {
  if (searchQuery.value.trim() === '') {
    filteredItems.value = [...allItems.value]
  } else {
    const query = searchQuery.value.toLowerCase()
    filteredItems.value = allItems.value.filter(item => 
      item.text.toLowerCase().includes(query) ||
      item.searchContent?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    )
  }
  currentIndex.value = -1
}

const navigateUp = () => {
  if (filteredItems.value.length === 0) return
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredItems.value.length - 1
  }
}

const navigateDown = () => {
  if (filteredItems.value.length === 0) return
  if (currentIndex.value < filteredItems.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const selectItem = (item) => {
  router.push(item.to)
  closeDrawer()
}

const closeDrawer = () => {
  emit('close')
}

const setFocusableElements = () => {
  const drawerEl = drawer.value
  if (drawerEl) {
    const elements = drawerEl.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    focusableElements.value = Array.from(elements)
    firstFocusableElement.value = focusableElements.value[0]
    lastFocusableElement.value = focusableElements.value[focusableElements.value.length - 1]
  }
}

const handleTabKey = (event) => {
  if (event.key !== 'Tab') return

  if (event.shiftKey) { // Shift + Tab
    if (document.activeElement === firstFocusableElement.value) {
      event.preventDefault()
      lastFocusableElement.value.focus()
    }
  } else { // Tab
    if (document.activeElement === lastFocusableElement.value) {
      event.preventDefault()
      firstFocusableElement.value.focus()
    }
  }
}

const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      navigateUp()
      break
    case 'ArrowDown':
      event.preventDefault()
      navigateDown()
      break
    case 'Escape':
      event.preventDefault()
      closeDrawer()
      break
    case 'Tab':
      handleTabKey(event)
      break
    default:
      break
  }
}

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    setFocusableElements()
    searchInput.value.focus()
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(() => {
  isMobileScreen.value = window.innerWidth < 640
  
  const handleResize = () => {
    isMobileScreen.value = window.innerWidth < 640
  }
  
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// Clean up in case the component is destroyed while drawer is open
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 