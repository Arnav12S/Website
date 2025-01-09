<template>
    <NuxtLayout name="blog">
        <UCard>
            <template #header>
                <h1>{{ data?.title }}</h1>
            </template>
            <div>
                <ContentDoc :path="`/blog/${slug}`" />
            </div>
        </UCard>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'blog'
})
const route = useRoute();
const slug = route.params.slug as string;
const { data } = await useAsyncData(`blog-${slug}`, () => queryContent('blog', slug).findOne());
</script>