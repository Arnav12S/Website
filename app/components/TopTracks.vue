<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <h3 class="text-xl font-semibold mb-4">Top Tracks</h3>
    <div class="space-y-4">
      <div v-for="(track, index) in tracks" :key="track.songUrl" 
           class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <span class="text-sm text-gray-500 w-6">{{ index + 1 }}</span>
        <img :src="track.albumArt" :alt="track.title" class="w-12 h-12 rounded object-cover" />
        <div class="flex-1 min-w-0">
          <a :href="track.songUrl" target="_blank" rel="noopener noreferrer"
             class="text-sm font-medium hover:text-primary truncate block">
            {{ track.title }}
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ track.artist }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/top-tracks')
const tracks = computed(() => data.value?.tracks || [])
</script> 