<template>
  <v-container fluid>
    <v-form @submit.prevent="handleFileSubmit">
      <v-row>
        <v-col cols="12">
          <v-textarea
            variant="solo"
            auto-grow
            clearable
            clear-icon="mdi-close-circle"
            rows="2"
            rounded="xl"
            class="mb-n4"
            v-model="description"
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
            v-model="mention"
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
            placeholder="Público"
            :items="[{ key: 'Assinantes', value: '1' }, { key: 'Afiliados', value: '2' },{key: 'Exclusivo', value:'3'}]"
            item-title="key"
            item-value="value"
            rounded="xl"
            color="primary"
            v-model="publicVisible"
            bg-color="input_color"
            variant="solo"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row class="mt-n2">
        <v-col v-for="(media, index) in mediaFiles" :key="index" cols="3">
          <v-card
            :image="media.url"
            class="rounded-xl elevation-0"
            v-if="media.type === 'image'"
            width="120"
            height="120"
            flat
          >
            <v-btn size="x-small" class="ma-1 mt-4" icon @click="removeMedia(index)">
              <v-icon color="red" size="16">mdi-close</v-icon>
            </v-btn>
          </v-card>
          <v-card
            v-else-if="media.type === 'video'"
            class="rounded-xl elevation-0"
            width="120"
            height="120"
            flat
          >
            <v-video controls width="100%" height="100%">
              <source :src="media.url" type="video/mp4" />
            </v-video>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-1 ml-1" align="center">
        <v-file-input label='Envie uma mídia' chips rounded="xl" variant="solo" bg-color="input_color" prepend-inner-icon="mdi-camera" prepend-icon=""  type='file' @change="handleMediaUpload" accept="image/*,video/*"  hide-input></v-file-input>
      
      </v-row>
      <v-row class="mt-4">
  <v-col v-for="(preview, index) in previewFiles" :key="index" cols="3">
    <v-card
      :image="preview.url"
      class="rounded-xl elevation-0"
      v-if="preview.type === 'image'"
      width="120"
      height="120"
      flat
    >
      <v-btn size="x-small" class="ma-1 mt-4" icon @click="removeFile(index)">
        <v-icon color="red" size="16">mdi-close</v-icon>
      </v-btn>
    </v-card>
    <v-card
      v-else-if="preview.type === 'video'"
      class="rounded-xl elevation-0"
      width="120"
      height="120"
      flat
    >
      <!-- Use um ícone diferente para vídeos (por exemplo, mdi-play) -->
      <v-icon @click="playVideo(preview.url)" class="ma-1 mt-4" size="48" color="primary">mdi-play</v-icon>
      <v-btn size="x-small" class="ma-1 mt-4" icon @click="removeFile(index)">
        <v-icon color="red" size="16">mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-col>
</v-row>

      <v-btn
        block
        class="mt-8 text-capitalize"
        min-height="40"
        type="submit"
        color="primary"
        :loading="loading"
      >
        Publicar
      </v-btn>
    </v-form>
  <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const cookie = useCookie("token");
const token = cookie.value;



const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 4000,
  };
};

const removeFile = (index) => {
  mediaFiles.value.splice(index, 1);  // Remove o arquivo da lista de mídias
  previewFiles.value = [...mediaFiles.value];  // Atualiza a lista de previews
};


const previewFiles = ref([]);
const publicVisible = ref(null);
const description = ref(null);
const mention = ref(null);
const mediaFiles = ref([]);
const files = ref(null);
const loading = ref(false);

const removeMedia = (index) => {
  mediaFiles.value.splice(index, 1);
};

const handleMediaUpload = async (event) => {
  files.value = event.target.files;

  previewFiles.value = []; 

  try {
    await Promise.all(
      Array.from(files.value).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const mediaType = file.type.startsWith("image") ? "image" : "video";
            previewFiles.value.push({ url: e.target.result, type: mediaType });
            resolve();
          };

          reader.readAsDataURL(file);
        });
      })
    );
  } catch (error) {
    console.error("Erro ao carregar a mídia:", error);
  }
  
  // Restante do código...
};




async function handleFileSubmit() {
  loading.value = true;

  try {
    const fd = new FormData();

    if (files.value) {
      Array.from(files.value).forEach((file) => {
        console.log("Appending content:", file);
        fd.append("content", file);

        console.log("Appending description:", description.value);
        fd.append("description", description.value);
        fd.append("mention", mention.value);
        console.log("Appending mention:", mention.value);
        fd.append("tagId", 1);
      });
    } else {
      console.error("No files selected");
      return; // Se nenhum arquivo for selecionado, pare a execução da função
    }

    console.log("FormData before fetch:", fd);

    const options = {
      method: "POST",
      body: fd,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data, error, pending } = await useFetch("https://api.seduvibe.com/posts/create_post", options);

    console.log("Response data:", data);
    console.log("Response error:", error);

      loading.value = false;
      if (data.value) {
        showSnackbar("Você acabou de publicar!", "success");
        loading.value = false;
      } else {
        showSnackbar("Ocorreu um erro!", "error");
        loading.value = false;
        console.error("Erro ao enviar imagem:", error);
      }
  } catch (e) {
    console.error("Error during fetch:", e);
  }
}
</script>

<style scoped>
</style>
