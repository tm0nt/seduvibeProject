<template>
  <v-container>
    <h2>Meu perfil</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Edite alguns de seus dados</p>
    <v-form class="mt-5">
      <v-text-field
        v-model="info.usuario"
        placeholder="Usuário"
        bg-color="input_color"
        label="Usuário"
        prepend-inner-icon="mdi-at"
        disabled
        color="primary"
      ></v-text-field>
      <v-text-field
        v-model="info.email"
        placeholder="Email"
        class="mt-n2"
        disabled
        label="Email"
        color="primary"
        prepend-inner-icon="mdi-email"
        bg-color="input_color"
      >
        <template v-slot:append-inner>
          <v-chip color="primary"> Email verificado </v-chip>
        </template>
      </v-text-field>
      <v-dialog v-model="mailOpen" max-width="400px">
        <v-card>
          <v-alert type="info" color="primary" dense dismissible>
            Enviamos o e-mail verificador para o seu e-mail, verifique sua caixa de entrada.
          </v-alert>
        </v-card>
      </v-dialog>

      <v-row>
        <v-col cols="6" class="mt-n2">
          <v-text-field
            outlined
            v-model="social_media.twitter"
            label="Twitter"
            placeholder="Twitter"
            prepend-inner-icon="mdi-twitter"
            bg-color="input_color"
            color="primary"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n2">
          <v-text-field
            v-model="social_media.instagram"
            placeholder="Instagram"
            label="Instagram"
            prepend-inner-icon="mdi-instagram"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="social_media.telegram"
            label="Telegram"
            placeholder="Telegram"
            color="primary"
            prepend-inner-icon="mdi-send-circle"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="social_media.wishlist"
            placeholder="Wishlist Amazon"
            prepend-inner-icon="mdi-web"
            label="Amazon Wishlist"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" @click="saveChanges" block class="text-capitalize" min-height="40"
            >Salvar</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" block class="text-capitalize" min-height="40" variant="outlined"
            >Alterar Senha</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
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
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const info = ref({
  usuario: null,
  email: null,
});

const social_media = ref({
  instagram: null,
  telegram: null,
  twitter: null,
});

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com/creator_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    info.value = {
      usuario: fetchData?._rawValue?.users[0]?.user,
      email: fetchData?._rawValue?.users[0]?.email,
    };

    social_media.value = {
      instagram: fetchData?._rawValue?.social_media[0]?.instagram,
      telegram: fetchData?._rawValue?.social_media[0]?.telegram,
      twitter: fetchData?._rawValue?.social_media[0]?.twitter,
      wishlist: fetchData?._rawValue?.social_media[0]?.wishlist,
    };

    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});
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
    timeout: 6000,
  };
};

const saveChanges = async () => {
  try {
    const { data: saveData } = await useFetch("https://api.seduvibe.com/change_social_media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        instagram: social_media.value.instagram,
        telegram: social_media.value.telegram,
        twitter: social_media.value.twitter,
        wishlist: social_media.value.wishlist,
      }),
    });
    showSnackbar("Dados atualizados!", "success");
    console.log("Changes saved successfully:", saveData);
  } catch (error) {
    console.error("Error while saving changes:", error);
  }
};
</script>
