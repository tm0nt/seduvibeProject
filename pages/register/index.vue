<template>
  <VContainer fluid class="fill-height my-5">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="9" md="6" class="mt-md-n8">
            <VToolbar height="90" color="rgb(0,0,0,0)"></VToolbar>
            <div class="text-surface">
              <VImg
                src="https://i.imgur.com/BrTfYSp.png"
                width="60"
                class="mx-auto"
                format="webp"
                loading="lazy"
                preload
              >
                <template v-slot:placeholder>
                  <v-row align="center" class="fill-height ma-0" justify="center">
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                  </v-row>
                </template>
              </VImg>
              <h2 class="text-headline mt-6">Crie sua conta</h2>
              <p class="mt-n2 text-medium-emphasis text-caption mb-4">Para usar nossa plataforma</p>
            </div>

            <VForm @submit.prevent="submit" class="mt-2" ref="registerValidade">
              <div class="mt-1">
                <VTextField
                  v-model="registerData.name"
                  placeholder="Nome"
                  color="white"
                  bg-color="input_color"
                  prepend-inner-icon="mdi-account"
                  persistent-clear
                  id="name"
                  name="name"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  v-model="registerData.email"
                  color="white"
                  placeholder="E-mail"
                  bg-color="input_color"
                  persistent-clear
                  prepend-inner-icon="mdi-email"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  v-model="registerData.user"
                  color="white"
                  placeholder="Usuário"
                  bg-color="input_color"
                  persistent-clear
                  prepend-inner-icon="mdi-at"
                  type="usuario"
                  id="usuario"
                  name="usuario"
                />
              </div>
              <v-alert
                type="info"
                closable
                border="start"
                variant="tonal"
                rounded="xl"
                v-model="useRegisterStore().snackbar.show"
                :color="useRegisterStore().snackbar.color"
              >
                <template v-slot:title>
                  <p class="text-caption">{{ useRegisterStore().snackbar.text }}</p>
                </template>
              </v-alert>
              <v-alert
                type="info"
                closable
                border="start"
                variant="tonal"
                rounded="xl"
                v-model="infoMessage"
                color="red"
              >
                <template v-slot:title>
                  <p class="text-caption">Preencha todos os campos</p>
                </template>
              </v-alert>
              <div>
                <VBtn
                  type="submit"
                  append-icon="mdi-chevron-right"
                  block
                  min-height="40"
                  class="text-capitalize mt-2"
                  color="primary"
                  >Criar</VBtn
                >
              </div>
            </VForm>
            <div class="mt-2">
              <VBtn
                class="text-capitalize"
                variant="tonal"
                to="/login"
                color="primary"
                block
                min-height="40"
                >Eu tenho conta</VBtn
              >
            </div>
          </VCol>
        </VRow>
      </VCol>
      <advertising class="mt-md-8" />
    </VRow>
    <VDialog persistent v-model="dialogOpen" width="400">
      <VCard color="background" class="rounded-xl">
        <VContainer>
          <VCardTitle
            ><v-icon size="small" @click="dialogOpen = false">mdi-close</v-icon></VCardTitle
          >
          <VCardText>
            <h2 class="text-center mb-2 font-weight-light">O que você é?</h2>
            <p class="text-caption text-center mt-n2 mb-4">Fale-nos sobre você.</p>
            <VRow>
              <VCol class="mb-n2" cols="auto">
                <VCard
                  class="mx-auto elevation-0 rounded-xl"
                  flat
                  width="100%"
                  color="input_color"
                  link
                  subtitle="Quero começar a produzir"
                  title="Criador de conteúdo"
                  @click="toggleTypeUser('1')"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-youtube-studio</v-icon>
                  </template>
                  <template v-slot:append v-if="checkType === '1'">
                    <v-icon color="primary">mdi-check</v-icon>
                  </template>
                  <VCardText>Escolha esse opção se você quer trabalhar na plataforma.</VCardText>
                </VCard>
              </VCol>
              <VCol class="mt-n2" cols="autp">
                <VCard
                  class="mx-auto elevation-0 rounded-xl"
                  flat
                  width="100%"
                  color="input_color"
                  link
                  subtitle="Quero apoiar meu criador"
                  title="Usuário"
                  @click="toggleTypeUser('0')"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-account</v-icon>
                  </template>
                  <template v-slot:append v-if="checkType === '0'">
                    <v-icon color="primary">mdi-check</v-icon>
                  </template>
                  <VCardText
                    >Escolha essa opção se você quer acompanhar seu criador favorito</VCardText
                  >
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
          <VCardActions>
            <VBtn
              class="text-capitalize"
              :disabled="checkType === null"
              @click="
                dialogPassword = true;
                dialogOpen = false;
              "
              min-height="40"
              block
              variant="tonal"
              prepend-icon="mdi-chevron-right-circle"
              color="primary"
              >Próximo</VBtn
            >
          </VCardActions>
        </VContainer>
      </VCard>
    </VDialog>
    <VDialog persistent v-model="dialogPassword" width="400">
      <VCard color="background" class="rounded-xl">
        <VContainer>
          <VCardTitle
            ><v-icon size="small" @click="dialogPassword = false">mdi-close</v-icon></VCardTitle
          >
          <VCardText>
            <h2 class="text-center mb-2 font-weight-light mb-4">Agora crie sua senha</h2>
            <div class="">
              <VTextField
                :type="showPassword ? 'text' : 'password'"
                v-model="password_one"
                color="white"
                placeholder="Senha"
                bg-color="input_color"
                persistent-clear
                prepend-inner-icon="mdi-password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                id="password"
                name="password"
              />
            </div>
            <div class="mt-n4">
              <VTextField
                :type="showPasswordConfirm ? 'text' : 'password'"
                v-model="registerData.password"
                color="white"
                placeholder="Confirmar senha"
                bg-color="input_color"
                prepend-inner-icon="mdi-password"
                persistent-clear
                :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibilityConfirm"
                id="confirm_password"
                name="confirm_password"
              />
            </div>
            <v-alert
              type="info"
              closable
              v-if="infoMessagePassword.visible"
              border="start"
              variant="tonal"
              rounded="xl"
              color="red"
            >
              <template v-slot:title>
                <p class="text-caption">{{ infoMessagePassword.text }}</p>
              </template>
            </v-alert>
          </VCardText>
          <VCardActions>
            <VBtn
              variant="tonal"
              prepend-icon="mdi-chevron-right-circle"
              block
              min-height="40"
              class="text-capitalize"
              @click="registerFetch()"
              color="primary"
              >Criar Conta</VBtn
            >
          </VCardActions>
        </VContainer>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup>
