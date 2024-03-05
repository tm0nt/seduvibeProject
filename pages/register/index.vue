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
                  :rules="[ruleRequired]"
                  bg-color="input_color"
                  prepend-inner-icon="mdi-account"
                  persistent-clear
                  id="name"
                  name="name"
                />
              </div>
              <div class="">
                <VTextField
                  v-model="registerData.email"
                  color="white"
                  placeholder="E-mail"
                  bg-color="input_color"
                  persistent-clear
                  prepend-inner-icon="mdi-email"
                  :rules="[ruleRequired, ruleEmail]"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div class="">
                <VTextField
                  v-model="registerData.user"
                  color="white"
                  placeholder="Usuário"
                  bg-color="input_color"
                  :rules="[ruleRequired]"
                  persistent-clear
                  prepend-inner-icon="mdi-at"
                  type="usuario"
                  id="usuario"
                  name="usuario"
                />
              </div>

              <div>
                <VBtn
                  type="submit"
                  append-icon="mdi-chevron-right"
                  block
                  min-height="40"
                  class="text-capitalize"
                  color="primary"
                  >Criar</VBtn
                >
              </div>
            </VForm>
            <div class="mt-2">
              <VBtn
                class="text-capitalize"
                variant="outlined"
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
              color="primary"
              >Continuar</VBtn
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
                :rules="[ruleRequired, rulePassLen]"
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
            <div class="">
              <VTextField
                :type="showPasswordConfirm ? 'text' : 'password'"
                v-model="registerData.password"
                color="white"
                placeholder="Confirmar senha"
                bg-color="input_color"
                prepend-inner-icon="mdi-password"
                :rules="[ruleRequired, rulePassLen]"
                persistent-clear
                :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibilityConfirm"
                id="confirm_password"
                name="confirm_password"
              />
            </div>
          </VCardText>
          <VCardActions>
            <VBtn
              class="text-capitalize"
              @click="
                registerFetch();
                dialogPassword = false;
              "
              color="primary"
              >Criar Conta</VBtn
            >
          </VCardActions>
        </VContainer>
      </VCard>
    </VDialog>
    <v-snackbar
      location="center"
      rounded="pill"
      v-model="useRegisterStore().snackbar.show"
      :color="useRegisterStore().snackbar.color"
      top
    >
      {{ useRegisterStore().snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="useRegisterStore().snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </VContainer>
</template>

<script setup>
import { useRegisterStore } from "~/store/register";
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const password_one = ref("");
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const dialogOpen = ref(false);
const checkType = ref(null);
const dialogPassword = ref(false);

const registerData = ref({
  user: "",
  name: "",
  email: "",
  password: "",
  creator: "",
});

const registerValidade = ref(null);
const { ruleEmail, ruleRequired, rulePassLen } = useFormRules();

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
  if (registerValidade.value.isValid) {
    dialogOpen.value = true;
  }
};

const registerFetch = async () => {
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
