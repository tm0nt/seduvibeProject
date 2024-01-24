<template>
  <v-app>
    <v-container>
      <NavbarView />
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-container fluid>
            <h2 class="white--text">Suas notificações</h2>
            <p class="text-caption text-medium-emphasis mt-n2 mb-4">Últimas atualizações</p>
            <v-row justify="center" align="center" class="text-center">
              <v-col cols="12" md="12">
                <v-chip-group filter v-model="selectedFilter" @change="filterNotifications">
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
              <v-row v-if="notifs?.length > 0">
                <v-col>
                  <v-card
                    flat
                    class="elevation-0 rounded-xl"
                    v-for="not in notifs"
                    :key="index"
                    cols="12"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="auto"> </v-col>
                        <v-col>
                          <v-card-text class="mt-n3 ml-n6">
                            <v-list-item-title>{{ not.message }}</v-list-item-title>
                            <v-list-item-subtitle>{{ not.message }}</v-list-item-subtitle>
                          </v-card-text>
                        </v-col>
                        <v-col class="text-right">
                          <v-list-item-subtitle class="caption">há 2 dias</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                      <v-divider v-if="notifs?.length > 1"></v-divider>
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
<script setup>
import { onMounted, ref } from "vue";

const notifs = ref([]);

onMounted(async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  try {
    const {
      data: notif,
      pending,
      error,
      refresh,
    } = await useFetch("https://api.seduvibe.com/list_notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    notifs.value = notif?._rawValue.notifications || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
});
</script>

<script>
import NavbarView from "../../components/navbar";

export default {
  components: {
    NavbarView,
  },
};
</script>
