<template>
  <VApp>
    <navbarView />
    <VContainer>
      <VRow no-gutters align="center" class="mt-n2">
        <VCol cols="12" md="8" offset-md="2">
          <headerCreator />
          <VRow>
            <VCol cols="12">
              <VBtn
                min-height="35"
                block
                color="primary"
                :disabled="noLogin === true"
                class="text-capitalize"
                @click="subscriptionList.visible = true"
              >
                Assinar
              </VBtn>
            </VCol>
          </VRow>
          <NuxtLink to="/login">
            <v-chip variant="outlined" v-if="noLogin === true" color="primary" class="mt-2"
              >Não autenticado, clique p/ fazer login</v-chip
            >
          </NuxtLink>
          <v-divider class="my-3"></v-divider>
          <v-tabs color="primary" v-model="selectedTab" align-tabs="center">
            <v-tab>Publicações</v-tab>
            <v-tab>Galeria</v-tab>
            <v-tab>Metas</v-tab>
          </v-tabs>
          <div class="mt-10">
            <v-row v-if="selectedTab === 0">
              <v-col>
                <component v-if="active?.subscriptionActive?.active" :is="currentComponent" />
                <v-card
                  @click="showBlockMessage"
                  variant="tonal"
                  link
                  width="150"
                  class="rounded-xl mx-auto"
                  color="primary"
                  flat
                  v-else
                  ><v-card-text class="text-center">
                    <v-icon color="primary" size="30">mdi-lock</v-icon>
                  </v-card-text></v-card
                >
              </v-col>
            </v-row>
            <v-row v-if="selectedTab === 1">
              <v-col>
                <component v-if="active?.subscriptionActive?.active" :is="currentComponent" />
                <v-card
                  @click="showBlockMessage"
                  variant="tonal"
                  link
                  width="150"
                  class="rounded-xl mx-auto"
                  color="primary"
                  flat
                  v-else
                  ><v-card-text class="text-center">
                    <v-icon color="primary" size="30">mdi-lock</v-icon>
                  </v-card-text></v-card
                >
              </v-col>
            </v-row>
            <v-row v-if="selectedTab === 2">
              <v-col>
                <component :is="currentComponent" />
              </v-col>
            </v-row>
          </div>
        </VCol>
      </VRow>
    </VContainer>
    <VDialog v-model="subscriptionList.visible" persistent width="400">
      <v-card class="rounded-xl elevation-6" color="background" flat>
        <v-card-title>
          <v-icon size="small" @click="subscriptionList.visible = false">mdi-close</v-icon>
        </v-card-title>
        <v-container>
          <p class="text-center mb-4">Apoie sua criadora assinando seu conteúdo</p>
          <v-chip-group filter color="primary" class="mb-1">
            <v-chip
              @click="selectPlan('Mensal')"
              :class="{ 'primary--text': selectedPlan === 'Mensal' }"
              >Mensal</v-chip
            >
            <v-chip
              @click="selectPlan('Trimestral')"
              :class="{ 'primary--text': selectedPlan === 'Trimestral' }"
              >Trimestral</v-chip
            >
            <v-chip
              @click="selectPlan('Semestral')"
              :class="{ 'primary--text': selectedPlan === 'Semestral' }"
              >Semestral</v-chip
            >
            <v-chip
              @click="selectPlan('Anual')"
              :class="{ 'primary--text': selectedPlan === 'Anual' }"
              >Anual</v-chip
            >
          </v-chip-group>
          <v-row class="mt-1" align="center" justify="center">
            <p
              v-if="selectedPlan === null"
              class="text-caption text-medium-emphasis text-center ma-2"
            >
              Selecione um período de assinatura acima
            </p>
            <v-col cols="12">
              <v-card
                link
                class="rounded-xl mx-auto"
                prepend-icon="mdi-coin"
                @click="
                  paymentDialogVisible = true;
                  subscriptionList.visible = false;
                "
                color="primary"
                variant="tonal"
                v-if="subscriptionValueFormatted != 'R$ 0.00'"
                :title="`Assinatura ${selectedPlan}`"
              >
                <template v-slot:title>
                  <p class="text-subtitle-1">Assinatura {{ selectedPlan }}</p>
                </template>
                <p class="mt-n3 text-caption text-medium-emphasis ma-4">
                  Pagamentos feitos periódicamente automaticamente
                </p>
                <h3 class="ma-4">{{ subscriptionValueFormatted }}</h3>
              </v-card>
              <v-card
                class="elevation-0 rounded-xl mx-auto"
                link
                flat
                v-if="subscriptionList.list && subscriptionList.list.length === 0"
                prepend-icon="mdi-error"
                variant="tonal"
                color="primary"
              >
                <template v-slot:title>
                  <p class="text-subtitle-1">Nenhuma assinatura cadastrada</p>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </VDialog>
    <VDialog v-model="paymentDialogVisible" persistent width="600">
      <v-card class="rounded-xl elevation-6" color="background" flat>
        <v-card-title>
          <v-icon size="small" @click="paymentDialogVisible = false">mdi-close</v-icon>
        </v-card-title>
        <v-container>
          <p class="text-center mb-4">Você está pagando</p>
          <v-card
            link
            class="rounded-xl mx-auto mb-2"
            prepend-icon="mdi-coin"
            color="primary"
            variant="tonal"
            :title="`Assinatura ${selectedPlan}`"
          >
            <template v-slot:title>
              <p class="text-subtitle-1">Assinatura {{ selectedPlan }}</p>
            </template>
            <p class="mt-n3 text-caption text-medium-emphasis ma-4">
              Pagamentos feitos periódicamente automaticamente
            </p>
            <h3 class="ma-4">{{ subscriptionValueFormatted }}</h3>
          </v-card>
          <paymentMethod />
        </v-container>
      </v-card>
    </VDialog>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </VApp>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { idPayment } from "~/store/payment";
