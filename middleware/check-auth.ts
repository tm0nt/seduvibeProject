import { useGlobalStore } from "~/store/index";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useGlobalStore();
  const logado = store.logado;
  if (logado === true) {
    return navigateTo("/profile");
  }
});
