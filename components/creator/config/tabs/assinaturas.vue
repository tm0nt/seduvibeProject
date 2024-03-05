<template>
  <v-container>
    <h2>Minhas assinaturas</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Defina o valor de suas assinaturas</p>
    <v-form ref="assinaturasForm">
      <v-row>
        <v-col cols="12" class="mt-5"> </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="assinaturas.mensal.value"
            placeholder="Mensal"
            label="Mensal"
            type="number"
            bg-color="input_color"
            hide-spin-buttons
            prepend-inner-icon="mdi-coin"
            :rules="[requiredRule, rangeRule]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="assinaturas.trimestral.value"
            placeholder="Trimestral"
            type="number"
            bg-color="input_color"
            label="Trimestral"
            hide-spin-buttons
            prepend-inner-icon="mdi-coin"
            :rules="[requiredRule, rangeRule]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="mt-n5"
            v-model="assinaturas.semestral.value"
            placeholder="Semestral"
            label="Semestral"
            prepend-inner-icon="mdi-coin"
            type="number"
            hide-spin-buttons
            bg-color="input_color"
            :rules="[requiredRule, rangeRule]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            placeholder="Anual"
            prepend-inner-icon="mdi-coin"
            class="mt-n5"
            hide-spin-buttons
            type="number"
            label="Anual"
            bg-color="input_color"
            v-model="assinaturas.anual.value"
            :rules="[requiredRule, rangeRule]"
          ></v-text-field>
        </v-col>
      </v-row>
      <p class="text-caption mb-4 text-medium-emphasis">Adicione o valor de 0 para <strong>NÃO</strong> adicionar um tipo de assinatura.</p>
      <v-btn
        @click="validateAndSave"
        class="text-capitalize"
        color="primary"
        min-height="40"
        block
        :disabled="isSaveButtonDisabled"
        >Salvar</v-btn
      >
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";

const assinaturas = ref({
  trimestral: { value: null },
  mensal: { value: null },
  anual: { value: null },
  semestral: { value: null },
});

const cookie = useCookie("token");
const token = cookie.value;
const assinaturasForm = ref(null);

const subscriptionIdMap = {
  mensal: 2,
  semestral: 1,
  anual: 3,
  trimestral: 4,
};

const isSaveButtonDisabled = ref(false);
const saveSubscriptions = async () => {
  const subscriptionsData = {
    subscriptions: Object.keys(assinaturas.value).map((key) => ({
      value: assinaturas.value[key].value,
      subscriptionId: subscriptionIdMap[key],
    })),
  };
  try {
    const data = await $fetch("https://api.seduvibe.com/subscription/choose_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subscriptionsData),
    });
    console.log(data);
    showSnackbar("Dados atualizados!", "success");
    fetchData();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const requiredRule = (value) => !!value || "O campo é obrigatório";

const rangeRule = (value) => {
  const isValidRange = parseFloat(value) >= 0 && parseFloat(value) <= 1000;

  isSaveButtonDisabled.value = !isValidRange;

  return isValidRange || "Limite de até R$ 1000,00";
};

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

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/subscription/list_values_subs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(data)) {
      data.forEach((subscriptionData) => {
        if (subscriptionData.Subscription && subscriptionData.Subscription.name) {
          const subscription = subscriptionData.Subscription;

          if (assinaturas.value.hasOwnProperty(subscription.name)) {
            assinaturas.value[subscription.name].value =
              subscriptionData.value !== undefined ? subscriptionData.value : null;
          }
        }
      });
    }
    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const validateAndSave = async () => {
  const isFormValid = assinaturasForm.value.validate();

  if (isFormValid) {
    saveSubscriptions();
  } else {
    showSnackbar("Por favor, corrija os erros no formulário.", "error");
  }
};

onMounted(async () => {
  await fetchData();
});
</script>
