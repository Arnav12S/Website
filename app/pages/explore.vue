<script setup lang="ts">

const { data: page } = await useAsyncData('explore', () => queryContent('/explore').findOne())
if (!page.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
	title: page.value.title,
	ogTitle: page.value.title,
	description: page.value.description,
	ogDescription: page.value.description
})
</script>

<template>
	<UContainer>
	  <UPage>
		<div class="lg:grid lg:grid-cols-3 lg:gap-8">
		  <!-- Main Content -->
		  <div class="lg:col-span-2">
			<h2 class="text-3xl font-fancy mb-2">{{ page.title }}</h2>
			<p class="text-gray-600 dark:text-gray-400 mb-8">{{ page.description }}</p>
  
			<!-- Sections -->
			<div class="space-y-12">
			  <div 
				v-for="(section, index) in page.sections" 
				:key="section.title"
				class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
				data-aos="fade-up"
				:data-aos-delay="index * 100"
			  >
				<div class="flex items-center gap-3 mb-4">
				  <UIcon 
					:name="section.icon" 
					class="text-2xl"
					:class="`text-${section.color}-500`"
				  />
				  <h3 class="text-xl font-semibold">{{ section.title }}</h3>
				</div>
				
				<p class="text-gray-600 dark:text-gray-400 mb-6">
				  {{ section.description }}
				</p>

				<div class="space-y-4">
				  <div 
					v-for="item in section.items" 
					:key="item.title"
					class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
				  >
					<h4 class="font-medium mb-1">{{ item.title }}</h4>
					<p class="text-sm text-gray-600 dark:text-gray-400">
					  {{ item.description }}
					</p>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
  
		  <!-- Sidebar -->
		  <div class="lg:col-span-1 mt-8 lg:mt-0">
			<div class="sticky top-8 space-y-8">
			  <!-- Spotify Section -->
			  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
				<h3 class="text-xl font-semibold mb-6">My Soundtrack</h3>
				<div class="space-y-6">
				  <TopTracks />
				</div>
			  </div>
  
			  <!-- Additional Components -->
			  <component
				v-for="comp in page.components"
				:key="comp.id"
				:is="comp.type"
				:id="comp.id"
				:class="comp.class"
				:data-aos="comp.animation"
			  />
			</div>
		  </div>
		</div>
	  </UPage>
	</UContainer>
  </template>

  <style scoped>
  .font-fancy {
	font-family: 'Playfair Display', serif;
  }
  </style>