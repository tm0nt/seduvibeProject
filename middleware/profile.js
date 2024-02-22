import { useIdStore } from "~/store/id";

export default defineNuxtRouteMiddleware((to, from) => {
    const storeId = useIdStore();
    if(storeId.creatorId === 0){
        return navigateTo("/profile")
    }
  })