import { useIdStore } from "~/store/id";
const idPaymentStore = idPayment();
const idStore = useIdStore();

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

const planIds = {
  Mensal: 1,
  Trimestral: 3,
  Semestral: 4,
  Anual: 2,
};

const active = ref(false);
const subscriptionList = ref({
  visible: false,
  list: [],
});
const cookie = useCookie("token");
const token = cookie.value;
const guardContentRequest = async (creatorId) => {
  try {
    const data = await $fetch(
      `https://api.seduvibe.com/subscription/subs_users_active_unique/${creatorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    active.value = data;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const noLogin = ref(false);

const showBlockMessage = async () => {
  showSnackbar("Você não possui acesso para ver este conteúdo!", "red");
};
const selectedPlan = ref(null);
const paymentDialogVisible = ref(false);
const fetchData = async (userName) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/list_creator/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    subscriptionList.value.list = data.creatorSubscriptions;
    guardContentRequest(data.userData.id);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const route = useRoute();
const user = ref(route.params.slug);

const selectPlan = (plan) => {
  selectedPlan.value = plan;
  idPaymentStore.setSubsId(planIds[plan]);
};
const subscriptionValue = computed(() => {
  const selectedSubscription = subscriptionList.value.list.find(
    (sub) => sub.subscriptionName === selectedPlan.value
  );
  return selectedSubscription ? selectedSubscription.value : 0;
});

const subscriptionValueFormatted = computed(() => {
  return `R$ ${subscriptionValue.value.toFixed(2)}`;
});

const noLoginFetch = async () => {
  try {
    if (idStore.auth === false) {
      noLogin.value = true;
    }
  } catch (error) {
    //
  }
};

watchEffect(() => {
  idPaymentStore.setAmount(subscriptionValue.value);
});
noLoginFetch();
fetchData(user.value);
</script>

<script>
import paymentMethod from "../../components/creator/paymentMethods/index.vue";
import headerCreator from "./headerCreator.vue";
import navbarView from "../../components/navbar";
import Publicacoes from "../../components/post/post.vue";
import Galeria from "../../components/post/gallery.vue";
import Mimos from "../components/creator/public/mimos.vue";

export default {
  computed: {
    currentComponent() {
      switch (this.selectedTab) {
        case 0:
          return "Publicacoes";
        case 1:
          return "Galeria";
        case 2:
          return "Mimos";
        default:
          return null;
      }
    },
  },
  data: () => {
    return {
      selectedTab: null,
    };
  },
  components: {
    headerCreator,
    paymentMethod,
    Publicacoes,
    Galeria,
    Mimos,
    navbarView,
  },
};
</script>
