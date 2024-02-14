<template>
  <v-expansion-panels variant="popout" class="mb-4">
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-credit-card" collapse-icon="mdi-credit-card-check">
        Cartão de crédito
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
          <!--
          <v-row>
            <v-col cols="12" md="12" lg="12">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Titular"
                type="text"
                placeholder="Titular"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="CPF"
                type="number"
                v-model="idPaymentStore.cpf"
                class="mt-n6"
                placeholder="CPF"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Número"
                class="mt-n6"
                type="number"
                placeholder="Número"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                class="mt-n6"
                label="Mês"
                type="number"
                placeholder="Mês"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Ano"
                type="number"
                class="mt-n6"
                placeholder="Ano"
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="6" lg="6">
              <v-text-field
                hide-spin-buttons
                class="mt-n6"
                bg-color="input_color"
                label="CVV"
                type="number"
                placeholder="CVV"
              ></v-text-field>
            </v-col>
            <v-btn block min-height="40" color="primary" class="text-capitalize"
              >Fazer pagamento</v-btn
            > 
          </v-row> -->
          <p class="text-caption text-center">Ainda estamos processando este método de pagamento</p>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Pix
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
          <v-text-field
          :readonly="idPaymentStore?.setCpf?.length === 14"
          bg-color="input_color"
            placeholder="CPF"
            label="CPF"
            v-model="idPaymentStore.setCpf"
            type="number"
            hide-spin-buttons
            readonly
          >
          </v-text-field>
          <v-btn block min-height="40" color="primary" @click="makePaymentPix(1)" class="text-capitalize"
            >Fazer pagamento</v-btn
          >
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-currency-btc" collapse-icon="mdi-bitcoin">
        Criptomoeda
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
    <!---      <p class="text-caption text-center text-medium-emphasis">
            Você está pagando 0.0001456 BTC
          </p>
          <v-btn block min-height="40" color="primary" class="mt-2 text-capitalize"
            >Fazer pagamento</v-btn
          > -->
          <p class="text-caption text-center">Ainda estamos processando este método de pagamento</p>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-dialog v-model="payPixDialog" width="400" persistent>
    <v-card class="rounded-xl elevation-6" color="background" flat>
      <v-card-title><v-icon @click="payPixDialog = false;">mdi-close</v-icon></v-card-title>
      <v-card-text class="text-center">
        <p class="mb-2">Você está pagando via pix</p>
        <v-img  width="200" class="mx-auto rounded-xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png"></v-img>
        <v-chip class="mt-2" color="primary" prepend-icon="mdi-coin">R$ {{ idPaymentStore.setDataReceived.value / 100 }}</v-chip>
        <v-text-field class="mt-2" v-model="idPaymentStore.setDataReceived.qrCode.qrcode" readonly bg-color="input_color" @click="copyToClipboard">
          <template v-slot:append-inner>
          <v-icon @click="copyToClipboard">mdi-content-copy</v-icon>
        </template>
        </v-text-field>
      </v-card-text>
    </v-card>

  </v-dialog>
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

<script setup> 
import { idPayment } from '~/store/payment';

const cookie = useCookie("token");
const token = cookie.amount;

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
    timeout: 4000,
  };
};

const idPaymentStore = idPayment()
console.log(idPaymentStore)

const payPixDialog = ref(false);
const makePaymentPix = async () => {
  try {
    const amountInCents = (idPaymentStore.setAmount * 100).toFixed(2);

    const requestBody = {
      name: idPaymentStore.setName,
      email: idPaymentStore.setEmail,
      cpf: idPaymentStore.setCpf,
      amount: parseFloat(amountInCents),
    };

    console.log("Request Body:", requestBody);

    const { data, error } = useFetch("http://127.0.0.1:4567/paymentProcess/pix", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (data.value) {
      watchEffect(() => {
        idPaymentStore.setDataReceived = data.value;
      });
      console.log(data);
      payPixDialog.value = true;
    }
  } catch (error) {
    // Trate o erro conforme necessário
  }
};


const clearDataPayment = async () => {
  idPaymentStore.setDataReceived = null;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(idPaymentStore.setDataReceived.qrCode.qrcode);
  showSnackbar("Pix copia e cola copiado com sucesso!", "success");
};
</script>
