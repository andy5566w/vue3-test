<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <timeline />
    </template>

    <template #fallback>
      <progress class="progress is-primary" />
    </template>
  </Suspense>
</template>

<style scoped></style>
