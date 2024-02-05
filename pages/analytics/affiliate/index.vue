<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Afiliados
          </h2>
          <p class="text-caption text-medium-emphasis mt-n1">Atualizações a todo instante.</p>
          <v-card
            color="input_color"
            rounded="xl"
            class="mt-4 d-flex justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Pedidos de afiliação</p>
                <h3>256&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Afiliados ativas</p>
                <h3>125&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Total em vendas(afiliados)</p>
                <h3>R$ 10.454,00&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4" color="input_color" flat>
            <v-container class="ma-2">
              <h4>Gerencie afiliados</h4>
              <p class="text-caption text-medium-emphasis">Visualize, aprove e remova afiliados</p>
              <v-tabs color="primary" grow>
                <v-tab> Ativos </v-tab>
                <v-tab> Pedidos </v-tab>
              </v-tabs>
            </v-container>
          </v-card>
          <v-card class="rounded-xl mt-4" color="input_color" flat>
            <v-container class="ma-2">
              <h4>Sua comissão</h4>
              <p class="text-caption text-medium-emphasis">Acompanhe o volume de suas comissões.</p>
            </v-container>
          </v-card>
          <v-row>
            <v-col>
              <v-card class="rounded-xl mt-4" color="input_color" flat>
                <v-container class="ma-2">
                  <h4>Vendas por método</h4>
                  <p class="text-caption mb-2">Meios de pagamentos mais utilizados</p>

                  <!-- Cartão -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-credit-card</v-icon>
                      Cartão
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">60%</span>
                    </v-col>
                  </v-row>

                  <!-- Pix -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-flash</v-icon>
                      Pix
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">30%</span>
                    </v-col>
                  </v-row>

                  <!-- Cripto -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-bitcoin</v-icon>
                      Cripto
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">10%</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-card class="rounded-xl mt-4" color="input_color" flat>
                <v-container class="ma-2">
                  <h4>Ranking</h4>
                  <p class="text-caption text-medium-emphasis">Mais vendas realizadas</p>
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
    <v-toolbar flat height="50" color="rgb(0,0,0,0)"></v-toolbar>
  </v-app>
</template>
<script setup></script>
<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
