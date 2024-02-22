import { useIdStore } from "~/store/id";

export default defineNuxtRouteMiddleware((to, from) => {
    const storeId = useIdStore();
    if(storeId.creatorId === 1){
        return navigateTo("/profile/creator")
    }
  })