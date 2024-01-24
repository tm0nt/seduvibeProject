<template>
  <v-container>
    <h2>Minhas assinaturas</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Defina o valor de suas assinaturas</p>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-checkbox color="purple" :disabled="true" label="Meu conteúdo é gratuito"></v-checkbox>

          <v-select
            v-model="selectedCurrency"
            :items="['Real brasileiro']"
            label="Escolha sua moeda"
            variant="solo"
            class="mb-n6"
            bg-color="input_color"
            :disabled="true"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="assinaturas.mensal.value"
            placeholder="Mensal"
            label="Mensal"
            bg-color="input_color"
            prepend-inner-icon="mdi-currency-usd"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="assinaturas.trimestral.value"
            placeholder="Trimestral"
            bg-color="input_color"
            label="Trimestral"
            prepend-inner-icon="mdi-currency-usd"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="mt-n5"
            v-model="assinaturas.semestral.value"
            placeholder="Semestral"
            label="Semestral"
            prepend-inner-icon="mdi-currency-usd"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            placeholder="Anual"
            prepend-inner-icon="mdi-currency-usd"
            class="mt-n5"
            label="Anual"
            bg-color="input_color"
            v-model="assinaturas.anual.value"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn class="text-capitalize" color="primary" min-height="40" block>Salvar</v-btn>
    </v-form>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";

// Define a ref for assinaturas
const assinaturas = ref({
  trimestral: { value: null },
  mensal: { value: null },
  anual: { value: null },
  semestral: { value: null },
});

const cookie = useCookie("token");
const token = cookie.value;
const selectedCurrency = "BRL";

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch(
      "https://api.seduvibe.com/subscription/list_values_subs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (Array.isArray(fetchData._rawValue)) {
      fetchData._rawValue.forEach((subscriptionData) => {
        if (subscriptionData.Subscription && subscriptionData.Subscription.name) {
          const subscription = subscriptionData.Subscription;

          if (assinaturas.value.hasOwnProperty(subscription.name)) {
            assinaturas.value[subscription.name].value =
              subscriptionData.value !== undefined ? formatCurrency(subscriptionData.value) : null;
          }
        }
      });
    }

    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});

// Function to format currency with BRL locale
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
</script>
