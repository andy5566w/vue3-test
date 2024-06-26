<script setup lang="ts">
import { TimelinePost } from '@/posts'
import { ref, computed } from 'vue'

const props = defineProps<{
  post: TimelinePost
  testText: string
}>()
const title = ref(props.post.title)

const emit = defineEmits(['update:testText'])
const moduleText = computed({
  get() {
    return props.testText
  },
  set(value) {
    emit('update:testText', value)
  },
})
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
        <!--        <input type="text" v-model="moduleText" />-->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
