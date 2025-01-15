   // composables/useLinks.ts
   export const useLinks = () => {
    const links = ref([
      {
        label: 'Home',
        icon: 'i-heroicons-home',
        to: '/'
      },
      {
        label: 'Projects',
        icon: 'i-heroicons-briefcase',
        to: '/projects'
      },
      {
        label: 'Explore',
        icon: 'i-heroicons-magnifying-glass',
        to: '/explore'
      },
      {
        label: 'CV',
        icon: 'i-heroicons-document-text',
        to: '/cv'
      },
      {
        label: 'Blog',
        icon: 'i-heroicons-pencil-square',
        to: '/blog'
      },
      {
        label: 'Contact',
        icon: 'i-heroicons-envelope',
        to: '/contact'
      }
    ])
    
    return { links }
  }