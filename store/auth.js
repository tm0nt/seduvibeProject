// auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    loading: false,
    errors: null,
    message: null,
    snackbar: {
      show: false,
      text: "Aconteceu algum erro!",
      color: "red",
    },
  }),
  actions: {
    async authenticateUser({ email, password }) {
      try {
        const { data, error } = await useFetch("https://api.seduvibe.com.br/login", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            email,
            password,
          },
        });
        if (data.value) {
          this.showSnackbar(data.value.msg, "success");
          const token = useCookie("token");
          token.value = data?.value?.token;
          console.log(data);

          setTimeout(() => {
            navigateTo("/profile");
          }, 2000);
        } else if (error.value) {
          console.log(error.value.data.msg);
          this.showSnackbar(error.value.data.msg, "red");
        }
      } catch (error) {
        //
      }
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text,
        color,
      };

      setTimeout(() => {
        this.snackbar.show = false;
      }, 3000);
    },
  },
});
