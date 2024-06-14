<template>
  <div>
    <highchart class="mt-2" :options="computedChartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Defina as props que o componente aceitará
const props = defineProps({
  title: String,
  xCategories: Array,
  yTitle: String,
  seriesData: Array,
  seriesName: String,
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  lineColor: {
    type: String,
    default: '#A020F0'
  },
  labelColor: {
    type: String,
    default: '#c1c1c1'
  }
});

// Computar as opções do gráfico com base nas props
const computedChartOptions = computed(() => ({
  chart: {
    type: "spline",
    backgroundColor: props.backgroundColor,
  },
  title: {
    text: props.title,
  },
  lang: {
        noData: 'Nenhum dado para exibir'
    },
    noData: {
        style: {
            fontWeight: 'bold',
            fontSize: '10px',
            color: '#303030'
        }
    },
  xAxis: {
    categories: props.xCategories,
    labels: {
      style: {
        color: props.labelColor
      }
    }
  },
  yAxis: {
    title: {
      text: props.yTitle,
    },
    gridLineWidth: 0,
    visible: false,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 3,
        enable: false,
      },
    },
    line: {
      dataLabels: {
        enabled: true,
      },
      enableMouseTracking: true,
      color: props.lineColor,
    },
    pie: {
      borderWidth: 0,
    },
  },
  legend: {
    itemStyle: {
      color: props.lineColor,
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    formatter: function () {
      return `<b>${this.series.name}</b><br>${this.x}: ${this.y}`;
    },
  },
  dataLabels: {
    style: {
      color: "#f0f0f0",
    },
  },
  series: [
    {
      name: props.seriesName,
      data: props.seriesData,
      color: props.lineColor,
    },
  ],
}));
</script>
