<script lang="ts" setup>
defineProps(['error'])
</script>

<template>
  <AppError :error="error" />
</template>
