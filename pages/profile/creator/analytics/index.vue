<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Analytics
          </h2>
          <p class="text-caption text-medium-emphasis mt-n1">Atualizações a todo instante.</p>
          <v-btn
            color="primary"
            variant="outlined"
            class="text-capitalize mt-2"
            prepend-icon="mdi-calendar"
            :disabled="true"
            >Período</v-btn
          >
          <v-card
            color="background"
            rounded="xl"
            class="mt-4 elevation-6 d-flex justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Saldo disponível</p>
                <h3>
                  {{
                    analyticsFetch?.creatorData?.balance_available.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon>
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Assinaturas ativas</p>
                <h3>
                  {{ analyticsFetch?.activeSubscriptions?.length }}&nbsp;<v-icon
                    color="primary"
                    size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Total em vendas</p>
                <h3>
                  {{
                    analyticsFetch?.creatorData?.balance_available.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon>
                </h3>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
            <v-container class="ma-2">
              <h4>Vendas por dia</h4>
              <p class="text-caption text-medium-emphasis">Veja seu progresso mensal.</p>
              <ClientOnly>
                <lineChart />
              </ClientOnly>
            </v-container>
          </v-card>
          <v-row>
            <v-col cols="12">
              <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
                <v-container class="ma-2">
                  <h4>Vendas por método</h4>
                  <p class="text-caption mb-2">Acompanhe o volume diário da sua empresa.</p>

                  <!-- Cartão -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-credit-card</v-icon>
                      Cartão
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto"
                        >{{
                          ((analyticsFetch?.creditCardSubscriptions?.length || 0) /
                            (analyticsFetch?.activeSubscriptions?.length || 1)) *
                          100
                        }}%</span
                      >
                    </v-col>
                  </v-row>

                  <!-- Pix -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-flash</v-icon>
                      Pix
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto"
                        >{{
                          ((analyticsFetch?.pixSubscriptions?.length || 0) /
                            (analyticsFetch?.activeSubscriptions?.length || 1)) *
                          100
                        }}%</span
                      >
                    </v-col>
                  </v-row>

                  <!-- Cripto -->
                  <v-row align="center">
                    <v-col cols="6">
                      <v-icon color="primary">mdi-bitcoin</v-icon>
                      Cripto
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">0%</span>
                    </v-col>
                  </v-row>
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
<script setup>
import { ref } from "vue";
const cookie = useCookie("token");
const token = cookie.value;
const analyticsFetch = ref(null);
definePageMeta({
  middleware: ["profile"],
});
const fetchData = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    analyticsFetch.value = data;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

fetchData();
</script>
<script>
import lineChart from "../../components/creator/analytics/charts/line.vue";
import SideBar from "../../components/creator/analytics/SidebarView.vue";
export default {
  components: {
    SideBar,
    lineChart,
  },
};
</script>
