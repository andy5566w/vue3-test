<script setup lang="ts">
import { TimelinePost } from '@/posts'
import { ref } from 'vue'

const props = defineProps<{
  post: TimelinePost
}>()
const title = ref(props.post.title)
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
