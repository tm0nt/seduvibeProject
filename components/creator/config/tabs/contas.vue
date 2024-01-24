<template>
  <v-container>
    <h2>Minhas contas</h2>
    <p class="text-caption text-medium-emphasis">Adicione contas bancárias à sua conta</p>
    <v-btn block @click="toggleCampos" color="primary">
      <v-icon v-if="!mostrarCampos">mdi-plus</v-icon>
      <v-icon v-else>mdi-minus</v-icon>
    </v-btn>
    <v-divider></v-divider>
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
            :items="['Caixa']"
            prepend-inner-icon="mdi-bank"
          ></v-select>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            placeholder="Agência"
            v-model="agency"
            bg-color="input_color"
            prepend-inner-icon="mdi-bank-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="mt-n8">
          <v-text-field
            placeholder="Conta"
            bg-color="input_color"
            v-model="conta_number"
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
  </v-container>
</template>
<script setup>
import { ref } from "vue";

const mostrarCampos = ref(false);
const name_account = ref("");
const bank_name = ref("");
const agency = ref("");
const conta_number = ref("");

const toggleCampos = () => {
  mostrarCampos.value = !mostrarCampos.value;
};

const registrarConta = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  const payload = {
    name_account: name_account.value,
    bank_name: bank_name.value,
    agency_account: agency.value,
    number_account: conta_number.value,
  };

  try {
    const response = await fetch("https://api.seduvibe.com/register_banking_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Conta bancária registrada com sucesso!");
      // Adicione lógica adicional se necessário
    } else {
      console.error("Erro ao registrar conta bancária:", response);
      // Trate o erro de acordo com suas necessidades
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
    // Trate o erro de acordo com suas necessidades
  }
};
</script>
