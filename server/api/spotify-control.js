import { defineEventHandler, readBody, createError } from 'h3';
import { controlPlayback } from '../lib/spotify';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    if (!body.action) {
      throw createError({
        statusCode: 400,
        message: 'Missing action parameter'
      });
    }

    const validActions = ['play', 'pause', 'next', 'previous'];
    if (!validActions.includes(body.action)) {
      throw createError({
        statusCode: 400,
        message: `Invalid action. Must be one of: ${validActions.join(', ')}`
      });
    }

    console.log('Received control action:', body.action);
    await controlPlayback(body.action);
    
    return { success: true };
  } catch (error) {
    console.error('Error in spotify-control handler:', error);
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    });
  }
});