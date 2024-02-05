<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Métricas
          </h2>
          <p class="text-caption text-medium-emphasis mt-n1">Atualizações a todo instante.</p>
          <v-card
            color="input_color"
            rounded="xl"
            class="mt-4 d-flex justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Quantidade de curtidas</p>
                <h3>256&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Quantidade de comentários</p>
                <h3>125&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <p class="text-caption text-medium-emphasis">Visualizações de perfil</p>
                <h3>455&nbsp;<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4" color="input_color" flat>
            <v-container class="ma-2">
              <h4>Assinaturas timeline</h4>
              <p class="text-caption text-medium-emphasis">
                Veja sua progressão com seus assinantes
              </p>
            </v-container>
          </v-card>
          <v-card class="rounded-xl mt-4" color="input_color" flat>
            <v-container class="ma-2">
              <h4>Faturamento timeline</h4>
              <p class="text-caption text-medium-emphasis">
                Acompanhe a progressão do seu faturamento
              </p>
            </v-container>
          </v-card>
          <v-row>
            <v-col>
              <v-card class="rounded-xl mt-4" color="input_color" flat>
                <v-container class="ma-2">
                  <h4>Tipo de conteúdo</h4>
                  <p class="text-caption mb-2">Conteúdos consumidos</p>

                  <!-- Cartão -->
                  <v-row align="center">
                    <v-col cols="6"> Assinantes </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">60%</span>
                    </v-col>
                  </v-row>

                  <!-- Pix -->
                  <v-row align="center">
                    <v-col cols="6"> Afiliados </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">30%</span>
                    </v-col>
                  </v-row>

                  <!-- Cripto -->
                  <v-row align="center">
                    <v-col cols="6"> Exclusivo </v-col>
                    <v-col cols="6" class="text-right">
                      <span class="ml-auto">10%</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-card class="rounded-xl mt-4" color="input_color" flat>
                <v-container class="ma-2">
                  <h4>Ranking</h4>
                  <p class="text-caption text-medium-emphasis">Seus melhores</p>
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                  <v-chip class="mt-2" color="primary" size="large" prepend-icon="mdi-medal"
                    >Manoel Gomes</v-chip
                  >
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
    <v-toolbar flat height="50" color="rgb(0,0,0,0)"></v-toolbar>
  </v-app>
</template>
<script setup></script>
<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
