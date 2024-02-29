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
                    link
                    cols="12"
                  >
                    <template v-slot:title>
                      <p class="text-capitalize">{{ not.source }}</p>
                    </template>
                    <template v-slot:subtitle>
                      <p>{{ not.message }}</p>
                    </template>
                    <template v-slot:prepend>
                      <v-avatar color="primary"> <v-icon icon="mdi-coin"></v-icon></v-avatar>
                    </template>
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
import { ref, computed } from "vue";

const notifs = ref([]);
const selectedFilter = ref(0);
const filterNotifications = ref(null);

const fetchData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  try {
    const data = await $fetch("https://api.seduvibe.com/list_notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    notifs.value = data.notifications || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const filteredNotifs = computed(() => {
  if (selectedFilter.value === 0) {
    return notifs.value;
  } else {
    return notifs.value.filter((notif) => notif.source === selectedFilter.value);
  }
});

fetchData();
</script>

<script>
import NavbarView from "../../components/navbar";

export default {
  components: {
    NavbarView,
  },
};
</script>
