<script lang="ts" setup>
definePageMeta({
    layout: 'blog',
})
const { data: posts } = await useAsyncData('blog-posts', () => queryContent('blog').find());
</script>

<template>
    <NuxtLayout name="blog">
        <UCard>
            <template #header>
                <h1>Blog</h1>
            <UButton icon="i-lucide-plus" to="/blog/new">New Blog</UButton>
        </template>
        <div>
            <ul>
                <li v-for="post in posts" :key="post._path">
                    <NuxtLink :to="post._path">
                        <h2>{{ post.title }}</h2>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </UCard>
</NuxtLayout>
</template>

<style lang="postcss" scoped>
    
</style>
