<template>
  <v-bottom-navigation color="primary" bg-color="background" class="elevation-8">
    <div v-if="token">
      <v-btn class="my-btn" to="/home">
        <v-icon size="26">mdi-home</v-icon>
      </v-btn>
      <v-btn class="my-btn" to="/notification">
        <v-icon size="26">mdi-heart</v-icon>
      </v-btn>
      <v-btn to="/search" class="my-btn">
        <v-icon size="26">mdi-magnify</v-icon>
      </v-btn>
      <v-btn to="/payment" class="my-btn" v-if="creatorId === 1">
        <v-icon size="26">mdi-currency-usd</v-icon>
      </v-btn>
      <!---    <v-btn to="/chat" class="my-btn">
      <v-icon size="26">mdi-chat</v-icon>
    </v-btn> -->
      <v-btn to="/profile" class="my-btn">
        <v-icon size="26">mdi-account</v-icon>
      </v-btn>
    </div>
      <v-img v-else max-width="40" src="https://i.imgur.com/BrTfYSp.png"></v-img>
  </v-bottom-navigation>
</template>
<script setup>
import { useIdStore } from "~/store/id";
const cookie = useCookie("token");
const token = cookie.value;
const idStore = useIdStore();
const creatorId = idStore.creatorId;
</script>
<style scoped>
.v-btn.my-btn {
  min-width: 15px !important;
}
</style>
