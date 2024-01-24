<template>
  <VContainer fluid class="fill-height my-12">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="9" md="6">
            <div class="text-surface">
              <VImg src="https://i.imgur.com/BrTfYSp.png" width="60" class="mx-auto mb-10"></VImg>
              <h2 class="text-headline mt-15">Login</h2>
              <p class="mt-n2 text-medium-emphasis text-caption mb-4">
                Entre para apoiar seus criadores
              </p>
            </div>

            <VForm @submit.prevent="submit" class="mt-2">
              <div class="mt-1">
                <VTextField
                  placeholder="Email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  bg-color="input_color"
                  color="white"
                  type="email"
                  persistent-clear
                />
              </div>
              <div class="mt-n4">
                <VTextField
                  v-model="user.password"
                  placeholder="Senha"
                  color="white"
                  bg-color="input_color"
                  persistent-clear
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility"
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                />
                <div class="text-center mt-n4">
                  <NuxtLink to="/reset-password"
                    ><VBtn class="text-capitalize" variant="text" color="primary"
                      >Esqueci a senha</VBtn
                    ></NuxtLink
                  >
                </div>
              </div>
              <div class="mt-3">
                <VBtn type="submit" block min-height="40" class="text-capitalize" color="primary"
                  >Entrar</VBtn
                >
              </div>

              <div class="mt-2 align-center text-center justify-center d-flex">
                <VDivider class="border-opacity-75" color="grey" length="10"></VDivider>
              </div>
              <div class="mt-2">
                <NuxtLink to="#">
                  <VBtn
                    type="submit"
                    block
                    min-height="40"
                    variant="outlined"
                    class="text-capitalize"
                    color="primary"
                  >
                    <VIcon left class="ma-1" :size="16">
                      <v-icon color="primary">mdi-google-plus</v-icon>
                    </VIcon>
                    Google
                  </VBtn>
                </NuxtLink>
              </div>
              <div class="mt-2">
                <NuxtLink to="#">
                  <VBtn
                    type="submit"
                    block
                    min-height="40"
                    variant="outlined"
                    class="text-capitalize"
                    color="primary"
                  >
                    <VIcon left class="ma-1" :size="16">
                      <v-icon color="primary">mdi-twitter</v-icon>
                    </VIcon>
                    Twitter
                  </VBtn>
                </NuxtLink>
              </div>
              <div class="mt-2">
                <NuxtLink to="/register">
                  <VBtn block min-height="40" class="text-capitalize" color="primary"
                    >Crie sua conta</VBtn
                  >
                </NuxtLink>
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
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { ref } from "vue";
definePageMeta({
  middleware: "check-login",
});
const router = useRouter();

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const user = ref({
  email: "",
  password: "",
});
const showPassword = ref(false);

const submit = async () => {
  await authenticateUser(user.value);
  if (authenticated) {
    router.push("/profile");
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
