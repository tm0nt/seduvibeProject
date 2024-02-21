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
                class="text-capitalize"
                @click="subscriptionList.visible = true"
              >
                Assinar
              </VBtn>
            </VCol>
          </VRow>
          <v-divider class="my-3"></v-divider>
          <v-tabs color="primary" v-model="selectedTab" align-tabs="center">
            <v-tab>Publicações</v-tab>
            <v-tab>Galeria</v-tab>
            <v-tab>Metas</v-tab>
          </v-tabs>
          <div class="mt-10">
            <v-row v-if="selectedTab === 0">
              <v-col>
                <component v-if="active" :is="currentComponent" />
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
                    <v-icon color="primary" size="30">mdi-lock-outline</v-icon>
                  </v-card-text></v-card
                >
              </v-col>
            </v-row>
            <v-row v-if="selectedTab === 1">
              <v-col>
                <component v-if="active" :is="currentComponent" />
                <v-card
                  variant="tonal"
                  @click="showBlockMessage"
                  link
                  width="150"
                  class="rounded-xl mx-auto"
                  color="primary"
                  flat
                  v-else
                  ><v-card-text class="text-center">
                    <v-icon color="primary" size="30">mdi-lock-outline</v-icon>
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
    <VDialog v-model="subscriptionList.visible" persistent width="600">
      <v-card class="rounded-xl elevation-6" color="background" flat>
        <v-card-title>
          <v-icon size="small" @click="subscriptionList.visible = false">mdi-close</v-icon>
        </v-card-title>
        <v-container>
          <p class="text-center mb-4">Apoie sua criadora assinando seu conteúdo</p>
          <v-chip-group filter color="primary" class="mb-1">
            <v-chip
              @click="selectPlan('mensal')"
              :class="{ 'primary--text': selectedPlan === 'mensal' }"
              >Mensal</v-chip
            >
            <v-chip
              @click="selectPlan('trimestral')"
              :class="{ 'primary--text': selectedPlan === 'trimestral' }"
              >Trimestral</v-chip
            >
            <v-chip
              @click="selectPlan('semestral')"
              :class="{ 'primary--text': selectedPlan === 'semestral' }"
              >Semestral</v-chip
            >
            <v-chip
              @click="selectPlan('anual')"
              :class="{ 'primary--text': selectedPlan === 'anual' }"
              >Anual</v-chip
            >
          </v-chip-group>
          <v-row class="mt-1" align="center" justify="center">
            <v-col cols="8">
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
            width="400"
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
const idPaymentStore = idPayment();

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
const active = ref(false);
const subscriptionList = ref({
  visible: false,
  list: [],
});
const cookie = useCookie("token");
const token = cookie.value;
const guardContentRequest = async (creatorId) => {
  try {
    const { data, error, pending } = await useFetch(
      `https://api.seduvibe.com/subscription/subs_users_active_unique/${creatorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    active.value = data._rawValue.active;
    console.log(data);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const showBlockMessage = async () => {
  showSnackbar("Você não possui acesso para ver este conteúdo!", "error");
};
const selectedPlan = ref("mensal");
const paymentDialogVisible = ref(false);
const fetchData = async () => {
  try {
    const { data, error } = await useFetch(
      `https://api.seduvibe.com/list_creator/${user._rawValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    subscriptionList.value.list = data.value.creatorSubscriptions;
    guardContentRequest(data.value.userData.id);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const route = useRoute();
const user = ref(route.params.slug);

const selectPlan = (plan) => {
  selectedPlan.value = plan;
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

watch(() => {
  idPaymentStore.setAmount = subscriptionValue.value;
});

// Assista as alterações em subscriptionList e imprima no console
watch(
  () => subscriptionList.value,
  (newList) => {
    console.log("subscriptionList atualizada:", newList);
  }
);

// Assista as alterações em selectedPlan e imprima no console
watch(
  () => selectedPlan.value,
  (newPlan) => {
    console.log("selectedPlan atualizado:", newPlan);
  }
);

fetchData();
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
