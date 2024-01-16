<template>
    <v-container>
      <v-form>
        <v-row class="mt-4">
            <p class="text-caption text-medium-emphasis">Para consultar o prazo de saque acesse aqui.</p>
          <v-col cols="12">
            <v-select :disabled="true" v-model="bank" :items="['Conta Itaú']" bg-color="input_color" density="comfortable" prepend-inner-icon="mdi-bank" variant="solo"></v-select>
            <v-text-field
              placeholder="Digite algum valor disponível"
              prepend-inner-icon="mdi-currency-usd"
              v-model="valor"
              bg-color="input_color"
            />
          </v-col>
        </v-row>
        <v-alert
          v-if="cpf === ''"
          type="error"
          dismissible
          class="mt-4"
          color="#940020"
        >
          Antes de pedir um saque é necessário cadastrar seu CPF nas configurações
          do perfil ou
          <router-link to="config" class="custom-router-link"
            >clique aqui</router-link
          >
          para cadastrar.
        </v-alert>
        <v-btn
          block
          @click="withdrawTed(valor, 'ted')"
          color="primary"
          min-height="40"
          class="text-capitalize"
          prepend-icon="mdi-send"
          >Enviar</v-btn
        >
      </v-form>
      <v-snackbar
        timeout="3000"
        centered
        rounded="pill"
        color="success"
        v-model="snackbarWith"
      >
        Saque solicitado com sucesso!
      </v-snackbar>
      <v-snackbar
        timeout="3000"
        centered
        rounded="pill"
        color="error"
        v-model="snackbarWithoutFunds"
      >
        Seu saldo disponível é insuficiente!
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  export default {
    props: ["executeFetch", "historyFetch"],
    components: {},
    data() {
      return {
        bank: "Banco Itaú",
        cpf: "111.222.333-44",
        snackbarWith: false,
        snackbarWithoutFunds: false,
        valor: "",
        withdraw: null,
        selectedBank: null,
        bankList: [
          "Banco do Brasil",
          "Caixa Econômica Federal",
          "Bradesco",
          "Itaú",
          "Santander",
          "HSBC",
          "Citibank",
          "BNDES",
          "Banco Inter",
          "Sicoob",
          "Bancoob",
          "Banco Safra",
          "Banco Votorantim",
          "Banco do Nordeste",
          "Banrisul",
          "Banco Pine",
          "Banco Pan",
          "Banco BMG",
          "Banco Neon",
          "Nubank",
          "C6Bank",
          "Banco Daycoval",
        ],
        valorRules: [
          (v) => !!v || "Valor é obrigatório",
          (v) =>
            parseFloat(v.replace(/\D/g, "")) <= 1000000 ||
            "O valor deve ser menor que R$ 1.000.000,00",
        ],
      };
    },
    computed: {
      valorErrors() {
        return this.valorRules
          .filter((rule) => !rule(this.valor))
          .map((rule) => rule(this.valor));
      },
    },
    methods: {
      async withdrawTed(amount, method) {
        try {
          const response = await withdrawService.sendWithdraw(amount, method);
          this.withdraw = response;
          console.log("Resposta do withdrawPix:", this.withdraw);
  
          if (
            response &&
            response.data.message === "Saque solicitado com sucesso."
          ) {
            this.snackbarWith = true;
            this.executeFetch();
            this.historyFetch();
          }
        } catch (error) {
          this.snackbarWithoutFunds = true;
          console.error("Erro ao chamar withdrawPix:", error);
        }
      },
      formatarValor() {
        let val = this.valor.replace(/\D/g, "");
        val = (parseFloat(val) / 100).toFixed(2).replace(".", ",");
        val = "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.valor = val;
      },
      formatCPF() {
        this.cpf = this.cpf
          .replace(/\D/g, "") // remove caracteres não numéricos
          .replace(/(\d{3})(\d)/, "$1.$2") // insere ponto após o terceiro dígito
          .replace(/(\d{3})(\d)/, "$1.$2") // insere ponto após o sexto dígito
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // insere traço após o nono dígito
      },
    },
  };
  </script>
  
  <style>
  .custom-router-link {
    color: #151515 !important;
    text-decoration: none;
  }
  
  .custom-router-link .custom-router-link-text {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  