<template>
  <div>
    <v-toolbar color="rgb(0,0,0,0)" class="rounded-xl">
      <v-toolbar-title>Pedidos de afiliação</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="pedidosAfiliados"
      :items-per-page="5"
      :header-props="headerProps"
      :hide-default-footer="true"
      :footer-props="{ itemsPerPageText: '' }"
      class="elevation-0 rounded-xl"
    >
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatarData(item.createdAt) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip small outlined color="purple">
          <v-icon size="16" v-if="item.status === 'approved'">mdi-check</v-icon>
          <v-icon size="16" v-else-if="item.status === 'pending'">mdi-clock</v-icon>
          <v-icon size="16" v-else-if="item.status === 'reproved'">mdi-close</v-icon>
          <!-- Adicione mais condições conforme necessário -->
          &nbsp;{{ getStatusText(item.status) }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn fab color="purple" dark x-small @click="listRequest(item)">
          <v-icon small> mdi-plus </v-icon></v-btn
        >
      </template>
      <template v-slot:no-data>
        <div class="px-4" v-if="!loading">
          Você não possui pedidos.
          <v-icon color="grey" @click="reloadPendingAffiliate">mdi-reload</v-icon>
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
    <v-dialog persistent v-model="dialogRequest" width="400">
      <v-card dark>
        <v-card-title class="purple--text">
          <v-icon @click="closeDialogList" color="purple">mdi-close</v-icon>&nbsp;&nbsp;Dados da
          requisição da afiliação
        </v-card-title>
        <v-card-text class="text-center">
          <v-container>
            <v-avatar size="60">
              <v-img src="../../../../assets/userPhotos//user-default.png" contain cover></v-img>
            </v-avatar>
            <v-col>
              <v-btn dark color="purple" rounded>{{ userAffiliateList.user }}</v-btn>
              <p class="caption grey--text">
                {{ formatarData(userAffiliateList.createdAt) }}
              </p>
            </v-col>
            <v-col>
              <h4>{{ userAffiliateList.description }}</h4>
              <p class="caption grey--text mt-5">Usuário para checkout escolhido</p>
              <v-btn class="mt-n5" color="purple" outlined small rounded>@L4rissa</v-btn>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="purple" @click="recusedItem(userAffiliateList.id)">RECUSAR</v-btn>
          <v-btn text color="purple" @click="approvedItem(userAffiliateList.id)">APROVAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar centered rounded="pill" v-model="showSnack" :color="snackColor" timeout="3000">
      {{ snackText }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogRequestArray: null,
      idRequest: null,
      selectedRequestItem: null,
      loading: false,
      showSnack: false,
      userAffiliateList: [],
      snackColor: null,
      snackText: null,
      dialogRequest: false,
      pedidosAfiliados: [],
      headerProps: {
        sortByText: "Ordenar por",
      },
      headers: [
        { text: "Usuário", value: "user" },
        { text: "Pedido em", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  async created() {
    await this.ListPendingAffiliate();
  },
  methods: {
    getStatusText(status) {
      switch (status) {
        case "approved":
          return "Aprovado";
        case "pending":
          return "Aguardando";
        case "reproved":
          return "Reprovado";
        default:
          return "";
      }
    },
    async reloadPendingAffiliate() {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.ListPendingAffiliate();
      this.loading = false;
    },
    listRequest(item) {
      this.userAffiliateList = item;
      this.dialogRequest = true;
    },
    closeDialogList() {
      this.dialogRequest = false;
    },

    async approvedItem(id) {
      try {
        console.log(id);
        await affiliateService.acceptAffiliateRequest(id);
        this.showSnack = true;
        this.snackColor = "success";
        this.snackText = "Afiliado aprovado com sucesso!";
        this.dialogRequest = false;
        this.ListPendingAffiliate();
      } catch (error) {
        console.error("Erro ao aceitar solicitação", error);
      }
    },
    formatarData(date) {
      const dataAtual = new Date();
      const dataEnvio = new Date(date);

      const diffEmMilissegundos = dataAtual - dataEnvio;
      const diffEmDias = Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24));

      if (diffEmDias === 0) {
        return "Hoje";
      } else if (diffEmDias === 1) {
        return "Ontem";
      } else {
        return `Há ${diffEmDias} dias`;
      }
    },

    async recusedItem(id) {
      try {
        console.log(id);
        await affiliateService.removeAffiliate(id);
        this.showSnack = true;
        this.snackColor = "success";
        this.snackText = "Afiliado reprovado com sucesso!";
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
        console.log(this.pedidosAfiliados);
      } catch (error) {
        console.error("Erro ao buscar pedidos pendentes:", error);
      }
    },
  },
};
</script>
