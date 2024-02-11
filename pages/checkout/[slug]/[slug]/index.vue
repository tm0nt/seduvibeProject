<template>
  <VApp>
    <VRow no-gutters align="center">
      <VCol cols="12" md="8" offset-md="2">
        <VToolbar color="rgb(0,0,0,0)" height="30"></VToolbar>
        <VImg
          src="https://i.imgur.com/BrTfYSp.png"
          class="mx-auto mb-10 text-center"
          format="webp"
          width="60"
        ></VImg>
        <VCard color="background" class="elevation-8 rounded-xl mx-auto" width="400" flat>
          <VCard-text class="text-center">
            <VAvatar
              size="120"
              image="https://jessysells.com/wp-content/uploads/1665866884_877_E-Girl-mira-este-nuevo-estilo-de-ritmo-en-TikTok.jpg"
            ></VAvatar>
            <h2 class="mt-2">@L4rissa</h2>
            <p class="text-caption text-medium-emphasis mt-1">Olá meus amoreesss <33</p>
            <VSpacer></VSpacer>
            <VChip color="primary" class="mt-1">R$ 50,00</VChip>
            <PaymentMethod />
          </VCard-text>
        </VCard>
      </VCol>
    </VRow>
  </VApp>
</template>
<script setup></script>
<script>
import PaymentMethod from "../../../../components/creator/paymentMethods/index";
export default {
  components: {
    PaymentMethod,
  },
};
</script>
