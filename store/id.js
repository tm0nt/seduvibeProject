import { defineStore } from "pinia";

export const useIdStore = defineStore("id", {
  state: () => ({
    creatorId: null,
    id: null,
    auth: false,
    user: "",
  }),
  actions: {
    setAuth(auth) {
      this.auth = auth;
    },
    setUser(user) {
      this.user = user;
    },
    setId(id) {
      this.id = id;
    },
    setCreatorId(creatorId) {
      this.creatorId = creatorId;
    },
  },
});
