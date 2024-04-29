<template>
  <v-container>
    <h2>Pagamento direto</h2>
    <p class="text-caption text-medium-emphasis mt-n2">
      Para receber pagamentos personalizados compartilhe seu link.
    </p>
    <v-text-field
      class="mt-4"
      v-model="directLink"
      variant="solo"
      bg-color="input_color"
      color="primary"
      @click="copyToClipboard"
      readonly
    >
      <template v-slot:append-inner>
        <v-icon @click="copyToClipboard">mdi-content-copy</v-icon>
      </template>
    </v-text-field>
    <v-alert
      closable
      v-model="infoMessage.v"
      class="rounded-xl"
      type="info"
      variant="tonal"
      :color="infoMessage.color"
    >
      <template v-slot:title>
        <p class="text-caption">{{ infoMessage.text }}</p>
      </template>
    </v-alert>
  </v-container>
</template>
<script setup>
import { useIdStore } from "~/store/id";

const idStore = useIdStore();
const infoMessage = ref({
  v: false,
  text: null,
  color: null,
});
const user = idStore.user;
const directLink = ref(`https://seduvibe.com/direct/${user}`);

const copyToClipboard = () => {
  navigator.clipboard.writeText(directLink.value);
  infoMessage.value.text = "Copiado com sucesso";
  infoMessage.value.v = true;
  infoMessage.value.color = "success";
};
</script>
