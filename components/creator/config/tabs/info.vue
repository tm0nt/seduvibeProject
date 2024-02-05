<template>
  <v-container>
    <h2>Informações</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Aqui estão suas informações para faturamento
    </p>
    <v-form @submit.prevent="submitForm" class="mt-5">
      <v-row>
        <v-col cols="12" class="mt-2">
          <v-text-field
            v-model="info.nomeCompleto"
            placeholder="Nome"
            bg-color="input_color"
            color="primary"
            label="Seu nome"
            disabled
            required
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="mt-n8">
          <v-text-field
            v-model="info.cpf"
            placeholder="CPF"
            color="primary"
            label="CPF"
            type="number"
              hide-spin-buttons
            required
            bg-color="input_color"
            prepend-inner-icon="mdi-card-account-details"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.phone"
            bg-color="input_color"
            placeholder="Celular"
            maxlength="12"
            type="number"
              hide-spin-buttons
            required
            label="Celular"
            color="primary"
            prepend-inner-icon="mdi-cellphone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.dataNascimento"
            placeholder="Nascimento"
            label="Nascimento"
            type="date"
              hide-spin-buttons
            color="primary"
            required
            prepend-inner-icon="mdi-calendar-blank-outline"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.endereco"
            placeholder="Endereço"
            label="Endereço"
            bg-color="input_color"
            required
            color="primary"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.cep"
            v-maska
            data-maska="#####-###"
            bg-color="input_color"
            label="CEP"
            placeholder="CEP"
            type="number"
              hide-spin-buttons
            color="primary"
            required
            prepend-inner-icon="mdi-post"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-n6 mb-2">
          <v-alert outlined class="rounded-xl" type="error" color="red"
            >É necessário ter mais de 18 anos.</v-alert
          >
        </v-col>
        <v-col cols="6">
          <v-btn block min-height="40" type="submit" class="text-capitalize" color="primary"
            >Salvar</v-btn
          > </v-col
        ><v-col cols="6">
          <v-btn min-height="40" block color="primary" class="text-capitalize" variant="outlined"
            >Deletar conta</v-btn
          >
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
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const info = ref({
  cpf: null,
  phone: null,
  nomeCompleto: null,
  dataNascimento: null,
  endereco: null,
  cep: null,
});

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com/creator_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    info.value = {
      nomeCompleto: fetchData?._rawValue?.users[0]?.name,
      cpf: fetchData?._rawValue?.data_personal[0]?.cpf,
      phone: fetchData?._rawValue?.data_personal[0]?.phone,
      dataNascimento: fetchData?._rawValue?.data_personal[0]?.dateOfBirth,
      endereco: fetchData?._rawValue?.data_personal[0]?.street,
      cep: fetchData?._rawValue?.data_personal[0]?.cep,
    };

    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
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
const submitForm = async () => {
  try {
    const { data: saveData } = await useFetch("https://api.seduvibe.com/change_personal_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cpf: info.value.cpf,
        phone: info.value.phone,
        dateOfBirth: info.value.dataNascimento,
        street: info.value.endereco,
        cep: info.value.cep,
      }),
    });
    showSnackbar("Dados atualizados!", "success");
    console.log("Informações salvas com sucesso:", saveData);
  } catch (error) {
    console.error("Erro ao salvar informações:", error);
  }
};
</script>
