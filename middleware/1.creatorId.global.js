import { useIdStore } from "~/store/id";
import { idPayment } from "~/store/payment";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;

  if (token) {
    try {
      const data = await $fetch("https://api.seduvibe.com/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        console.log(data);
        const creator = data.users[0].creator;
        const id = data.users[0].id;
        const storeId = useIdStore();
        const paymentId = idPayment();

        paymentId.setCpf(data.personal_Data[0].cpf);
        paymentId.setName(data.users[0].name);
        paymentId.setEmail(data.users[0].email);

        storeId.setCreatorId(creator);
        storeId.setId(id);
        storeId.setUser(data.users[0].user);
        storeId.setAuth(true);
      }
    } catch (error) {
      console.error("Error fetching creator value:", error);
    }
  }
});