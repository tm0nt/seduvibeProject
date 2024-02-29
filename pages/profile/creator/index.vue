<template>
  <VApp>
    <navbarView />
    <VContainer>
      <VRow no-gutters align="center">
        <VCol cols="12" md="8" offset-md="2">
          <headerCreator />
          <VRow>
            <VCol cols="6">
              <VBtn
                min-height="40"
                to="/profile/creator/config"
                block
                color="primary"
                class="text-capitalize"
              >
                <v-icon size="16" class="ma-1">fa-gear</v-icon>Configurações
              </VBtn>
            </VCol>
            <VCol cols="6">
              <VBtn
                min-height="40"
                class="text-capitalize"
                block
                to="/profile/creator/analytics/"
                variant="outlined"
                color="primary"
              >
                <v-icon class="ma-1">mdi-chart-donut</v-icon>Analytics
              </VBtn>
            </VCol>
          </VRow>
          <v-divider class="my-3"></v-divider>
          <UploadwithPost />
        </VCol>
      </VRow>
    </VContainer>
  </VApp>
</template>
<script setup></script>
<script>
import UploadwithPost from "../../../components/post/UploadwithPost.vue";
import headerCreator from "../../../components/creator/headerCreator";
import navbarView from "../../../components/navbar";

export default {
  components: {
    headerCreator,
    navbarView,
    UploadwithPost,
  },
};
</script>
