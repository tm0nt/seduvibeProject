<template>
  <v-container>
    <h2>Afiliação</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">Gerencie seu sistema de afiliação</p>
    <v-btn block class="text-capitalize" color="primary">PAINEL DE GERENCIAMENTO</v-btn>
    <v-container>
      <v-switch v-model="formularioAtivo" color="primary" :label="switchplaceholder"></v-switch>

      <v-form v-if="formularioAtivo" :key="formularioAtivo">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="valorAssinatura"
              placeholder="Valor da sua assinatura"
              color="primary"
              prepend-inner-icon="mdi-currency-usd"
              bg-color="input_color"
              required
            ></v-text-field>
            <v-text-field
              v-model="porcentagemComissao"
              placeholder="Porcentagem por venda"
              type="number"
              prepend-inner-icon="mdi-currency-usd"
              step="0.01"
              color="primary"
              bg-color="input_color"
              :value="porcentagemComissao || null"
              min="0"
              max="100"
              @input="calcularComissao"
              required
            ></v-text-field>
            <p class="text-caption text-medium-emphasis mt-n5 mb-4">
              Seu afiliado receberá {{ valorComissao.toFixed(2) }} reais
            </p>
            Escolha a quantidade de afiliados
            <v-slider
              v-model="slider3"
              :thumb-size="36"
              color="primary"
              min="1"
              max="100"
              step="1"
              thumb-label="always"
            ></v-slider>
          </v-col>
          <v-col cols="6">
            <v-btn
              color="primary"
              class="text-capitalize"
              min-height="40"
              block
              @click="salvarConfiguracoes"
              >SALVAR</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              color="primary"
              class="text-capitalize"
              min-height="40"
              href="https://youtube.com/"
              >COMO FUNCIONA?</v-btn
            ></v-col
          >
        </v-row>
      </v-form>
      <v-snackbar
        v-model="snackbarAfiliados"
        :color="snackbarAfiliadosColor"
        centered
        rounded="pill"
        dark
        timeout="3000"
      >
        {{ snackbarAfiliadosText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text x-small v-bind="attrs" @click="snackbarAfiliados = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template></v-snackbar
      >
    </v-container>

    <v-dialog v-model="comoFuncionaDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Sistema de afiliados</v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="comoFuncionaDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formularioAtivo: false,
      valorAssinatura: null,
      snackbarAfiliadosText: "",
      snackbarAfiliados: false,
      affiliate: null,
      porcentagemComissao: null,
      snackbarAfiliadosColor: null,
      valorComissao: 0,
      slider3: null,
      comoFuncionaDialog: false,
    };
  },
  computed: {
    switchplaceholder() {
      return this.formularioAtivo ? "Afiliação ativada" : "Afiliação desativada";
    },
  },
  methods: {
    async fetchData() {
      const userData = await userService.fetchUserData();

      if (userData) {
        this.affiliate = userData.affiliate;
        if (this.affiliate.length !== 0) {
          this.formularioAtivo = true;
          this.porcentagemComissao = this.affiliate.Commission;
          this.valorAssinatura = this.affiliate.productValue;
        }
      }
    },
    async salvarConfiguracoes() {
      try {
        if (this.formularioAtivo) {
          await affiliateService.setAffiliateLimit(this.slider3);
          console.log("Limite de afiliado definido com sucesso!");

          await affiliateService.setMyAffiliateCommission(this.porcentagemComissao);
          console.log("Comissão de afiliado atualizada com sucesso!");

          await affiliateService.setAffiliateProductValue(this.valorAssinatura);
          console.log("Valor do produto afiliado atualizado com sucesso!");
        }

        console.log("Configurações salvas com sucesso!");
        this.snackbarAfiliados = true;
        this.snackbarAfiliadosColor = "success";
        this.snackbarAfiliadosText = "Afiliados ativo e configurado com sucesso!";
      } catch (error) {
        console.error("Erro ao salvar configurações:", error);
      }
    },

    calcularComissao() {
      this.valorComissao = (this.porcentagemComissao / 100) * this.valorAssinatura;
    },
  },
};
</script>
