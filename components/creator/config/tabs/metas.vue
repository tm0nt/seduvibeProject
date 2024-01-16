<template>
  <v-container>
    <h2>Adicione uma meta</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Crie objetivos para impulsionar sua identidade.
    </p>
    <v-card color="background" flat class="elevation-0 mt-2" rounded="xl">
      <v-card-text>
        <v-text-field
          placeholder="Qual sua meta?"
          bg-color="input_color"
          color="primary"
          prepend-inner-icon="mdi-target"
          v-model="meta"
        ></v-text-field>
        <v-text-field
          placeholder="Quanto você precisa?"
          prepend-inner-icon="mdi-currency-usd"
          color="primary"
          bg-color="input_color"
          v-model="valorMeta"
        ></v-text-field>
        <v-btn color="primary" min-height="40" class="text-capitalize" block @click="saveData"
          >Salvar</v-btn
        >
      </v-card-text>
    </v-card>

    <v-divider class="mt-5" color="grey"></v-divider>

    <div v-if="paginatedMetas.length > 0">
      <v-list dark rounded>
        <v-list-item class="mb-5" v-for="(metaItem, index) in paginatedMetas" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              <strong class="purple--text">Meta:</strong> {{ metaItem.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <strong>Valor:</strong> {{ metaItem.amount }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn color="purple" rounded x-small outlined class="mb-4 mt-2" :disabled="true">
                {{ metaItem.amount === metaItem.collected ? "Concluído" : "Em andamento" }}
                <v-icon size="12" color="purple" v-if="metaItem.amount === metaItem.collected"
                  >mdi-check</v-icon
                >
              </v-btn>
            </v-list-item-subtitle>
            <v-progress-linear
              v-model="progress"
              class="rounded-xl"
              color="purple"
              :buffer-value="calculateProgress(metaItem.collected, metaItem.amount)"
              stream
            ></v-progress-linear>
            <strong class="mt-2 mb-n1 text-center caption grey--text">Recebidos/Meta</strong>
            <strong class="text-center caption grey--text">
              <b class="purple--text">R$ {{ metaItem.collected }}</b> / R$
              {{ metaItem.amount }}
            </strong>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon @click="showDeleteDialog(metaItem.id)" class="mdi mdi-delete"></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <!-- Adicione controles de paginação se necessário -->
      <v-pagination
        v-if="numPages > 1"
        circle
        class="mt-2 caption"
        color="purple"
        v-model="currentPage"
        :length="numPages"
      ></v-pagination>
    </div>

    <v-row v-else align="center" class="mt-5">
      <v-col cols="6" class="mx-auto">
        <p class="mt-5 text-medium-emphasis text-caption text-center">Nenhuma meta encontrada...</p>
      </v-col></v-row
    >

    <v-dialog v-model="deleteDialog" max-width="400" dark>
      <v-card>
        <v-card-title class="purple--text">Confirmar Exclusão</v-card-title>
        <v-card-text> Tem certeza de que deseja excluir esta meta? </v-card-text>
        <v-card-actions>
          <v-btn color="purple" text @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn text color="purple" @click="deleteMetaConfirmed">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <v-snackbar v-model="showMetaBar" :color="snackbarColor" timeout="3000" rounded="pill" centered>
    {{ snackbarText }}
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      isPanelOpen: false,
      meta: "",
      itemsPerPage: 2,
      currentPage: 1,
      progress: null,
      showMetaBar: false,
      snackbarText: null,
      snackbarColor: null,
      valorMeta: "",
      metas: [],
      deleteDialog: false,
      deleteIndex: -1,
    };
  },
  computed: {
    paginatedMetas() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.metas.slice(startIndex, endIndex);
    },
    numPages() {
      return Math.ceil(this.metas.length / this.itemsPerPage);
    },
  },
  methods: {
    async saveData() {
      try {
        await goalsService.createGoal(this.meta, this.valorMeta);
        this.metas = await goalsService.getGoals(this.token);
        this.showMetaBar = true;
        this.snackbarText = "Meta criada com sucesso!";
        this.snackbarColor = "success";
        this.meta = "";
        this.valorMeta = "";
      } catch (error) {
        console.error("Erro ao criar meta:", error);
      }
    },
    async showDeleteDialog(id) {
      this.deleteIndex = this.metas.findIndex((metaItem) => metaItem.id === id);
      this.deleteDialog = true;
    },
    async deleteMetaConfirmed() {
      if (this.deleteIndex !== -1) {
        const deletedId = this.metas[this.deleteIndex].id;

        try {
          await goalsService.deleteGoal(deletedId);
          this.metas.splice(this.deleteIndex, 1);
          this.deleteDialog = false;
          this.showMetaBar = true;
          this.snackbarText = "Meta deletada com sucesso!";
          this.snackbarColor = "success";
        } catch (error) {
          console.error("Erro ao excluir meta:", error);
        }
      }
    },
    calculateProgress(recebido, total) {
      if (total <= 0) return 0;
      const porcentagem = (recebido / total) * 100;
      return porcentagem > 100 ? 100 : porcentagem;
    },
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
    },
    closePanel() {
      this.isPanelOpen = false;
    },
  },
};
</script>
