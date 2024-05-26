export default defineNuxtRouteMiddleware((to, from) => {
    const { $locally } = useNuxtApp();
    if (!$locally.getItem("token")) {
        return navigateTo("/login");
    }
  });
  