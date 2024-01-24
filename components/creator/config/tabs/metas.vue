<template>
  <v-container>
    <h2>Adicione uma meta</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Crie objetivos para impulsionar sua identidade.
    </p>
    <v-card color="background" flat class="elevation-0 mt-2" rounded="xl">
      <v-card-text>
        <v-text-field
          placeholder="Qual sua meta?"
          bg-color="input_color"
          color="primary"
          prepend-inner-icon="mdi-target"
          v-model="name"
        ></v-text-field>
        <v-text-field
          placeholder="Quanto você precisa?"
          prepend-inner-icon="mdi-currency-usd"
          color="primary"
          bg-color="input_color"
          v-model="amount"
        ></v-text-field>
        <v-btn color="primary" min-height="40" class="text-capitalize" block @click="saveData"
          >Salvar</v-btn
        >
      </v-card-text>
    </v-card>

    <v-divider class="mt-5"></v-divider>

    <!--  <div>
      <v-list dark rounded>
        <v-list-item class="mb-5">
          <v-list-item-content>
            <v-list-item-title>
              <strong class="primary">Meta:</strong> nome
            </v-list-item-title>
            <v-list-item-subtitle>
              <strong>Valor:</strong> valor
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn color="primary" x-small variant="outlined" class="mb-4 mt-2" :disabled="true">
                {{ metaItem.amount === metaItem.collected ? "Concluído" : "Em andamento" }}
                <v-icon size="12" color="primary" v-if="metaItem.amount === metaItem.collected"
                  >mdi-check</v-icon
                >
              </v-btn>
            </v-list-item-subtitle>
            <v-progress-linear
              v-model="progress"
              class="rounded-xl"
              color="primary"
              :buffer-value="calculateProgress(metaItem.collected, metaItem.amount)"
              stream
            ></v-progress-linear>
            <strong class="mt-2 mb-n1 text-center caption grey--text">Recebidos/Meta</strong>
            <strong class="text-center caption grey--text">
              <b class="primary">R$ {{ metaItem.collected }}</b> / R$
              {{ metaItem.amount }}
            </strong>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon @click="showDeleteDialog(metaItem.id)" class="mdi mdi-delete"></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

    </div> -->
  </v-container>
</template>
<script setup>
import { ref } from "vue";

// Estado reativo
const name = ref("");
const amount = ref("");
const collected = ref(0);

const calculateProgress = (collected, amount) => {
  return (collected / amount) * 100;
};

const saveData = async () => {
  const cookie = useCookie("token");
  const token = cookie.value;

  const payload = {
    name: name.value,
    amount: Number(amount.value),
    collected: collected.value,
  };

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
      console.log("Meta criada com sucesso:", responseData);
    } else {
      console.error("Erro ao criar meta:", response.statusText);
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const showDeleteDialog = (metaId) => {};
</script>
