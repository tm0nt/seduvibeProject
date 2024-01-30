<template>
  <v-container>
    <h2>Adicione uma meta</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Crie objetivos para impulsionar sua identidade.
    </p>
    <v-text-field
      class="mt-5"
      placeholder="Qual sua meta?"
      bg-color="input_color"
      color="primary"
      prepend-inner-icon="mdi-target"
      v-model="name"
    ></v-text-field>
    <v-text-field
      placeholder="Quanto você precisa?"
      prepend-inner-icon="mdi-coin"
      color="primary"
      class="mt-n2"
      bg-color="input_color"
      v-model="amount"
    ></v-text-field>
    <v-btn color="primary" min-height="40" class="text-capitalize" block @click="saveData"
      >Salvar</v-btn
    >

    <v-chip-group v-model="selectedFilter" class="mt-4">
      <v-chip filter color="primary" value="all">Tudo</v-chip>
      <v-chip filter color="primary" value="pending">Aguardando</v-chip>
      <v-chip filter color="primary" value="completed">Concluído</v-chip>
    </v-chip-group>

    <v-col v-if="metaList.length > 0" class="mt-4">
      <v-card
        v-for="metaItem in metaList"
        :key="metaItem.id"
        class="mx-auto rounded-xl elevation-4 mb-2"
        flat
        color="background"
        :title="metaItem?.name"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-bullseye-arrow</v-icon>
        </template>
        <template v-slot:subtitle>
          {{ formatarMoeda(metaItem?.amount) }}
        </template>
        <template v-slot:append>
          <v-icon>
            {{ isMetaCompleted(metaItem) ? "mdi-check" : "mdi-clock-outline" }}
          </v-icon>
        </template>
        <v-card-text>
          <p class="text-caption text-medium-emphasis">
            <v-icon class="ma-1">mdi-calendar</v-icon>Criado em 20/06/2023
          </p>
          <v-progress-linear
            v-model="progress"
            class="rounded-xl mt-2"
            height="12"
            stream
            color="primary"
            :buffer-value="calculateProgress(metaItem?.collected, metaItem?.amount)"
          ></v-progress-linear>

          <p class="mt-2 mb-n1 text-center text-caption">Recebidos/Meta</p>
          <p class="text-center text-caption">
            <b class="primary"> {{ formatarMoeda(metaItem?.collected) }}</b> /
            {{ formatarMoeda(metaItem?.amount) }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-alert v-else variant="outlined" type="info" color="primary" class="rounded-xl mt-5">
      Nenhuma meta encontrada.
    </v-alert>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
    <v-dialog v-model="deleteDialog" width="600" persistent>
      <v-card
        class="rounded-xl elevation-0"
        flat
        prepend-icon="mdi-delete"
        title="Confirmação"
        subtitle="Você deseja deletar sua conta bancária?"
      >
        <v-card-actions>
          <v-btn color="primary" @click="deleteAccount">SIM</v-btn>
          <v-btn @click="deleteDialog = false">NÃO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const deleteDialog = ref(false);
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

const name = ref("");
const amount = ref("");
const metaList = ref([]);
const progress = ref(0);
const selectedFilter = ref("all");

const isMetaCompleted = (metaItem) => {
  return metaItem.collected === metaItem.amount;
};

const calculateProgress = (collected, amount) => {
  return (collected / amount) * 100;
};

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const saveData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  const payload = {
    name: name.value,
    amount: Number(amount.value),
    collected: 0,
  };

  if (!payload.name || isNaN(payload.amount)) {
    showSnackbar("Por favor, preencha todos os campos corretamente.", "error");
    return;
  }

  try {
    const response = await fetch("https://api.seduvibe.com/create_objective", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = await response.json();
      updateMetaList(responseData._rawValue.objectives);
      showSnackbar("Meta criada com sucesso!", "success");
    } else {
      console.error("Erro ao criar meta:", response.statusText);
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const fetchMetaData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  try {
    const { data: metaData } = await useFetch("https://api.seduvibe.com/list_objectives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    metaList.value = metaData._rawValue.objectives.reverse();
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

onMounted(fetchMetaData);
</script>
