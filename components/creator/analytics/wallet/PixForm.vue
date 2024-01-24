<template>
  <v-container>
    <v-form>
      <v-row class="mt-4">
        <p class="text-caption text-medium-emphasis">
          Para consultar o prazo de saque acesse aqui.
        </p>
        <v-col cols="12">
          <v-text-field
            placeholder="Digite algum valor disponível"
            prepend-inner-icon="mdi-currency-usd"
            v-model="valor"
            bg-color="input_color"
          />
        </v-col>

        <v-btn
          block
          min-height="40"
          class="text-capitalize mb-4"
          prepend-icon="mdi-send"
          color="primary"
          @click="withdrawPix(valor, 'pix')"
          >Pedir saque</v-btn
        ></v-row
      >
      <v-alert v-if="cpf === ''" type="error" color="#940020" dismissible class="mt-4">
        Antes de pedir um saque é necessário cadastrar seu CPF nas configurações do perfil ou
        <router-link to="/config" class="custom-router-link">clique aqui</router-link>
        para cadastrar.
      </v-alert>
    </v-form>
    <v-snackbar timeout="3000" centered rounded="pill" color="success" v-model="snackbarWith">
      Saque solicitado com sucesso!
    </v-snackbar>
    <v-snackbar timeout="3000" centered rounded="pill" color="error" v-model="snackbarWithoutFunds">
      Seu saldo disponível é insuficiente!
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  props: ["executeFetch", "historyFetch"],

  data() {
    return {
      cpf: "11122233344",
      withdraw: null,
      valor: "",
      snackbarWith: false,
      snackbarWithoutFunds: false,
      requiredRule: [(v) => !!v || "Valor é obrigatório"],
      valorRule: [
        (v) =>
          !v ||
          parseFloat(v.replace(/\D/g, "")) <= 1000000 ||
          "O valor deve ser menor que R$ 1.000.000,00",
      ],
    };
  },
  computed: {
    formattedCPF() {
      return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },
  },
  methods: {
    async withdrawPix(amount, method) {
      try {
        const response = await withdrawService.sendWithdraw(amount, method);
        this.withdraw = response;
        console.log("Resposta do withdrawPix:", this.withdraw);

        if (response && response.data.message === "Saque solicitado com sucesso.") {
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
  },
};
</script>
