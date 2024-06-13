export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;

  if (to.path === "/login" || to.path === "/register") {
    try {
      const data = await $fetch("https://api.seduvibe.com.br/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        return navigateTo("/profile/");
      } else {
        //
      }
    } catch (error) {
      //
    }
  } else if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
