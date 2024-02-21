<template>
  <v-app>
    <navbar />
    <VContainer>
      <VRow no-gutters align="center">
        <VCol cols="12" md="8" offset-md="2">
          <postUnique />
        </VCol>
      </VRow>
    </VContainer>
  </v-app>
</template>
<script setup></script>
<script>
import postUnique from "../../../components/post/postUnique";
import navbar from "../../../components/navbar";

export default {
  components: {
    postUnique,
    navbar,
  },
};
</script>
