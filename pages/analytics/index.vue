<template>
  <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <SideBar />
        <v-toolbar color="rgb(0,0,0,0)" height="50"></v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="8">
              <v-row>
                <v-col cols="12" sm="12">
                  <Overview />
                </v-col>
                <v-col cols="12" sm="12">
                  <Payment/>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4">
              <Card />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
  </v-container>

  </template>
  
  <script>
  import SideBar from "../../components/creator/analytics/SidebarView.vue";
  import Overview from "../../components/creator/analytics/OverviewView.vue";
  import Payment from "../../components/creator/analytics/PaymentView.vue";
  import Card from "../../components/creator/analytics/CardView.vue";
  export default {
    data: () => ({
      intro: "Vamos analisar sua conta metricamente!",
    }),
    components: {
      SideBar,
      Overview,
      Payment,
      Card,
    },
  };
  </script>
  