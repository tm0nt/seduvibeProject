import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    post: false,
  }),
  actions: {
    setPost(post) {
      this.post = post;
    },
  },
});
