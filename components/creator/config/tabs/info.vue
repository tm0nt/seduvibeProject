<template>
  <v-container>
    <h2>Informações</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Aqui estão suas informações para faturamento
    </p>
    <v-form @submit.prevent="salvarAlteracoes">
      <v-row>
        <v-col cols="12" class="mt-2">
          <v-text-field
            v-model="nomeCompleto"
            placeholder="Nome"
            bg-color="input_color"
            color="primary"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="mt-n8">
          <v-text-field
            v-model="cpf"
            placeholder="CPF"
            color="primary"
            required
            bg-color="input_color"
            maxlength="14"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="telefone"
            bg-color="input_color"
            placeholder="Celular"
            maxlength="12"
            required
            color="primary"
            prepend-inner-icon="mdi-cellphone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="dataNascimento"
            placeholder="Nascimento"
            color="primary"
            required
            prepend-inner-icon="mdi-calendar-blank-outline"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="endereco"
            placeholder="Endereço"
            bg-color="input_color"
            required
            color="primary"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="cep"
            bg-color="input_color"
            placeholder="CEP"
            color="primary"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-n6 mb-2">
          <v-alert outlined class="rounded-xl" v-if="!validarIdade()" type="error" color="red"
            >É necessário ter mais de 18 anos.</v-alert
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            min-height="40"
            type="submit"
            class="text-capitalize"
            color="primary"
            @click="salvarAlteracoes"
            >Salvar</v-btn
          > </v-col
        ><v-col cols="6">
          <v-btn
            min-height="40"
            block
            color="primary"
            class="text-capitalize"
            variant="outlined"
            @click="deletarConta"
            >Deletar conta</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-dialog width="400" v-model="deleterContaDialog" class="mt-n5">
      <v-card dark>
        <v-card-title class="primary--text">Quer realmente deletar sua conta?</v-card-title>
        <v-card-actions
          ><v-btn text color="primary">SIM</v-btn
          ><v-btn text color="primary" @click="deleterContaDialogClose">NÃO</v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
    <v-snackbar
      rounded="pill"
      centered
      v-model="InfoViewSnack"
      :color="InfoViewColorSnack"
      timeout="3000"
      >{{ InfoViewText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text x-small v-bind="attrs" @click="InfoViewSnack = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template></v-snackbar
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      InfoViewSnack: false,
      InfoViewColorSnack: null,
      InfoViewText: null,
      nomeCompleto: "",
      dataNascimento: "",
      cpf: "",
      endereco: "",
      deleterContaDialog: false,
      cep: "",
      generoOptions: ["Homem", "female"],
      telefone: "",
    };
  },
  methods: {
    deleterContaDialogClose() {
      this.deleterContaDialog = false;
    },
    deletarConta() {
      this.deleterContaDialog = true;
    },
    async salvarAlteracoes() {
      try {
        const url = "https://api.seduvibe.com/change_personal_data";
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const updatedData = {
          cep: this.cep,
          street: this.endereco,
          phone: this.telefone,
          genero: this.genero,
          cpf: this.cpf,
        };

        const response = await axios.post(url, updatedData, config);

        if (response.status === 200) {
          this.cep = updatedData.cep;
          this.endereco = updatedData.endereco;
          this.telefone = updatedData.telefone;
          this.cpf = updatedData.cpf;
          this.genero = updatedData.genero;
          this.InfoViewSnack = true;
          this.InfoViewColorSnack = "success";
          this.InfoViewText = "Informações cadastradas com sucesso!";
        } else {
          // Tratamento de erros
        }
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
      }
    },
    validarIdade() {
      if (!this.dataNascimento) {
        return false;
      }

      const partesData = this.dataNascimento.split("/");
      const dataCompleta = new Date(partesData[2], partesData[1] - 1, partesData[0]);
      const hoje = new Date();
      let idadeCalculada = hoje.getFullYear() - dataCompleta.getFullYear();
      const mes = hoje.getMonth() - dataCompleta.getMonth();

      if (mes < 0 || (mes === 0 && hoje.getDate() < dataCompleta.getDate())) {
        idadeCalculada--;
      }

      return idadeCalculada >= 18;
    },
  },
};
</script>
<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
