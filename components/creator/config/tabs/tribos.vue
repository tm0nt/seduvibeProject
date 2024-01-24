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
    ></v-combobox>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
</script>
