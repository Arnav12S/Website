import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Allow direct access to project overview pages and main projects listing
  if (to.path === '/projects' || to.path.match(/^\/projects\/[^/]+$/)) {
    return
  }

  // Block direct access to project sub-pages unless coming from valid navigation
  if (to.path.match(/^\/projects\/[^/]+\/.+/)) {
    const referer = document.referrer
    if (!referer.includes('/projects/')) {
      return navigateTo('/projects')
    }
  }
}) 