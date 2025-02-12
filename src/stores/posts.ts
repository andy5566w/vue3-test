import { defineStore } from 'pinia'
import { Post, today, thisMonth, thisWeek, TimelinePost } from '../posts'
import { Period } from '../type/Timeline'
import { DateTime } from 'luxon'

interface PostsStore {
  all: Map<string, Post>
  ids: string[]
  selectedPeriod: Period
  foo: string
}

function delay(seconds = 1500) {
  return new Promise((res) => setTimeout(res, seconds))
}

export const usePosts = defineStore('posts', {
  state: (): PostsStore => {
    return {
      ids: [],
      all: new Map(),
      foo: 'foo',
      selectedPeriod: 'Today',
    }
  },
  getters: {
    filterPost(state): TimelinePost[] {
      return state.ids
        .map((id: string) => {
          const post = state.all.get(id)
          if (!post) {
            throw new Error('cannot find post')
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          }
        })
        .filter((post: TimelinePost) => {
          if (state.selectedPeriod === 'Today') {
            return post.created >= DateTime.now().minus({ day: 1 })
          }
          if (state.selectedPeriod === 'This Week') {
            return post.created >= DateTime.now().minus({ week: 1 })
          }
          return post
        })
    },
  },
  actions: {
    setState(foo: string) {
      this.foo = foo
    },
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },
    async fetchPosts() {
      const res = await fetch('http://localhost:8000/posts')
      const data = (await res.json()) as Post[]

      await delay()
      let ids: string[] = []
      let all: Map<string, Post> = new Map()
      for (let i = 0; i < data.length; i++) {
        const post = data[i]
        ids.push(post.id)
        all.set(post.id, post)
      }
      this.ids = ids
      this.all = all
    },
  },
})
