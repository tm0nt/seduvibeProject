<template>
  <VContainer fluid class="fill-height my-5">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="9" md="6">
            <div class="text-surface">
              <VImg src="https://i.imgur.com/BrTfYSp.png" width="60" class="mx-auto mb-10"></VImg>
              <h2 class="text-headline mt-15">Crie sua conta</h2>
              <p class="mt-n2 text-medium-emphasis text-caption mb-4">Para usar nossa plataforma</p>
            </div>

            <VForm @submit.prevent="submit" class="mt-2">
              <div class="mt-1">
                <VTextField
                  v-model="name"
                  placeholder="Nome"
                  color="white"
                  bg-color="input_color"
                  persistent-clear
                  id="name"
                  name="name"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  v-model="email"
                  color="white"
                  placeholder="E-mail"
                  bg-color="input_color"
                  persistent-clear
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  v-model="usuario"
                  color="white"
                  placeholder="Usuário"
                  bg-color="input_color"
                  persistent-clear
                  type="usuario"
                  id="usuario"
                  name="usuario"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  color="white"
                  placeholder="Senha"
                  bg-color="input_color"
                  persistent-clear
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibility"
                  id="password"
                  name="password"
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  v-model="confirm_password"
                  color="white"
                  placeholder="Confirmar senha"
                  bg-color="input_color"
                  persistent-clear
                  :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibilityConfirm"
                  id="confirm_password"
                  name="confirm_password"
                />
              </div>

              <div class="mt-4">
                <VBtn type="submit" block min-height="40" class="text-capitalize" color="primary"
                  >Criar</VBtn
                >
              </div>
            </VForm>
            <div class="mt-2">
              <NuxtLink to="/" class="font-weight-bold text-primary"
                ><VBtn
                  class="text-capitalize"
                  variant="outlined"
                  color="primary"
                  block
                  min-height="40"
                  >Eu tenho conta</VBtn
                ></NuxtLink
              >
            </div>
          </VCol>
        </VRow>
      </VCol>
      <advertising />
    </VRow>
    <VDialog persistent v-model="dialogOpen" width="400">
      <VCard color="background" class="rounded-xl">
        <VContainer>
          <VCardTitle class="text-primary font-weight-bold">O que você é?</VCardTitle>
          <VCardText>
            <VRow>
              <VCol class="mb-n2">
                <VCard
                  class="mx-auto elevation-0 rounded-xl"
                  flat
                  width="344"
                  color="input_color"
                  link
                  subtitle="Quero começar a produzir"
                  title="Criador de conteúdo"
                  @click="toggleTypeUser(1)"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-youtube-studio</v-icon>
                  </template>
                  <template v-slot:append v-if="checkType === 1">
                    <v-icon color="primary">mdi-check</v-icon>
                  </template>
                  <VCardText>Escolha esse opção se você quer trabalhar na plataforma.</VCardText>
                </VCard>
              </VCol>
              <VCol class="mt-n2">
                <VCard
                  class="mx-auto elevation-0 rounded-xl"
                  flat
                  width="344"
                  color="input_color"
                  link
                  subtitle="Quero apoiar meu criador"
                  title="Usuário"
                  @click="toggleTypeUser(2)"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-account</v-icon>
                  </template>
                  <template v-slot:append v-if="checkType === 2">
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
            <VBtn class="text-capitalize" :disabled="checkType === null" color="primary"
              >CONTINUAR</VBtn
            >
          </VCardActions>
        </VContainer>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup>
const name = ref("");
const email = ref("");
const usuario = ref("");
const password = ref("");
const confirm_password = ref("");
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const dialogOpen = ref(false);
const checkType = ref(null);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleTypeUser = (type) => {
  checkType.value = type;
};

const togglePasswordVisibilityConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value;
};

const submit = async () => {
  dialogOpen.value = true;
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
