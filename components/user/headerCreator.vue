<template>
  <VCard class="rounded-lg" flat height="150">
    <template v-slot:image>
      <VImg eager cover position="center" src="https://i.imgur.com/7PZP0v0.jpeg"> </VImg>
    </template>
  </VCard>

  <v-row align="start" no-gutters>
    <v-col cols="12">
      <div class="text-center mt-n15">
        <v-menu width="250" height="250">
          <template v-slot:activator="{ props }">
            <VAvatar
              style="border: 4px solid background"
              size="130"
              v-bind="props"
              image="https://i.imgur.com/h2xyV29.png"
            ></VAvatar>
          </template>
          <v-card color="background" class="elevation-4 rounded-xl overflow-y-visible">
            <v-card-text>
              <div class="mx-auto text-center">
                <h3>{{ info.nome }}</h3>
                <p class="text-caption mt-n1">@{{ info.user }}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  append-icon="mdi-theme-light-dark"
                  class="text-capitalize"
                  variant="text"
                  @click="toggleTheme"
                >
                  Trocar tema
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  @click="toCreator = true"
                  rounded
                  append-icon="mdi-swap-horizontal"
                  class="text-capitalize"
                  variant="text"
                >
                  Quero ser criador
                </v-btn>
                <v-divider class="my-3"></v-divider>

                <v-btn
                  @click="logout"
                  rounded
                  append-icon="mdi-logout"
                  class="text-capitalize"
                  variant="text"
                >
                  Sair
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-col>
  </v-row>
  <VToolbar flat color="rgb(0,0,0,0)" height="15"></VToolbar>
  <VRow>
    <VCol>
      <div class="text-center">
        <h2 class="text-center">
          {{ info.nome }}
        </h2>
        <p class="text-center text-caption text-medium-emphasis">
          Clique em sua foto do perfil para ver mais opções de conta
        </p>
      </div>
    </VCol>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
    <VDialog v-model="toCreator" width="600" persistent>
      <v-card
        color="background"
        class="elevation-6 rounded-xl"
        flat
        title="Você deseja tornar-se criador(a)?"
        subtitle="Você não conseguirá se tornar um usuário novamente."
        prepend-icon="mdi-account-alert"
      >
        <v-card-actions>
          <v-btn variant="text" color="primary" @click="changeCreatorId">SIM</v-btn>
          <v-btn variant="text" color="primary" @click="toCreator = false">NÃO</v-btn>
        </v-card-actions>
      </v-card>
    </VDialog>
  </VRow>
</template>
<script setup>
import nuxtStorage from "nuxt-storage";
import { ref } from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();
const toCreator = ref(false);
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

const changeCreatorId = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/updateCreator", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return navigateTo("/profile");
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const cookie = useCookie("token");
const token = cookie.value;
const info = ref({
  nome: null,
});

const toggleTheme = () => {
  try {
    theme.global.name.value = theme.global.name.value === "dark" ? "light" : "dark";
    nuxtStorage.localStorage.setData("theme", theme.global.name.value);
  } catch (error) {
    console.error("Error during theme toggle:", error);
  }
};

const logout = () => {
  try {
    showSnackbar("Você saiu da sua conta!", "success");
    setTimeout(() => {
      cookie.value = null;
      localStorage.clear();
      navigateTo("/");
    }, 2000);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const fetchDataFromAPI = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/list_users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    info.value = {
      nome: data.users[0]?.name,
      user: data.users[0]?.user,
      coverPicture: data.users[0]?.coverPicture,
      profilePicture: data.users[0]?.profilePicture,
    };

    console.log("Requisição realizada com sucesso:", data);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

fetchDataFromAPI();
</script>
