import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    creator: null,
  }),
  actions: {
    setCreator(dados) {
      this.creator = dados;
    },
  },
});
