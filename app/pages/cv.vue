<template>
  <UContainer>
  <div v-if="resumeData" class="min-h-screen flex flex-col justify-between p-4">
    <div class="w-full p-8 box-border">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div class="w-[2.5cm] h-[3cm] rounded-2xl overflow-hidden">
          <img src="/resume-profile-picture.png" alt="Profile Picture" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow pl-4">
          <h1 class="text-2xl text-blue-600 mb-2">{{ resumeData.name }}</h1>
          <div class="text-sm text-gray-600">
            <span class="inline-flex items-center gap-1 mr-4">
              <a :href="resumeData.contact.linkedin" target="_blank" class="flex items-center text-blue-600 hover:underline">
                <UIcon name="i-mdi-linkedin" class="w-5 h-5 mr-1" />
                {{ resumeData.contact.linkedin }}
              </a>
              <a :href="`tel:${resumeData.contact.phone}`" target="_blank" class="flex items-center text-blue-600 hover:underline">
                <UIcon name="i-mdi-phone" class="w-5 h-5 mr-1" />
                {{ resumeData.contact.phone }}
              </a>
              <a :href="`mailto:${resumeData.contact.email}`" target="_blank" class="flex items-center text-blue-600 hover:underline">
                <UIcon name="i-mdi-email" class="w-5 h-5 mr-1" />
                {{ resumeData.contact.email }}
              </a>
            </span>
            <!-- Other contact spans follow same pattern -->
          </div>
        </div>
      </div>

      <!-- Sections -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-blue-600 my-4">Summary</h2>
        <p class="text-base leading-7">{{ resumeData.summary }}</p>
      </div>

      <!-- Experience -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-blue-600 my-4">Experience</h2>
        <div v-for="(job, index) in resumeData.experience" :key="index" class="mb-4">
          <div class="flex justify-between items-baseline mb-0">
            <h3 class="text-lg font-semibold text-blue-700">
              {{ job.title }} |
              <a v-if="job.company" :href="`https://${job.company}.com`" target="_blank" class="text-blue-600 hover:underline">
                {{ job.company }}
              </a>
              <template v-else>{{ job.clients || job.startup }}</template>
            </h3>
            <span class="text-sm text-gray-600 italic">{{ job.duration }}, {{ job.location }}.</span>
          </div>
          <ul class="list-disc pl-5 text-base leading-7">
            <li v-for="(detail, detailIndex) in job.details" :key="detailIndex">{{ detail }}</li>
          </ul>
        </div>
      </div>

      <!-- ... Other sections follow similar pattern ... -->
    </div>
  </div>
  </UContainer>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'

const { data: resumeData, error } = await useAsyncData('resumeData', () => $fetch('/api/resume?section=all-photo'));
if (error) {
  console.error(error);
}
</script>

<!-- Remove all custom CSS -->