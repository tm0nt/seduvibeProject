<template>
  <VApp>
    <VRow no-gutters align="center">
      <VCol cols="12" md="8" offset-md="2">
        <VToolbar color="rgb(0,0,0,0)" height="30"></VToolbar>
        <VImg
          src="https://i.imgur.com/BrTfYSp.png"
          class="mx-auto mb-10 text-center"
          format="webp"
          width="60"
        ></VImg>
        <VCard color="background" class="elevation-8 rounded-xl mx-auto" width="400" flat>
          <VCard-text class="text-center">
            <VAvatar size="120" :image="affiliateProfile?.profilePicture"></VAvatar>
            <h2 class="mt-2">@{{ affiliateProfile?.userFake }}</h2>
            <p class="text-caption text-medium-emphasis mt-1">{{ affiliateProfile?.bio }}</p>
            <VSpacer></VSpacer>
            <VChip color="primary" class="mt-1">R$ {{ affiliateProfile?.productValue }}</VChip>
            <PaymentMethod />
          </VCard-text>
        </VCard>
      </VCol>
    </VRow>
  </VApp>
</template>
<script setup>
import { idPayment } from "~/store/payment";
const idPaymentStore = idPayment();
const cookie = useCookie("token");
const token = cookie.value;

const affiliateProfile = ref(null);

const route = useRoute();
const idCreator = ref(route.params.idCreator);
const userFake = ref(route.params.userFake);

const fetchData = async () => {
  try {
    idPaymentStore.setCpf = null;
    const { data, error } = await useFetch(
      `https://api.seduvibe.com/afiliates/checkout/${idCreator.value}/${userFake.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.value) {
      affiliateProfile.value = data.value;
    } else {
      return navigateTo("/");
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
fetchData();
</script>
<script>
import PaymentMethod from "../../../../components/creator/paymentMethods/index";
export default {
  components: {
    PaymentMethod,
  },
};
</script>
