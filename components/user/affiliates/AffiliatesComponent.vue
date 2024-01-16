<template>
  <v-app>
    <v-container>
      <h2>Afiliados</h2>
      <p class="text-caption text-medium-emphesis">Este é o painel de afiliados</p>
      <v-row align="center" justify="center">
        <v-col>
          <VCol cols="12" md="6" sm="12" xs="12" lg="6">
            <v-card color="background" rounded="xl">
              <v-card-text>
                <v-list bg-color="background">
                  <v-list-subheader>PAINEL</v-list-subheader>
                  <v-list-item
                    bg-color="input_color"
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    color="purple"
                    rounded="shaped"
                    @click="selectComponent(item)"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </VCol>
          <VCol cols="12" md="7" sm="12" xs="12" lg="7">
            <component :is="selectedComponent" />
          </VCol>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    items: [
      { text: "Afiliações ativas", icon: "mdi-account-multiple-check"},
      { text: "Solicitação de afiliação", icon: "mdi-file-document-plus" },
      { text: "Quero me afiliar", icon: "mdi-account-group" },
    ],
    selectedComponent: null,
  }),
};
</script>
