<template>
  <v-app>
    <v-container>
      <NavbarView />
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-container fluid>
            <h2>Suas notificações</h2>
            <p class="text-caption text-medium-emphasis mt-n2 mb-4">
              Essas são suas últimas notificações
            </p>
            <v-row justify="center" align="center" class="text-center">
              <v-col cols="12" md="12">
                <v-chip-group filter v-model="selectedFilter" @click="filterNotifications">
                  <v-chip :color="selectedFilter === 0 ? 'purple' : ''" class="mr-2" :value="0">
                    Todas</v-chip
                  >
                  <v-chip
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
              <v-row v-if="filteredNotifs?.length > 0">
                <v-col>
                  <v-card
                    flat
                    class="elevation-0 rounded-xl"
                    v-for="(not, index) in filteredNotifs"
                    :key="index"
                    cols="12"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="auto">
                          <v-avatar color="primary"><v-icon>mdi-coin</v-icon></v-avatar>
                        </v-col>
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
                      <v-divider v-if="filteredNotifs?.length > 1"></v-divider>
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
import { onMounted, ref, computed } from "vue";

const notifs = ref([]);
const selectedFilter = ref(0);

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
    // No need to set filteredNotifs.value here, it will be computed automatically
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
});

const filteredNotifs = computed(() => {
  if (selectedFilter.value === 0) {
    return notifs.value;
  } else {
    return notifs.value.filter((notif) => notif.source === selectedFilter.value);
  }
});

const filterNotifications = () => {
  // You may need to add logic here to handle the filter based on selectedFilter
  // For example, you can update the filteredNotifs in response to changes in selectedFilter
  // You can console.log to check if this function is triggered when clicking on v-chips
  console.log("Filtering notifications...", selectedFilter.value);
};
</script>

<script>
import NavbarView from "../../components/navbar";

export default {
  components: {
    NavbarView,
  },
};
</script>
