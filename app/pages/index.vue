<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Define type for page data
interface PageContent {
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    content: string;
  };
  sections: Array<{
    title: string;
    items: Array<{
      title: string;
      description: string;
      to: string;
    }>;
  }>;
  testimonials: {
    title: string;
    description: string;
    items: Array<{
      author: {
        name: string;
        relation: string;
        description: string;
      };
      quote: string;
    }>;
  };
}

const { data: page } = await useAsyncData<PageContent | null>('index', async () => {
  try {
    const doc = await queryCollection('content')
      .path('/0.index.yml')
      .first()
    return doc as unknown as PageContent || null
  } catch (e) {
    console.error(e)
    return null
  }
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

const getRandomColor = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
  ]
  return colors[name.length % colors.length]
}

// Define interface for UI accordion items
interface CustomAccordionItem {
  label: string;
  content: string;
  defaultOpen: boolean;
  avatar?: {
    text: string;
    class: string;
  };
}

const items = computed<CustomAccordionItem[]>(() => {
  if (!page.value?.testimonials?.items) return [];
  
  return page.value.testimonials.items.map((testimonial) => ({
    label: testimonial.author.name + ' | ' + testimonial.author.relation,
    content: testimonial.quote,
    defaultOpen: false,
    avatar: {
      text: getInitials(testimonial.author.name),
      class: getRandomColor(testimonial.author.name)
    }
  }));
});
</script>

<template>
  <NuxtLayout name="default">
    <UContainer>
      <div class="max-w-3xl mx-auto mt-24 mb-16">
        <div data-aos="fade-in" v-if="page && page.hero">
          <h1 class="text-4xl font-bold text-primary mb-2">{{ page.hero.title }}</h1>
          <div class="mb-4">
            <h2 class="text-m font-bold md:text-xl md:font-normal text-neutral">
              {{ page.hero.description }}
            </h2>
          </div>
          
          <div class="text-neutral mb-8" v-html="page.hero.content" />
          
          <p v-if="page.sections && page.sections[0]" class="text-primary font-medium mb-8">{{ page.sections[0].title }}</p>
        </div>

        <div class="space-y-2" v-if="page && page.sections && page.sections[0]">
          <NuxtLink
            v-for="item in page.sections[0].items"
            :key="item.title"
            :to="item.to"
            data-aos="fade-up"
            class="block p-4 -mx-4 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:translate-y-[-2px] rounded-lg"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h3 class="text-lg font-medium text-primary">{{ item.title }}</h3>
              <p class="text-neutral text-sm sm:text-base">{{ item.description }}</p>
            </div>
          </NuxtLink>

          <!-- Testimonials section -->
          <div 
            class="mt-12 group" 
            data-aos="fade-up"
            v-if="page.testimonials"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-4 -mx-4 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:translate-y-[-2px] rounded-lg">
              <h3 class="text-lg font-medium text-primary">{{ page.testimonials.title }}</h3>
              <p class="text-neutral text-sm sm:text-base">{{ page.testimonials.description }}</p>
            </div>
            
            <div class="hidden group-hover:block">
              <UAccordion :items="items as any" class="space-y-2">
                <template #label="{ item }">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                      <div 
                        :class="[
                          'w-8 h-8 rounded-full flex items-center justify-center text-white font-medium',
                          (item as any).avatar?.class
                        ]"
                      >
                        {{ (item as any).avatar?.text }}
                      </div>
                      <span class="text-primary">{{ (item as any).label.split(' | ')[0] }}</span>
                    </div>
                    <span class="text-neutral text-sm">{{ (item as any).label.split(' | ')[1] }}</span>
                  </div>
                </template>
                
                <template #item="{ item }">
                  <div 
                    class="block p-4 -mx-4 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:translate-y-[-2px] rounded-lg"
                  >
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <p class="text-neutral text-sm sm:text-base">{{ (item as any).content }}</p>
                    </div>
                  </div>
                </template>
              </UAccordion>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-24 mb-16">
          <img
            draggable="false"
            loading="lazy"
            src="/polaroid.png"
            alt="me irl (fr)"
            class="w-64 rounded-lg"
          />
        </div>
      </div>
    </UContainer>
  </NuxtLayout>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
