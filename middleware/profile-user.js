import { useIdStore } from '~/store/id';

export default defineNuxtRouteMiddleware(async(to, from) => {
  const storeId = useIdStore();

  if (to.path.includes('/profile/user') && storeId.creatorId === 1) {
    return abortNavigation()
  }
  if(to.path.includes == ("/profile/user")){
    return navigateTo("/profile/creator")
  }
});
