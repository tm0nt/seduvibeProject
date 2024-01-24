import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    token: null,
    loading: false,
    creator: null,
  }),
  actions: {
    async authenticateUser({ email, password }) {
      const { data, pending } = await useFetch("https://api.seduvibe.com/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie("token");
        token.value = data?.value?.token;
        this.authenticated = true;
        this.token = data?.value?.token;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      this.token = null;
      token.value = null;
    },
    setCreator(dados) {
      this.creator = dados;
    },
  },
});
