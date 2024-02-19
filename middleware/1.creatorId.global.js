import { useIdStore } from '~/store/id';
import { idPayment } from '~/store/payment';

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
        const paymentId = idPayment();
        paymentId.setCpf = data.value.personal_Data[0].cpf;
        paymentId.setName = data.value.users[0].name;
        paymentId.setEmail = data.value.users[0].email;
        storeId.setCreatorId(creator);
        storeId.setId(id);
      }
    } catch (error) {
      console.error("Error fetching creator value:", error);
    }
  }
});
