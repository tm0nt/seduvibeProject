<template>
  <v-container>
    <h2>Meu perfil</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Edite alguns de seus dados</p>
    <form>
      <v-text-field
        v-model="info.usuario"
        placeholder="Usuário"
        bg-color="input_color"
        prepend-inner-icon="mdi-at"
        disabled
        color="primary"
      ></v-text-field>
      <v-text-field
        v-model="info.email"
        placeholder="Email"
        class="mt-n2"
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
        <!-- Coluna 1 -->

        <!-- Coluna 2 -->
        <v-col cols="6" class="mt-n2">
          <v-text-field
            outlined
            v-model="social_media.twitter"
            placeholder="Twitter"
            prepend-inner-icon="mdi-twitter"
            bg-color="input_color"
            color="primary"
          ></v-text-field>
        </v-col>

        <!-- Coluna 3 -->
        <v-col cols="6" class="mt-n2">
          <v-text-field
            v-model="social_media.instagram"
            placeholder="Instagram"
            prepend-inner-icon="mdi-instagram"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <!-- Coluna 4 -->
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="social_media.telegram"
            placeholder="Telegram"
            color="primary"
            prepend-inner-icon="mdi-send-circle"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <!-- Coluna 5 -->
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="social_media.wishlist"
            placeholder="Wishlist Amazon"
            prepend-inner-icon="mdi-web"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" block class="text-capitalize" min-height="40">Salvar</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" block class="text-capitalize" min-height="40" variant="outlined"
            >Alterar Senha</v-btn
          >
        </v-col>
      </v-row>
    </form>
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

    // Atualiza as refs com os dados obtidos da API
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
</script>
