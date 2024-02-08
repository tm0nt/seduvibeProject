<template>
    <div>
      <v-row align="center" justify="center" class="mt-4" @click="showSnackbar">
        <v-icon size="60" color="primary">mdi-lock</v-icon>
      </v-row>
  
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" rounded="pill" top>
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const snackbar = ref({
    show: false,
    message: "Conteúdo bloqueado! Assine primeiro.",
    color: "error",
    timeout: 4000,
  });
  
  const showSnackbar = () => {
    snackbar.value.show = true;
  };
  
  </script>
  