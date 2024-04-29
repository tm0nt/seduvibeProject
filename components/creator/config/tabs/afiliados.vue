Copy code
<template>
  <v-container>
    <h2>Afiliados</h2>
    <p class="text-caption text-medium-emphasis">Configure os valores de sua afiliação!</p>
    <v-form>
      <v-col cols="12" class="mt-5">
        <v-text-field
          v-model="valorAssinatura"
          placeholder="Valor da sua assinatura"
          label="Valor da sua assinatura"
          color="primary"
          hide-spin-buttons
          prepend-inner-icon="mdi-coin"
          type="number"
          bg-color="input_color"
        ></v-text-field>
        <v-text-field
          v-model="porcentagemComissao"
          placeholder="Porcentagem por venda"
          type="number"
          hide-spin-buttons
          prepend-inner-icon="mdi-percent-circle"
          step="0.01"
          :hint="valorComissao.toFixed(2)"
          label="Porcentagem por venda"
          class="mt-2"
          color="primary"
          bg-color="input_color"
          :value="porcentagemComissao || null"
          min="0"
          max="100"
          @input="calcularComissao"
          required
        ></v-text-field>
      </v-col>
      <v-row>
        <v-col cols="6">
          <v-btn
            @click="setAffiliateData"
            color="primary"
            class="text-capitalize"
            min-height="40"
            :disabled="isSaveButtonDisabled"
            block
          >
            Salvar
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            to="/profile/creator/analytics/affiliate"
            color="primary"
            class="text-capitalize"
            variant="outlined"
            min-height="40"
            block
          >
            Gerenciar
          </v-btn>
        </v-col>
      </v-row>
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
import { ref } from "vue";

const requiredRule = (value) => !!value || "O campo é obrigatório";

const rangeRuleValor = (value) => {
  const isValidRange = parseFloat(value) >= 15 && parseFloat(value) <= 100;
  isSaveButtonDisabled.value = !isValidRange;
  return isValidRange || "De R$15,00 até R$100,00";
};

const rangeRuleComissao = (value) => {
  const isValidRange = parseFloat(value) >= 1 && parseFloat(value) <= 80;
  isSaveButtonDisabled.value = !isValidRange;
  return isValidRange || "De 1% até 80%";
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

const valorAssinatura = ref(null);
const porcentagemComissao = ref(0);
const valorComissao = ref(0);
const cookie = useCookie("token");
const token = cookie.value;

const calcularComissao = () => {
  valorComissao.value =
    parseFloat(valorAssinatura.value) * (parseFloat(porcentagemComissao.value) / 100);
};

const setAffiliateData = async () => {
  try {
    if (valorAssinatura.value) {
      const cleanedValue = valorAssinatura.value.replace(/[^\d.,]/g, "");
      const { data, error } = await useFetch(
        "https://api.seduvibe.com/afiliates/set-affiliate-product-value",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productValue: cleanedValue }),
        }
      );
      console.log(error);
      showSnackbar("Dados atualizados com sucesso!", "success");
    }
    if (porcentagemComissao.value) {
      const { data } = await useFetch(
        "https://api.seduvibe.com/afiliates/set-my-affiliate-commission",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ commission: porcentagemComissao.value }),
        }
      );

      console.log("Commission value saved successfully!");
      console.log(data);
    } else {
      console.log("No data to save.");
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
const fetchData = async () => {
  try {
    const { data, error } = await useFetch(
      "https://api.seduvibe.com/afiliates/affiliate-creator-data",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    valorAssinatura.value = data._rawValue.productValue;
    porcentagemComissao.value = data._rawValue.commission;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

fetchData();

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
</script>
