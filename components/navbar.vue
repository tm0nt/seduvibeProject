<template>
  <v-bottom-navigation color="buttonNavColor" bg-color="input_color" class="elevation-4">
    <v-btn class="my-btn" to="/home">
      <v-icon size="24">mdi-home</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/notification">
      <v-icon size="24">mdi-heart</v-icon>
    </v-btn>
    <v-btn to="/search" class="my-btn">
      <v-icon size="24">mdi-magnify</v-icon>
    </v-btn>
    <v-btn to="/payment" class="my-btn">
      <v-icon size="24">mdi-currency-usd</v-icon>
    </v-btn>
    <v-btn to="/chat" class="my-btn">
      <v-icon size="24">mdi-chat</v-icon>
    </v-btn>
    <v-btn to="/profile" class="my-btn">
      <v-icon size="24">mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import paymentDialog from "./creator/paymentDialog/index.vue";
export default {
  components: {
    paymentDialog,
  },
};
</script>
<style scoped>
.v-btn.my-btn {
  min-width: 15px !important;
}
</style>
