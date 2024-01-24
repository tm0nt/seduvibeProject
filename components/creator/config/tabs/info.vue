<template>
  <v-container>
    <h2>Informações</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Aqui estão suas informações para faturamento
    </p>
    <v-form @submit.prevent="">
      <v-row>
        <v-col cols="12" class="mt-2">
          <v-text-field
            v-model="info.nomeCompleto"
            placeholder="Nome"
            bg-color="input_color"
            color="primary"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="mt-n8">
          <v-text-field
            v-model="info.cpf"
            placeholder="CPF"
            color="primary"
            required
            bg-color="input_color"
            maxlength="14"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.phone"
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
            v-model="info.dataNascimento"
            placeholder="Nascimento"
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
            bg-color="input_color"
            required
            color="primary"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.cep"
            bg-color="input_color"
            placeholder="CEP"
            color="primary"
            required
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
</script>
