<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Carteira
          </h2>
          <p class="text-caption text-medium-emphasis mt-n1">Atualizações a todo instante.</p>
          <v-card
            color="background elevation-6"
            rounded="xl"
            class="mt-4 d-flex justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-cash</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Saldo disponível</p>
                    <h3>
                      {{
                        Math.abs(
                          parseFloat(balance?.creatorData?.balance_available)
                        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                      }}
                    </h3>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-clock</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Aguardando</p>
                    <h3>
                      {{
                        Math.abs(
                          parseFloat(balance?.creatorData?.total_balance) -
                            parseFloat(balance?.creatorData?.balance_available)
                        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                      }}
                    </h3>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-lock</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Saldo bloqueado</p>
                    <h3>
                      {{
                        parseFloat(balance?.creatorData?.balance_blocked).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </h3>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4 elevation-6" color="background" flat>
            <v-container class="ma-2">
              <h4>Pedir um saque</h4>
              <p class="text-caption text-medium-emphasis">
                A velocidade do saque depende do seu plano de assinatura.
              </p>
              <v-tabs v-model="tab" bg-color="transparent" color="basil" grow class="mt-4">
                <v-tab v-for="item in items" :key="item" :value="item" color="primary" rounded="xl">
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item v-for="item in items" :key="item" :value="item">
                  <v-form>
                    <v-card color="background" rounded="xl" flat>
                      <v-row v-if="item === 'PIX'">
                        <v-col class="ma-4">
                          <v-text-field
                            label="CPF"
                            :disabled="true"
                            :readonly="true"
                            type="number"
                            v-model="cpf"
                            variant="solo"
                            hide-spin-buttons
                            bg-color="input_color"
                          ></v-text-field>
                          <v-text-field
                            label="Valor"
                            prepend-inner-icon="mdi-coin"
                            type="number"
                            class="mt-n4"
                            hide-spin-buttons
                            variant="solo"
                            bg-color="input_color"
                            v-model="withdraw.pix.amount"
                          ></v-text-field>
                          <v-alert
                            type="info"
                            rounded="xl"
                            class="mt-2 mb-2"
                            v-model="infoMessage.visible"
                            variant="tonal"
                            closable
                            border="start"
                            colapse
                            :color="infoMessage.color"
                            ><template v-slot:title>
                              <p class="text-caption">{{ infoMessage.text }}</p>
                            </template>
                          </v-alert>
                          <v-btn
                            color="primary"
                            block
                            variant="tonal"
                            min-height="40"
                            @click="withdrawRequest(withdraw.pix.id, withdraw.pix.amount)"
                            class="text-capitalize"
                            >Sacar</v-btn
                          >
                        </v-col>
                      </v-row>

                      <v-row v-if="item === 'TED'">
                        <v-col class="ma-4">
                          <!----   <v-card
                            class="mx-auto my-5 rounded-xl elevation-0"
                            title="Conta principal"
                            variant="tonal"
                            color="primary"
                            flat
                          >
                           <template v-slot:prepend>
                              <v-icon color="primary">mdi-bank</v-icon>
                            </template>
                            <template v-slot:subtitle>Lais</template>
                            <v-card-text
                              ><p>Caixa</p>
                              <p>Agência 45454 | Conta 555454</p>
                            </v-card-text>
                          </v-card>
                          <v-btn
                            color="primary"
                            @click="withdrawRequest(withdraw.ted.id)"
                            class="text-capitalize"
                            >Sacar</v-btn
                          >-->
                          <p class="text-caption text-center text-medium-emphasis">
                            Estamos processando o saque via TED
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card>
          <v-row>
            <v-col cols="12" md="12" lg="12" class="mt-4">
              <v-card color="background elevation-6" class="rounded-xl">
                <v-data-table
                  :headers="headers"
                  no-data-text="Nenhum saque encontrado"
                  items-per-page-text="Saques"
                  :items="historyWithdraw && historyWithdraw.length ? historyWithdraw : []"
                  theme="dark"
                >
                  <template v-slot:item.statusName="{ value }">
                    <v-chip :color="getStatusColor(value)">
                      {{ getStatusLabel(value) }}
                    </v-chip>
                  </template>
                  <template v-slot:item.createdAt="{ value }">
                    {{ formatRelativeTime(value) }}
                  </template>
                  <template v-slot:item.amount="{ value }">
                    {{ value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
                  </template>
                </v-data-table>
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
import { ref } from "vue";
const cookie = useCookie("token");
const token = cookie.value;
const cpf = ref(null);

const infoMessage = ref({
  visibleError: false,
  visible: false,
  text: "",
  color: "",
});

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffInDays = Math.floor((today - date) / (24 * 60 * 60 * 1000));

  if (diffInDays === 0) {
    return "Hoje";
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `há ${diffInDays} dias`;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Rejeitado";
    case "pending":
      return "Pendente";
    default:
      return "";
  }
};

const historyWithdraw = ref(null);
const withdraw = ref({
  pix: { id: 1, amount: null },
});


const headers = [
  {
    title: "Identificador",
    key: "id",
  },
  { title: "Status", key: "statusName" },
  {
    title: "Valor",
    key: "amount",
  },
  { title: "Data", key: "createdAt" },
];

const balance = ref(null);

const withdrawRequest = async (id, amount) => {
  try {
    // Verifica se o valor do saque é maior que o saldo disponível
    const availableBalance = parseFloat(balance?.value.creatorData?.balance_available);
    const requestedAmount = amount;

    if (isNaN(availableBalance) || isNaN(requestedAmount) || requestedAmount > availableBalance) {
      infoMessage.value.text = "Saldo insuficiente!";
      infoMessage.value.visible = true;
      infoMessage.value.color = "red";
      return;
    }

    if (!cpf.value || !withdraw.value.amount) {
      infoMessage.value.text = "Preencha todos os campos!";
      infoMessage.value.visible = true;
      infoMessage.value.color = "red";
      return;
    }

    if (!cpf.value) {
      infoMessage.value.text = "Cadastre seu cpf nas configurações de conta!";
      infoMessage.value.visible = true;
      infoMessage.value.color = "red";
      return;
    }

    const { data, error } = await $fetch("https://api.seduvibe.com.br/request_withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        method: id,
        amount: amount,
      }),
    });

    withdraw.value.pix.amount = null;
    infoMessage.value.text = "Pedido de saque concluído!";
    infoMessage.value.visible = true;
    infoMessage.value.color = "success";
    fetchBalance();
    fetchWithdraw();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const fetchWithdraw = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/withdraw_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    historyWithdraw.value = data?.withdrawals.reverse();
    console.log(historyWithdraw);
  } catch (error) {
    console.error("Erro", error);
  }
};

const fetchBalance = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    balance.value = data;
    console.log(data);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
fetchBalance();
fetchWithdraw();
</script>

<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";

export default {
  data() {
    return {
      tab: "PIX",
      items: ["PIX", "TED"],
    };
  },
  components: {
    SideBar,
  },
};
</script>
