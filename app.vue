<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <VDialog persistent v-model="dialogOpen" width="400">
      <VCard color="background" class="rounded-xl">
        <VContainer>
          <VCardTitle class="text-primary font-weight-bold">Boas-vindas a Seduvibe</VCardTitle>
          <VCardText>
            <p class="text-caption mb-2 mt-n4">
              Para deixar sua experiência personalizada, escolha o modo do tema.
            </p>
            <VRow>
              <VCol>
                <VBtn
                  @click="selectTheme('light')"
                  block
                  color="primary"
                  min-height="40"
                  class="text-capitalize"
                >
                  <VIcon size="16" class="ma-1">mdi-brightness-5</VIcon>
                  Claro
                </VBtn>
              </VCol>
              <VCol>
                <VBtn
                  @click="selectTheme('dark')"
                  block
                  color="primary"
                  min-height="40"
                  class="text-capitalize"
                >
                  <VIcon size="16" class="ma-1">mdi-brightness-3</VIcon>
                  Escuro
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VContainer>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import { setData, getData } from "nuxt-storage/local-storage";

const dialogOpen = ref(false);
const theme = useTheme();

onMounted(() => {
  const storedTheme = getData("theme");
  if (storedTheme) {
    theme.global.name.value = storedTheme;
  } else {
    dialogOpen.value = true;
  }
});

const selectTheme = (selectedTheme) => {
  theme.global.name.value = selectedTheme;
  setData("theme", selectedTheme);
  dialogOpen.value = false;
};
</script>
