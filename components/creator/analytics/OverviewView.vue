<template>
  <v-btn
    prepend-icon="mdi-home"
    class="mb-5 ml-6"
    variant="outlined"
    color="primary"
    to="/profile/creator"
    >DASHBOARD</v-btn
  >
  <v-container>
    <v-row>
      <v-col cols="6" sm="6" class="mt-n10">
        <v-card color="transparent" flat>
          <v-card-text>
            <p class="text-medium-emphasis text-caption">Saldo disponível</p>
            <v-btn color="primary">
              R<v-icon size="12">mdi-currency-usd</v-icon>
              <h2 class="white--text" v-if="analyticsDate.creatorData">
                &nbsp;{{
                  analyticsDate.creatorData.balance_available.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </h2>
            </v-btn>
          </v-card-text>
        </v-card>
        <v-btn color="primary" variant="text" prepend-icon="mdi-calendar">dd/mm/aaaa</v-btn>
        <v-card class="rounded-xl mb-2" width="200" color="input_color">
          <v-card-title class="text-caption text-medium-emphasis">Vendas hoje</v-card-title>
          <v-card-text>45</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6" class="mt-n10">
        <v-card color="transparent" flat>
          <v-card-text>
            <p class="text-medium-emphasis text-caption">Saldo total</p>
            <v-btn color="input_color">
              R<v-icon size="12">mdi-currency-usd</v-icon>
              <h2 class="white--text" v-if="analyticsDate.creatorData">
                &nbsp;{{
                  analyticsDate.creatorData.total_balance.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </h2>
            </v-btn>
          </v-card-text>
        </v-card>
        <v-btn color="primary" variant="text" prepend-icon="mdi-calendar">dd/mm/aaaa</v-btn>
        <v-card class="rounded-xl mb-2" width="200" color="input_color">
          <v-card-title class="text-caption text-medium-emphasis">Vendas mensal</v-card-title>
          <v-card-text>45</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    showConfirmationDialog: false,
    analyticsDate: {
      creatorData: {
        balance_available: 0,
        total_balance: 0,
      },
      todaySubscriptions: [],
      weekSubscriptions: [],
    },
  }),
  methods: {
    async fetchAnalyticsList() {
      try {
        this.analyticsDate = await analyticsService.analyticsList();
        console.log("Resposta do analyticsList:", this.analyticsDate);
      } catch (error) {
        console.error("Erro ao chamar analyticsList:", error);
      }
    },

    openConfirmationDialog() {
      this.showConfirmationDialog = true;
    },
    closeConfirmationDialog() {
      this.showConfirmationDialog = false;
    },
    performQuickWithdrawal() {
      this.closeConfirmationDialog();
    },
  },
};
</script>

<style></style>
