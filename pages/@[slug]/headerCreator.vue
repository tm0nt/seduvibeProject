<template>
  <VCard class="rounded-lg" flat height="150">
    <template v-slot:image>
      <VImg cover :src="profileFetch?.userData?.coverPicture"></VImg>
    </template>
  </VCard>

  <v-row align="start" no-gutters>
    <v-col cols="auto" class="mt-2">
      <v-btn
        fab
        :disabled="fetchData?._rawValue?.social_media[0]?.instagram === null || ''"
        color="primary"
        :href="social_media?.instagram?.url"
        variant="text"
      >
        <v-icon size="26">mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        fab
        :disabled="fetchData?._rawValue?.social_media[0]?.telegram === null || ''"
        color="primary"
        :href="social_media?.telegram?.url"
        class="ml-n4"
        variant="text"
      >
        <v-icon size="26">mdi-send-circle</v-icon>
      </v-btn>
      <v-btn
        fab
        :disabled="fetchData?._rawValue?.social_media[0]?.twitter === null || ''"
        color="primary"
        :href="social_media?.twitter?.url"
        class="ml-n4"
        variant="text"
      >
        <v-icon size="26">mdi-twitter</v-icon>
      </v-btn>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <div class="text-center mt-n15">
        <v-menu width="250" height="180">
          <template v-slot:activator="{ props }">
            <VAvatar
              style="border: 4px solid background"
              size="130"
              v-bind="props"
              :image="profileFetch?.userData?.profilePicture"
            ></VAvatar>
          </template>
          <v-card color="background" class="elevation-4 rounded-xl overflow-y-visible">
            <v-card-text>
              <div class="mx-auto text-center">
                <h3>{{ profileFetch?.userData?.name }}</h3>
                <p class="text-caption mt-n1">@{{ route.params.slug }}</p>
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
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-col>
    <v-spacer></v-spacer>

    <v-col cols="auto" class="text-caption mt-2 ml-n2">
      <v-btn fab variant="text" color="primary" @click="toggleFavorite(profileFetch?.userData?.id)">
        <v-icon size="26">
          {{ isFavorite ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon></v-btn
      >
      <v-btn fab variant="text" class="ml-n4" color="primary" :disabled="true"
        ><v-icon size="26">mdi-chat</v-icon></v-btn
      >
      <v-btn fab variant="text" class="ml-n4" @click="donationVisible" color="primary"
        ><v-icon size="26">mdi-gift</v-icon></v-btn
      >
    </v-col>
  </v-row>

  <VDialog persistent v-model="shareProfile.value" width="500">
    <VCard color="background" title="Compartilhe" class="rounded-xl" flat>
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

  <VToolbar flat color="rgb(0,0,0,0)" height="15"></VToolbar>
  <VRow>
    <VCol>
      <div class="text-center">
        <h2 class="text-center">
          {{ profileFetch?.userData?.name
          }}<v-icon size="25" class="ma-1" color="primary">mdi-check-decagram</v-icon>
        </h2>
        <p class="text-center mt-n2 text-medium-emphasis text-caption">
          {{ profileFetch?.userData?.bio }}
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
  <VDialog v-model="donation.visible" width="600" persistent>
    <v-card color="background" class="elevation-6 rounded-xl" flat>
      <v-card-title><v-icon @click="donation.visible = false">mdi-close</v-icon></v-card-title>

      <v-card-text class="text-center">
        Envie um presente para {{ profileFetch?.userData?.name }}
        <v-row align="center" justify="center" class="mt-2">
          <v-col cols="6">
            <v-text-field
              placeholder="Valor"
              prepend-inner-icon="mdi-coin"
              label="Valor"
              v-model="valueDonate"
              type="number"
              hide-spin-buttons
              bg-color="input_color"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <PaymentMethod />
    </v-card>
  </VDialog>
</template>
<script>
import PaymentMethod from "../../components/creator/paymentMethods/index.vue";

export default {
  components: {
    PaymentMethod,
  },
};
</script>
<script setup>
import { useIdStorePublic } from "~/store/public";
import nuxtStorage from "nuxt-storage";
import { idPayment } from "~/store/payment";
import { ref } from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();
const isFavorite = ref(false);
const userIdPublic = useIdStorePublic();
const valueDonate = ref(null);
const idPaymentStore = idPayment();

watch(valueDonate, (newValue) => {
  idPaymentStore.setAmount = newValue;
});
const toggleFavorite = async (id) => {
  try {
    if (isFavorite.value) {
      await removeFromFavorites(id);
      showSnackbar("Removido dos favoritos!", "error");
    } else {
      await addToFavorites(id);
      showSnackbar("Adicionado aos favoritos!", "success");
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    console.error("Erro ao favoritar/desfavoritar:", error);
  }
};

// Remover
const removeFromFavorites = async (id) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/unlike/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const donationVisible = async () => {
  idPaymentStore.setSubsId("donation");
  donation.value.visible = true;
};
// Adicionar
const addToFavorites = async (id) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/like/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};
// Verificar
const checkFavorites = async (id) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/is_favorite/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    isFavorite.value = data?.isFavorite;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});

const subscriptionsList = ref({
  mensal: null,
  tri: null,
  sem: null,
  anual: null,
});

const donation = ref({
  visible: false,
});

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 4000,
  };
};

const cookie = useCookie("token");
const token = cookie.value;

const toggleTheme = () => {
  try {
    theme.global.name.value = theme.global.name.value === "dark" ? "light" : "dark";
    nuxtStorage.localStorage.setData("theme", theme.global.name.value);
  } catch (error) {
    console.error("Error during theme toggle:", error);
  }
};

const social_media = ref({
  instagram: {
    user: null,
    url: null,
  },
  telegram: {
    user: null,
    url: null,
  },
  twitter: {
    user: null,
    url: null,
  },
});

watchEffect(() => {
  social_media.value.instagram.url = social_media.value.instagram.user
    ? `https://instagram.com/${social_media.value.instagram.user}`
    : null;

  social_media.value.telegram.url = social_media.value.telegram.user
    ? `https://t.me/@${social_media.value.telegram.user}`
    : null;

  social_media.value.twitter.url = social_media.value.twitter.user
    ? `https://x.com/${social_media.value.twitter.user}`
    : null;
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(shareProfile.value.url);
  showSnackbar("Link copiado com sucesso!", "success");
};
const route = useRoute();
const user = ref(route.params.slug);
const profileFetch = ref(null);

const fetchData = async (userName) => {
  try {
    const data = await $fetch(`https://api.seduvibe.com/list_creator/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    checkFavorites(data?.userData?.id);
    profileFetch.value = data;
    userIdPublic.setId(profileFetch.value.userData.id);
    social_media.value.instagram.user = profileFetch.value.userData.socialMedia.instagram;
    social_media.value.twitter.user = profileFetch.value.userData.socialMedia.twitter;
    social_media.value.telegram.user = profileFetch.value.userData.socialMedia.telegram;
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const shareProfile = ref({
  value: false,
  url: "https://seduvibe.com/@" + route.params.slug,
});
fetchData(user.value);
</script>
