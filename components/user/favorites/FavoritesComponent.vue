<template>
  <v-app>
    <v-container>
      <h2>Favoritos</h2>
      <p class="text-caption text-medium-emphesis">Estes são seus favoritos</p>
      <v-sheet class="mx-auto" color="background">
        <v-row v-if="favorites && favorites.length > 0">
          <v-col v-for="(item, index) in favorites" :key="index">
            <NuxtLink :to="'/@' + item.user">
              <v-card color="input_color" class="rounded-xl my-12" width="200">
                <v-img cover height="250" :src="item.profilePicture"></v-img>

                <v-card-item>
                  <v-card-title>{{ item.name }}</v-card-title>

                  <v-card-subtitle>
                    <span class="text-caption text-medium-emphesis me-1"></span>
                    <v-icon color="primary" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0 ma-2">
                    <div>
                      {{ item.bio }}
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <p class="text-center text-caption text-medium-emphasis mt-2">
              Nenhum favorito encontrado.
            </p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const favorites = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com.br/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    favorites.value = data.favoriteCreators;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
</script>
