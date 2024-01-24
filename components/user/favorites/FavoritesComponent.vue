<template>
  <v-app>
    <v-container>
      <h2>Favoritos</h2>
      <p class="text-caption text-medium-emphesis">Estes são seus favoritos</p>
      <v-sheet class="mx-auto">
        <v-slide-group class="pa-4">
          <v-slide-item v-for="(item, index) in favoriteItems" :key="index" class="pa-2">
            <v-row align="center" justify="center">
              <v-col>
                <v-card color="input_color" class="rounded-xl mx-auto my-12" width="200">
                  <v-img cover height="250" :src="item.imageUrl"></v-img>

                  <v-card-item>
                    <v-card-title>{{ item.title }}</v-card-title>

                    <v-card-subtitle>
                      <span class="text-caption text-medium-emphesis me-1">{{
                        item.subtitle
                      }}</span>
                      <v-icon color="primary" icon="mdi-fire-circle" size="small"></v-icon>
                    </v-card-subtitle>
                  </v-card-item>

                  <v-card-text>
                    <v-row align="center" class="mx-0 ma-2">
                      <div>
                        {{ item.description }}
                      </div>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      // Exemplo de dados para os v-cards
      favoriteItems: [
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        {
          imageUrl:
            "https://uploads.metropoles.com/wp-content/uploads/2023/02/14093258/Mel-Maia-13.jpg",
          title: "Mel Maia",
          subtitle: "Em alta",
          description: "Venham me conhecer meus amores <33",
        },
        // Adicione mais itens conforme necessário
      ],
    };
  },
};
</script>
