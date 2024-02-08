<template>
    <div>
      <Publicacoes v-if="!block" />
      <guardContent v-else />
    </div>
  </template>
  
  <script>
  import Publicacoes from "../../components/post/postView.vue";
  import guardContent from "../../components/GuardContent.vue";
  
  export default {
    components: {
      Publicacoes,
      guardContent,
    },
    data() {
      return {
        block: true, 
      };
    },
  };
  </script>
  
  <script setup>
  </script>
  