import { idPayment } from "~/store/payment";
import { useIdStore } from "~/store/id";

export default defineEventHandler(async (event) => {
  const idPaymentStore = idPayment();
  const idStore = useIdStore();

  const creatorId = idStore.setCreatorId;
  const id = idStore.setId;
  const paymentFetch = idPaymentStore.setFetchPayment;
  const body = await readBody(event);
  console.log(body);
  body = idPayment.setFetchPayment;
  return {
    success: true,
  };
});
