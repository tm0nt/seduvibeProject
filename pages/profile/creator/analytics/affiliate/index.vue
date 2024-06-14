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
            color="background"
            rounded="xl"
            class="mt-4 d-flex elevation-6 justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Pedidos de afiliação</p>
                <h3>
                  {{ affiliateFetch?.pendingAffiliateRequests?.length }}&nbsp;<v-icon
                    color="primary"
                    size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Afiliados ativas</p>
                <h3>
                  {{ affiliateFetch?.activeAffiliates?.length }}&nbsp;<v-icon
                    color="primary"
                    size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Total em vendas(afiliados)</p>
                <h3>
                  {{
                    coin?.totalEarnings?.totalEarnings?.toLocaleString("pt-BR", {
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
              <h4>Gerencie afiliados</h4>
              <p class="text-caption text-medium-emphasis">Visualize, aprove e remova afiliados</p>
              <v-tabs v-model="tab" bg-color="transparent" color="basil" grow class="mt-4">
                <v-tab v-for="item in items" :key="item" :value="item" color="primary" rounded="xl">
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item v-for="item in items" :key="item" :value="item">
                  <v-form>
                    <v-card color="rgb(0,0,0,0)" rounded="xl" flat>
                      <v-row v-if="item === 'ATIVO'" class="ma-1">
                        <ativoAffiliate />
                      </v-row>

                      <v-row v-if="item === 'PEDIDOS'">
                        <v-col class="ma-1">
                          <pedidosAffiliate />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card>
          <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
            <v-container class="ma-2">
              <h4>Sua comissão</h4>
              <p class="text-caption text-medium-emphasis">Acompanhe o volume de suas comissões.</p>
              <ClientOnly>
                <lineChart />
              </ClientOnly>
            </v-container>
          </v-card>
          <v-row>
            <v-col cols="12" md="12" lg="12">
              <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
                <v-container class="ma-2">
                  <h4>Ranking</h4>
                  <p class="text-caption text-medium-emphasis">Mais vendas realizadas</p>
                  <template v-for="(affiliate, index) in coin.rankingAffiliate" :key="index">
                    <v-chip
                      class="mt-2 mr-2"
                      :color="index === 0 ? 'primary' : ''"
                      size="large"
                      prepend-icon="mdi-medal"
                    >
                      {{ affiliate.affiliateName }}
                    </v-chip>
                    <p
                      v-if="affiliate.affiliateName"
                      class="text-caption text-medium-emphasis mt-2"
                    >
                      Estes são os usuários do checkout
                    </p>
                    <p v-else class="text-caption">Nenhuma atualização</p>
                  </template>
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
import lineChart from "../../../../../components/creator/analytics/charts/line.vue";
const cookie = useCookie("token");
const token = cookie.value;
const affiliateFetch = ref(null);
const coin = ref({
  totalEarnings: null,
  rankingAffiliate: null,
});


const fetchAffiliate = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    affiliateFetch.value = data;
  } catch (error) {
    console.error(error);
  }
};
const totalEarnings = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/afiliates/total_affiliate_earnings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    coin.value.totalEarnings = data;
  } catch (error) {
    console.error(error);
  }
};

const rankingAffiliate = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/afiliates/top_affiliate_earnings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    coin.value.rankingAffiliate = data;
  } catch (error) {
    console.error(error);
  }
};
fetchAffiliate();
totalEarnings();
rankingAffiliate();
</script>
<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";
import ativoAffiliate from "../../components/creator/affiliate/ativo.vue";
import pedidosAffiliate from "../../components/creator/affiliate/pedidos.vue";

export default {
  data() {
    return {
      tab: "ATIVO",
      items: ["ATIVO", "PEDIDOS"],
    };
  },
  components: {
    SideBar,
    ativoAffiliate,
  },
};
</script>
