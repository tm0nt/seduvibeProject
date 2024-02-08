<template>
  <VApp>
    <navbarView />
    <VContainer>
      <VRow no-gutters align="center" class="mt-n2">
        <VCol cols="12" md="8" offset-md="2">
          <headerCreator />
          <VRow>
            <VCol cols="12">
              <VBtn min-height="35" block color="primary" class="text-capitalize"> Assinar </VBtn>
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
  </VApp>
</template>

<script setup>

</script>

<script>
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
    Publicacoes,
    Galeria,
    Mimos,
    navbarView,
  },
};
</script>
