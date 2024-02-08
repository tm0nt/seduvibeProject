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
            <v-tab>Mimos</v-tab>
          </v-tabs>

          <div class="mt-10">
            <v-row v-if="selectedTab === 0">
              <v-col>
                <component :is="currentComponent" />
              </v-col>
            </v-row>
            <v-row v-if="selectedTab === 1">
              <v-col>
                <component :is="currentComponent" />
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
            <v-chip @click="selectPlan('Mensal')" :class="{ 'primary--text': selectedPlan === 'Mensal' }">Mensal</v-chip>
            <v-chip @click="selectPlan('Trimestral')" :class="{ 'primary--text': selectedPlan === 'Trimestral' }">Trimestral</v-chip>
            <v-chip @click="selectPlan('Semestral')" :class="{ 'primary--text': selectedPlan === 'Semestral' }">Semestral</v-chip>
            <v-chip @click="selectPlan('Anual')" :class="{ 'primary--text': selectedPlan === 'Anual' }">Anual</v-chip>
          </v-chip-group>
          <v-row class="mt-1" align="center" justify="center">
            <v-col cols="8">
              <v-card
                link
                class="rounded-xl mx-auto"
                prepend-icon="mdi-coin"
                @click="paymentDialogVisible = true;subscriptionList.visible = false;"
                color="primary"
                variant="tonal"
                :title="`Assinatura ${selectedPlan}`"
              >
                <template v-slot:title>
                  <p class="text-subtitle-1">Assinatura {{ selectedPlan }}</p>
                </template>
                <p class="mt-n3 text-caption text-medium-emphasis ma-4">
                  Pagamentos feitos periódicamente automático
                </p>
                <h3 class="ma-4">R$ 10,00</h3>
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
          <p class="text-center">Escolha seu método de pagamento</p>
          <paymentMethod />
        </v-container>
      </v-card>
    </VDialog>
  </VApp>
</template>

<script setup>
const subscriptionList = ref({
  visible: false,
});
const paymentDialogVisible = ref(false);
const selectedPlan = ref('Mensal');

const selectPlan = (plan) => {
  selectedPlan.value = plan;
};
</script>

<script>
import paymentMethod from "../../components/creator/paymentMethods/index.vue"
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
