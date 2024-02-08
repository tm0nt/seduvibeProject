<template>
  <div>
    <v-col v-if="filteredMetaList.length > 0" class="mt-4">
      <v-card
        v-for="metaItem in filteredMetaList"
        :key="metaItem.id"
        class="mx-auto rounded-xl elevation-4 mb-2"
        flat
        @click="DonationMeta(metaItem)"
        color="background"
        :title="metaItem?.name"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-bullseye-arrow</v-icon>
        </template>
        <template v-slot:subtitle>
          {{ formatarMoeda(metaItem?.amount) }}
        </template>
        <template v-slot:append>
          <v-icon>
            {{ isMetaCompleted(metaItem) ? "mdi-check" : "mdi-clock-outline" }}
          </v-icon>
        </template>
        <v-card-text>
          <p class="text-caption text-medium-emphasis">
            <v-icon class="ma-1">mdi-calendar</v-icon>Criado em 20/06/2023
          </p>
          <v-progress-linear
            v-model="progress"
            class="rounded-xl mt-2"
            height="12"
            stream
            color="primary"
            :buffer-value="calculateProgress(metaItem?.collected, metaItem?.amount)"
          ></v-progress-linear>

          <p class="mt-2 mb-n1 text-center text-caption">Recebidos/Meta</p>
          <p class="text-center text-caption">
            <b class="primary"> {{ formatarMoeda(metaItem?.collected) }}</b> /
            {{ formatarMoeda(metaItem?.amount) }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-alert v-else variant="outlined" type="info" color="primary" class="rounded-xl mt-5">
      Nenhuma meta encontrada.
    </v-alert>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
    <v-dialog v-model="DonationMetaDialog.visible" width="600" persistent>
      <v-card class="rounded-xl elevation-6"  flat>
        <v-card-title><v-icon @click="DonationMetaDialog.visible = false">mdi-close</v-icon></v-card-title>
        <v-card-text class="text-center">Contribua com o objetivo: {{ DonationMetaDialog.item.name}}</v-card-text>
        <PaymentMethod/>
      </v-card>
    </v-dialog>
    <v-toolbar color="rgb(0,0,0,0)" height="100"></v-toolbar>
  </div>
</template>

<script>
import PaymentMethod from "../paymentMethods/index.vue";

export default {
  components: {
    PaymentMethod,
  },
};
</script>

<script setup>
import { ref } from "vue";


const cookie = useCookie("token");
const token = cookie.value;

const route = useRoute();
const user = ref(route.params.slug);
const filteredMetaList = ref([]);
const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});
const DonationMetaDialog  = ref({item: null, visible: false});
const progress = ref(0);

const isMetaCompleted = (metaItem) => {
  return metaItem.collected === metaItem.amount;
};

const calculateProgress = (collected, amount) => {
  return (collected / amount) * 100;
};

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const DonationMeta = (item) => {
  DonationMetaDialog.value = { item: item, visible: true };
};

const fetchData = async () => {
  try {
    const { data: metaData, error } = await useFetch(
      `https://api.seduvibe.com/list_creator/${user._rawValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    filteredMetaList.value = metaData._rawValue.userData.userObjectives.filter(metaItem => !isMetaCompleted(metaItem));
    console.log(filteredMetaList.value);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

fetchData();
</script>
