<template>
  <v-app>
    <v-container>
      <h2>Informações</h2>
      <p class="text-caption text-medium-emphasis">Aqui estão suas informações</p>
      <v-row align="center" justify="center" class="mt-6">
        <v-col>
          <v-form>
            <v-text-field
              v-model="info.usuario"
              placeholder="Usuário"
              bg-color="input_color"
              :disabled="true"
              prepend-inner-icon="mdi-at"
            ></v-text-field>
            <v-text-field
              v-model="info.name"
              prepend-inner-icon="mdi-account"
              :disabled="true"
              readonly
              bg-color="input_color"
              placeholder="Nome"
            ></v-text-field>


            <v-text-field
              v-model="info.email"
              placeholder="Email"
              readonly
              prepend-inner-icon="mdi-email"
              bg-color="input_color"
            >
              <template v-slot:append-inner>
                <v-chip
                  v-if="info.email_confirmed === 0 || null"
                  color="primary"
                  @click="openDialog = true"
                >
                  Não verificado
                </v-chip>
                <v-chip v-else color="purple" class="mt-n1" dark>Verificado </v-chip>
              </template>
            </v-text-field>

            <v-row>
              <v-col cols="12">
                <v-btn
                  variant="tonal"
                  @click="changePassword = true"
                  block
                  color="primary"
                  min-height="40"
                  class="text-capitalize"
                >
                  Alterar senha
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
    <v-dialog v-model="changePassword" persisent width="600">
      <v-card
        class="rounded-xl elevation-6"
        color="background"
        title="Te enviamos um e-mail"
        prepend-icon="mdi-check"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Enviamos um e-mail para sua caixa de entrada para efetuação da troca de senha!
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="primary" @click="changePassword = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDialog" persisent width="600">
      <v-card
        class="rounded-xl elevation-6"
        color="background"
        title="Te enviamos um e-mail"
        prepend-icon="mdi-check"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Enviamos um e-mail para sua caixa de entrada para confirmação de e-mail!
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="primary" @click="openDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script setup>
import { onMounted, ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;
const openDialog = ref(false);
const changePassword = ref(false);

const info = ref({
  usuario: null,
  email: null,
  phone: null,
  email_confirmed: 0,
});

onMounted(async () => {
  try {
    const data = await $fetch("https://api.seduvibe.com/list_users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    info.value = {
      usuario: data.users[0]?.user,
      name: data.users[0]?.name,
      email: data.users[0]?.email,
      email_confirmed: data.users[0].emailConfirmed,
    };
    console.log("Requisição realizada com sucesso:", data);
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

</script>
