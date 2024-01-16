<template>
  <v-bottom-navigation mode="shift" color="buttonNavColor" bg-color="navbarcolor">
    <v-btn to="/home">
      <v-icon size="30">mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn to="/notification">
      <v-icon size="30">mdi-heart</v-icon>
      <span>Notificações</span>
    </v-btn>
    <v-btn to="/search">
      <v-icon size="30">mdi-magnify</v-icon>
      <span>Pesquisar</span>
    </v-btn>
    <v-btn value="planos">
      <v-icon size="30">mdi-currency-usd</v-icon>
      <span>Plano</span>
    </v-btn>
    <v-btn to="/chat">
      <v-icon size="30">mdi-chat</v-icon>
      <span>Chat</span>
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
