import { defineStore } from "pinia";

export const useIdStorePublic = defineStore("idPublic", {
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
