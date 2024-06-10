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

export const usePosts = defineStore('posts', {
  state: (): PostsStore => {
    const ids = [today.id, thisWeek.id, thisMonth.id]
    return {
      ids,
      all: new Map([
        [today.id, today],
        [thisWeek.id, thisWeek],
        [thisMonth.id, thisMonth],
      ]),
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
  },
})
