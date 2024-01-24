<template>
  <v-row>
    <v-col cols="12" class="mt-5 mb-5 d-flex align-center justify-center">
      <v-btn @click="openSidebarFilter()" color="primary" class="text-capitalize">
        Filtros
        <v-icon class="ma-1">mdi-filter</v-icon>
      </v-btn>
    </v-col>
    <template v-if="seduvibe.length === 0">
      <v-col>
        <p class="text-caption mt-5 text-medium-emphasis text-center">
          Não existe nenhum(a) criador(a) cadastrado!
        </p>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="user in seduvibe" :key="user.id">
        <v-card class="mx-auto mt-n5 my-5 rounded-xl" width="250" color="input_color" @click="">
          <v-img width="300" height="150" cover :src="user.coverPicture"></v-img>
          <div class="d-flex align-center justify-center" style="height: 100%">
            <v-avatar class="elevation-8" size="100" style="position: absolute">
              <v-img :src="user.profilePicture" cover></v-img>
            </v-avatar>
          </div>
          <v-card-text>
            <v-card-title class="text-subtitle-1 text-center mt-8">
              {{ user.name }}
              <v-icon color="purple">mdi-check-decagram</v-icon>
            </v-card-title>
            <v-card-title class="text-center mt-n7 text-caption font-italic text-medium-emphasis">
              @{{ user.user }}
            </v-card-title>
            <v-card-title class="text-center text-caption text-medium-emphasis mt-n6">
              {{ user.bio === null ? "." : user.bio }}
            </v-card-title>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
    <v-btn
      v-if="showLoadMoreButton && seduvibe.length > currentPage * itemsPerPage"
      dark
      color="purple"
      small
      :disabled="isLoading"
      block
      @click="loadMoreItems"
    >
      {{ isLoading ? "Procurando..." : "Ver Mais" }}</v-btn
    >
    <v-navigation-drawer
      v-model="openSidebarRight"
      right
      class="elevation-2"
      color="input_color"
      temporary
      app
    >
      <v-container>
        <p class="mt-5 mb-5 text-overline">TRIBOS</p>
        <v-checkbox
          v-for="filtro in listaFiltros"
          :key="filtro.id"
          class="mt-n5 mt-5"
          v-model="filtro.selected"
          :label="filtro.name"
          color="purple"
          dark
        ></v-checkbox>
      </v-container>
    </v-navigation-drawer>
  </v-row>
</template>
<script setup>
import { ref, onMounted } from "vue";

const seduvibe = ref([]);

onMounted(async () => {
  try {
    const { data: creators } = await useFetch("https://api.seduvibe.com/find_creator");
    seduvibe.value = creators?._rawValue.users || [];
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
});
</script>
