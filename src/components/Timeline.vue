<template>
  {{ postStore }}
  <button @click="postStore.setState('bar')">update</button>
  <nav class="is-primary panel">
    {{ selectedPeriod }}
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        class="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="handleClickPeriod(period)"
        >{{ period }}</a
      >
    </span>
    <timeline-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="panel-block"
    />
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Period } from '../type/Timeline'
import { DateTime } from 'luxon'
import { today, thisWeek, thisMonth, TimelinePost } from '@/posts'
import TimelineItem from '@/components/TimelineItem.vue'
import { usePosts } from '@/stores/posts'
const postStore = usePosts()
// console.log(store.getState())
// store.getState().foo = 'test123'

const periods: Period[] = ['Today', 'This Week', 'This Month']
const selectedPeriod = ref<Period>(periods[0])
const posts = computed<TimelinePost[]>(() =>
  postStore.ids
    .map((id: string) => {
      const post = postStore.all.get(id)
      if (!post) {
        throw new Error('cannot find post')
      }
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      }
    })
    .filter((post: TimelinePost) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ day: 1 })
      }
      if (selectedPeriod.value === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 })
      }
      return post
    }),
)

function handleClickPeriod(period: Period) {
  console.log(period)
  selectedPeriod.value = period
}
</script>

<style scoped></style>
