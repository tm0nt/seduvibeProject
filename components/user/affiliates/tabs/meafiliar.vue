<template>
  <v-app>
    <v-container>
      <v-slide-group>
        <v-slide-item v-for="(item, index) in favoriteItems" :key="index">
          <v-col>
            <v-card color="input_color" class="rounded-xl" width="205" @click="openDialog = true">
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
          </v-col>
        </v-slide-item>
      </v-slide-group>
    </v-container>
    <v-dialog v-model="openDialog" width="600" persistent>
      <v-card class="rounded-xl elevation-6" flat>
        <v-card-title><v-icon @click="openDialog = false">mdi-close</v-icon></v-card-title>
        <v-card-text class="text-center">
          <v-card
            prepend-icon="mdi-info"
            title="Tutorial"
            class="mb-4"
            subtitle="Assista para entender o funcionamento do sistema."
            rounded="xl"
            variant="tonal"
            link
            color="primary"
          ></v-card>
          <v-card
            prepend-avatar="https://s2.glbimg.com/NOeJtcflf8-o3Ik_GL7XmQ5e9UI=/smart/e.glbimg.com/og/ed/f/original/2021/11/25/melissamelmaia-260929933_273406538180340_4943085334324297278_n.jpg"
            class="mx-auto"
            max-width="500"
            subtitle="@melmaia"
            title="Mel Maia"
          >
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">589 postagens</v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">Valor R$ 10,00</v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">Comissão 50%</v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-form>
            <v-text-field
              label="Usuário para checkout"
              bg-color="input_color"
              color="primary"
              prepend-inner-icon="mdi-at"
            ></v-text-field>
            <v-text-field
              label="Descrição"
              bg-color="input_color"
              class="mt-n2"
              color="primary"
              prepend-inner-icon="mdi-text"
            ></v-text-field>
            <v-btn color="primary" class="text-capitalize" block>Enviar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
const openDialog = ref(false);
</script>
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
