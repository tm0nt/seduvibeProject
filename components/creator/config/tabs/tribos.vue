<template>
  <v-container>
    <h2>Minhas tribos</h2>
    <p class="text-caption text-medium-emphasis mt-n2">
      Adicione tribos para ajudar seu público-alvo a te encontrar
    </p>
    <v-row>
      <v-col class="mt-5" v-if="availableTribos.length > 0">
        <v-chip-group color="primary">
          <v-chip v-for="tribos in availableTribos" :key="tribos.id" @click="addTribos(tribos.id)">
            {{ tribos.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col v-else>
        <p class="text-caption text-center mt-5">Você já possui todas as tribos</p>
      </v-col>
      <v-divider></v-divider>

      <v-col v-if="tribosMy.length > 0">
        <p class="text-caption text-center">Suas tribos</p>
        <v-chip color="primary" class="ma-2" v-for="tribos in tribosMy" :key="tribos.id">
          {{ tribos.name }}
          <template v-slot:append>
            <v-icon class="ml-1" size="small" @click="removeTribos(tribos.id)">mdi-close</v-icon>
          </template>
        </v-chip>
      </v-col>

      <v-col v-else>
        <p class="text-caption text-center">Você ainda não tem tribos selecionadas.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const availableTribos = computed(() => {
  return listTribos.value.filter(
    (tribo) => !tribosMy.value.some((myTribo) => myTribo.id === tribo.id)
  );
});
const cookie = useCookie("token");
const token = cookie.value;
const listTribos = ref([]);
const tribosMy = ref([]);

onMounted(async () => {
  await listTribosAvaliables();
  await listMyTribes();
});

const addTribos = async (addedTribosIds) => {
  try {
    const { data, error } = await useFetch("https://api.seduvibe.com.br/choose_tribos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tribeIds: [addedTribosIds] }),
    });
    listMyTribes();
    console.log("Resposta da requisição:", data);
    console.log("Erro da requisição:", error);

    console.log("Tribos adicionadas com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar tribos:", error);
  }
};

const listTribosAvaliables = async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com.br/list_tribos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    listTribos.value = fetchData?._rawValue?.tribos || [];
  } catch (error) {
    console.error("Erro ao obter tribos:", error);
  }
};

const listMyTribes = async () => {
  try {
    const { data } = await useFetch("https://api.seduvibe.com.br/list_user_tribos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    tribosMy.value = data.value.tribos;

    console.log("Tribos do usuário:", tribosMy.value);
  } catch (error) {
    console.error("Erro ao obter tribos:", error);
  }
};

const tribosNames = computed(() => listTribos.value.map((tribo) => tribo.name));

const removeTribos = async (triboId) => {
  try {
    const { data } = await useFetch(`https://api.seduvibe.com.br/delete_user_tribos/${triboId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    listMyTribes();
    console.log("Tribos removidas com sucesso!");
  } catch (error) {
    console.error("Erro ao remover tribos:", error);
  }
};
</script>
