<template>
  <v-app>
    <v-container>
      <v-slide-group>
        <v-slide-item v-for="(item, index) in affiliateActive" :key="index">
          <v-col>
            <v-badge color="success">
              <v-icon size="x-large"></v-icon>
              <v-card color="input_color" class="rounded-xl" width="170">
                <v-img cover :src="item.profilePicture"></v-img>

                <v-card-item>
                  <v-card-title>{{ item.creator }}</v-card-title>

                  <v-card-subtitle>
                    <span class="text-caption text-medium-emphesis me-1">D0 - {{ formatDate(item.createdAt) }}</span>
                    <v-icon color="primary" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0 ma-2">
                    <div>
                      {{ item.bio }}
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-badge>
          </v-col>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("pt-BR", options);
  return formattedDate;
};
const cookie = useCookie("token");
const token = cookie.value;

const affiliateActive = ref(null);

onMounted(async () => {
  try {
    const { data: fetchData } = await useFetch("https://api.seduvibe.com/afiliates/user-affiliate-requests-approved", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    affiliateActive.value = fetchData._rawValue;
    console.log(fetchData);
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
});

</script>
