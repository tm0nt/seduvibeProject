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
              <template v-if="payment.length > 0">
                <v-card
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
              </template>
              <template v-else>
                <v-card
                  class="rounded-xl elevation-0"
                  title="Você não possui assinatura"
                  width="600"
                  height="80"
                  variant="tonal"
                  @click="showDialog = true"
                  color="primary"
                  flat
                >
                  <template v-slot:subtitle> Clique para assinar </template>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-close-octagon</v-icon>
                  </template>
                  <v-card-actions>
                    <v-btn>ASSINAR</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showDialog" persistent width="800" transition="dialog-top-transition">
      <v-card class="rounded-xl overflow-y-hidden" color="background">
        <v-card-title>
          <v-btn
            @click="
              showDialog = false;
              e1 = 0;
            "
            variant="text"
            fab
            ><v-icon size="x-large">mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text class="mt-n4">
          <v-row>
            <v-col cols="12">
              <v-stepper mobile class="elevation-0" flat bg-color="background" v-model="e1">
                <template v-slot:default="{ prev, next }">
                  <v-stepper-header class="elevation-0" color="primary">
                    <v-stepper-item color="primary" :complete="e1 > 0" value="1"></v-stepper-item>

                    <v-divider></v-divider>

                    <v-stepper-item color="primary" :complete="e1 > 1" value="2"></v-stepper-item>

                    <v-divider></v-divider>
                  </v-stepper-header>

                  <v-stepper-window>
                    <v-stepper-window-item value="1">
                      <p class="text-center text-h6 mb-4">Escolha seu plano</p>
                      <v-col class="align-center justify-center d-flex">
                        <v-chip-group filter v-model="selectedFilter">
                          <v-chip :value="'mensal'" variant="outlined" color="primary"
                            >Mensal</v-chip
                          >
                          <v-chip :value="'anual'" variant="outlined" color="primary">Anual</v-chip>
                        </v-chip-group>
                      </v-col>

                      <v-row>
                        <v-col
                          cols="6"
                          class="mx-auto"
                          v-for="plan in filteredPlans"
                          :key="plan.id"
                        >
                          <v-card
                            class="mx-auto elevation-0 rounded-xl"
                            :subtitle="selectedFilter === 'mensal' ? 'Mensal' : 'Anual'"
                            link
                            flat
                            variant="tonal"
                            color="primary"
                            @click="selectPlan(plan)"
                          >
                            <template v-slot:title>
                              <p class="text-subtitle-1">{{ plan?.name }}</p>
                            </template>
                            <template v-slot:prepend>
                              <v-icon @click="infoPlanDialog = true" color="primary"
                                >mdi-information</v-icon
                              >
                            </template>
                            <p class="text-caption text-medium-emphasis ma-4">
                              {{ plan?.description }}
                            </p>
                            <h3 class="ma-4">
                              {{
                                selectedFilter === "mensal" ? plan?.priceMensal : plan?.priceAnual
                              }}
                            </h3>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-stepper-window-item>

                    <v-stepper-window-item value="2">
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-card
                            prepend-icon="mdi-check"
                            width="200"
                            class="mx-auto rounded-xl elevation-0"
                            variant="tonal"
                            color="primary"
                          >
                            <template v-slot:title>
                              <p class="text-subtitle-1">{{ paymentInfo?.title }}</p>
                            </template>
                            <template v-slot:prepend>
                              <v-icon color="primary">mdi-check</v-icon>
                            </template>
                            <h3 class="ma-4 mt-n2">
                              {{ paymentInfo?.subtitle }}
                            </h3>
                            <p class="text-caption text-medium-emphasis text-uppercase ma-4 mt-n4">
                              {{ paymentInfo?.duration }}
                            </p>
                          </v-card>
                        </v-col>
                        <v-col cols="12" md="8">
                          <v-card
                            class="elevation-0 mx-auto rounded-xl mt-2"
                            color="background"
                            flat
                          >
                            <PaymentMethod />
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-stepper-window-item>
                  </v-stepper-window>
                </template>
              </v-stepper>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="infoPlanDialog" width="200">
      <v-card variant="tonal" class="elevation-0 rounded-xl" flat height="200" color="primary">
        <v-card-title>
          <v-btn @click="infoPlanDialog = false" variant="text" fab
            ><v-icon size="x-large">mdi-close</v-icon></v-btn
          ></v-card-title
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script setup>
import { ref, computed } from "vue";
import { idPayment } from "~/store/payment";
const cookie = useCookie("token");
const token = cookie.value;
const idPaymentStore = idPayment();
const payment = ref([]);
const selectedFilter = ref("mensal");
const infoPlanDialog = ref(false);

