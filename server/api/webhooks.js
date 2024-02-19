import { idPayment  } from "~/store/payment";
import { useIdStore } from "~/store/id";

const idPaymentStore = idPayment();
const idStore = useIdStore();

const creatorId = idStore.setCreatorId;
const id = idStore.setId;
const paymentFetch = idPaymentStore.setFetchPayment

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body);
    idPaymentStore.setFetchPayment(event);
    return {
        success: true,
    }
});