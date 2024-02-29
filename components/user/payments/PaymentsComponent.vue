<template>
  <v-app>
    <v-container>
      <h2>Pagamentos</h2>
      <p class="text-caption text-medium-emphesis">Esse são todos seus pagamentos conosco!</p>
      <v-row align="center" justify="center" class="mt-8">
        <v-data-table
          :headers="headers"
          :items="subscriptions && subscriptions.length ? subscriptions : []"
          :header-props="headerProps"
          items-per-page-text="Pagamentos"
          :hide-default-footer="true"
          class="elevation-0 rounded-xl"
        >
          <template v-slot:no-data>
            <div class="px-4 text-caption text-medium-emphasis">Você não possui pagamentos.</div>
          </template>
          <template v-slot:item.expiration="{ value }">
            {{ formatDate(value) }}
          </template>
          <template v-slot:item.paymentMethod="{ value }">
            {{ value.toUpperCase() }}
          </template>
          <template v-slot:item.subscriptionData="{ value }">
            {{ value.toUpperCase() }}
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup>
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("pt-BR", options);
  return formattedDate;
};
const subscriptions = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch(
      "https://api.seduvibe.com/subscription/list_subscriptions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    subscriptions.value = data;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});

const headers = [
  {
    title: "Identificador",
    key: "id",
  },
  {
    title: "Criador(a)",
    key: "creator",
  },
  {
    title: "Expiração",
    key: "expiration",
  },
  {
    title: "Método",
    key: "paymentMethod",
  },
  {
    title: "Duração",
    key: "subscriptionData",
  },
];

const headerProps = {
  ripple: false,
};
</script>
