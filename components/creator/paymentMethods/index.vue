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
            placeholder="Digite seu CPF"
            bg-color="input_color"
            rounded="xl"
            hide-spin-buttons
            type="number"
            v-model="idPaymentStore.cpf"
          >
          </v-text-field>
          <v-btn
            block
            min-height="40"
            color="primary"
            variant="tonal"
            :disabled="pending === true"
            @click="makePaymentPix(1)"
            class="text-capitalize"
            ><p v-if="pending !== true">Gerar pagamento</p>
            <v-progress-circular
              v-if="pending === true"
              indeterminate
              color="primary"
              :size="16"
              :width="3"
            ></v-progress-circular
          ></v-btn>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-dialog v-model="payPixDialog" width="400" persistent>
    <v-card class="rounded-xl elevation-6" color="background" flat>
      <v-card-title>
        <v-icon @click="payPixDialog = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="text-center">
        <template v-if="paymentSuccessful">
          <v-icon size="64" color="primary">mdi-check-circle</v-icon>
          <p class="mb-2 mt-4">Pagamento concluído!</p>
        </template>
        <template v-else>
          <v-card class="elevation-0 mx-auto d-flex align-center justify-center rounded-xl" flat>
          </v-card>
          <v-chip class="mt-2" color="primary" prepend-icon="mdi-coin">
            R$ {{ idPaymentStore?.amount }}
          </v-chip>
          <v-img
            class="mx-auto mt-4 mb-4"
            rounded="xl"
            :src="idPaymentStore?.dataReceived?.generateArray.imagemQrcode"
            width="250"
          ></v-img>
          <v-text-field
            class="mt-2"
            v-model="idPaymentStore.dataReceived.generateArray.qrcode"
            readonly
            bg-color="input_color"
            @click="copyToClipboard"
          >
            <template v-slot:append-inner>
              <v-icon @click="copyToClipboard">mdi-content-copy</v-icon>
            </template>
          </v-text-field>
        </template>
        <v-alert
          rounded="xl"
          variant="tonal"
          border="start"
          closable
          v-model="copiaCola.v"
          :color="copiaCola.color"
          type="info"
          class="mb-4 mt-n4"
        >
          <template v-slot:title>
            <p class="text-caption">{{ copiaCola.text }}</p>
          </template>
        </v-alert>
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
import { useIdStorePublic } from "~/store/public";
import { idPayment } from "~/store/payment";
import { useIdStore } from "~/store/id";

const cookie = useCookie("token");
const token = cookie.value


const IdStored = useIdStore();
const userStorePublic = useIdStorePublic();

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

const copiaCola = ref({
  text: "Pix copiado com sucesso!",
  v: false,
  color: "success",
});

const alertMessage = ref({
  text: "Usaremos o CPF cadastrado do seu perfil!",
  v: true,
  color: "primary",
});

const idPaymentStore = idPayment();
const paymentSuccessful = ref(false);

const pending = ref(null);
const payPixDialog = ref(false);

const makePaymentPix = async (id) => {
  try {
    if (!idPaymentStore.cpf) {
      alertMessage.value.text = "Você não possui CPF cadastrado!";
      alertMessage.value.v = true;
      alertMessage.value.color = "red";
      return;
    }
    pending.value = true; // 

    const amountInCents = (idPaymentStore.amount * 100).toFixed(2);

    const requestBody = {
      name: idPaymentStore.name,
      cpf: idPaymentStore.cpf,
      price: parseFloat(amountInCents),
    };

    const {
      data,
      pending: waiting,
      error,
    } = await useFetch("https://payment.seduvibe.com/create-pix", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    pending.value = waiting.value;
    console.log(error);
    if (data.value) {
      idPaymentStore.setDataReceived(data.value);
     await registerTxid(idPaymentStore.subscriptionId);
      payPixDialog.value = true;
      await checkPayment(data.value.txid, 1)
    }
  } catch (error) {
    console.error(error);
  } finally {
    pending.value = false; // Certifique-se de limpar o estado "pending" independentemente do resultado
  }
};

const registerTxid = async (subsId) => {
  try{
    const data = await $fetch("https://api.seduvibe.com/gateway/txid", {
      method: "post",
      body: JSON.stringify({
        txid: idPaymentStore.dataReceived.txid,
        status: "waiting",
        userId: IdStored.id,
        subscriptionId: subsId,
      })
    })
  }catch(error){
    console.error(error);
  }


};

const successPayment = async (id, subscriptionId, paymentMethodId, amount) => {
  try {
    const makeSubscriptionRequest = async (url, data) => {
      try {
        const response = await useFetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.data.value) {
          console.log(response.data.value);
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.error("Error in subscription request:", error);
        throw error;
      }
    };
    if (subscriptionId >= 1 && subscriptionId <= 4) {
      await makeSubscriptionRequest(`https://api.seduvibe.com/subscription/user_sub/${id}`, {
        subscriptionId,
        paymentMethodId,
      });
    } else if (subscriptionId >= 5 && subscriptionId <= 8) {
      await makeSubscriptionRequest(`https://api.seduvibe.com/subscription/creator_sub`, {
        subscriptionId,
        paymentMethodId,
      });
    } else {
      await makeSubscriptionRequest(`https://api.seduvibe.com/donate/${id}`, {
        amount,
      });
    }
  } catch (error) {
    console.error("Error when subscribing:", error);
    // 
  }
};


const checkPayment = async (paymentId, paymentMethod) => {
  try {
    const { data, error } = await useFetch(`https://api.seduvibe.com/gateway/check-status/${paymentId}`, {
      method: "GET",
    });
    console.log(error.value);
    if (data.value) {
      console.log(data.value);
      paymentSuccessful.value = true;
      await successPayment(
        userStorePublic.id,
        idPaymentStore.subscriptionId,
        paymentMethod,
        idPaymentStore.amount
      );
      setTimeout(() => {
        refreshNuxtData()
      }, 3000);
    
      
    }

  } catch (error) {
    console.error(error);
    // Trate os erros adequadamente
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(idPaymentStore.dataReceived.generateArray.qrcode);
  copiaCola.value.v = true;
};
</script>
