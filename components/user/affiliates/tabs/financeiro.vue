<template>
  <v-card color="background" rounded="xl" elevation="6" class="mt-4 d-flex justify-center align-center" flat>
    <v-row class="ma-2" align="center" justify="center">
      <v-col cols="12" md="6" lg="6">
        <p class="text-caption text-medium-emphasis">Saldo disponível</p>
        <h3>R$ 0,00<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <p class="text-caption text-medium-emphasis">Total em vendas</p>
        <h3>R$ 0,00<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="rounded-xl mt-4" elevation="6" color="background" flat>
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
                    type="number"
                    bg-color="input_color"
                    hide-spin-buttons
                    class="mb-n4"
                    color="primary"
                    prepend-inner-icon="mdi-document"
                    v-model="pix.amount"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Valor"
                    bg-color="input_color"
                    type="number"
                    hide-spin-buttons
                    color="primary"
                    prepend-inner-icon="mdi-coin"
                    v-model="pix.amount"
                    outlined
                  ></v-text-field>
                  <v-alert
        closable
        v-model="infoMessage.v"
        class="rounded-xl mb-4"
        type="info"
        variant="tonal"
        :color="infoMessage.color"
      >
        <template v-slot:title>
          <p class="text-caption">{{ infoMessage.text }}</p>
        </template>
      </v-alert>
                  <v-btn
                    block
                    variant="tonal"
                    color="primary"
                    @click="withdrawRequest(pix.id, pix.amount)"
                    class="text-capitalize mt-2"
                    >Sacar</v-btn
                  >
                </v-col>
              </v-row>

              <v-row v-if="item === 'TED'">
                <v-col class="ma-4">
                  <!--     <v-card
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
                  </v-card> -->
                  <p class="text-center text-caption text-medium-emphasis mt-4 mb-4">
                    Estamos processando os pagamentos via ted.
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    rounded="pill"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      tab: "PIX",
      items: ["PIX", "TED"],
    };
  },
};
</script>
<script setup>

const infoMessage = ref({
  v: false,
  text: null,
  color: null,
});


const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});
const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 6000,
  };
};
const pix = ref({
  id: 1,
  amount: null,
});
const cookie = useCookie("token");
const token = cookie.value;

const withdrawRequest = async (id, amount) => {
  try {
    if(!amount){
      infoMessage.value.text = "Preencha todos os campos";
    infoMessage.value.v = true;
    infoMessage.value.color = "red";
      return;
    }
    const data = await $fetch("https://api.seduvibe.com/request_withdraw", {
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
    infoMessage.value.text = "Seu saque foi solicitado!";
    infoMessage.value.v = true;
    infoMessage.value.color = "success";
    pix.value.amount = null;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
</script>
