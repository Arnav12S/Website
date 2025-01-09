<template>
    <main class="flex items-center">
      <ClientOnly>
        <div class="max-w-[17em] md:max-w-xs">
          <div v-if="spotify?.isPlaying" class="flex items-start gap-4">
            <div class="flex flex-col gap-1">
              <!-- Album Cover -->
              <img
                :src="spotify.albumImageUrl"
                :alt="spotify.album"
                class="w-12 h-12 object-cover rounded"
              />
              <span class="text-[10px] text-neutral">Control for fun</span>
            </div>

            <!-- Song Details and Controls -->
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5 mb-1">
                <UIcon
                  name="i-simple-icons-spotify"
                  class="w-3 h-3 text-emerald-600"
                />
                <span class="text-[10px] text-neutral">Now Listening to</span>
              </div>
              <h5 class="text-sm truncate">
                <a
                  rel="noopener noreferrer"
                  class="text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors duration-300"
                  :href="spotify.songUrl"
                  target="_blank"
                >
                  <span :title="spotify.title">{{ spotify.title }}</span>
                </a>
              </h5>
              <h5 class="text-xs text-neutral truncate mb-2">
                <span :title="spotify.artist">{{ spotify.artist || 'Unknown' }}</span>
              </h5>

              <!-- Playback Controls -->
              <div class="flex items-center gap-1">
                <UButton
                  variant="ghost"
                  color="gray"
                  icon="i-mdi-skip-previous"
                  size="xs"
                  @click="controlPlayback('previous')"
                />
                <UButton
                  variant="ghost"
                  color="gray"
                  :icon="spotify.isPlaying ? 'i-mdi-pause' : 'i-mdi-play'"
                  size="xs"
                  @click="controlPlayback(spotify.isPlaying ? 'pause' : 'play')"
                />
                <UButton
                  variant="ghost"
                  color="gray"
                  icon="i-mdi-skip-next"
                  size="xs"
                  @click="controlPlayback('next')"
                />
              </div>
            </div>
          </div>

          <div v-else class="flex items-center gap-2">
            <UIcon
              name="i-simple-icons-spotify"
              class="w-5 h-5 text-neutral"
            />
            <div class="flex flex-col">
              <h5 class="text-sm truncate">
                <a 
                  href="https://open.spotify.com/user/arnav.sudhansh" 
                  target="_blank"
                  class="text-neutral hover:text-secondary transition-colors duration-300"
                >
                  Spotify &mdash; Not playing
                </a>
              </h5>
              <h5 class="text-xs text-gray-500 truncate">
                {{ spotify?.lastPlayed ? `Last played: ${spotify.lastPlayed}` : 'No recent activity' }}
              </h5>
            </div>
          </div>
        </div>
      </ClientOnly>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const spotify = ref(null)
  let intervalId = null
  
  const controlPlayback = async (action) => {
    try {
      await $fetch('/api/spotify/control', {
        method: 'POST',
        body: { action }
      })
      
      // Wait a short moment for Spotify to update its state
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Only fetch new state, don't refresh page
      await fetchSpotifyData()
    } catch (error) {
      console.error(`Error controlling playback (${action}):`, error)
    }
  }
  
  const fetchSpotifyData = async () => {
    try {
      const newData = await $fetch('/api/spotify', {
        // Add cache-busting query parameter
        query: { _t: Date.now() },
        // Prevent default caching
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      // Only update if the data has changed
      if (JSON.stringify(newData) !== JSON.stringify(spotify.value)) {
        spotify.value = newData
      }
    } catch (error) {
      console.error('Error fetching Spotify data:', error)
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }
  
  // Start polling when component mounts
  onMounted(() => {
    fetchSpotifyData()
    intervalId = setInterval(fetchSpotifyData, 10000) // Poll every 10 seconds
  })
  
  // Clean up when component unmounts
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
  </script>
  
  <style scoped>
  /* Optional: Add any additional styles if necessary */
  </style>
  