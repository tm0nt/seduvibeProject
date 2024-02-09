import { useIdStore } from '~/store/id';

export default defineNuxtRouteMiddleware((to, from) => {
    const idStore = useIdStore();
    const creatorId = idStore.creatorId;
    const id = idStore.id;

    if (creatorId !== 1){
        if(to.path !== '/profile/user'){
            return navigateTo('/profile/user')
        }
    }
  });
  
