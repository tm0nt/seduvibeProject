export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    authenticated.value = true;
  }
  if (token.value && to?.name === "/") {
    return navigateTo("/profile");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "/profile") {
    abortNavigation();
    return navigateTo("/");
  }
});
