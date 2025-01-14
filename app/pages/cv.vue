<template>
  <UContainer>
    <!-- Print button -->
    <button @click="printResume" class="print:hidden fixed top-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
      <UIcon name="i-heroicons-printer" class="w-6 h-6" />
    </button>

    <!-- Main resume container with A4 dimensions -->
    <div v-if="page" class="a4-page print:shadow-none">
      <div class="w-full p-8 box-border">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <div class="w-[2.5cm] h-[3cm] rounded-2xl overflow-hidden">
            <img :src="page.header.image" :alt="page.header.name" class="w-full h-full object-cover">
          </div>
          <div class="flex-grow pl-4">
            <h1 class="text-2xl text-blue-600 mb-2">{{ page.header.name }}</h1>
            <div class="text-sm text-gray-600">
              <span v-for="(item, index) in page.header.contact" 
                    :key="index" 
                    class="inline-flex items-center gap-1 mr-4">
                <a :href="item.url" 
                   target="_blank" 
                   class="flex items-center text-blue-600 hover:underline">
                  <UIcon :name="item.icon" class="w-5 h-5 mr-1" />
                  {{ item.text }}
                </a>
              </span>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold text-blue-600 my-4">Summary</h2>
          <p class="text-base leading-7">{{ page.summary }}</p>
        </div>

        <!-- Experience -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold text-blue-600 my-4">{{ page.experience.title }}</h2>
          <div v-for="(job, index) in page.experience.items" :key="index" class="mb-4">
            <div class="flex justify-between items-baseline mb-0">
              <h3 class="text-lg font-semibold text-blue-700">
                {{ job.title }}
                <template v-if="job.company">
                  | <a :href="`https://${job.company.toLowerCase()}.com`" 
                       target="_blank" 
                       class="text-blue-600 hover:underline">
                    {{ job.company }}
                  </a>
                </template>
              </h3>
              <span class="text-sm text-gray-600 italic">{{ job.date }}, {{ job.location }}</span>
            </div>
            <ul class="list-disc pl-5 text-base leading-7">
              <li v-for="(detail, detailIndex) in job.details" 
                  :key="detailIndex">
                {{ detail }}
              </li>
            </ul>
            
          </div>
        </div>

        <!-- Education section -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold text-blue-600 my-4">{{ page.education.title }}</h2>
          <div v-for="(edu, index) in page.education.items" :key="index" class="mb-4">
            <div class="flex justify-between items-baseline mb-0">
              <h3 class="text-lg font-semibold text-blue-700">
                {{ edu.degree }}
                <template v-if="edu.institution">
                  | {{ edu.institution }}
                </template>
              </h3>
              <span class="text-sm text-gray-600 italic">{{ edu.date }}, {{ edu.location }}</span>
            </div>
            <ul v-if="edu.details" class="list-disc pl-5 text-base leading-7">
              <li v-for="(detail, detailIndex) in edu.details" 
                  :key="detailIndex">
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Skills section -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold text-blue-600 my-4">{{ page.skills.title }}</h2>
          <div v-for="(category, index) in page.skills.items" :key="index" class="mb-4">
            <h3 class="text-lg font-semibold text-blue-700">{{ category.category }}</h3>
            <p class="text-base leading-7">{{ category.skills.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('cv', () => queryContent('/cv').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

// Add print function
const printResume = () => {
  window.print();
}
</script>

<style>
/* A4 page styling */
.a4-page {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

/* Print-specific styles */
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .a4-page {
    width: 100%;
    min-height: 100%;
    padding: 20mm;
    box-shadow: none;
  }

  /* Hide non-resume elements when printing */
  header, footer, nav, .print\:hidden {
    display: none !important;
  }
}
</style>

<!-- Remove all custom CSS -->