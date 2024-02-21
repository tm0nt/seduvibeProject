<template>
  <div>
 <!--- <apexchart
      :key="series"
      height="200"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart>-->
    <v-progress-circular class="mx-auto d-flex align-center justify-center mt-4" color="primary" size="small" indeterminate></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const options = ref({
  chart: {
    type: "area",
  },
  theme: {
    mode: "light",
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
  },
  plotOptions: {
    bar: {
      borderRadius: 15,
      borderRadiusApplication: "around",
    },
  },
  colors: ["#A020F0"],

  noData: {
    text: "Nenhum dado para exibir",
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: "14px",
      fontFamily: undefined,
    },
  },
  subtitle: {
    text: undefined,
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: undefined,
      color: "#9699a2",
    },
  },
  tooltip: {
    style: {
      fontSize: "14px",
    },
    theme: true,
    fillSeriesColor: true,
  },
});

const series = ref([
  {
    name: "Vendas",
    data: [],
  },
]);

const updateChart = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // Gerar array de números aleatórios com comprimento igual aos dias passados no mês atual
  const data = Array.from({ length: today.getDate() }, () => Math.floor(Math.random() * 100));

  options.value = {
    ...options.value,
    xaxis: {
      categories: Array.from({ length: today.getDate() }, (_, i) => `${i + 1}`),
    },
  };

  series.value = [
    {
      name: "Score",
      data: data,
    },
  ];
};

onMounted(() => {
  updateChart();
});
</script>
