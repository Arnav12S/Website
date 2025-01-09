import { controlPlayback } from '../../lib/spotify'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { action } = body

    if (!['play', 'pause', 'next', 'previous'].includes(action)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid action'
      })
    }

    await controlPlayback(action)
    
    // Wait a short moment for Spotify to update its state
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Return success
    return { success: true }
  } catch (error) {
    console.error('Error controlling playback:', error)
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to control playback'
    })
  }
}) 