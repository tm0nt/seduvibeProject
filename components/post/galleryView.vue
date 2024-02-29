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
        Afiliados      </v-chip>
      <v-chip :color="isSelectedFilter(3) ? 'purple' : ''" class="mr-2" :value="3">
        Exclusivo
      </v-chip>
    </v-chip-group>
  </v-row>

  <v-row v-if="hasFilteredPosts">
    <v-col v-for="n in filteredPosts" :key="n.id" class="d-flex child-flex" rounded="xl" cols="4">
      <template v-if="isVideo(n.content)">
        <video :key="n.content" :width="200" controls>
          <source :src="n.content" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-else>
        <v-img :src="n.content" aspect-ratio="1" cover class="bg-grey-lighten-2" rounded="xl">
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
