<template>
  <VContainer fluid class="fill-height my-12">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="9" md="6">
            <div class="text-surface">
              <VImg src="https://i.imgur.com/BrTfYSp.png" width="60" class="mx-auto mb-10"></VImg>
              <h2 class="text-headline mt-15">Alteração de senha</h2>
              <p class="mt-n2 text-medium-emphasis text-caption mb-4">
                Enviaremos um e-mail para você
              </p>
            </div>
            <VForm @submit.prevent="submit" class="mt-7">
              <div class="mt-1">
                <VTextField
                  v-model="email"
                  bg-color="input_color"
                  color="white"
                  type="email"
                  persistent-clear
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" color="primary" class="text-capitalize"
                  >Enviar</VBtn
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
                  >Fazer login</VBtn
                ></NuxtLink
              >
            </div>
          </VCol>
        </VRow>
      </VCol>
      <advertising />
    </VRow>
  </VContainer>
</template>

<script setup>
const email = ref("");

const submit = async () => {};
</script>
<script>
import advertising from "@/components/advertisingLogin.vue";

export default {
  components: {
    advertising,
  },
};
</script>
