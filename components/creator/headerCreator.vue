<template>
  <VCard class="rounded-lg" height="150">
    <template v-slot:image>
      <VImg
        eager
        cover
        position="center"
        src="https://istoe.com.br/wp-content/uploads/2023/09/mel-maia-reproducao-instagram.jpg"
      ></VImg>
    </template>
  </VCard>

  <v-row align="start" no-gutters>
    <v-col cols="4" class="mt-2">
      <v-btn fab color="primary" class="" variant="text">
        <v-icon size="26">mdi-instagram</v-icon>
      </v-btn>
      <v-btn fab color="primary" class="ml-n4" variant="text">
        <v-icon size="26">mdi-send-circle</v-icon>
      </v-btn>
      <v-btn fab color="primary" class="ml-n4" variant="text">
        <v-icon size="26">mdi-twitter</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4">
      <div class="text-center mt-n15">
        <v-menu width="180" height="250" rounded>
          <template v-slot:activator="{ props }">
            <VAvatar
              style="border: 4px solid background"
              size="130"
              v-bind="props"
              image="https://s2-marieclaire.glbimg.com/CLHEFcw4E8bb7Om13qj8giDhz9g=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_51f0194726ca4cae994c33379977582d/internal_photos/bs/2023/Y/7/bWmMoOTfqO2RddlXWnbA/395075330-18400085974018181-2712285434829452427-n.jpg"
            ></VAvatar>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <h3>Mel Maia</h3>
                <p class="text-caption mt-1">@melmaia</p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded class="text-capitalize" variant="text" append-icon="mdi-image">
                  Alterar perfil
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  append-icon="mdi-theme-light-dark"
                  class="text-capitalize"
                  variant="text"
                >
                  Trocar tema
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  append-icon="mdi-share-variant"
                  class="text-capitalize"
                  variant="text"
                >
                  Compartilhar
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded append-icon="mdi-logout" class="text-capitalize" variant="text">
                  Sair
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-col>
    <v-col cols="4" class="text-caption mt-2">
      <v-chip small class="text-capitalize ml-4" color="primary"
        ><v-icon color="primary" class="ma-1">mdi-heart</v-icon>265</v-chip
      >
      <!---   <v-btn variant="text" class="ml-n2" color="primary"
        ><v-icon size="26">mdi-heart-outline</v-icon></v-btn
      > -->
    </v-col>
  </v-row>

  <VToolbar flat color="rgb(0,0,0,0)" height="15"></VToolbar>
  <VRow>
    <VCol>
      <div class="text-center">
        <h2 class="text-center">Mel Maia<v-icon size="25" class="ma-1" color="primary">mdi-check-decagram</v-icon></h2>
        <p class="text-center mt-n2 text-medium-emphasis text-caption">
          Venham me conhecer meus amoressss s2<v-icon class="ma-1"
            >mdi-dots-horizontal-circle</v-icon
          >
        </p>
          <v-chip color="primary" class="ma-1" bg-color="primary" item-color="primary" prepend-icon="mdi-sign">2.6 mil assinantes</v-chip>
      </div>
    </VCol>
  </VRow>
</template>
