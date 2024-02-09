// auth.js
import { defineStore } from "pinia";

export const useRegisterStore = defineStore("register", {
  state: () => ({
    token: null,
    loading: false,
    errors: null,
    message: null,
    snackbar: {
      show: false,
      text: "Aconteceu algum erro!",
      color: "error",
    },
  }),
  actions: {
    async registerUser({user,name,email,password,creator}) {
      try {
        const { data, error, loading } = await useFetch("https://api.seduvibe.com/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            user,
            name,
            email,
            password,
            creator
          },
        });
        this.loading = loading;
        if (data.value) {
          this.showSnackbar(data.value.msg, "success");

          setTimeout(() => {
            navigateTo("/login");
          }, 2000);
        } else if (error.value) {
          console.log(error);
          console.log(error.value.data.msg);
          this.showSnackbar(error.value.data.msg, "error");
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
