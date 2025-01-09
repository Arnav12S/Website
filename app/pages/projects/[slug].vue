<template>
    <UCard>
        <template #header>
            <h1>{{ data?.title }}</h1>
        </template>
        <div>
            <ContentDoc :path="`/projects/${slug}`" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const { data } = await useAsyncData(`project-${slug}`, () => queryContent('projects', slug).findOne());
</script>