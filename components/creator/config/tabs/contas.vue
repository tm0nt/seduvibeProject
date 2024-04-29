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
            v-model="banks[0]"
            color="primary"
            bg-color="input_color"
            label="Banco"
            class="mt-n2"
            variant="solo"
            :items="banks"
            prepend-inner-icon="mdi-bank"
          ></v-select>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="agency"
            label="Agência"
            type="number"
            hide-spin-buttons
            bg-color="input_color"
            prepend-inner-icon="mdi-bank-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            bg-color="input_color"
            v-model="conta_number"
            type="number"
            hide-spin-buttons
            label="Conta"
            prepend-inner-icon="mdi-credit-card"
          ></v-text-field>
        </v-col>
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
      variant="outlined"
      append-icon="mdi-delete"
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
    <v-alert v-else variant="tonal" type="info" color="primary" class="rounded-xl mt-5">
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
          <v-row class="ma-2">
            <v-col cols="6">
              <v-btn
                color="primary"
                min-height="40"
                block
                variant="elevated"
                @click="deleteAccount"
                class="text-capitalize"
                >Sim</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                @click="deleteDialog = false"
                min-height="40"
                block
                variant="tonal"
                color="primary"
                class="text-capitalize"
                >Não</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

const banks = ref([]);

const toggleCampos = () => {
  mostrarCampos.value = !mostrarCampos.value;
};

const openDeleteDialog = () => {
  deleteDialog.value = true;
};

const deleteAccount = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/delete_banking_account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    infoMessage.value.text = "Conta deletada com sucesso!";
    infoMessage.value.v = true;
    infoMessage.value.color = "success";
    fetchData();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  } finally {
    deleteDialog.value = false;
  }
};

const infoMessage = ref({
  v: false,
  text: null,
  color: null,
});

const registrarConta = async () => {
  const payload = {
    name_account: name_account.value,
    bank_name: banks.value[0],
    agency_account: agency.value,
    number_account: conta_number.value,
  };

  try {
    if (!name_account.value || !agency.value || !conta_number.value) {
      infoMessage.value.text = "Preencha todos os campos";
      infoMessage.value.v = true;
      infoMessage.value.color = "red";
      return;
    }
    const data = await $fetch("https://api.seduvibe.com/register_banking_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (data) {
      infoMessage.value.text = "Conta cadastrada com sucesso!";
      infoMessage.value.v = true;
      infoMessage.value.color = "success";
      fetchData();
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
const fetchData = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/get_banking_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    contas.value = data?.bankingData;
    console.log(contas);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const downloadBanking = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/show-bank", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    banks.value = data.banks.map(({ code, bank }) => {
      const formattedCode =
        code !== null && code !== undefined ? code.toString().padStart(3, "0") : "";
      return `${formattedCode} - ${bank}`;
    });
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

onMounted(fetchData);
downloadBanking();
</script>
