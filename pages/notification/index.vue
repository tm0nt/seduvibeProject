<template>
    <v-app>
    <v-container>
        <navbarHeader />
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
            <v-container fluid>
              <h2 class="white--text">Suas notificações</h2>
              <p class="text-caption text-medium-emphasis mt-n2 mb-4">Últimas atualizações</p>
              <v-row justify="center" align="center" class="text-center">
                <v-col cols="12" md="12">
                  <v-chip-group
                  filter
                    v-model="selectedFilter"
                    @change="filterNotifications"
                  >
                    <v-chip
                      

                      :color="selectedFilter === null ? 'purple' : ''"
                      class="mr-2"
                      :value="null"
                    >
                      Todas
                    </v-chip>
                    <v-chip
                      
                      v-if="creator !== 0"

                      :color="selectedFilter === 'assinante' ? 'purple' : ''"
                      class="mr-2"
                      :value="'assinante'"
                    >
                      Assinantes
                    </v-chip>
                    <v-chip
                      
                      v-if="creator !== 1"

                      :color="selectedFilter === 'assinatura' ? 'purple' : ''"
                      class="mr-2"
                      :value="'assinatura'"
                    >
                      Assinaturas
                    </v-chip>
                    <v-chip

                      
                      :color="selectedFilter === 'afiliado' ? 'purple' : ''"
                      class="mr-2"
                      :value="'afiliado'"
                    >
                      Afiliados
                    </v-chip>
                    <v-chip

                      
                      :color="selectedFilter === 'saque' ? 'purple' : ''"
                      class="mr-2"
                      :value="'saque'"
                    >
                      Saques
                    </v-chip>
                    <v-chip

                      
                      :color="selectedFilter === 'verificacao' ? 'purple' : ''"
                      class="mr-2"
                      :value="'verificacao'"
                    >
                      Verificação
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
              <v-card class="mt-5 rounded-xl flat elevation-0">
                <v-row v-if="filteredNotifications?.length > 0">
                  <v-col>
                    <v-card
                      flat
                      class="elevation-0 rounded-xl"
                      v-for="(notification, index) in filteredNotifications"
                      :key="index"
                      cols="12"
                    >
                      <v-container>
                        <v-row>
                          <v-col cols="auto">
                            <v-avatar color="purple">
                              <v-icon color="white">{{
                                getIconName(notification.source)
                              }}</v-icon>
                            </v-avatar>
                          </v-col>
                          <v-col>
                            <v-card-text class="mt-n3 ml-n6">
                              <v-list-item-title>{{
                                notification.message
                              }}</v-list-item-title>
                              <v-list-item-subtitle>{{
                                notification.message
                              }}</v-list-item-subtitle>
                            </v-card-text>
                          </v-col>
                          <v-col class="text-right">
                            <v-list-item-subtitle class="caption"
                              >há 2 dias</v-list-item-subtitle
                            >
                          </v-col>
                        </v-row>
                        <v-divider
                          v-if="filteredNotifications?.length > 1"
                        ></v-divider>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col>
                    <v-card-text class="grey--text mt-2 text-center"
                      >Não há notificações.</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
        </v-col>
      </v-row>
    </v-container>
</v-app>
  </template>
  
  <script>
  import navbarHeader from "../../components/navbar.vue";
  
  export default {
    data() {
      return {
        listNotifications: null,
        creator: null,
        filterNotifications: null,
        selectedFilter: null,
      };
    },

    components: {
      navbarHeader,
    },
    computed: {
      filteredNotifications() {
        return this.selectedFilter
          ? this.listNotifications.filter(
              (notification) => notification.source === this.selectedFilter,
            )
          : this.listNotifications;
      },
    },
    methods: {
      clearFilter() {
        this.selectedFilter = null;
      },
      getIconName(source) {
        switch (source) {
          case "afiliado":
            return "mdi-account-circle";
          case "saque":
            return "mdi-currency-usd";
          case "verificacao":
            return "mdi-account-clock";
          default:
            return "mdi-currency-usd";
        }
      },
      async Activity() {
        try {
          const response = await userService.activityList();
          this.listNotifications = response.data.notifications;
          console.log(this.listNotifications);
        } catch (error) {
          console.error;
        }
      },
    },
  };
  </script>
  