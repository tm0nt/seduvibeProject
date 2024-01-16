<template>
  <v-container>
    <h2>Minhas contas</h2>
    <p class="text-caption text-medium-emphasis">Adicione contas bancárias à sua conta</p>
    <v-btn block @click="adicionarConta" color="primary">
      <v-icon v-if="!mostrarCampos">mdi-plus</v-icon>
      <v-icon v-else>mdi-minus</v-icon>
    </v-btn>
    <v-divider color="white"></v-divider>
    <v-form>
      <v-row v-if="mostrarCampos" class="mt-5">
        <v-col cols="12">
          <v-text-field
            v-model="name_account"
            placeholder="Titularidade"
            color="primary"
            bg-color="input_color"
            prepend-inner-icon="mdi-account"
          ></v-text-field>
          <v-select
            v-model="bank_name"
            placeholder="Banco"
            color="primary"
            bg-color="input_color"
            class="mt-n2"
            variant="solo"
            :items="banks"
            prepend-inner-icon="mdi-bank"
          ></v-select>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            placeholder="Agência"
            bg-color="input_color"
            prepend-inner-icon="mdi-bank-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            placeholder="Conta"
            bg-color="input_color"
            prepend-inner-icon="mdi-credit-card"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            @click="registrarConta"
            class="text-capitalize"
            block
            color="primary"
            min-height="40"
          >
            Registrar
          </v-btn>
          <p class="text-medium-emphasis text-caption mt-1">
            Adicione apenas contas de sua titularidade
          </p>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-container>
    <!--   <v-card
          v-for="(conta, index) in contas"
          :key="index"
          class="my-3 elevation-0"
        
          flat
        >
          <v-card-title>
            {{ conta.banco }} - {{ conta.nomeTitular }}
            <v-btn icon @click="removerConta(index)">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="caption">
            <strong>Agência:</strong> {{ conta.agencia }}<br />
            <strong>Conta:</strong> {{ conta.conta }}
          </v-card-text>
        </v-card>-->
    <v-snackbar rounded="pill" centered v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      mostrarCampos: false,
      name_account: "",
      snackbar: false,
      bank_name: null,
      snackbarColor: "",
      snackbarText: "",
      number_account: "",
      agency_account: "",
      banks: ["Banco A", "Banco B", "Banco C"],
    };
  },
  methods: {
    async fetchData() {},
    adicionarConta() {
      this.mostrarCampos = !this.mostrarCampos;
    },
    async registrarConta() {
      try {
        await userService.registerBank(
          this.name_account,
          this.bank_name,
          this.number_account,
          this.agency_account
        );
        this.snackbar = true;
        this.snackbarColor = "success";
        this.snackbarText = "Conta adicionada com sucesso!";
        this.fetchData();
      } catch (error) {
        console.log(error);
        this.snackbar = true;
        this.snackbarColor = "red";
        this.snackbarText = "Aconteceu algum erro!";
      }
    },
    removerConta(index) {
      this.contas.splice(index, 1);
    },
  },
};
</script>
