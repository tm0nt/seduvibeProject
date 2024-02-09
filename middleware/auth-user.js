import { useIdStore } from '~/store/id';

export default defineNuxtRouteMiddleware((to, from) => {
    const idStore = useIdStore();
    const creatorId = idStore.creatorId;
    const id = idStore.id;

    if (creatorId !== 0){
        if(to.path !== '/profile/creator'){
            return navigateTo('/profile/creator')
        }
    }
  });
  
