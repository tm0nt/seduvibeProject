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
        >
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </v-row>
          </template>
        </VImg>
        <VCard color="background" class="elevation-8 rounded-xl mx-auto" width="400" flat>
          <VCard-text class="text-center">
            <VAvatar size="120">
              <VImg :src="profile?.userData?.profilePicture" cover>
                <template v-slot:placeholder>
                  <v-row align="center" class="fill-height ma-0" justify="center">
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                  </v-row>
                </template>
              </VImg>
            </VAvatar>
            <h2 class="mt-2">{{ profile?.userData?.name }}</h2>
            <p class="text-caption text-medium-emphasis mt-1">{{ profile?.userData?.bio }}</p>
            <VSpacer></VSpacer>
            <VTextField
              class="mt-4"
              variant="solo"
              v-model="donationValue"
              bg-color="input_color"
              label="Valor"
              type="number"
              hide-spin-buttons
              prepend-inner-icon="mdi-coin"
            ></VTextField>
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

const profile = ref(null);
const route = useRoute();
const user = ref(route.params.user);
const donationValue = ref(null);

watch(donationValue, (newValue) => {
  idPaymentStore.setAmount(donationValue.value)
});

const fetchData = async () => {
  try {
    idPaymentStore.setCpf(null);
    const { data, error } = await useFetch(`https://api.seduvibe.com/list_creator/${user.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.value) {
      profile.value = data.value;
      console.log(data.value);
      console.log(error.value);
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
fetchData();
</script>
<script>
import PaymentMethod from "../../../components/creator/paymentMethods/index";
export default {
  components: {
    PaymentMethod,
  },
};
</script>
