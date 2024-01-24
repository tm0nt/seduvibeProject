<template>
  <v-app>
    <v-container>
      <v-slide-group>
        <v-slide-item v-for="(item, index) in favoriteItems" :key="index">
          <v-col>
            <v-badge color="success">
              <v-icon size="x-large"></v-icon>
              <v-card color="input_color" class="rounded-xl" width="170">
                <v-img cover :src="item.imageUrl"></v-img>

                <v-card-item>
                  <v-card-title>{{ item.title }}</v-card-title>

                  <v-card-subtitle>
                    <span class="text-caption text-medium-emphesis me-1">{{ item.subtitle }}</span>
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
            </v-badge>
          </v-col>
        </v-slide-item>
      </v-slide-group>
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
