<template>
  <VCard class="rounded-lg" flat height="150">
    <template v-slot:image>
      <VImg eager cover position="center" :src="info.coverPicture">
        <v-card class="ml-4 mt-4 elevation-0" flat color="primary" variant="tonal" width="50" >
          <VBtn @click="changeInfoData.cover = true" class="text-capitalize">
            <v-icon color="primary">mdi-camera</v-icon>
          </VBtn>
        </v-card></VImg
      >
    </template>
  </VCard>

  <v-row align="start" no-gutters>
    <v-col cols="auto" class="mt-2">
      <v-btn
        fab
        color="primary"
        :disabled="fetchData?._rawValue?.social_media[0]?.instagram === null || ''"
        :href="social_media.instagram"
        variant="text"
      >
        <v-icon size="26">mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        fab
        color="primary"
        :disabled="fetchData?._rawValue?.social_media[0]?.instagram === null || ''"
        :href="social_media.telegram"
        class="ml-n4"
        variant="text"
      >
        <v-icon size="26">mdi-send-circle</v-icon>
      </v-btn>
      <v-btn
        fab
        color="primary"
        :href="social_media.twitter"
        :disabled="fetchData?._rawValue?.social_media[0]?.twitter === null || ''"
        class="ml-n4"
        variant="text"
      >
        <v-icon size="26">mdi-twitter</v-icon>
      </v-btn>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <div class="text-center mt-n15">
        <v-menu width="250" height="250">
          <template v-slot:activator="{ props }">
            <VAvatar
              style="border: 3px solid background"
              size="120"
              v-bind="props"
              :image="info.profilePicture"
            ></VAvatar>
          </template>
          <v-card color="background" class="elevation-4 rounded-xl overflow-y-visible">
            <v-card-text>
              <div class="mx-auto text-center">
                <h3>{{ info.nome }}</h3>
                <p class="text-caption mt-n1">@{{ info.user }}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  class="text-capitalize"
                  @click="changeInfoData.profile = true"
                  variant="text"
                  append-icon="mdi-image"
                >
                  Alterar perfil
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  append-icon="mdi-theme-light-dark"
                  class="text-capitalize"
                  variant="text"
                  @click="toggleTheme"
                >
                  Trocar tema
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  append-icon="mdi-share-variant"
                  class="text-capitalize"
                  variant="text"
                  @click="shareProfile.value = true"
                >
                  Compartilhar
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  @click="logout"
                  rounded
                  append-icon="mdi-logout"
                  class="text-capitalize"
                  variant="text"
                >
                  Sair
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto" class="text-caption mt-2">
      <v-chip small class="text-capitalize" color="primary">
        <v-icon color="primary" size="26" class="ma-1">mdi-account</v-icon
        >{{ userSubsCount?.totalUsers }} subs
      </v-chip>
      <!---   <v-btn variant="text" class="ml-n2" color="primary"
        ><v-icon size="26">mdi-heart-outline</v-icon></v-btn
      > -->
    </v-col>
  </v-row>

  <VDialog persistent v-model="shareProfile.value" width="500">
    <VCard color="background" title="Compartilhe seu perfil" class="rounded-xl" flat>
      <template v-slot:prepend>
        <v-icon @click="shareProfile.value = false">mdi-close</v-icon>
      </template>
      <VTextField
        readonly
        bg-color="input_color"
        class="ma-4"
        @click="copyToClipboard"
        label="URL"
        v-model="shareProfile.url"
      >
        <template v-slot:append-inner>
          <v-icon @click="copyToClipboard">mdi-content-copy</v-icon>
        </template>
      </VTextField>
    </VCard>
  </VDialog>

  <VDialog persistent v-model="changeInfoData.cover" width="500">
    <VCard color="background" title="Alterar sua capa" class="rounded-xl" flat>
      <template v-slot:prepend>
        <v-icon @click="changeInfoData.cover = false">mdi-close</v-icon>
      </template>
      <v-form class="ma-4" @submit.prevent="handleFileSubmitCover">
        <v-file-input
          show-size
          bg-color="input_color"
          label="Capa"
          placeholder="Envie sua capa"
          rounded="xl"
          accept="image/*"
          counter
          variant="solo"
          :prepend-icon="false"
          chips
          prepend-inner-icon="mdi-camera"
          @change="handleUploadCover"
        ></v-file-input>

        <VBtn type="submit" class="text-capitalize" block color="primary" min-height="40"
          >Alterar</VBtn
        >
      </v-form>
    </VCard>
  </VDialog>

  <VDialog persistent v-model="changeInfoData.profile" width="500">
    <VCard color="background" title="Alterar seu perfil" class="rounded-xl" flat>
      <template v-slot:prepend>
        <v-icon @click="changeInfoData.profile = false">mdi-close</v-icon>
      </template>
      <v-form class="ma-4" @submit.prevent="handleFileSubmitPicture">
        <v-file-input
          show-size
          label="Perfil"
          placeholder="Envie sua foto de perfil"
          bg-color="input_color"
          rounded="xl"
          accept="image/*"
          @change="handleUploadPicture"
          v-model="PicturesUser.profile"
          counter
          variant="solo"
          :prepend-icon="false"
          chips
          prepend-inner-icon="mdi-camera"
        ></v-file-input>
        <VBtn class="text-capitalize" type="submit" block color="primary" min-height="40"
          >Alterar</VBtn
        >
      </v-form>
    </VCard>
  </VDialog>

  <VDialog persistent v-model="changeInfoData.bio" width="500">
    <VCard color="background" title="Alterar sua descrição" class="rounded-xl" flat>
      <template v-slot:prepend>
        <v-icon @click="changeInfoData.bio = false">mdi-close</v-icon>
      </template>
      <v-form class="ma-4">
        <VTextField
          bg-color="input_color"
          label="Descrição"
          v-model="info.bio"
          placeholder="Descrição"
        ></VTextField>
        <VBtn
          class="text-capitalize"
          @click="changeDescription"
          block
          color="primary"
          min-height="40"
          >Alterar</VBtn
        >
      </v-form>
    </VCard>
  </VDialog>

  <VToolbar flat color="rgb(0,0,0,0)" height="15"></VToolbar>
  <VRow>
    <VCol>
      <div class="text-center">
        <h2 class="text-center">
          {{ info.nome }}<v-icon size="25" class="ma-1" color="primary">mdi-check-decagram</v-icon>
        </h2>
        <p class="text-center mt-n2 text-medium-emphasis text-caption">
          {{ info.bio || "Adicione uma descrição"
          }}<v-icon class="ma-1" @click="changeInfoData.bio = true"
            >mdi-dots-horizontal-circle</v-icon
          >
        </p>
      </div>
    </VCol>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="pill"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </VRow>
