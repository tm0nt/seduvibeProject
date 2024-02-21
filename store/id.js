import { defineStore } from "pinia";

export const useIdStore = defineStore("id", {
  state: () => ({
    creatorId: "",
    id: "",
  }),
  actions: {
    setId(id) {
      this.id = id;
    },
    setCreatorId(creatorId) {
      this.creatorId = creatorId;
    },
  },
});
