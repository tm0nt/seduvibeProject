<template>
  <v-app>
    <v-container>
      <h2>Assinaturas</h2>
      <p class="text-caption text-medium-emphesis">Essas são suas assinaturas ativas</p>
      <v-sheet class="mx-auto" color="background">
        <v-slide-group class="pa-4">
          <v-slide-item
            v-if="subscriptionCreator && subscriptionCreator.length > 0"
            v-for="(item, index) in subscriptionCreator"
            :key="index"
            class="pa-2"
          >
            <v-row align="center" justify="center">
              <v-col>
                <NuxtLink :to="'/@' + item.creatorUser">
                  <v-card color="input_color" class="rounded-xl my-12" width="200">
                    <v-img cover height="250" :src="item.creatorProfilePicture"></v-img>
                    <v-card-item>
                      <v-card-title>{{ item.creator }}</v-card-title>

                      <v-card-subtitle>
                        <span class="text-caption text-medium-emphesis me-1">{{
                          item.subtitle
                        }}</span>
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
          </v-slide-item>
          <!-- Adicione a mensagem para quando o array está vazio -->
          <v-row v-else class="text-center">
            <v-col>
              <p class="text-caption text-medium-emphasis">Nenhuma assinatura ativa no momento.</p>
            </v-col>
          </v-row>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const subscriptionCreator = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch(
      "https://api.seduvibe.com.br/subscription/list_subscriptions_users_active",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    subscriptionCreator.value = data;
    console.log(data);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
</script>
