import { defineStore } from "pinia";

export const useIdStorePublic = defineStore("idPublic", {
  state: () => ({
    creatorId: "",
    id: "",
    contributeId: "",
  }),
  actions: {
    setId(id) {
      this.id = id;
    },
    setCreatorId(creatorId) {
      this.creatorId = creatorId;
    },
    setContributeId(contribute) {
      this.contributeId = contribute;
    },
  },
});
