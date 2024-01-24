<template>
  <v-container>
    <h2>Afiliação</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">Gerencie seu sistema de afiliação</p>
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="valorAssinatura"
              placeholder="Valor da sua assinatura"
              color="primary"
              prepend-inner-icon="mdi-currency-usd"
              bg-color="input_color"
              required
            ></v-text-field>
            <v-text-field
              v-model="porcentagemComissao"
              placeholder="Porcentagem por venda"
              type="number"
              prepend-inner-icon="mdi-percent-circle"
              step="0.01"
              class="mt-n2"
              color="primary"
              bg-color="input_color"
              :value="porcentagemComissao || null"
              min="0"
              max="100"
              @input="calcularComissao"
              required
            ></v-text-field>
            <p class="text-caption text-medium-emphasis mt-n5 mb-4">
              Seu afiliado receberá {{ valorComissao.toFixed(2) }} reais
            </p>
          </v-col>
          <v-col cols="6">
            <v-btn color="primary" class="text-capitalize" min-height="40" block>Salvar</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block min-height="40" class="text-capitalize" variant="outlined" color="primary"
              >Minhas métricas</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>
<script setup>
import { ref } from "vue";

const valorAssinatura = ref("");
const porcentagemComissao = ref(0);
const valorComissao = ref(0);

const calcularComissao = () => {
  valorComissao.value =
    parseFloat(valorAssinatura.value) * (parseFloat(porcentagemComissao.value) / 100);
};
</script>
