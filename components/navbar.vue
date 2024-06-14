<template>
  <v-bottom-navigation color="primary" bg-color="background" class="elevation-8">
    <div v-show="token">
      <v-btn class="my-btn" to="/home">
        <v-icon size="26">mdi-home</v-icon>
      </v-btn>
      <v-btn class="my-btn" to="/notification">
        <v-icon size="26">mdi-heart</v-icon>
      </v-btn>
      <v-btn to="/search" class="my-btn">
        <v-icon size="26">mdi-magnify</v-icon>
      </v-btn>
      <v-btn v-show="creatorId == 1" to="/payment" class="my-btn">
        <v-icon size="26">mdi-currency-usd</v-icon>
      </v-btn>
      <v-btn to="/profile" class="my-btn">
        <v-icon size="26">mdi-account</v-icon>
      </v-btn>
    </div>
    <v-img v-show="!token" max-width="40" src="https://i.imgur.com/BrTfYSp.png"></v-img>
  </v-bottom-navigation>
</template>

<script setup>
import { useIdStore } from "~/store/id";
import { ref, watch, computed } from "vue";

const cookie = useCookie("token");
const token = cookie.value;
const idStore = useIdStore();
const creatorId = ref(idStore.creatorId);

watch(
  () => idStore.creatorId,
  (newValue) => {
    creatorId.value = newValue;
  }
);

const showPaymentButton = computed(() => creatorId.value === 1);
</script>

<style scoped>
.v-btn.my-btn {
  min-width: 15px !important;
}
</style>
