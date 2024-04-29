<template>
  <VContainer fluid class="fill-height my-12">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="9" md="6">
            <div class="text-surface">
              <VImg
                src="https://i.imgur.com/BrTfYSp.png"
                width="60"
                alt="Plataforma para vender conteúdo exclusivo"
                class="mx-auto mb-10 text-center"
                format="webp"
                loading="lazy"
                preload
              ></VImg>
              <h2 class="text-headline mt-15">Login</h2>
              <p class="mt-n2 text-medium-emphasis text-caption mb-4">
                Entre para apoiar seus criadores
              </p>
            </div>

            <VForm @submit.prevent="submit" class="mt-2" ref="loginValidade">
              <div class="mt-1">
                <VTextField
                  placeholder="Email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  density="compact"
                  prepend-inner-icon="mdi-email"
                  bg-color="input_color"
                  color="primary"
                  type="email"
                  persistent-clear
                />
              </div>
              <div>
                <VTextField
                  v-model="user.password"
                  placeholder="Senha"
                  density="compact"
                  color="primary"
                  bg-color="input_color"
                  class="mt-n4"
                  prepend-inner-icon="mdi-password"
                  persistent-clear
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility"
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                />
              </div>
              <v-alert
                type="info"
                border="start"
                rounded="xl"
                closable
                v-model="useAuthStore().snackbar.show"
                :color="useAuthStore().snackbar.color"
                variant="tonal"
              >
                <template v-slot:title>
                  <p class="text-caption">{{ useAuthStore().snackbar.text }}</p>
                </template>
              </v-alert>
              <div class="mt-3">
                <VBtn
                  type="submit"
                  prepend-icon="mdi-chevron-right-circle"
                  block
                  min-height="40"
                  class="text-capitalize"
                  color="primary"
                  >Entrar</VBtn
                >
              </div>

              <div class="mt-2">
                <VBtn
                  to="/register"
                  block
                  min-height="40"
                  class="text-capitalize"
                  variant="tonal"
                  color="primary"
                  >Crie sua conta</VBtn
                >
              </div>
            </VForm>
          </VCol>
        </VRow>
      </VCol>
      <advertising />
    </VRow>
  </VContainer>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const user = ref({
  email: "",
  password: "",
});

const loginValidade = ref(null);

const showPassword = ref(false);

const submit = async () => {
  if (loginValidade.value.isValid) {
    await useAuthStore().authenticateUser(user.value);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
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
