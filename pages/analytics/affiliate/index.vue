<template>
  <v-app>
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <SideBar />
        <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="8">
              <v-row>
                <v-col cols="12" sm="12">
                  <TabelaAfiliados />
                </v-col>
                <v-col cols="12" sm="12">
                  <ConfigAfiliados />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4">
              <FaturamentoView />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from "../../../components/creator/analytics/SidebarView.vue";
import TabelaAfiliados from "../../../components/creator/analytics/affiliate/TabelaAfiliados.vue";
import ConfigAfiliados from "../../../components/creator/analytics/affiliate/ConfigAfiliados.vue";
import FaturamentoView from "../../../components/creator/analytics/affiliate/FaturamentoView.vue";
export default {
  data: () => ({
    pedidosAfiliados: null,
  }),
  components: {
    SideBar,
    TabelaAfiliados,
    ConfigAfiliados,
    FaturamentoView,
  },
};
</script>