import { useRegisterStore } from "~/store/register";
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const password_one = ref(null);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const dialogOpen = ref(false);
const checkType = ref(null);
const dialogPassword = ref(false);

const registerData = ref({
  user: null,
  name: null,
  email: null,
  password: null,
  creator: null,
});

const infoMessage = ref(false);
const infoMessagePassword = ref({
  visible: false,
  text: "",
});
const registerValidade = ref(null);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleTypeUser = (type) => {
  checkType.value = type;
  registerData.value.creator = type;
};

const togglePasswordVisibilityConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value;
};
const submit = async () => {
  if (!registerData.value.user || !registerData.value.email || !registerData.value.name) {
    infoMessage.value = true;
    return;
  }
  if (registerValidade.value.isValid) {
    infoMessage.value = false;
    dialogOpen.value = true;
  }
};

const registerFetch = async () => {
  if (!registerData.value.password || !password_one.value) {
    infoMessagePassword.value.visible = true;
    infoMessagePassword.value.text = "Preencha todos os campos!";
    return;
  }
  if (registerData.value.password != password_one.value) {
    infoMessagePassword.value.visible = true;
    infoMessagePassword.value.text = "As senhas não são iguais!";
    return;
  }
  if (registerData.value.password.length < 8 || password_one.value.length < 8) {
    infoMessagePassword.value.visible = true;
    infoMessagePassword.value.text = "A senha precisa ter no mínimo 8 caracteres!";
    return;
  }
  infoMessagePassword.value = false;
  dialogPassword = false;
  await useRegisterStore().registerUser({
    user: registerData.value.user,
    name: registerData.value.name,
    email: registerData.value.email,
    password: registerData.value.password,
    creator: registerData.value.creator,
  });
};
</script>
<script>
import advertising from "@/components/advertisingLogin.vue";

export default {
  components: {
    advertising,
  },
};
</script>
