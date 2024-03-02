<template>
  <v-row align="center" justify="center">
    <v-chip-group filter v-model="selectedFilter">
      <v-chip :color="isSelectedFilter(0) ? 'purple' : ''" class="mr-2" :value="0">
        Tudo
      </v-chip>
      <v-chip :color="isSelectedFilter(1) ? 'purple' : ''" class="mr-2" :value="1">
        Assinantes
      </v-chip>
      <v-chip :color="isSelectedFilter(2) ? 'purple' : ''" class="mr-2" :value="2">
        Afiliados
      </v-chip>
      <v-chip :color="isSelectedFilter(3) ? 'purple' : ''" class="mr-2" :value="3">
        Exclusivo
      </v-chip>
    </v-chip-group>
  </v-row>

  <v-row v-if="hasFilteredPosts">
    <v-col v-for="n in filteredPosts" :key="n.id" class="child-flex" cols="4">
      <NuxtLink :to="'/post/'+n.id">
      <v-card class="elevation-0 mb-n2" flat rounded="xl" width="250">
        <v-img v-if="isVideo(n.content)" cover :src="n.content">
          <v-icon class="video-icon">mdi-play</v-icon>
        </v-img>
        <v-img aspect-ratio="0.85" class="ml-1" v-else cover :src="n.content"></v-img>
      </v-card>
    </NuxtLink>
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
const { data: post } = await useFetch(`https://api.seduvibe.com/posts/list_all/${idUser}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
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
