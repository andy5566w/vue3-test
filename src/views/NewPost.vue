<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import { TimelinePost } from '@/posts'
import { DateTime } from 'luxon'
import { ref } from 'vue'

const post: TimelinePost = {
  id: -1,
  title: 'Title',
  created: DateTime.now(),
}
const testText = ref('This is test text')
</script>

<template>
  <PostWriter :post="post" v-model:test-text="testText" />
  <p>testText: {{ testText }}</p>
</template>

<style scoped></style>
