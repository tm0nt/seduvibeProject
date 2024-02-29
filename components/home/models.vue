<template>
  <p class="text-caption mt-5 text-center text-medium-emphasis">Escolha tribos específicas</p>
  <v-row>
    <v-col cols="12" class="mt-1 mb-5 d-flex align-center justify-center">
      <v-chip-group filter>
        <v-chip @click="getData" color="primary"> Todos </v-chip>
        <v-chip
          v-for="tribo in tribes"
          :key="tribo.id"
          @click="updateFilter([tribo.id])"
          :color="tribo.isSelected ? 'primary' : undefined"
        >
          {{ tribo.name }}
        </v-chip>
      </v-chip-group>
    </v-col>
    <template v-if="seduvibe.length === 0">
      <v-col>
        <p class="text-caption mt-5 text-medium-emphasis text-center">Nenhum criador encontrado!</p>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12" sm="4" md="4" lg="4" v-for="user in seduvibe" :key="user.id">
        <NuxtLink :to="'/@' + user.user">
          <v-card class="mx-auto mt-n5 my-5 rounded-xl elevation-6" width="250" color="background">
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
        </NuxtLink>
      </v-col>
    </template>
  </v-row>
</template>
<script setup>
import { ref, onMounted } from "vue";

const tribes = ref([]);
const seduvibe = ref([]);
const selectedTribeIds = ref([]);

const getData = async () => {
  try {
    const creators = await $fetch("https://api.seduvibe.com/find_creator");
    seduvibe.value = creators.users || [];
    console.log(creators._rawValue);

    const tribesData = await $fetch("https://api.seduvibe.com/list_tribos");
    tribes.value = tribesData.tribos || [];

    selectedTribeIds.value = tribes.value.map((tribe) => tribe.id);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
};

const updateFilter = (ids) => {
  tribes.value.forEach((tribo) => {
    tribo.isSelected = ids.includes(tribo.id);
  });

  filterUsers(ids);
};

const filterUsers = async (ids) => {
  try {
    const url =
      ids.length === 0
        ? "https://api.seduvibe.com/find_creator"
        : "https://api.seduvibe.com/filter";
    const filteredUsers = await $fetch(url, {
      method: "POST",
      body: JSON.stringify({ tribeIds: ids }),
      headers: { "Content-Type": "application/json" },
    });

    seduvibe.value = filteredUsers?.users || [];
  } catch (error) {
    console.error("Erro ao filtrar os usuários:", error);
  }
};

getData();
</script>
