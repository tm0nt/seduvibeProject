export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;

  if ((to.path === "/login" || to.path === "/register")) {
    try {
      const { data, error } = await useFetch("https://api.seduvibe.com/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.value) {
        return navigateTo("/profile/");
      } else if (error.value) {
        console.error("Error fetching creator value:", error);
      }
    } catch (error) {
      console.error("Error fetching creator value:", error);
    }
  } else if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
