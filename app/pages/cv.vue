<template>
  <div class="bg-muted dark:bg-muted-dark min-h-screen">
    <div class="max-w-[95%] lg:max-w-[85%] xl:max-w-[75%] mx-auto p-6 box-border">
      <!-- Mobile Layout -->
      <div class="md:hidden">
        <!-- Mobile TOC -->
        <div class="mb-8">
          <button 
            @click="showTOC = !showTOC"
            class="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <span class="text-primary dark:text-primary-dark font-medium">Table of Contents</span>
            <UIcon 
              :name="showTOC ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" 
              class="w-5 h-5"
            />
          </button>
          
          <!-- TOC Content -->
          <div v-if="showTOC" class="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <nav class="space-y-3">
              <a 
                v-for="section in sections" 
                :key="section.id"
                :href="`#${section.id}`"
                class="block text-sm text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-primary-dark"
                @click="showTOC = false"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </div>

        <!-- Header Section -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
              <img :src="resumeData.header.image" :alt="resumeData.header.name" 
                   class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300">
            </div>
            <div>
              <h1 class="text-xl text-primary dark:text-primary-dark mb-2">{{ resumeData.header.name }}</h1>
              <div class="space-y-1">
                <div v-for="item in resumeData.header.contact" :key="item.text">
                  <a :href="item.url" class="flex items-center text-sm text-primary dark:text-primary-dark hover:underline">
                    <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
                    <span class="truncate">{{ item.text }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Section -->
          <div id="summary" class="mb-8">
            <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Summary</h2>
            <p class="text-sm leading-relaxed text-foreground dark:text-foreground-dark">{{ resumeData.summary }}</p>
          </div>

          <!-- Experience Section -->
          <div id="experience" class="mb-8">
            <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-4">Experience</h2>
            <div 
              v-for="exp in resumeData.experience" 
              :key="exp.title" 
              :id="getExperienceId(exp)" 
              class="mb-6 scroll-mt-20"
            >
              <div class="flex flex-col mb-2">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="text-base font-semibold text-primary-foreground dark:text-primary-foreground-dark">{{ exp.title }}</h3>
                    <span class="text-sm text-muted-foreground dark:text-muted-foreground-dark italic">{{ exp.duration }}, {{ exp.location }}</span>
                  </div>
                  <div v-if="exp.company_logo" class="flex-shrink-0">
                    <img :src="exp.company_logo" :alt="exp.company" 
                         class="w-20 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300">
                  </div>
                </div>
              </div>
              <ul class="list-disc pl-5 text-sm leading-relaxed text-foreground dark:text-foreground-dark space-y-2">
                <li v-for="detail in exp.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
          </div>

          <!-- Education Section -->
          <div id="education" class="mb-8">
            <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Education</h2>
            <div 
              v-for="edu in resumeData.education" 
              :key="edu.institution" 
              :id="getEducationId(edu)" 
              class="mb-4 scroll-mt-20"
            >
              <h3 class="text-base font-semibold text-primary-foreground dark:text-primary-foreground-dark">{{ edu.degree }}</h3>
              <p class="text-sm text-foreground dark:text-foreground-dark">{{ edu.institution }}</p>
              <span class="text-sm text-muted-foreground dark:text-muted-foreground-dark italic">{{ edu.year }}, {{ edu.location }}</span>
            </div>
          </div>

          <!-- Skills Section -->
          <div id="skills" class="mb-8">
            <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Skills</h2>
            <ul class="list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <li v-for="skill in resumeData.skills" :key="skill" class="text-sm text-foreground dark:text-foreground-dark">
                • {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden md:block">
        <div class="flex gap-6">
          <!-- Sidebar -->
          <div class="w-[200px] flex-shrink-0">
            <div class="flex items-center justify-center w-full max-w-[120px] aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-6">
              <img :src="resumeData.header.image" :alt="resumeData.header.name" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300">
            </div>
            <div class="mb-6">
              <h1 class="text-xl text-primary dark:text-primary-dark mb-4">{{ resumeData.header.name }}</h1>
              <div class="space-y-2">
                <div v-for="item in resumeData.header.contact" :key="item.text">
                  <a :href="item.url" class="flex items-center text-sm text-primary dark:text-primary-dark hover:underline">
                    <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
                    <span class="truncate">{{ item.text }}</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Skills Section -->
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Skills</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in resumeData.skills" :key="skill" 
                      class="px-2 py-1 text-xs bg-primary/10 dark:bg-primary-dark/10 text-primary-foreground dark:text-primary-foreground-dark rounded-full border border-primary/20 dark:border-primary-dark/20">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Education Section -->
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Education</h2>
              <div v-for="edu in resumeData.education" :key="edu.institution" class="mb-4">
                <h3 class="text-base font-semibold text-primary-foreground dark:text-primary-foreground-dark">{{ edu.degree }}</h3>
                <p class="text-sm text-foreground dark:text-foreground-dark">{{ edu.institution }}</p>
                <span class="text-sm text-muted-foreground dark:text-muted-foreground-dark italic">{{ edu.year }}, {{ edu.location }}</span>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="flex-grow">
            <!-- Summary -->
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-primary dark:text-primary-dark mb-3">Summary</h2>
              <p class="text-sm leading-relaxed text-foreground dark:text-foreground-dark">{{ resumeData.summary }}</p>
            </div>

            <!-- Experience -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-primary dark:text-primary-dark mb-6">Experience</h2>
              <div v-for="exp in resumeData.experience" :key="exp.title" class="mb-6">
                <div class="flex flex-col mb-2">
                  <div class="flex items-center justify-between gap-4">
                    <h3 class="text-base font-semibold text-primary-foreground dark:text-primary-foreground-dark">{{ exp.title }}</h3>
                    <div class="flex items-center gap-4">
                      <div v-if="exp.companies" class="flex gap-2">
                        <div v-for="company in exp.companies" :key="company.name" 
                             class="relative group cursor-pointer">
                          <div class="w-[120px] h-[48px] bg-background dark:bg-background-dark rounded-xl p-1 ring-1 ring-border dark:ring-border-dark"
                               :class="{ 'w-[48px] h-[48px] p-0': company.name === 'Remote Ambition' || company.name === 'Alluring Accessories' }">
                            <img :src="company.logo" :alt="company.name" 
                                 class="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                 @click="openUrl(company.url)">
                          </div>
                          <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {{ company.name }}
                          </span>
                        </div>
                      </div>
                      <div v-else-if="exp.company_logo" class="relative group cursor-pointer">
                        <div class="w-[120px] h-[48px] bg-background dark:bg-background-dark rounded-xl p-1 ring-1 ring-border dark:ring-border-dark">
                          <img :src="exp.company_logo" :alt="exp.company" 
                               class="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                               @click="openUrl(exp.url)">
                        </div>
                        <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {{ exp.company }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span class="text-sm text-muted-foreground dark:text-muted-foreground-dark italic">{{ exp.duration }}, {{ exp.location }}</span>
                </div>
                <ul class="list-disc pl-5 text-sm leading-relaxed text-foreground dark:text-foreground-dark space-y-2">
                  <li v-for="detail in exp.details" :key="detail">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Import your resume data
const resumeData = ref(await queryContent('cv').findOne())
const showTOC = ref(false)

// Define sections for TOC and searchable content
const sections = [
  { id: 'summary', title: 'Summary' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'skills', title: 'Skills' }
]

// Handle URL hash changes for search navigation
onMounted(() => {
  // Check if there's a hash in the URL (from search result click)
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1)
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth' })
      
      // Highlight the element temporarily
      targetElement.classList.add('highlight-search')
      setTimeout(() => {
        targetElement.classList.remove('highlight-search')
      }, 2000)
    }
  }
})

// Generate unique IDs for each experience item
const getExperienceId = (exp) => {
  return `exp-${(exp.company || exp.companies?.[0]?.name).toLowerCase().replace(/\s+/g, '-')}`
}

// Generate unique IDs for each education item
const getEducationId = (edu) => {
  return `edu-${edu.institution.toLowerCase().replace(/\s+/g, '-')}`
}

const openUrl = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style>
@media print {
  .print\:hidden {
    display: none !important;
  }
  .print\:block {
    display: block !important;
  }
  .print\:flex-row {
    flex-direction: row !important;
  }
  .print\:items-center {
    align-items: center !important;
  }
}

/* Add highlight animation for search results */
.highlight-search {
  animation: highlight 2s ease-out;
}

@keyframes highlight {
  0% {
    background-color: rgba(var(--color-primary), 0.2);
  }
  100% {
    background-color: transparent;
  }
}

/* Add smooth scrolling behavior */
html {
  scroll-behavior: smooth;
}

/* Add padding for scroll margin */
.scroll-mt-20 {
  scroll-margin-top: 5rem;
}
</style>