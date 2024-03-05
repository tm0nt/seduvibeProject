<template>
  <v-container>
    <h2>Meu perfil</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Edite alguns de seus dados</p>
    <v-form class="mt-5">
      <v-text-field
        placeholder="Usuário"
        bg-color="input_color"
        label="Usuário"
        v-model="usuario"
        prepend-inner-icon="mdi-at"
        disabled
        color="primary"
      ></v-text-field>
      <v-text-field
        placeholder="Email"
        class="mt-n2"
        readonly
        label="Email"
        v-model="email"
        color="primary"
        prepend-inner-icon="mdi-email"
        bg-color="input_color"
      >
        <template v-slot:append-inner>
          <v-chip v-if="fetchProfile?.users[0]?.emailConfirmed" color="primary">
            Email verificado
          </v-chip>
          <v-chip v-else color="primary" @click="mailVerify = true">Email não verificado</v-chip>
        </template>
      </v-text-field>
      <v-dialog v-model="changePassword" max-width="400px">
        <v-card
          class="rounded-xl elevation-6"
          color="background"
          title="Te enviamos um e-mail"
          prepend-icon="mdi-check"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Enviamos um e-mail para alteração de sua senha!
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" @click="changePassword = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="mailVerify" max-width="400px">
        <v-card
          class="rounded-xl elevation-6"
          color="background"
          title="Te enviamos um e-mail"
          prepend-icon="mdi-check"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Enviamos um e-mail de confirmação para você!
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" @click="mailVerify = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row>
        <v-col cols="6" class="mt-n2">
          <v-text-field
            outlined
            label="Twitter"
            placeholder="Twitter"
            prepend-inner-icon="mdi-twitter"
            bg-color="input_color"
            v-model="twitter"
            color="primary"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n2">
          <v-text-field
            placeholder="Instagram"
            label="Instagram"
            prepend-inner-icon="mdi-instagram"
            v-model="instagram"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n8">
          <v-text-field
            label="Telegram"
            placeholder="Telegram"
            v-model="telegram"
            color="primary"
            prepend-inner-icon="mdi-send-circle"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="mt-n8">
          <v-text-field
            placeholder="Wishlist Amazon"
            prepend-inner-icon="mdi-web"
            label="Amazon Wishlist"
            color="primary"
            v-model="wishlist"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" @click="saveChanges" block class="text-capitalize" min-height="40"
            >Salvar</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            block
            class="text-capitalize"
            min-height="40"
            variant="outlined"
            @click="changePassword = true"
            >Alterar Senha</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      location="center"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script setup>
import { ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;

const fetchProfile = ref(null);
const changePassword = ref(false);

const mailVerify = ref(false);
const usuario = ref(null);
const email = ref(null);

const telegram = ref(null);
const twitter = ref(null);
const instagram = ref(null);
const wishlist = ref(null);

const fetchCreatorList = async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/creator_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProfile.value = data;
    // Dados
    usuario.value = data.users[0].user;
    email.value = data.users[0].email;
    // E-mails
    telegram.value = data.social_media[0].telegram;
    instagram.value = data.social_media[0].instagram;
    twitter.value = data.social_media[0].twitter;
    wishlist.value = data.social_media[0].wishlist;

    console.log("Requisição realizada com sucesso:", data);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
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
    const data = await $fetch("https://api.seduvibe.com/change_social_media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        instagram: instagram.value,
        telegram: telegram.value,
        twitter: twitter.value,
        wishlist: wishlist.value,
      }),
    });
    console.log(data)
    showSnackbar("Dados atualizados!", "success");
  } catch (error) {
    console.error("Error while saving changes:", error);
  }
};
fetchCreatorList();
</script>
