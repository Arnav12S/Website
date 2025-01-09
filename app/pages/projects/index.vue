<script lang="ts" setup>
const { data: projects } = await useAsyncData('project-list', () => queryContent('projects').find());
</script>

<template>
    <UCard>
        <template #header>
            <h1>Projects</h1>
            <UButton icon="i-lucide-plus" to="/projects/new">New Project</UButton>
        </template>
        <div>
            <ul>
                <li v-for="project in projects" :key="project._path">
                    <NuxtLink :to="project._path">
                        <h2>{{ project.title }}</h2>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </UCard>
</template>

<style lang="postcss" scoped>
    
</style>
