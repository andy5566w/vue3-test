<script setup lang="ts">
import { TimelinePost } from '@/posts'
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  post: TimelinePost
  testText: string
}>()
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')

const emit = defineEmits(['update:testText'])
const moduleText = computed({
  get() {
    return props.testText
  },
  set(value) {
    emit('update:testText', value)
  },
})
const contentEditable = ref<HTMLDivElement>()
onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}

watchEffect(() => {
  marked.parse(content.value, (err, parseResult) => {
    html.value = parseResult
  })
})

// watch(
//   () => content.value,
//   (newContent) => {
//     marked.parse(newContent, (err, parseResult) => {
//       html.value = parseResult
//     })
//   },
//   { immediate: true },
// )
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

  <div class="columns">
    <div class="column">
      <div contenteditable="true" ref="contentEditable" @input="handleInput">
        {{ content }}
      </div>
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
</template>

<style scoped></style>
