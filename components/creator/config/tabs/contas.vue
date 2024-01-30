<template>
  <v-container>
    <h2>Contas</h2>
    <p class="text-caption text-medium-emphasis">Adicione contas bancárias à sua conta</p>
    <v-btn block @click="toggleCampos" color="primary" class="mt-5">
      <v-icon v-if="!mostrarCampos">mdi-plus</v-icon>
      <v-icon v-else>mdi-minus</v-icon>
    </v-btn>
    <v-form>
      <v-row v-if="mostrarCampos" class="mt-5">
        <v-col cols="12">
          <v-text-field
            v-model="name_account"
            label="Titularidade"
            color="primary"
            bg-color="input_color"
            prepend-inner-icon="mdi-account"
          ></v-text-field>
          <v-select
            v-model="bank_name"
            color="primary"
            bg-color="input_color"
            label="Banco"
            class="mt-n2"
            variant="solo"
            :items="['Caixa']"
            prepend-inner-icon="mdi-bank"
          ></v-select>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="agency"
            label="Agência"
            bg-color="input_color"
            prepend-inner-icon="mdi-bank-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            bg-color="input_color"
            v-model="conta_number"
            label="Conta"
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
    <v-card
      class="mx-auto my-5 rounded-xl elevation-0"
      title="Conta principal"
      v-if="contas?.name_account !== null"
      variant="tonal"
      color="primary"
      flat
      @click="openDeleteDialog"
    >
      <template v-slot:prepend>
        <v-icon color="primary">mdi-bank</v-icon>
      </template>
      <template v-slot:subtitle> {{ contas?.bank_name }} </template>
      <v-card-text
        ><p>{{ contas?.name_account }}</p>
        <p>Agência {{ contas?.agency_account }} | Conta {{ contas?.number_account }}</p>
      </v-card-text>
    </v-card>
    <v-alert v-else variant="outlined" type="info" color="primary" class="rounded-xl mt-5">
      Nenhuma conta encontrada.
    </v-alert>
    <v-dialog v-model="deleteDialog" width="600" persistent>
      <v-card
        class="rounded-xl elevation-4"
        flat
        color="background"
        title="Confirmação"
        subtitle="Você deseja deletar sua conta bancária?"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-delete</v-icon>
        </template>
        <v-card-actions>
          <v-btn color="primary" @click="deleteAccount">SIM</v-btn>
          <v-btn @click="deleteDialog = false">NÃO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

const name_account = ref("");
const bank_name = ref("");
const agency = ref("");
const conta_number = ref("");
const mostrarCampos = ref(false);
const contas = ref([]);
const deleteDialog = ref(false);
const cookie = useCookie("token");
const token = cookie.value;

const toggleCampos = () => {
  mostrarCampos.value = !mostrarCampos.value;
};

const openDeleteDialog = () => {
  deleteDialog.value = true;
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

const deleteAccount = async () => {
  try {
    const { data: deleteConfirm, error } = await useFetch(
      "https://api.seduvibe.com/delete_banking_account",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(deleteConfirm);
    showSnackbar("Conta deletada com sucesso!", "success");
    fetchData();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  } finally {
    deleteDialog.value = false;
  }
};

const registrarConta = async () => {
  const payload = {
    name_account: name_account.value,
    bank_name: bank_name.value,
    agency_account: agency.value,
    number_account: conta_number.value,
  };

  try {
    const { data, error } = await useFetch("https://api.seduvibe.com/register_banking_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    showSnackbar("Conta cadastrada!", "success");
    fetchData();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
const fetchData = async () => {
  try {
    const { data: bankingData, error } = await useFetch(
      "https://api.seduvibe.com/get_banking_data",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    contas.value = bankingData?._rawValue?.bankingData;
    console.log(contas);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

onMounted(fetchData);
</script>
