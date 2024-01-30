<template>
  <v-container fluid>
    <h2>Faça uma pesquisa</h2>
    <p class="mt-n2 text-caption text-medium-emphasis">Procure pelos seus criadores</p>
    <v-text-field
      v-model="searchText"
      placeholder="Digite algo"
      @input="searchUsers"
      class="mt-5 elevation-0"
      bg-color="input_color"
    >
      <template v-slot:append-inner>
        <v-icon>mdi-magnify</v-icon>
      </template>
    </v-text-field>

    <v-card
      v-if="searchText?.length > 0"
      height="400"
      class="overflow-y-auto elevation-0 mt-2"
      flat
    >
      <v-row v-if="filteredUsers.length > 0">
        <v-col v-for="user in filteredUsers" :key="user.id" cols="12">
          <v-card class="elevation-0 transparent" flat>
            <router-link :to="{ path: `/@${user.user}` }" style="text-decoration: none">
              <v-row align="center" justify="center">
                <v-col cols="1" class="mr-2">
                  <v-avatar :size="40">
                    <v-img
                      :src="user.profilePicture"
                      cover
                      alt="Seduvibe A Melhor Plataforma de Distribuição"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="9">
                  <v-card-title class="text-primary">{{ user.name }}</v-card-title>
                  <v-card-subtitle class="text-caption mt-n4">@{{ user.user }}</v-card-subtitle>
                </v-col>
              </v-row>
            </router-link>
            <v-divider class="text-medium-emphasis mt-4"></v-divider>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else-if="users.length > 0">
        <v-col>
          <p class="text-caption text-medium-emphasis text-center">Nenhum resultado encontrado.</p>
        </v-col>
      </v-row>
    </v-card>

    <v-row v-else>
      <v-col>
        <v-card v-if="searchText?.length === 0" class="mb-3 elevation-0 rounded-xl" flat>
          <v-card-text class="text-caption font-weight-light text-center">
            <v-progress-circular color="primary" indeterminate :size="16"></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";

const searchText = ref("");
const users = ref([]);
const filteredUsers = ref([]);

const searchUsers = async () => {
  if (searchText.value.length > 0) {
    try {
      const response = await fetch(
        `https://api.seduvibe.com/find_creator?query=${searchText.value}`
      );
      const data = await response.json();
      users.value = data.users;
      console.log(users.value);
      filterUsers();
    } catch (error) {
      console.error("Erro ao buscar criadoras:", error);
    }
  } else {
    users.value = [];
    filteredUsers.value = [];
  }
};

const filterUsers = () => {
  filteredUsers.value = users.value.filter((user) =>
    user.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
};

watch(searchText, filterUsers);
</script>
