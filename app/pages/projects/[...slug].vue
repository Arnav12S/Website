<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

// Get the current project page
const { data: page } = await useAsyncData(route.path, () => 
  queryCollection('projects').path(route.path).first()
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const targetPath = '/projects'

// Content v3 - Ensure you have a `projects` collection in `content.config.ts`
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => 
  queryCollectionItemSurroundings(
    'projects',
    targetPath,
    {
      fields: ['title', 'description', 'path'],
      filter: { navigation: { $ne: false } }
    }
  )
, { default: () => [] })

// Get navigation tree for current project
const { data: navigation } = await useAsyncData(`${route.path}-nav`, () => 
  queryCollection('projects').path(route.params.slug[0]).first()
)

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
      <!-- Left sidebar with project navigation -->
      <template #left>
        <UAside v-if="navigation?.length > 1">
          <UNavigationTree :links="navigation" />
        </UAside>
      </template>

      <!-- Main content -->
      <UPageBody prose>
        <UPageHeader
          :title="page.title"
          :description="page.description"
        />
        
        <ContentRenderer v-if="post" :value="post" />

        <hr v-if="surround?.length">
        <UContentSurround :surround="surround" />
      </UPageBody>

      <!-- Right sidebar with table of contents -->
      <template #right>
        <UContentToc
          v-if="page.body?.toc?.links"
          :links="page.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
