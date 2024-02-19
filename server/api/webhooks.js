import { idPayment } from "~/store/payment";

export default defineEventHandler(async (event) => {
  const idPaymentStore = idPayment();
  const body = await readBody(event);
  idPaymentStore.setFetchPayment(event);
  console.log(body);
  return {
    success: true,
  };
});
