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
          </div>

          <!-- Song Details and Controls -->
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5 mb-1 whitespace-nowrap">
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
                @click="togglePlayPause"
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

        <div v-else class="flex items-center gap-3">
          <UIcon
            name="i-simple-icons-spotify"
            class="w-6 h-6 text-neutral"
          />
          <div class="flex flex-col min-w-0">
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
              {{ spotify?.lastPlayedAt ? getRelativeTime(spotify.lastPlayedAt) : 'No recent activity' }}
            </h5>
          </div>
        </div>
      </div>
    </ClientOnly>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getRelativeTime } from '~/utils/date'

const spotify = ref(null)
let pollInterval = null
const POLL_INTERVAL = 5000 // Poll every 5 seconds

const fetchSpotifyState = async () => {
  try {
    const response = await fetch('/api/spotify-state')
    const data = await response.json()
    spotify.value = data
  } catch (error) {
    console.error('Error fetching Spotify state:', error)
  }
}

const controlPlayback = async (action) => {
  try {
    await fetch('/api/spotify-control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action })
    })
    // Fetch immediately after control action
    await fetchSpotifyState()
  } catch (error) {
    console.error('Error controlling playback:', error)
  }
}

const togglePlayPause = async () => {
  try {
    const action = spotify.value?.isPlaying ? 'pause' : 'play'
    console.log('Toggling playback:', action)
    await controlPlayback(action)
  } catch (error) {
    console.error('Error in togglePlayPause:', error)
  }
}

onMounted(() => {
  fetchSpotifyState() // Initial fetch
  pollInterval = setInterval(fetchSpotifyState, POLL_INTERVAL)
})

onUnmounted(() => {
  if (pollInterval) {
    clearInterval(pollInterval)
  }
})
</script>

<style scoped>
/* Optional: Add any additional styles if necessary */
</style>