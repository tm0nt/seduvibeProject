<template>
  <v-container>
    <v-tabs color="primary" v-model="selectedTab" align-tabs="center">
      <v-tab>Publicações</v-tab>
      <v-tab>Galeria</v-tab>
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
    </div>
    <v-toolbar height="100" color="rgb(0,0,0,0)"></v-toolbar>
  </v-container>
</template>
<script>
import Publicacoes from "./postView.vue";
import Galeria from "./galleryView.vue";
export default {
  computed: {
    currentComponent() {
      switch (this.selectedTab) {
        case 0:
          return "Publicacoes";
        case 1:
          return "Galeria";
        default:
          return null;
      }
    },
  },
  components: {
    Publicacoes,
    Galeria,
  },

  data: () => ({
    selectedTab: null,
  }),
};
</script>
