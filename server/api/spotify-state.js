import { getCurrentPlaybackState } from '../lib/spotify'

export default defineEventHandler(async (event) => {
  try {
    const state = await getCurrentPlaybackState()
    return state
  } catch (error) {
    console.error('Error fetching Spotify state:', error)
    return {
      isPlaying: false,
      error: 'Unable to fetch playback state'
    }
  }
}) 