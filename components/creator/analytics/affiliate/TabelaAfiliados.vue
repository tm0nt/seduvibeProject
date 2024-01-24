<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card color="input_color" class="rounded-xl mx-2" flat>
          <v-card-title class="text-caption text-medium-emphasis"
            >Pedidos de afiliação</v-card-title
          >
          <v-card-text>{{ pedidosAfiliados.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card color="input_color" class="rounded-xl mx-2" flat>
          <v-card-title class="text-caption text-mediun-emphasis">Afiliados ativos</v-card-title>
          <v-card-text>{{ activeAffiliates.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-toolbar class="rounded-xl" color="rgb(0,0,0,0)" flat>
          <v-toolbar-title>Seus afiliados</v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="activeAffiliates"
          color="purple"
          dark
          flat
          :header-props="headerProps"
          :hide-default-footer="true"
          :footer-props="{ itemsPerPageText: '' }"
          class="elevation-0 rounded-xl"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn fab color="purple" dark x-small @click="dialogActiveAffiliate(item)">
              <v-icon small> mdi-plus </v-icon></v-btn
            >
          </template>
          <template v-slot:no-data>
            <div class="px-4" v-if="!loading">
              Você não possui afiliados.
              <v-icon color="grey" @click="reloadActiveAffiliate">mdi-reload</v-icon>
            </div>
            <p v-if="loading" class="px-4">
              Carregando...&nbsp;<v-progress-circular
                color="purple"
                indeterminate
                size="24"
              ></v-progress-circular>
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogDelete" max-width="400" dark>
    <v-card>
      <v-card-title class="headline">Deseja remover este usuário?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple" text @click="closeDeleteModal">Cancelar</v-btn>
        <v-btn color="purple" text @click="deleteUser">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogActiveAffiliateList" width="400">
    <v-card dark>
      <v-card-title class="purple--text">
        <v-icon @click="dialogActiveAffiliateList = false" color="purple">mdi-close</v-icon
        >&nbsp;&nbsp;Dados da requisição da afiliação
      </v-card-title>
      <v-card-text class="text-center">
        <v-container>
          <v-avatar size="60">
            <v-img src="../../../../assets/userPhotos//user-default.png" contain cover></v-img>
          </v-avatar>
          <v-col>
            <v-btn dark color="purple" rounded>{{ ActiveAffiliateListDataName }}</v-btn>
          </v-col>
          <v-col>
            <h2 class="text-left mb-5">Vendas</h2>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-btn outlined color="purple" rounded class="">
                  <v-icon>mdi-currency-usd</v-icon>&nbsp;1.256,99
                </v-btn>
                <h4 class="text-center mb-2">Faturamento total</h4>
              </v-col>

              <v-col cols="6">
                <v-btn outlined color="purple" rounded>
                  <v-icon>mdi-basket-check</v-icon>&nbsp;156
                </v-btn>
                <h4 class="text-center mb-2">Vendas totais</h4>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-btn outlined color="purple" rounded>
                  <v-icon>mdi-currency-usd</v-icon>&nbsp;156
                </v-btn>
                <h4 class="text-center mb-2">Comissão</h4>
              </v-col>

              <v-col cols="6">
                <v-btn outlined color="purple" rounded>
                  <v-icon>mdi-currency-usd</v-icon>&nbsp;156
                </v-btn>
                <h4 class="text-center mb-2">Seus ganhos</h4>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <h2 class="text-left mb-5">Métricas</h2>
            <v-spacer></v-spacer>
            <v-row>
              <v-col>
                <v-btn class="" outlined color="purple" rounded
                  ><v-icon>mdi-account-circle</v-icon>&nbsp;@L4rissa</v-btn
                >
                <h4 class="text-center mb-2">Usuário escolhido</h4>
              </v-col>
              <v-col>
                <v-btn outlined color="purple" rounded
                  ><v-icon>mdi-bullseye-arrow</v-icon>&nbsp;569</v-btn
                >
                <h4 class="text-center mb-2">Total de visitas</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="purple" @click="deleteAffiliate(ActiveAffiliateListData.user.id)"
          ><v-icon size="14">mdi-delete</v-icon>&nbsp;REMOVER</v-btn
        >
        <v-btn text color="purple" @click="dialogActiveAffiliateList = false"
          ><v-icon size="14">mdi-check-circle</v-icon>&nbsp;OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar centered rounded="pill" v-model="showSnack" :color="snackColor" timeout="3000">
    {{ snackText }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      pedidosAfiliados: [],
      activeAffiliatesName: null,
      loading: false,
      ActiveAffiliateListData: [],
      snackColor: null,
      ActiveAffiliateListDataName: null,
      snackText: null,
      showSnack: false,
      activeAffiliates: [],
      dialogActiveAffiliateList: false,
      headerProps: {
        sortByText: "Ordenar por",
      },
      headers: [
        { text: "Nome", value: "user.name" },
        { text: "E-mail", value: "user.email" },
        { text: "Aplicado em", value: "createdAt" },
        { text: "Ações", value: "actions" },
      ],
      dialogDelete: false,
      selectedUser: null,
    };
  },
  methods: {
    async reloadActiveAffiliate() {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.AnalyticsActivteAffiliate();
      this.loading = false;
    },
    dialogActiveAffiliate(item) {
      this.dialogActiveAffiliateList = true;
      this.ActiveAffiliateListData = item;
      this.ActiveAffiliateListDataName = item.user.name;
    },
    async AnalyticsActivteAffiliate() {
      try {
        const response = await analyticsService.analyticsList();
        this.activeAffiliates = response.activeAffiliates;
        console.log(this.activeAffiliates);
      } catch (error) {
        console.error("Erro ao listar dados do Analytics", error);
      }
    },
    async deleteAffiliate(id) {
      try {
        await affiliateService.removeAffiliate(id);
        this.showSnack = true;
        this.snackColor = "success";
        this.snackText = "Afiliado removido com sucesso!";
        this.dialogRequest = false;
        this.ListPendingAffiliate();
      } catch (error) {
        console.error("Erro ao aceitar solicitação", error);
      }
    },
    async ListPendingAffiliate() {
      try {
        const pendingRequests = await affiliateService.listPendingAffiliateRequests();
        this.pedidosAfiliados = pendingRequests;
      } catch (error) {
        console.error("Erro ao buscar pedidos pendentes:", error);
      }
    },
    openDeleteModal(nome) {
      this.selectedUser = nome;
      this.dialogDelete = true;
    },
    closeDeleteModal() {
      this.dialogDelete = false;
      this.selectedUser = null;
    },
    deleteUser() {
      console.log("Excluir usuário:", this.selectedUser);
      this.data = this.data.filter((item) => item.nome !== this.selectedUser);
      this.closeDeleteModal();
    },
  },
};
</script>
