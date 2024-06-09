import { defineStore } from 'pinia'
import { Post, today, thisMonth, thisWeek } from '../posts'

export const usePosts = defineStore('posts', {
  state() {
    const ids = [today.id, thisWeek.id, thisMonth.id]
    return {
      ids,
      all: new Map([
        [today.id, today],
        [thisWeek.id, thisWeek],
        [thisMonth.id, thisMonth],
      ]),
      foo: 'foo',
    }
  },
  actions: {
    setState(foo: string) {
      this.foo = foo
    },
  },
})
