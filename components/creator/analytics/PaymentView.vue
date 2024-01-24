<template>
  <v-row>
    <v-card color="input_color" width="500" rounded="xl" class="mt-n6 pa-2" flat>
      <span class="text-caption">Cartão/Pix</span><br />
      <h6 class="mb-4">Recebido</h6>

      <h4 class="text-medium-emphasis text-caption">Nenhuma venda realizada!</h4>
      <v-btn block color="primary" class="mt-1" @click="moreVendas"
        ><v-icon>mdi-dots-horizontal</v-icon></v-btn
      >
    </v-card>
    <v-dialog v-model="moreVendasDialog" width="800">
      <v-data-table
        :headers="headers"
        :items="datetable"
        :footer-props="{
          'items-per-page-text': 'Vendas por página',
        }"
        no-data-text="Nenhum dado para exibir"
        :search="search"
        :pagination.sync="pagination"
        :rows-per-page-items="[5, 10, 15]"
      >
        <template v-slot:[`item.id`]="{ item }"> #SV{{ item.id }} </template>
        <template v-slot:[`item.paymentMethod.name`]="{ item }">
          {{ item.paymentMethod.name.toUpperCase() }}
        </template>
      </v-data-table>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "", // Variável para a pesquisa
      pagination: { page: 1, rowsPerPage: 5 }, // Variável para paginação
      analyticsDate: null,
      datetable: null,
      moreVendasDialog: false,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Identificador", value: "id" },
        { text: "Valor", value: "valor" },
        { text: "Data", value: "createdAt" },
        { text: "Forma de pagamento", value: "paymentMethod.name" },
      ];
    },
  },
  methods: {
    formatarDataAtras(dataString) {
      const data = parseISO(dataString);
      return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
    },
    moreVendas() {
      this.moreVendasDialog = true;
    },
    async fetchAnalyticsList() {
      try {
        this.analyticsDate = await analyticsService.analyticsList();
        this.datetable = this.analyticsDate.allSubscriptions
          .map((item) => {
            return {
              ...item,
              createdAt: this.formatarDataAtras(item.createdAt),
            };
          })
          .reverse();
        console.log("Resposta do analyticsList:", this.analyticsDate);
      } catch (error) {
        console.error("Erro ao chamar analyticsList:", error);
      }
    },
  },
};
</script>
