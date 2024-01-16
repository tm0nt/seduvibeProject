<template>

    <v-card color="input_color" height="400" max-width="400" class="rounded-xl mt-n3 pb-1" flat>
        <v-toolbar flat color="transparent">
        <v-toolbar-title class="mt-n2"
          >Você já recebeu</v-toolbar-title
        >
      </v-toolbar>
      <v-card color="primary" class="rounded-xl mx-2 pa-1 mt-n3" flat>
        <span class="text-caption ma-2"
          >Sua comissão</span
        >
  
        <h2 class="ma-2">
          R$
          {{
            comissionValue?.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </h2>
      </v-card>
      <v-toolbar flat color="transparent" class="mt-n1">
        <v-toolbar-title>Últimas vendas </v-toolbar-title>
      </v-toolbar>
  
      <v-list bg-color="input_color">
        <v-list-item v-for="salesAll in salesList" :key="salesAll.id">
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              salesAll.userId
            }}</v-list-item-title>
            <v-list-item-subtitle class="white--text">
              {{
                parseFloat(
                  salesAll?.affiliateCreatorData?.productValue,
                ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
              }}
              - ({{
                parseFloat(
                  salesAll?.commission *
                    salesAll.affiliateCreatorData?.productValue,
                ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
              }})
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <h5 class="white--text">
              {{ formatRelativeDate(salesAll?.createdAt) }}
            </h5>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn
          block
          class="elevation-0 text-capitalize"
          color="input_color"
          @click="moreVendas"
          ><v-icon>mdi-dots-horizontal</v-icon></v-btn
        >
      </v-card-actions>
      <v-dialog v-model="moreVendasDialog" width="500" dark>
        <v-card>
          <v-data-table
            :headers="headers"
            color="purple"
            :items="salesList"
            :footer-props="{
              'items-per-page-text': 'Vendas por página',
            }"
            no-data-text="Nenhum dado para exibir"
            class="mt-2"
          >
            <template v-slot:item#date="{ item }">
              <v-chip>{{ item.date }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  <script>
  export default {
    data: () => ({
      moreVendasDialog: false,
      comission: null,
      comissionValue: null,
      salesList: null,
      noDataText: "Nenhuma venda para exibir.",
      search: "", // Variável para a pesquisa
      pagination: { page: 1, rowsPerPage: 5 }, // Variável para paginação
    }),
    computed: {
      headers() {
        return [
          { text: "Usuário", value: "userId" },
          { text: "Valor", value: "commission" },
          { text: "Data", value: "createdAt" },
        ];
      },
  
      filteredUsers() {
        const searchDate = new Date(this.search); // Converta a string de pesquisa em um objeto Date
        return this.user.filter((user) => {
          if (!searchDate) return true; // Se a data de pesquisa for inválida, exiba todos os itens
          const itemDate = new Date(user.date);
          return itemDate >= searchDate;
        });
      },
    },
  
    methods: {
      async myComissionList() {
        try {
          const response = await affiliateService.myComissionLatest();
          this.comission = response.data;
  
          // Verificar se comission é uma matriz válida antes de calcular a soma
          if (Array.isArray(this.comission)) {
            const totalEarningsSum = this.comission.reduce(
              (sum, item) => sum + item.totalEarnings,
              0,
            );
            this.comissionValue = totalEarningsSum;
          } else {
            this.comissionValue = 0; // Definir como zero se comission não for uma matriz válida
          }
        } catch (error) {
          console.log(error);
        }
      },
  
      formatRelativeDate(isoDate) {
        const postDate = new Date(isoDate);
        const currentDate = new Date();
  
        const diffInMilliseconds = currentDate - postDate;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
  
        if (diffInDays === 0) {
          return "Hoje";
        } else if (diffInDays === 1) {
          return "Ontem";
        } else {
          return `${diffInDays} dias atrás`;
        }
      },
  
      async listSales() {
        try {
          const response = await affiliateService.latestSales(
            this.$store.state.id,
          );
          this.salesList = response.data;
          console.log(this.salesList);
        } catch (error) {
          console.error("Erro na requisição");
        }
      },
      moreVendas() {
        this.moreVendasDialog = true;
      },
    },
  };
  </script>
  