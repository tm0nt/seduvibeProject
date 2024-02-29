<template>
  <div>
    <!--  <apexchart
      :key="seriesKey"
      height="200"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart> -->
    <v-progress-circular
      class="mx-auto d-flex align-center justify-center mt-4"
      color="primary"
      size="small"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cookie = useCookie("token");
const token = cookie.value;
const analyticsFetch = ref(null);
const seriesKey = ref(0);

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    analyticsFetch.value = data.apexSeries.map((value, index) => value);

    console.log(analyticsFetch.value);
    seriesKey.value += 1;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const options = ref({
  chart: {
    type: "line",
  },
  theme: {
    mode: "light",
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
  },
  // ... (outras opções)
});

const series = ref([
  {
    name: "Vendas",
    data: [],
  },
]);

const updateChart = () => {
  options.value = {
    ...options.value,
    xaxis: {
      categories: Array.from({ length: analyticsFetch.value.length }, (_, i) => `${i + 1}`),
    },
  };

  series.value = [
    {
      name: "Vendas",
      data: analyticsFetch.value,
    },
  ];
};

onMounted(() => {
  fetchData();
});

// ...
</script>
