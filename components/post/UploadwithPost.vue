<template>
  <uploadView />
  <createPost />
</template>

<script setup></script>

<script>
import createPost from "../../../components/post/createPost.vue";
import uploadView from "../../../components/post/uploadPost.vue";

export default {
  components: {
    uploadView,
    createPost,
  },
};
</script>
