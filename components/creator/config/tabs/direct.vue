<template>
  <v-container>
    <h2>Pagamento direto</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Para receber pagamentos personalizados compartilhe seu link.</p>
    <v-text-field
    class="mt-4"
      v-model="directLink"
      variant="solo"
      bg-color="input_color"
      color="primary"
      @click="copyToClipboard"
      readonly
      prepend-inner-icon="mdi-infinity"
    >
      <template v-slot:append-inner>
        <v-icon @click="copyToClipboard">mdi-content-copy</v-icon>
      </template>
    </v-text-field>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>
<script setup>
import { useIdStore } from "~/store/id";

const idStore = useIdStore();

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
    timeout: 4000,
  };
};

const user = idStore.user;
const directLink = ref(`https://seduvibe.com/direct/${user}`);

const copyToClipboard = () => {
  navigator.clipboard.writeText(directLink.value);
  showSnackbar("Link copiado com sucesso!", "success");
};
</script>
