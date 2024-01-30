<template>
  <v-container>
    <h2>Minhas tribos</h2>
    <p class="text-caption text-medium-emphasis mt-n2">
      Adicione tribos para ajudar seu público-alvo a te encontrar
    </p>
    <v-combobox
      class="mt-5"
      color="primary"
      item-color="primary"
      selected="primary"
      chips
      multiple
      clearable
      placeholder="Adicione tribos"
      v-model="tribosMy"
      rounded="xl"
      variant="solo"
      prepend-inner-icon="mdi-flag"
      bg-color="input_color"
      :items="tribosNames"
      @update:modelValue="handleTribosChange"
    ></v-combobox>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const cookie = useCookie("token");
const token = cookie.value;
const listTribos = ref([]);
const tribosMy = ref([]);

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com/list_tribos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    listTribos.value = fetchData?._rawValue?.tribos || [];
    console.log(fetchData);
  } catch (error) {
    console.error(error);
  }
});

const tribosNames = computed(() => listTribos.value.map((tribo) => tribo.name));

const handleTribosChange = async () => {
  const addedTribos = tribosMy.value.filter(
    (tribo) => !listTribos.value.find((t) => t.name === tribo)
  );
  const removedTribos = listTribos.value
    .filter((tribo) => !tribosMy.value.includes(tribo.name))
    .map((tribo) => tribo.id);

  if (addedTribos.length > 0) {
    await addTribos(addedTribos);
  }

  if (removedTribos.length > 0) {
    await removeTribos(removedTribos);
  }
};

const addTribos = async (addedTribos) => {
  try {
    await useFetch("https://api.seduvibe.com/choose_tribos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tribeIds: addedTribos.map((tribo) => tribo.id) }),
    });
    console.log("Tribos adicionadas com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar tribos:", error);
  }
};

const removeTribos = async (removedTribos) => {
  try {
    await Promise.all(
      removedTribos.map(async (triboId) => {
        await useFetch(`https://api.seduvibe.com/delete_user_tribos/${triboId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
    console.log("Tribos removidas com sucesso!");
  } catch (error) {
    console.error("Erro ao remover tribos:", error);
  }
};
</script>
