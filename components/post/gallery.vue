<template>
    <div>
      <Gallery v-if="!block" />
      <guardContent v-else />
    </div>
  </template>
  
  <script>
  import Gallery from "../../components/post/galleryViewUser.vue";
  import guardContent from "../../components/GuardContent.vue";
  
  export default {
    components: {
      Gallery,
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
  