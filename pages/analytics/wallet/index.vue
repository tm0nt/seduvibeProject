<template>
  <v-container>
    <v-col cols="12" md="8" offset-md="2">
      <SideBar />
      <v-toolbar color="rgb(0,0,0,0)" height="50"></v-toolbar>
      <v-container>
        <v-row justify="center" align="center" class="d-flex" style="max-height: 100vh">
          <v-col cols="6" sm="6" md="6">
            <v-card color="transparent" flat>
              <p class="text-caption text-medium-emphasis">Saldo disponível</p>
              <v-btn color="primary">
                R<v-icon size="12">mdi-currency-usd</v-icon>
                <h2>
                  &nbsp;{{
                    analyticsDate && analyticsDate.creatorData
                      ? analyticsDate.creatorData.balance_available.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "N/A"
                  }}
                </h2>
              </v-btn>
            </v-card>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-card color="transparent" flat>
              <p class="text-caption text-medium-emphasis">Aguardando liberação</p>
              <v-btn color="input_color">
                R<v-icon size="12">mdi-currency-usd</v-icon>
                <h2>
                  &nbsp;{{
                    analyticsDate && analyticsDate.creatorData
                      ? analyticsDate.creatorData.total_balance.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "N/A"
                  }}
                </h2>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mt-10 rounded-xl" dark color="purple">
          <v-card-title>
            <v-toolbar-title>Selecione o tipo de transferência</v-toolbar-title>
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="item.title">
              <v-list-item-content>
                <v-list-item-title @click="showContent(index)">{{ item.title }} </v-list-item-title>
                <v-expand-transition>
                  <div v-if="activeIndex === index">
                    <v-form v-if="item.formType === 'pix'" ref="pixForm">
                      <PixForm
                        :executeFetch="fetchAnalyticsList"
                        :historyFetch="fetchHistoryWithdraw"
                      />
                    </v-form>

                    <v-form v-if="item.formType === 'ted'" ref="tedForm">
                      <TedForm :executeFetch="fetchAnalyticsList" />
                    </v-form>
                  </div>
                </v-expand-transition>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <p class="text-medium-emphasis text-caption mt-2">
          Todas as transferências serão enviadas para o CPF cadastrado na plataforma.
        </p>
        <v-row align="center">
          <v-col class="mt-4">
            <h2>Histórico de saque</h2>
            <v-card class="rounded-xl">
              <v-data-table
                class="rounded-xl"
                :headers="headers"
                :items="historyWithdraw || []"
                :footer-props="{
                  'items-per-page-text': 'Saques por página',
                }"
                :no-data-text="noDataText"
              >
                <template v-slot:[`item.amount`]="{ item }">
                  <v-btn outlined fab color="purple" x-small
                    ><v-icon size="16">mdi-currency-usd</v-icon></v-btn
                  >&nbsp;&nbsp;&nbsp;R$
                  {{
                    item.amount.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                </template>
                <template v-slot:[`item.createdAt`]="{ item }">
                  {{ formatDaysPassed(item.createdAt) }}
                </template>
                <template v-slot:[`item.method`]="{ item }">
                  {{ item.method }}
                </template>
                <template v-slot:[`item.statusName`]="{ item }">
                  <v-chip small :class="getStatusClass(item.statusName)">
                    <v-icon size="16" left>{{ getIcon(item.statusName) }}</v-icon>
                    {{ getStatusText(item.statusName) }}
                  </v-chip>
                </template>
                <template v-slot:[`item.info`]>
                  <v-btn color="purple" dark rounded x-small
                    ><v-icon size="16">mdi-plus</v-icon>VER MAIS</v-btn
                  >
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
import SideBar from "../../../components/creator/analytics/SidebarView.vue";
import PixForm from "../../../components/creator/analytics/wallet/PixForm.vue";
import TedForm from "../../../components/creator/analytics/wallet/TedForm.vue";

export default {
  data: () => ({
    historyWithdraw: null,
    noDataText: "Nenhum saque realizado",
    headers: [
      { text: "Valor", value: "amount" },
      { text: "Data", value: "createdAt" },
      { text: "Status", value: "statusName" },
      { text: "Tipo", value: "method" },
      { text: "Informações", value: "info" },
    ],
    items: [
      { title: "Transferência via Pix", formType: "pix" },
      { title: "Transferência via Ted", formType: "ted" },
    ],
    activeIndex: null,
    analyticsDate: null,
    intro: "Aqui você pode fazer saques e consultar seu histórico de saque.",
  }),

  methods: {
    getIcon(statusName) {
      switch (statusName) {
        case "pending":
          return "mdi-clock";
        case "aproved":
          return "mdi-check";
        case "reproved":
          return "mdi-close";
        default:
          return "";
      }
    },
    getStatusText(statusName) {
      switch (statusName) {
        case "pending":
          return "Aguardando";
        case "aproved":
          return "Aprovado";
        case "reproved":
          return "Reprovado";
        default:
          return statusName;
      }
    },
    getStatusClass(statusName) {
      switch (statusName) {
        case "pending":
          return "purple";
        case "aproved":
          return "purple";
        case "reproved":
          return "purple";
        default:
          return ""; // Pode ser uma classe padrão se necessário
      }
    },
    formatDaysPassed(dateString) {
      const currentDate = new Date();
      const providedDate = new Date(dateString);
      const timeDifference = currentDate - providedDate;
      const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysPassed === 0) {
        return "Hoje";
      } else if (daysPassed === 1) {
        return "1 dia atrás";
      } else {
        return `${daysPassed} dias atrás`;
      }
    },
    formatDate(dateString) {
      // Função para formatar a data, se necessário
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(dateString).toLocaleDateString("pt-BR", options);
    },
    daysPassed(dateString) {
      // Função para calcular quantos dias se passaram desde a data fornecida até hoje
      const currentDate = new Date();
      const providedDate = new Date(dateString);
      const timeDifference = currentDate - providedDate;
      const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysPassed;
    },
    async fetchHistoryWithdraw() {
      try {
        const response = await withdrawService.listWithdraw();
        this.historyWithdraw = response.data.withdrawals.reverse();
        console.log(this.historyWithdraw);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAnalyticsList() {
      try {
        const response = await analyticsService.analyticsList();
        this.analyticsDate = response;
        console.log("Resposta do analyticsList:", this.analyticsDate);
      } catch (error) {
        console.error("Erro ao chamar analyticsList:", error);
      }
    },
    navigate(to) {
      this.$router.push({ name: to });
      this.drawer = false;
    },
    showContent(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    generateData() {},
  },

  components: {
    SideBar,
    PixForm,
    TedForm,
  },
};
</script>
