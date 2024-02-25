import { idPayment } from "~/store/payment";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const idStore = idPayment();
  idStore.setFetchPayment = body;
  console.log(idStore.paymentLatest)
  return {
    success: true,
  };
});
