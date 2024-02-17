<template>
  <v-app>
    <v-bottom-navigation v-model="value" color="primary" horizontal flat class="elevation-0">
      <v-card class="mx-auto rounded-xl" color="input_color">
        <v-btn class="mt-n2">
            <v-img src="https://i.imgur.com/SDXaHjn.png" width="40"></v-img>
        </v-btn>
        <v-btn class="mt-n1 text-capitalize"> Sobre </v-btn>

        <v-btn class="mt-n1 text-capitalize"> Recursos </v-btn>

        <v-btn class="mt-n1 text-capitalize"> Planos </v-btn>
        <v-btn class="mt-n1 text-capitalize"> Suporte </v-btn>
      </v-card>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup></script>
