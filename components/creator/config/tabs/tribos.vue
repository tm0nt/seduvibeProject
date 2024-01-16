<template>
  <v-container>
    <h2>Minhas tribos</h2>
    <p class="text-caption text-medium-emphasis mt-n2">
      Adicione tribos para ajudar seu público-alvo a te encontrar
    </p>
    <v-combobox
      class="mt-5"
      color="primary"
      item-color="primary"
      selected="primary"
      chips
      multiple
      clearable
      placeholder="Adicione tribos"
      v-model="tribosMy"
      rounded="xl"
      variant="solo"
      prepend-inner-icon="mdi-flag"
      bg-color="input_color"
      :items="['Oi', 'teste']"
    >
    </v-combobox>
    <v-snackbar
      rounded="pill"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="showSnackbar"
      >{{ snackbarText }}</v-snackbar
    >
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      tribosMy: [],
      tribosSelected: null,
      tribosList: [],
      selectedItems: [],
      tribosAll: ["Teste", "A"],
      previousSelection: [],
      showSnackbar: false,
      snackbarColor: "",
      snackbarTimeout: 4000,
      snackbarText: "",
    };
  },
  methods: {
    collectItemIds() {
      this.selectedItems = this.tribosMy.map((item) => item.id);
    },
    async fetchData() {
      const userData = await userService.fetchUserData();
      const userTribeIds = userData.tribos;

      this.tribosMy = userTribeIds;
      console.log("Teste", userTribeIds);
    },

    showSnackbarMessage(message, color) {
      this.snackbarColor = color;
      this.snackbarText = message;
      this.showSnackbar = true;
    },
    async saveTags(triboId) {
      try {
        tribeService
          .chooseTribos(triboId)
          .then((response) => {
            console.log("Dados salvos com sucesso:", response);
            this.showSnackbarMessage("Tribos atualizadas com sucesso!", "success");
          })
          .catch((error) => {
            console.error("Erro ao salvar os dados:", error);
            this.showSnackbarMessage("Ocorreu algum erro!", "red");
          });
      } catch (error) {
        console.error("Erro ao processar a seleção de tribos:", error);
        this.showSnackbarMessage("Ocorreu um erro interno!", "red");
      }
    },

    async deleteTag(triboId) {
      try {
        await tribeService.removeUserTribe(triboId);
        (this.showSnackbar = true),
          (this.snackbarColor = "success"),
          (this.snackbarText = "Tribo removida com sucesso!");
      } catch (error) {
        (this.showSnackbar = true),
          (this.snackbarColor = "red"),
          (this.snackbarText = "Aconteceu um erro!");
      }
    },
    async listTribos() {
      try {
        const response = await tribeService.listTribos();
        this.tribosAll = response.tribos;
        console.log(this.tribosAll);
      } catch (error) {
        console.error("Erro ao carregar tribos:", error);
      }
    },
    handleSelectionChange(newSelection) {
      const deselectedIds = this.selectedItems.filter((id) => !newSelection.includes(id));

      deselectedIds.forEach((id) => {
        this.deleteTag(id.id);
      });

      this.selectedItems = newSelection.slice();

      const newlySelectedIds = newSelection.filter((id) => !this.previousSelection.includes(id));

      newlySelectedIds.forEach((item) => {
        this.saveTags([item.id]);
      });

      this.previousSelection = newSelection.slice();
    },
  },
};
</script>
