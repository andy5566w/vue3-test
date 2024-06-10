<template>
  <nav class="is-primary panel">
    {{ postStore.selectedPeriod }}
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        class="period"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
        @click="postStore.setSelectedPeriod(period)"
        >{{ period }}</a
      >
    </span>
    <timeline-item
      v-for="post in postStore.filterPost"
      :key="post.id"
      :post="post"
      class="panel-block"
    />
  </nav>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { usePosts } from '@/stores/posts'
import { periods } from '@/constants'

const postStore = usePosts()
</script>

<style scoped></style>
