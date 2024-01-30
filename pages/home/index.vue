<template>
  <v-app>
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <SideBar />
        <v-tabs v-model="selectedTab" color="primary" align-tabs="center">
          <v-tab><v-icon color="purple">mdi-compass</v-icon>&nbsp;&nbsp;Explorar </v-tab>
          <v-tab
            ><v-icon>mdi-checkbox-marked-circle-plus-outline</v-icon>&nbsp;&nbsp;Conteúdo</v-tab
          >
        </v-tabs>
        <v-row v-if="selectedTab === 0">
          <v-col cols="12">
            <component :is="currentComponent" />
          </v-col>
        </v-row>
        <v-row v-if="selectedTab === 1">
          <v-col cols="12" class="mt-6">
            <component :is="currentComponent" />
          </v-col>
        </v-row>
        <v-toolbar color="rgb(0,0,0,0)" flat height="50"></v-toolbar>
        <v-snackbar v-model="snackbarVisible" bottom :timeout="3000" color="red">
          {{ snackbarText }}
        </v-snackbar>
      </v-col>
    </v-container>
  </v-app>
</template>
<script>
import SideBar from "../../components/navbar.vue";
import FeedPostView from "../../components/post/postView.vue";
import ModelosView from "../../components/home/models.vue";

export default {
  data: () => ({
    planAtual: null,
    activeTab: 0,
    dialogOpenSearchDialog: false,
    snackbarVisible: null,
    planoCreator: "basic",
    creator: null,
    selectedTag: null,
    selectedTab: null,
    modalOpen: false,
    users: [],
    searchText: "",
    icons: [
      {
        icon: "mdi-facebook",
        url: "https://www.facebook.com/facebook-link",
      },
      { icon: "fa-brands fa-x-twitter", url: "https://twitter.com/link" },
      {
        icon: "mdi-instagram",
        url: "https://www.instagram.com/seduvibe",
      },
    ],
    dialogVisiblePlan: false,
    chipSelected: false,
    priceRange: [0, 100],
    isDropdownOpen: false,
  }),
  components: {
    SideBar,
    FeedPostView,
    ModelosView,
  },

  methods: {
    filtrar() {},
    dialogOpenSearch() {
      this.dialogOpenSearchDialog = true;
    },

    novoPlano() {
      //
    },
    alterarPlano() {
      this.dialogVisiblePlan = true;
    },
    fecharDialog() {
      this.dialogVisiblePlan = false;
    },
    selectPlano(plano) {
      this.planoCreator = plano;
      this.dropdown = false;
    },
    closeMenu() {
      this.isDropdownOpen = false;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openModal() {
      this.modalOpen = true;
    },
    toggleChipSelection() {
      this.chipSelected = !this.chipSelected;
    },
    closeModal() {
      this.modalOpen = false;
    },
    applyFilters() {
      console.log("Gênero selecionado:", this.selectedGenre);
      console.log("Faixa de preço selecionada:", this.priceRange);
      this.modalOpen = false;
    },
    centerActiveTab(tabId) {
      this.activeTab = tabId;
    },
  },
  computed: {
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    filteredUsers() {
      return this.users.filter((user) => user.user.includes(this.searchText));
    },
    currentComponent() {
      switch (this.selectedTab) {
        case 0:
          return "ModelosView";
        case 1:
          return "FeedPostView";
        default:
          return null;
      }
    },
  },
};
</script>
