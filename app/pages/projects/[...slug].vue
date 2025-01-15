<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

// Get the current project page
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Get surrounding projects for navigation
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/projects')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

// Get navigation tree for current project
const { data: navigation } = await useAsyncData(`${route.path}-nav`, () => 
  queryContent('/projects', route.params.slug[0])
    .where({ _extension: 'md' })
    .find()
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
        
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />

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
