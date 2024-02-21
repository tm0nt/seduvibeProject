<template>
  <v-app>
    <v-container>
      <h2>Afiliados</h2>
      <p class="text-caption text-medium-emphesis">Este é o painel de afiliados</p>
      <v-row>
        <VCol cols="12" md="6" lg="6">
          <v-card color="background" rounded="xl" class="elevation-0" flat>
            <v-card-text>
              <v-list bg-color="background">
                <v-list-subheader>PAINEL</v-list-subheader>
                <v-list-item
                  bg-color="input_color"
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  color="purple"
                  rounded="shaped"
                  @click="selectComponent(item)"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </VCol>
        <VCol md="6" sm="12" xs="12" lg="6">
          <component :is="selectedComponent" />
        </VCol>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup>
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const subscriptionCreator = ref(null);

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch(
      "https://api.seduvibe.com/subscription/list_subscriptions_users_active",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    subscriptionCreator.value = fetchData._rawValue;
    console.log(fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
</script>
<script>
import afiliacaoAtiva from "./tabs/afiliacaoativa.vue";
import meafiliar from "./tabs/meafiliar.vue";
import solicitacoes from "./tabs/solicitacoes.vue";
import financeiro from "./tabs/financeiro.vue";
import historico from "./tabs/historico.vue";

export default {
  data: () => ({
    items: [
      { text: "Afiliações ativas", icon: "mdi-account-multiple-check", component: afiliacaoAtiva },
      { text: "Solicitação de afiliação", icon: "mdi-file-document-plus", component: solicitacoes },
      { text: "Quero me afiliar", icon: "mdi-account-group", component: meafiliar },
      { text: "Financeiro", icon: "mdi-cash", component: financeiro },
      { text: "Histórico", icon: "mdi-history", component: historico },
    ],
    selectedComponent: null,
  }),
  methods: {
    selectComponent(item) {
      this.selectedComponent = item.component;
    },
  },
  components: {
    afiliacaoAtiva,
  },
};
</script>
