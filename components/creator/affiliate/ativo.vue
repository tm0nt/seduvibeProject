<template>
  <v-data-table
    :headers="headers"
    no-data-text="Você não possui afiliados"
    items-per-page-text="Afiliados"
    :items="affiliateActive && affiliateActive.length ? affiliateActive : []"
  light="true"
    >
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" @click="viewInfoData(item)"> mdi-info-circle </v-icon>
      <v-icon @click="deleteAffiliateData(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
  <v-dialog v-model="viewInfo.visible" width="400" persistent>
    <v-card class="rounded-xl elevation-6" color="background" flat>
      <v-card-title
        ><v-icon @click="viewInfo.visible = false" size="small">mdi-close</v-icon></v-card-title
      >
      <v-card-text class="text-center">
        <v-card color="background" flat class="rounded-xl">
          <p class="mt-1 text-caption">Pedido em: {{ viewInfo.item.createdAt }}</p>
          <template v-slot:title>
            <p><v-icon class="ma-1" size="small">mdi-account</v-icon>{{ viewInfo.item.user }}</p>
          </template>
          <template v-slot:subtitle>
            <p>{{ viewInfo.item.description }}</p>
          </template>
          <p class="text-caption">Usuário para check-out</p>
          <v-btn
            color="primary"
            :to="'/checkout/@' + viewInfo.item.checkoutUser + '?id=' + viewInfo.item.id"
            class="mt-2 text-capitalize"
            >@{{ viewInfo.item.checkoutUser }}</v-btn
          >
          <v-row class="mt-2">
            <v-col cols="12" md="6" lg="6">
              <v-card color="primary" variant="tonal" class="rounded-xl" flat
                >1212<template v-slot:title><p class="text-caption">Vendas</p></template></v-card
              >
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-card color="primary" variant="tonal" class="rounded-xl" flat
                >R$10,56<template v-slot:title
                  ><p class="text-caption">Faturamento</p></template
                ></v-card
              >
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-card color="primary" variant="tonal" class="rounded-xl" flat
                >4546<template v-slot:title><p class="text-caption">Cliques</p></template></v-card
              >
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-card color="primary" variant="tonal" class="rounded-xl" flat
                >R$ 1,00<template v-slot:title
                  ><p class="text-caption">Sua comissão</p></template
                ></v-card
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
      <v-card-actions class="ma-1">
        <v-btn
          prepend-icon="mdi-check-circle"
          color="primary"
          @click="viewInfo.visible = false"
          variant="text"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="deleteAffiliate.visible" width="650" persistent>
    <v-card
      class="rounded-xl elevation-6"
      color="background"
      flat
      title="Você quer reprovar seu afiliado?"
      subtitle="Ao realizar essa ação ele estará impossibilitado de vender usando seu conteúdo"
      prepend-icon="mdi-delete"
      ><v-card-actions class="ma-2"
        ><v-btn
          variant="text"
          color="primary"
          @click="deleteAffiliateRequest(deleteAffiliate.item.id)"
          >SIM</v-btn
        ><v-btn variant="text" color="primary" @click="deleteAffiliate.visible = false"
          >NÃO</v-btn
        ></v-card-actions
      ></v-card
    >
  </v-dialog>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    rounded="pill"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.message }}
  </v-snackbar>
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

const viewInfo = ref({
  visible: false,
  item: null,
  sales: null,
});

const deleteAffiliate = ref({
  visible: false,
  item: null,
});

const viewInfoData = (item) => {
  viewInfo.value = { item: item, visible: true };
};

const deleteAffiliateData = (item) => {
  deleteAffiliate.value = { item: item, visible: true };
};

const affiliateActive = ref(null);
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
      "https://api.seduvibe.com/afiliates/list-aproved-affiliate-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    affiliateActive.value = data._rawValue;
  } catch (error) {
    console.error("Erro", error);
  }
};

const deleteAffiliateRequest = async (item) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/afiliates/remove-affiliate/${item}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchAffiliates();
    deleteAffiliate.value.visible = false;
    showSnackbar("Afiliado deletado com sucesso!", "success");
  } catch (error) {
    console.error("Erro", error);
  }
};

fetchAffiliates();
</script>
