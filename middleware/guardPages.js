import { useIdStore } from '~/store/id';

export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;

  if (token) {
    try {
      const { data, error } = useFetch("https://api.seduvibe.com/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.value) {
        const creator = data.value.users[0].creator;
        const id = data.value.users[0].id;
        const storeId = useIdStore();
        storeId.setCreatorId(creator);
        storeId.setId(id);
      } else if(error.value) {
        if (to.path != "/login") {
          return navigateTo("/login");
        }
      }
    } catch (error) {
      console.error("Error fetching creator value:", error);
    }
  } else {
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
  }
});
