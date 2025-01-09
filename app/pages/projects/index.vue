<script lang="ts" setup>
const { data: projects } = await useAsyncData('project-list', () => queryContent('projects').find());
</script>

<template>
    <UContainer>
        <div class="space-y-8">
            <!-- Projects Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <NuxtLink 
                    v-for="project in projects" 
                    :key="project._path"
                    :to="project._path"
                    class="group hover:transform hover:scale-105 transition-all duration-200 h-full"
                >
                    <UCard class="h-full flex flex-col overflow-hidden">
                        <div class="relative h-48">
                            <img 
                                :src="project.image || '/default-project-image.jpg'" 
                                :alt="project.title"
                                class="w-full h-[75%] object-cover absolute top-0"
                            />
                        </div>
                        <div class="p-4 flex-grow flex flex-col">
                            <h2 class="text-xl font-semibold group-hover:text-primary">
                                {{ project.title }}
                            </h2>
                            <p v-if="project.description" class="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 flex-grow">
                                {{ project.description }}
                            </p>
                        </div>
                    </UCard>
                </NuxtLink>
            </div>
        </div>
    </UContainer>
</template>

<style lang="postcss" scoped>
.grid {
    grid-auto-rows: 1fr;
}
</style>
