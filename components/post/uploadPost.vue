<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-textarea
          variant="solo"
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          rows="2"
          rounded="xl"
          bg-color="input_color"
          placeholder="Escreva algo"
          row-height="20"
          color="primary"
        ></v-textarea>
      </v-col>
      <v-col cols="6" class="mt-n4">
        <v-text-field
          bg-color="input_color"
          rounded="xl"
          clearable
          color="primary"
          clear-icon="mdi-close-circle"
          placeholder="Mencione perfis"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="mt-n4">
        <v-combobox
          clearable
          prepend-inner-icon="mdi-earth"
          chips
          density="comfortable"
          multiple
          placeholder="Público"
          rounded="xl"
          color="primary"
          bg-color="input_color"
          :items="['Assinantes', 'Afiliado', 'Exclusivo']"
          variant="solo-inverted"
        ></v-combobox>
      </v-col>
    </v-row>

    <v-row class="mt-n2">
      <v-col v-for="(media, index) in mediaFiles" :key="index" cols="3">
        <v-card  :image="media.url" class="rounded-xl elevation-0" v-if="media.type === 'image'"  width="120" height="120" flat >
          <v-btn size="x-small" class="ma-1 mt-4" icon @click="removeMedia(index)">
          <v-icon color="red" size="16" >mdi-close</v-icon>
        </v-btn>
      </v-card>
      <v-card v-else-if="media.type === 'video'" class="rounded-xl elevation-0" width="120" height="120" flat>
        <v-video  controls width="100%" height="100%">
          <source :src="media.url" type="video/mp4">
        </v-video>
      </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-1 ml-1" align="center">
      <v-btn class="text-capitalize" variant="text" fab @click="$refs.mediaInput.click()">
        <v-icon size="30">mdi-camera</v-icon>
      </v-btn>
    </v-row>

    <input ref="mediaInput" type="file" accept="image/*,video/*" style="display: none" @change="handleMediaUpload">

    <v-btn block class="mt-8 text-capitalize" min-height="40" color="primary">Publicar</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const mediaFiles = ref([]);

const removeMedia = (index) => {
  mediaFiles.value.splice(index, 1);
};

const handleMediaUpload = (event) => {
  const files = event.target.files;

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const mediaType = file.type.startsWith('image') ? 'image' : 'video';
      mediaFiles.value.push({ url: e.target.result, type: mediaType });
    };

    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
</style>
