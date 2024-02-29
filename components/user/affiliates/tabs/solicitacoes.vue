<template>
  <v-data-table
    :headers="headers"
    :items="affiliateRequests && affiliateRequests.length ? affiliateRequests : []"
    :header-props="headerProps"
    items-per-page-text="Solicitações"
    :hide-default-footer="true"
    class="elevation-0 rounded-xl"
  >
    <template v-slot:no-data>
      <div class="px-4 text-caption text-medium-emphasis">Você não possui requisições.</div>
    </template>
    <template v-slot:item.createdAt="{ value }">
      {{ formatDate(value) }}
    </template>
    <template v-slot:item.status="{ value }">
      {{ value.toUpperCase() }}
    </template>
  </v-data-table>
</template>
<script setup>
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("pt-BR", options);
  return formattedDate;
};
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
    title: "Status",
    key: "status",
  },
  {
    title: "Pedido em",
    key: "createdAt",
  },
];

const headerProps = {
  ripple: false,
};
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const affiliateRequests = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch(
      "https://api.seduvibe.com/afiliates/user-affiliate-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    affiliateRequests.value = data;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
</script>
