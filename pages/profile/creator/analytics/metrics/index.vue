<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Métricas
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
                <p class="text-caption text-medium-emphasis">Quantidade de curtidas</p>
                <h3>
                  {{ metricFetch?.item?.totalCurtidas }}&nbsp;<v-icon color="primary" size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Quantidade de comentários</p>
                <h3>
                  {{ metricFetch?.item?.totalComentarios }}&nbsp;<v-icon color="primary" size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Visualizações de perfil</p>
                <h3>
                  {{ metricFetch?.views }}&nbsp;<v-icon color="primary" size="26"
                    >mdi-chevron-up</v-icon
                  >
                </h3>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
            <v-container class="ma-2">
              <h4>Assinaturas timeline</h4>
              <p class="text-caption text-medium-emphasis">
                Veja sua progressão com seus assinantes
              </p>
              <ClientOnly>
                <lineChart />
              </ClientOnly>
            </v-container>
          </v-card>
          <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
            <v-container class="ma-2">
              <h4>Faturamento timeline</h4>
              <p class="text-caption text-medium-emphasis">
                Acompanhe a progressão do seu faturamento
              </p>
              <areaChart />
            </v-container>
          </v-card>
        </v-container>
      </v-col>
    </v-container>
    <v-toolbar flat height="50" color="rgb(0,0,0,0)"></v-toolbar>
  </v-app>
</template>
<script setup>
import lineChart from "../../../../../components/creator/analytics/charts/line.vue";
import areaChart from "../../../../../components/creator/analytics/charts/area.vue";

const cookie = useCookie("token");
const token = cookie.value;
const metricFetch = ref({
  item: null,
  views: null,
});

const fetchMetric = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/posts/metric", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    metricFetch.value.item = data;
  } catch (error) {
    console.error(error);
  }
};

const fetchMetricView = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/get_views_profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    metricFetch.value.views = data.users[0].views;
  } catch (error) {
    console.error(error);
  }
};
fetchMetricView();
fetchMetric();
</script>
<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