</template>
<script setup>
import nuxtStorage from "nuxt-storage";
import { ref } from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();

const changeInfoData = ref({
  cover: false,
  profile: false,
  bio: false,
});

const PicturesUser = ref({
  cover: null,
  profile: null,
});

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

const shareProfile = ref({
  value: false,
  url: "https://seduvibe.com/@lais",
});
const cookie = useCookie("token");
const token = cookie.value;
const social_media = ref({
  instagram: null,
  telegram: null,
  twitter: null,
});
const info = ref({
  nome: null,
  user: null,
  bio: null,
});

const toggleTheme = () => {
  try {
    theme.global.name.value = theme.global.name.value === "dark" ? "light" : "dark";
    nuxtStorage.localStorage.setData("theme", theme.global.name.value);
  } catch (error) {
    console.error("Error during theme toggle:", error);
  }
};

const coverPictureUrl = ref(info.coverPicture);

const removeCoverPicture = () => {
  PicturesUser.cover = null;
  coverPictureUrl.value = null;
};

const logout = () => {
  try {
    showSnackbar("Você saiu da sua conta!", "success");
    setTimeout(() => {
      cookie.value = null;
      nuxtStorage.localStorage.clear();
      navigateTo("/login");
    }, 2000);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const userSubsCount = ref(null);

const countUserSubs = async () => {
  try {
    const { data, error } = await useFetch(
      "https://api.seduvibe.com/subscription/subs_users_count/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    userSubsCount.value = data.value;
  } catch (error) {
    console.error(error);
  }
};

const changeDescription = async () => {
  try {
    const { data } = await useFetch("https://api.seduvibe.com/change_user_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio: info.value.bio,
      }),
    });
    fetchDataFromAPI();
    showSnackbar("Sua descrição foi atualizada!", "success");
    changeInfoData.value.bio = false;
  } catch (error) {
    console.error("Error:", error);
  }
};

const filesPicture = ref(null);
const files = ref(null);

function handleUploadCover(event) {
  files.value = event.target.files;
  console.log(files.value);
}

function handleUploadPicture(event) {
  filesPicture.value = event.target.files;
  console.log(filesPicture.value);
}

async function handleFileSubmitCover() {
  const fd = new FormData();
  if (files.value) {
    Array.from(files.value).forEach((file) => {
      fd.append("profileCover", file);
    });
  }
  const options = {
    method: "POST",
    body: fd,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, error } = await useFetch("https://api.seduvibe.com/uploadCover", options);

  if (data.value) {
    changeInfoData.value.cover = false;
    fetchDataFromAPI();
    showSnackbar("Você alterou sua capa com sucesso!", "success");
  } else {
    console.error("Erro ao enviar imagem:", error);
  }
}

async function handleFileSubmitPicture() {
  const fd = new FormData();
  if (filesPicture.value) {
    Array.from(filesPicture.value).forEach((file) => {
      fd.append("profilePicture", file);
    });
  }
  const options = {
    method: "POST",
    body: fd,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, error } = await useFetch("https://api.seduvibe.com/uploadPicture", options);

  if (data.value) {
    changeInfoData.value.profile = false;
    fetchDataFromAPI();
    showSnackbar("Você alterou sua foto de perfil com sucesso!", "success");
  } else {
    console.error("Erro ao enviar imagem:", error);
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(shareProfile.value.url);
  showSnackbar("Link copiado com sucesso!", "success");
};
const fetchDataFromAPI = async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com/creator_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    countUserSubs();
    social_media.value = {
      instagram: "https://instagram/" + fetchData?._rawValue?.social_media[0]?.instagram,
      telegram: "https://t.me/@" + fetchData?._rawValue?.social_media[0]?.telegram,
      twitter: "https://x.com/" + fetchData?._rawValue?.social_media[0]?.twitter,
    };

    info.value = {
      nome: fetchData?._rawValue?.users[0]?.name,
      user: fetchData?._rawValue?.users[0]?.user,
      bio: fetchData?._rawValue?.users[0]?.bio,
      coverPicture: fetchData?._rawValue?.users[0]?.coverPicture,
      profilePicture: fetchData?._rawValue?.users[0]?.profilePicture,
    };

    console.log("Requisição realizada com sucesso:", fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

fetchDataFromAPI();
</script>
