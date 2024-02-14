import { defineStore } from 'pinia';

export const idPostStore = defineStore('idPost', {
  state: () => ({
    creatorId: '',
  }),
  actions: {
    setCreatorId(creatorId) {
        this.creatorId = creatorId;
      },
  },
});
