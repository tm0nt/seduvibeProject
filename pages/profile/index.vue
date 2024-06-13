<template></template>
<script setup>
import { ref } from "vue";

const redirectUser = ref(null);

try {
  const cookie = useCookie("token");
  const token = cookie.value;

  const { data: creator } = await useAsyncData("id", () =>
    $fetch("https://api.seduvibe.com.br", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  if (creator._rawValue?.users[0].creator === 1) {
    redirectUser.value = "/profile/creator";
  } else {
    redirectUser.value = "/profile/user";
  }
  navigateTo(redirectUser.value);
} catch (e) {
  console.error("Ocorreu um erro durante a execução do script:", e);
}
</script>
