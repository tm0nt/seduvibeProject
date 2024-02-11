import { useIdStore } from '~/store/id';

export default defineNuxtRouteMiddleware(async(to, from) => {
  const storeId = useIdStore();

  if (to.path.includes('/profile/creator') && storeId.creatorId === 0) {
    return abortNavigation()
  }
  if(to.path.includes == ("/profile/creator")){
    return navigateTo("/profile/user")
  }
});
