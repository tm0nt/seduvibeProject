<template>
  <v-container>
    <h2>Minhas assinaturas</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Defina o valor de suas assinaturas</p>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            color="purple"
            label="Meu conteúdo é gratuito"
            v-model="checkboxChecked"
          ></v-checkbox>

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
            placeholder="Mensal"
            bg-color="input_color"
            prepend-inner-icon="mdi-currency-usd"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            placeholder="Trimestral"
            bg-color="input_color"
            prepend-inner-icon="mdi-currency-usd"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="mt-n5"
            placeholder="Semestral"
            prepend-inner-icon="mdi-currency-usd"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            placeholder="Anual"
            prepend-inner-icon="mdi-currency-usd"
            class="mt-n5"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn class="text-capitalize" color="primary" min-height="40" block @click="saveSubscription"
        >Salvar</v-btn
      >
    </v-form>
  </v-container>
</template>

<style>
.custom-suffix .v-text-field__append-inner {
  color: purple;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mensal: 0,
      checkboxChecked: false,

      subscriptions: [
        { value: "", subscriptionId: "2" }, // Mensal
        { value: "", subscriptionId: "3" }, // Anual
        { value: "", subscriptionId: "4" }, // Trimestral
        { value: "", subscriptionId: "1" }, // Semestral
      ],
      trimestral: 0,
      semestral: 0,

      snackbar: {
        show: false,
        text: "",
        color: "", // Cor padrão do Snackbar
        timeout: null, // Tempo em milissegundos antes do Snackbar se fechar automaticamente
      },
      subscriptionNames: {
        1: "Semestral",
        2: "Mensal",
        3: "Anual",
        4: "Trimestral",
      },
      selectedCurrency: "BRL",
      anual: 0,
      currencies: [
        { text: "Dólares Americanos", value: "USD" },
        { text: "Libras Esterlinas", value: "GBP" },
        { text: "Euros", value: "EUR" },
        { text: "Real Brasileiro", value: "BRL" },
      ],
      requiredRule: [(v) => !!v || "Campo obrigatório"],
      mensalPercentage: 0.85,
      trimestralPercentage: 0.85,
      anualPercentage: 0.85,
    };
  },
  computed: {
    netTotal() {
      return this.mensal * this.mensalPercentage;
    },
  },

  methods: {
    formattedNetTotal(field, percentage) {
      const value = Number(this[field]) * percentage;

      if (isNaN(value)) {
        return "Valor não especificado";
      }

      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: this.selectedCurrency,
        minimumFractionDigits: 2,
      });
    },
    async saveSubscription() {
      // Certifique-se de que os campos do formulário estejam preenchidos corretamente
      // Use parseFloat para converter os valores em números (caso ainda não estejam)
      const selectedSubscriptions = this.subscriptions.filter((subscription) => subscription.value);

      if (selectedSubscriptions.length === 0) {
        // Nenhum plano de assinatura selecionado, trate isso como apropriado
        console.log("Nenhum plano de assinatura selecionado.");
        this.snackbar.text = "Assinatura salva com sucesso";
        this.snackbar.color = "success";
        this.snackbar.timeout = 6000;

        this.snackbar.show = true;
        return;
      }

      const requestData = {
        subscriptions: selectedSubscriptions,
        currency: this.selectedCurrency,
      };

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://api.seduvibe.com/subscription/choose_subscriptions",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Especifica o tipo de conteúdo JSON
            },
          }
        );

        console.log("Response:", response.data);

        // Lógica adicional, como redirecionar o usuário ou exibir uma mensagem de sucesso.
      } catch (error) {
        console.error("Error:", error);
        // Lógica para lidar com erros, como exibir uma mensagem de erro ao usuário.
      }
    },

    calculateTotal(field) {
      this[field] = parseFloat(this[field]);
    },
    formatCurrency(field) {
      this[field] = this[field].replace(/[^0-9,]/g, ""); // Remove caracteres não numéricos, exceto a vírgula
      this[field] = this[field].replace(",", "."); // Substitui a vírgula por ponto
      this[field] = this[field].replace(/\./g, ","); // Substitui o ponto por vírgula
    },
  },
};
</script>
