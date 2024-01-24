<template>
  <v-app>
    <v-container>
      <NavbarView />
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-container fluid>
            <h2>Sua assinatura</h2>
            <p class="text-caption text-medium-emphasis mt-n2 mb-4">
              Assine, renove e gerencie seu plano.
            </p>
            <v-row justify="center" align="center" class="text-center mt-5">
              <v-card
                v-if="payment.length > 0"
                prepend-icon="mdi-currency-usd"
                :title="getSubscriptionTitle(payment)"
                :subtitle="getSubscriptionSubtitle(payment)"
                color="primary"
                class="rounded-xl mx-auto"
                width="600"
                height="80"
                variant="tonal"
              >
                <template v-slot:append>
                  <v-icon color="primary">mdi-swap-horizontal-circle</v-icon>
                </template>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-check</v-icon>
                </template>
              </v-card>
            </v-row>
            <h2 class="mt-6">Pagamentos</h2>
            <p class="text-caption text-medium-emphasis mt-n2 mb-4">Seus últimos pagamentos.</p>
            <v-row justify="center" align="center" class="text-center mt-5">
              <v-table class="rounded-xl" fixed-header height="300">
                <thead>
                  <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Plano</th>
                    <th class="text-left">Duração</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">NF-e</th>
                  </tr>
                </thead>
                <tbody>
                  <!--- <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr> -->
                </tbody>
              </v-table>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup>
import { onMounted, ref } from "vue";

const payment = ref([]);

const fetchData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  try {
    const { data, pending, error, refresh } = await useFetch(
      "https://api.seduvibe.com/subscription/list_subscriptions_creator_active",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    payment.value = data?._rawValue || [];
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
};

const getSubscriptionTitle = (data) => {
  if (data.length > 0) {
    const name = data[0].subscriptionData.name.split("-")[0].trim();
    return `Plano ${name}`;
  }
  return "";
};

const getSubscriptionSubtitle = (data) => {
  if (data.length > 0) {
    const expirationDate = new Date(data[0].expiration);
    const daysRemaining = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
    return `Sua assinatura vence em ${daysRemaining} dias`;
  }
  return "";
};

onMounted(async () => {
  await fetchData(); // Aguarde a conclusão da solicitação antes de acessar os dados
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
