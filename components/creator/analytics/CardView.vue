<template>
  <v-card color="input_color" rounded="xl" height="305"  max-width="400" flat>
    <v-toolbar flat color="transparent">
      <v-toolbar-title
        >Enviamos para você</v-toolbar-title
      >
    </v-toolbar>
    <v-card color="primary" rounded="xl" class=" mx-2 pa-1" flat>
      <v-toolbar flat color="transparent">
        <v-toolbar-title class="text-caption">
  {{
    analyticsDate && analyticsDate.length > 0
      ? `Enviado via ${analyticsDate[0]?.method} - ${formatarData(analyticsDate[0]?.updatedAt)}`
      : "N/a"
  }}
</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <span v-if="analyticsDate && analyticsDate.length > 0" class="white--text mt-3 ml-4 text-caption">
  >Enviado via {{ analyticsDate[0]?.method }} - {{ formatarData(analyticsDate[0]?.updatedAt) }}
</span>

<h2 class="ml-4" v-if="analyticsDate && analyticsDate.length > 0">
  {{
    analyticsDate[0]?.amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }}
</h2>
      <v-card-text class="pt-0 mt-4"> </v-card-text>
    </v-card>
    <v-col cols="12">
      <v-toolbar flat color="transparent" class="mt-n5">
        <v-toolbar-title>Vendas</v-toolbar-title>
        <v-chip color="primary" class="ml-2">{{
          analyticsDate?.length
        }}12</v-chip>
      </v-toolbar>
      <v-card color="input_color" rounded="xl" flat>
        <v-list>
          <template v-if="experiences?.length === 0">
            <div class="text-caption text-center">Nenhuma venda realizada</div>
          </template>
          <template v-else>
            <v-list-item
              v-for="experience in experiences.slice(0, 2)"
              :key="experience.id"
            >
              <v-list-item-avatar>
                <v-img
                  src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  experience.user.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-medium-emphasis">
                  {{
                    calcularDiferencaMeses(
                      experience.createdAt,
                      experience.expiration,
                    )
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <h5 class="text-uppercase">
                  {{ experience.paymentMethod.name }}
                </h5>
              </v-list-item-action>
            </v-list-item>
            <v-btn
              block
              color="#303030"
              rounded
              dark
              @click="moreVendas"
              class="elevation-0 mt-4"
            >
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <v-dialog width="800" v-model="moreVendasDialog">
      <v-data-table
        :headers="headers"
        :items="experiences"
        :footer-props="{
          'items-per-page-text': 'Vendas por página',
        }"
        no-data-text="Nenhum dado para exibir"
        :rows-per-page-items="[5, 10, 15]"
      >
        <template v-slot:[`item.paymentMethod.name`]="{ item }">
          {{ item.paymentMethod.name.toUpperCase() }}
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatarData(item.createdAt) }}
        </template>
        <template v-slot:[`item.expiration`]="{ item }">
          {{ formatarData(item.expiration) }}
        </template>
      </v-data-table>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    assinaturaDia: null,
    assinaturaExpirada: 1,
    moreVendasDialog: false,
    analyticsDate: null,
    noDataText: "Nenhuma venda para exibir.",
    experiences: [],
  }),
  computed: {
    headers() {
      return [
        { text: "Nome", value: "user.name" },
        { text: "Data da compra", value: "createdAt" },
        { text: "Expiração da assinatura", value: "expiration" },
        { text: "Método de pagamento", value: "paymentMethod.name" },
      ];
    },
  },
  methods: {
    moreVendas() {
      this.moreVendasDialog = true;
    },
    calcularDiferencaMeses(dataInicial, dataFinal) {
      const diferencaMeses = differenceInMonths(
        parseISO(dataFinal),
        parseISO(dataInicial),
      );
      return this.formatarMensagem(diferencaMeses);
    },
    formatarMensagem(meses) {
      return meses === 1
        ? `1 mês de assinatura`
        : `${meses} meses de assinatura`;
    },
    formatarData(dataString) {
      const data = new Date(dataString);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    async fetchAnalyticsList() {
      try {
        const response = await analyticsService.analyticsList();
        this.analyticsDate = response.withdrawalHistory.reverse();
        this.experiences = response.allSubscriptions.reverse();
        console.log("Resposta do analyticsList:", this.analyticsDate);
      } catch (error) {
        console.error("Erro ao chamar analyticsList:", error);
      }
    },
  },
};
</script>
