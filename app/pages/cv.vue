<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Print button -->
    <div class="max-w-[95%] lg:max-w-[85%] xl:max-w-[75%] mx-auto text-right pt-4">
      <button @click="printResume" class="print:hidden inline-flex items-center text-blue-600 hover:text-blue-700">
        <UIcon name="i-heroicons-printer" class="w-5 h-5 mr-1" />
        <span class="text-sm">Print</span>
      </button>
    </div>

    <!-- Main resume container -->
    <div v-if="page" class="max-w-[95%] lg:max-w-[85%] xl:max-w-[75%] mx-auto bg-white dark:bg-gray-800 shadow-sm print:shadow-none rounded-lg">
      <div class="p-6 box-border">
        <!-- Mobile Layout (and Print) -->
        <div class="md:hidden print:block">
          <div class="flex items-start print:flex-row print:items-center">
            <!-- Photo -->
            <div class="flex-shrink-0 w-[1.5cm] h-[2cm] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src="/resume-profile-picture.png"
                :alt="page.name" 
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              >
            </div>
            <!-- Contact info -->
            <div class="flex-grow pl-4">
              <h1 class="text-xl text-blue-600 dark:text-blue-400 mb-2">{{ page.name }}</h1>
              <div class="text-xs space-y-1 text-gray-600 dark:text-gray-300">
                <div v-for="(contact, type) in page.contact" :key="type" class="flex items-center gap-1">
                  <a :href="getContactLink(type, contact)" class="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <UIcon :name="getContactIcon(type)" class="w-4 h-4 mr-1" />
                    <span class="truncate">{{ contact }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:block">
          <!-- Header Section -->
          <div class="flex gap-6 mb-8">
            <!-- Left Side (Photo + Contact) -->
            <div class="w-[200px] flex-shrink-0">
              <!-- Photo -->
              <div class="flex items-center justify-center w-full max-w-[120px] aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-6">
                <img 
                  src="/resume-profile-picture.png"
                  :alt="page.name" 
                  class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                >
              </div>
              
              <!-- Contact Info -->
              <div class="mb-6">
                <h1 class="text-xl text-blue-600 dark:text-blue-400 mb-4">{{ page.name }}</h1>
                <div class="space-y-2">
                  <div v-for="(contact, type) in page.contact" :key="type">
                    <a :href="getContactLink(type, contact)" class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      <UIcon :name="getContactIcon(type)" class="w-4 h-4 mr-2" />
                      <span class="truncate">{{ contact }}</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Skills -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Skills</h2>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="skill in page.skills" 
                    :key="skill"
                    class="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Education -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Education</h2>
                <div v-for="(edu, index) in page.education" :key="index" class="mb-4">
                  <h3 class="text-base font-semibold text-blue-700 dark:text-blue-300">{{ edu.degree }}</h3>
                  <p class="text-sm text-gray-800 dark:text-gray-200">{{ edu.institution }}</p>
                  <span class="text-sm text-gray-600 dark:text-gray-400 italic">{{ edu.year }}, {{ edu.location }}</span>
                </div>
              </div>
            </div>

            <!-- Right Side (Summary + Experience) -->
            <div class="flex-grow">
              <!-- Summary -->
              <div class="mb-8">
                <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Summary</h2>
                <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  {{ page.summary }}
                </p>
              </div>

              <!-- Experience Section -->
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">Experience</h2>
                <div v-for="(job, index) in page.experience" :key="index" class="mb-6">
                  <div class="flex flex-col mb-2">
                    <h3 class="text-base font-semibold text-blue-700 dark:text-blue-300">
                      {{ job.title }}
                      <template v-if="job.company">
                        | {{ job.company }}
                      </template>
                    </h3>
                    <span class="text-sm text-gray-600 dark:text-gray-400 italic">{{ job.duration }}, {{ job.location }}</span>
                  </div>
                  <ul class="list-disc pl-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200 space-y-2">
                    <li v-for="(detail, detailIndex) in job.details" :key="detailIndex">
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Content -->
        <div class="md:hidden print:block mt-6">
          <!-- Summary -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Summary</h2>
            <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">{{ page.summary }}</p>
          </div>

          <!-- Skills -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in page.skills" 
                :key="skill"
                class="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Education -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Education</h2>
            <div v-for="(edu, index) in page.education" :key="index" class="mb-4">
              <h3 class="text-base font-semibold text-blue-700 dark:text-blue-300">{{ edu.degree }}</h3>
              <p class="text-sm text-gray-800 dark:text-gray-200">{{ edu.institution }}</p>
              <span class="text-sm text-gray-600 dark:text-gray-400 italic">{{ edu.year }}, {{ edu.location }}</span>
            </div>
          </div>

          <!-- Experience -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Experience</h2>
            <div v-for="(job, index) in page.experience" :key="index" class="mb-6">
              <div class="flex flex-col mb-2">
                <h3 class="text-base font-semibold text-blue-700 dark:text-blue-300">
                  {{ job.title }}
                  <template v-if="job.company">
                    | {{ job.company }}
                  </template>
                </h3>
                <span class="text-sm text-gray-600 dark:text-gray-400 italic">{{ job.duration }}, {{ job.location }}</span>
              </div>
              <ul class="list-disc pl-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200 space-y-2">
                <li v-for="(detail, detailIndex) in job.details" :key="detailIndex">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useFetch('/api/resume?section=all')

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Resume data not found', fatal: true })
}

