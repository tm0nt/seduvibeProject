<template>
  <v-data-table
    :headers="headers"
    no-data-text="Você não possui afiliados"
    items-per-page-text="Afiliados"
    :items="affiliatePending && affiliatePending.length ? affiliatePending : []"
    theme="dark"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" @click="viewRequest(item)"> mdi-dock-window </v-icon>
    </template>
  </v-data-table>

  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    rounded="pill"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.message }}
  </v-snackbar>

  <v-dialog v-model="viewRequestId.visible" width="400" persistent>
    <v-card class="rounded-xl elevation-6" color="background" flat>
      <v-card-title
        ><v-icon @click="viewRequestId.visible = false" size="small"
          >mdi-close</v-icon
        ></v-card-title
      >
      <v-card-text class="text-center">
        <v-card color="background" flat class="rounded-xl">
          <p class="mt-1 text-caption">Pedido em: {{ viewRequestId.item.createdAt }}</p>
          <template v-slot:title>
            <p>
              <v-icon class="ma-1" size="small">mdi-account</v-icon>{{ viewRequestId.item.user }}
            </p>
          </template>
          <template v-slot:subtitle>
            <p>{{ viewRequestId.item.description }}</p>
          </template>
          <p class="text-caption">Usuário para check-out</p>
          <v-btn color="primary" class="mt-2 text-capitalize">@L4riss4</v-btn>
        </v-card>
      </v-card-text>
      <v-card-actions class="ma-1">
        <v-btn
          prepend-icon="mdi-check-circle"
          color="primary"
          @click="approvedRequest(viewRequestId.item.id)"
          variant="text"
          >APROVAR</v-btn
        >
        <v-btn
          prepend-icon="mdi-close-circle"
          color="primary"
          @click="rejectRequest(viewRequestId.item.id)"
          variant="text"
          >REPROVAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const cookie = useCookie("token");
const token = cookie.value;

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 6000,
  };
};

const affiliatePending = ref(null);
const viewRequestId = ref({
  id: null,
  visible: false,
});

const approvedRequest = async (id) => {
  try {
    const data = await $fetch(
      `https://api.seduvibe.com/afiliates/accept-affiliate-request/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    affiliatePending.value = data;
    showSnackbar("Afiliado aprovado com sucesso!", "success");
    fetchAffiliates();
    viewRequestId.value.visible = false;
  } catch (error) {
    console.error("Erro", error);
  }
};

const rejectRequest = async (id) => {
  try {
    const data = await $fetch(
      `https://api.seduvibe.com/afiliates/reject-affiliate-request/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    showSnackbar("Afiliado reprovado com sucesso!", "success");
    affiliatePending.value = data;
    fetchAffiliates();
    viewRequestId.value.visible = false;
  } catch (error) {
    console.error("Erro", error);
  }
};

const headers = [
  {
    title: "Identificador",
    key: "id",
  },
  { title: "Nome", key: "user" },
  {
    title: "Data",
    key: "createdAt",
  },
  { title: "Ação", key: "actions", sortable: false },
];

const fetchAffiliates = async () => {
  try {
    const data = await $fetch(
      "https://api.seduvibe.com/afiliates/list-pending-affiliate-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    affiliatePending.value = data;
  } catch (error) {
    console.error("Erro", error);
  }
};

const viewRequest = (item) => {
  viewRequestId.value = { item: item, visible: true };
};

fetchAffiliates();
</script>
