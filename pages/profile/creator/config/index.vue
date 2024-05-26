<template>
  <VApp>
    <navbarView />
    <VContainer>
      <VRow no-gutters align="center">
        <VCol cols="12" md="8" offset-md="2">
          <navbarHeader />
          <VRow>
            <VCol cols="6">
              <NuxtLink to="/profile/creator"
                ><VBtn min-height="40" block color="primary" class="text-capitalize">
                  <v-icon size="16" class="ma-1">fa-home</v-icon>Dashboard
                </VBtn></NuxtLink
              >
            </VCol>
            <VCol cols="6">
              <NuxtLink to="/profile/creator/analytics">
                <VBtn min-height="40" class="text-capitalize" block variant="tonal" color="primary">
                  <v-icon class="ma-1">mdi-chart-donut</v-icon>Analytics
                </VBtn>
              </NuxtLink>
            </VCol>
          </VRow>
          <v-divider class="my-3"></v-divider>
          <VRow>
            <VCol cols="12" md="5" sm="12" xs="12" lg="5">
              <v-card color="background elevation-0" flat rounded="xl">
                <v-card-text>
                  <v-list bg-color="background">
                    <v-list-subheader>CONFIGURAÇÕES</v-list-subheader>
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
            <VCol cols="12" md="7" sm="12" xs="12" lg="7">
              <component :is="selectedComponent" />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <v-toolbar color="rgb(0,0,0,0)" height="100"></v-toolbar>
    </VContainer>
  </VApp>
</template>

<script setup>
import { ref, shallowRef, defineComponent } from "vue";
import navbarHeader from "@/components/creator/headerCreator.vue";
import navbarView from "@/components/navbar.vue";
import MeuPerfil from "@/components/creator/config/tabs/perfil.vue";
import Info from "@/components/creator/config/tabs/info.vue";
import Assinaturas from "@/components/creator/config/tabs/assinaturas.vue";
import Tribos from "@/components/creator/config/tabs/tribos.vue";
import Contas from "@/components/creator/config/tabs/contas.vue";
import Afiliados from "@/components/creator/config/tabs/afiliados.vue";
import Metas from "@/components/creator/config/tabs/metas.vue";
import PaymentDirect from "@/components/creator/config/tabs/direct.vue";

definePageMeta({
  middleware: ["profile"],
});


const items = ref([
  { text: "Redes sociais", icon: "mdi-web", component: MeuPerfil },
  { text: "Informações pessoais", icon: "mdi-account-details", component: Info },
  { text: "Metas", icon: "mdi-target", component: Metas },
  { text: "Assinaturas", icon: "mdi-currency-usd", component: Assinaturas },
  { text: "Tribos", icon: "mdi-flag-variant", component: Tribos },
  { text: "Contas", icon: "mdi-bank", component: Contas },
  { text: "Afiliados", icon: "mdi-account-group", component: Afiliados },
  { text: "Pagamento direto", icon: "mdi-link-variant-plus", component: PaymentDirect },
]);

const selectedComponent = shallowRef(null);

const selectComponent = (item) => {
  selectedComponent.value = item.component;
};

const components = {
  MeuPerfil,
  Assinaturas,
  Tribos,
  Afiliados,
  Contas,
  Info,
  navbarHeader,
  navbarView,
  PaymentDirect,
};

defineComponent({
  components,
  setup() {
    return {
      items,
      selectedComponent,
      selectComponent,
    };
  },
});
</script>
