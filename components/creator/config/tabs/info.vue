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
            placeholder="Data de nascimento"
            label="Data de nascimento"
            hide-spin-buttons
            color="primary"
            required
            prepend-inner-icon="mdi-calendar-blank-outline"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.city"
            placeholder="Cidade"
            label="Cidade"
            bg-color="input_color"
            required
            color="primary"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mt-n8">
          <v-text-field
            v-model="info.state"
            v-maska
            bg-color="input_color"
            label="Estado"
            placeholder="Estado"
            color="primary"
            required
            prepend-inner-icon="mdi-earth"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-n6 mb-2">
          <v-alert
            closable
            v-model="infoMessage.v"
            class="rounded-xl"
            type="info"
            variant="tonal"
            :color="infoMessage.color"
          >
            <template v-slot:title>
              <p class="text-caption">{{ infoMessage.text }}</p>
            </template>
          </v-alert>
        </v-col>
        <v-col cols="6">
          <v-btn block min-height="40" type="submit" class="text-capitalize" color="primary"
            >Salvar</v-btn
          > </v-col
        ><v-col cols="6">
          <v-btn
            min-height="40"
            @click="deleteAccountDialog = true"
            block
            color="primary"
            class="text-capitalize"
            variant="tonal"
            >Deletar conta</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-dialog v-model="deleteAccountDialog" width="600" persistent>
    <v-card
      color="background"
      rounded="xl"
      title="Deseja deletar sua conta?"
      subtitle="Não será possível recuperar os dados!!"
      prepend-icon="mdi-delete"
    >
      <v-card-actions>
        <v-row class="ma-4">
          <v-col cols="6">
            <v-btn color="primary" min-height="40" class="text-capitalize" block variant="elevated"
              >Sim</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="primary"
              min-height="40"
              class="text-capitalize"
              variant="tonal"
              @click="deleteAccountDialog = false"
              >Não</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { format } from "date-fns";

const cookie = useCookie("token");
const token = cookie.value;
const deleteAccountDialog = ref(false);

const deleteAccount = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

const infoMessage = ref({
  v: false,
  text: null,
  color: null,
});

const info = ref({
  cpf: null,
  phone: null,
  nomeCompleto: null,
  dataNascimento: null,
  city: null,
  state: null,
});
const formattedDataNascimento = (data) => {
  return format(new Date(data), "dd/MM/yyyy");
};

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
      dataNascimento: formattedDataNascimento(fetchData?._rawValue?.data_personal[0]?.dateOfBirth),
      city: fetchData?._rawValue?.data_personal[0]?.city,
      state: fetchData?._rawValue?.data_personal[0]?.state,
    };

    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
const submitForm = async () => {
  try {
    if (
      !info.value.city ||
      !info.value.state ||
      !info.value.dataNascimento ||
      !info.value.cpf ||
      !info.value.phone ||
      !info.value.nomeCompleto
    ) {
      infoMessage.value.text = "Preencha todos os campos";
      infoMessage.value.v = true;
      infoMessage.value.color = "red";
      return;
    }
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
        city: info.value.city,
        state: info.value.state,
      }),
    });
    infoMessage.value.text = "Dados atualizados";
    infoMessage.value.v = true;
    infoMessage.value.color = "success";
  } catch (error) {
    console.error("Erro ao salvar informações:", error);
  }
};
</script>