// Add print function
const printResume = () => {
  const originalTitle = document.title
  document.title = `${page.value.name} - Resume`
  window.print()
  document.title = originalTitle
}

// SEO
useHead({
  title: `${page.value.name} - Resume`,
  meta: [
    { name: 'description', content: page.value.summary }
  ]
})

// Add helper functions for contact links and icons
const getContactLink = (type: string, value: string) => {
  switch (type) {
    case 'email': return `mailto:${value}`
    case 'phone': return `tel:${value}`
    case 'linkedin': return value
    default: return value
  }
}

const getContactIcon = (type: string) => {
  switch (type) {
    case 'email': return 'i-heroicons-envelope'
    case 'phone': return 'i-heroicons-phone'
    case 'linkedin': return 'i-simple-icons-linkedin'
    default: return 'i-heroicons-link'
  }
}

const getContactDisplay = (type: string, value: string) => {
  switch (type) {
    case 'linkedin': return value.split('/').pop() // Gets the last part of the URL
    default: return value
  }
}
</script>

<style>
/* A4 page styling */
.a4-page {
  width: 210mm;
  min-height: 297mm;
  padding: 8mm;
  margin: 0 auto;
  background: white;
}

@media print {
  @page {
    size: A4;
    margin: 1cm;
  }

  body {
    visibility: hidden;
  }

  .max-w-\[95\%\] {
    max-width: 100% !important;
    margin: 0 !important;
  }

  /* Make the CV content visible */
  .bg-white {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .print\:block {
    display: block !important;
  }

  .print\:hidden {
    display: none !important;
  }

  /* Ensure proper text contrast in print */
  .dark\:text-gray-200,
  .dark\:text-gray-300,
  .dark\:text-gray-400 {
    color: #1f2937 !important;
  }

  /* Adjust margins and spacing for print */
  .p-6 {
    padding: 0.5cm !important;
  }

  .mb-8 {
    margin-bottom: 0.5cm !important;
  }

  .mb-4 {
    margin-bottom: 0.25cm !important;
  }

  /* Ensure proper page breaks */
  .page-break-before {
    page-break-before: always;
  }

  .page-break-after {
    page-break-after: always;
  }

  /* Prevent breaks inside important sections */
  h2, h3 {
    break-after: avoid;
  }
}
</style>

<!-- Remove all custom CSS -->