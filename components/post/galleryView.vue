<template>
  <v-row v-if="hasFilteredPosts">
    <v-col v-for="n in filteredPosts" :key="n.id" class="d-flex child-flex" cols="4">
      <template v-if="isVideo(n.content)">
        <video :key="n.content" :width="200" controls>
          <source :src="n.content" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-else>
        <v-img
          :src="n.content"
          aspect-ratio="1"
          rounded="xl"
          cover
          class="bg-grey-lighten-2"
          @click="redirectTo(n.id)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </template>
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col>
      <p class="text-caption text-medium-emphasis text-center">Nenhuma publicação encontrada</p>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from "vue";
import { useIdStore } from "~/store/id";

const storeId = useIdStore();
const idUser = storeId.id;
const cookie = useCookie("token");
const token = cookie.value;

const selectedFilter = ref(0);
const { data: post } = await useFetch(`https://api.seduvibe.com.br/posts/list_all/${idUser}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const redirectTo = async (id) => {
  return navigateTo(`/post/${id}`);
};
const posts = ref(post._rawValue.reverse());

const isVideo = (url) => {
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  const ext = url.slice(url.lastIndexOf(".") + 1);
  return videoExtensions.includes(ext.toLowerCase());
};

const isSelectedFilter = (filterValue) => selectedFilter.value === filterValue;

const filteredPosts = computed(() => {
  return selectedFilter.value === 0
    ? posts.value
    : posts.value.filter((post) => post.tagId === selectedFilter.value);
});

const hasFilteredPosts = computed(() => filteredPosts.value.length > 0);
</script>

<style scoped>
.video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2em;
}
</style>
