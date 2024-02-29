<template>
  <v-data-table
    :headers="headers"
    no-data-text="Nenhum saque encontrado"
    items-per-page-text="Saques"
    :items="historyWithdraw && historyWithdraw.length ? historyWithdraw : []"
    theme="dark"
  >
    <template v-slot:item.statusName="{ value }">
      <v-chip :color="getStatusColor(value)">
        {{ getStatusLabel(value) }}
      </v-chip>
    </template>
    <template v-slot:item.createdAt="{ value }">
      {{ formatRelativeTime(value) }}
    </template>
    <template v-slot:item.amount="{ value }">
      {{ value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
    </template>
  </v-data-table>
</template>

<script setup>
const cookie = useCookie("token");
const token = cookie.value;
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffInDays = Math.floor((today - date) / (24 * 60 * 60 * 1000));

  if (diffInDays === 0) {
    return "Hoje";
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `há ${diffInDays} dias`;
  }
};
const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Rejeitado";
    case "pending":
      return "Pendente";
    default:
      return "";
  }
};
const historyWithdraw = ref(null);
const headers = [
  {
    title: "Identificador",
    key: "id",
  },
  { title: "Status", key: "statusName" },
  {
    title: "Valor",
    key: "amount",
  },
  { title: "Data", key: "createdAt" },
];

const fetchWithdraw = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/withdraw_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    historyWithdraw.value = data?.withdrawals.reverse();
  } catch (error) {
    console.error("Erro", error);
  }
};

fetchWithdraw();
</script>