const showDialog = ref(false);
const filteredPlans = computed(() => {
  return plans.value.filter((plan) => {
    return selectedFilter === "mensal" ? plan.priceMensal : plan.priceAnual;
  });
});
const plans = ref([
  {
    id: 1,
    subscriptionIdAnual: 6,
    subscriptionIdMensal: 5,
    name: "Básico",
    benefits: "Postagens limitadas (15)",
    description: "Ideal para iniciantes em criação",
    priceMensal: "R$ 69,90",
    priceAnual: "R$ 599,90",
  },
  {
    id: 2,
    subscriptionIdAnual: 7,
    subscriptionIdMensal: 8,
    name: "Premium",
    description: "Ideal para criadores consolidados",
    benefits:
      "Postagens ilimitadas, Alcance elevado , Selo de verificação, Recursos exclusivos, Suporte 24hrs",
    priceMensal: "R$ 149,90",
    priceAnual: "R$ 1.199,90",
  },
]);

const headers = [
  {
    title: "Identificador",
    key: "id",
  },
  {
    title: "Plano",
    key: "subscriptionData.name",
  },
  {
    title: "Duração(Meses)",
    key: "subscriptionData.duration",
  },
];

const paymentInfo = ref({
  title: "",
  subtitle: "",
});

const selectedPrice = ref("");

const selectedPlan = ref(null);
const fetchData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  try {
    const { data } = await useFetch(
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

const e1 = ref(0);

const getSubscriptionSubtitle = (data) => {
  if (data.length > 0) {
    const expirationDate = new Date(data[0].expiration);
    const daysRemaining = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
    return `Sua assinatura vence em ${daysRemaining} dias`;
  }
  return "";
};

const selectPlan = (plan) => {
  // Define o plano selecionado
  selectedPlan.value = plan;

  // Define o preço selecionado com base na duração selecionada (mensal ou anual)
  const selectedPriceValue = selectedFilter.value === "mensal" ? plan.priceMensal.replace("R$ ", "") : plan.priceAnual.replace("R$ ", "");
  selectedPrice.value = selectedPriceValue.replace(",", ".");

  // Define as informações de pagamento
  paymentInfo.value = {
    title: `Plano ${plan.name}`,
    subtitle: `Valor: ${selectedFilter.value === "mensal" ? plan.priceMensal : plan.priceAnual}`,
    duration: `${selectedFilter.value}`,
  };

  // Define o subscriptionId com base na duração selecionada
  const subscriptionId = selectedFilter.value === "mensal" ? plan.subscriptionIdMensal : plan.subscriptionIdAnual;
  idPaymentStore.setSubsId(subscriptionId);

  // Define a quantidade inicial como 1
  e1.value = 1;

  // Define o valor do plano no idPaymentStore
  idPaymentStore.setAmount(selectedPrice.value);
};

fetchData();
</script>
<script>
import PaymentMethod from "@/components/creator/paymentMethods/index.vue";
import NavbarView from "@/components/navbar.vue";

export default {
  components: {
    NavbarView,
    PaymentMethod,
  },
};
</script>
