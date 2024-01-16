<template>
  <v-row align="center" justify="center">
    <v-chip-group selected-class="primary" color="primary" mandatory filter>
      <v-chip>Tudo</v-chip>
      <v-chip>Imagens</v-chip>
      <v-chip>Vídeos</v-chip>
    </v-chip-group>
    <v-card class="rounded-xl elevation-4 mt-4" width="600" color="postBackground">
      <v-card-title class="d-flex align-center">
        <v-avatar
          size="50"
          image="https://midias.correiobraziliense.com.br/_midias/jpg/2023/09/29/800x600/1_mel_maia_3_2_1024x768-29804087.jpg"
        >
        </v-avatar>

        <!-- Nome ao lado do avatar -->
        <div class="ml-2">
          <span class="text-h6">Lais</span>
          <v-spacer class="mb-n4"></v-spacer>
          <span class="text-caption text-medium-emphasis">@lais</span>
        </div>

        <v-spacer></v-spacer>

        <!-- Botão de menu (seu código existente) -->
        <p class="text-caption text-medium-emphasis mt-4">1d</p>
        <v-menu top :offset-x="true">
          <v-list-item rounded>
            <v-list-item-title>
              <a class="text-caption">
                <v-icon color="red" size="16">mdi-delete</v-icon>
                &nbsp;Apagar
              </a>
            </v-list-item-title>
          </v-list-item>
        </v-menu>
      </v-card-title>
      <v-card-text class="text-justify mt-5" color="">
        <div>
          <p>Posaaaaaaaatagem teste</p>
          <v-spacer></v-spacer>
          <template>
            <v-divider class="mt-2"></v-divider>

            <v-chip variant="outlined" color="primary" class="mr-2 mt-2">
              <template> @lais </template>
            </v-chip>
          </template>
        </div>
      </v-card-text>
      <v-img
        width="100%"
        src="https://midias.correiobraziliense.com.br/_midias/jpg/2023/09/29/800x600/1_mel_maia_3_2_1024x768-29804087.jpg"
        class="cursor-pointer mb-n10"
      ></v-img>

      <v-card-actions class="mt-8">
        <v-container>
          <v-btn color="primary" icon class="mr-5">
            <v-icon> mdi-heart-outline </v-icon>
            &nbsp;10
          </v-btn>
          <v-btn color="primary" icon>
            <v-icon>mdi-comment-outline</v-icon>
            &nbsp;10
          </v-btn>
        </v-container>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card class="overflow-auto elevation-0 mb-4" flat color="postBackground" height="80">
        <v-card-text class="commentList mb-n6">
          <v-avatar size="30">
            <v-img
              cover
              src="https://midias.correiobraziliense.com.br/_midias/jpg/2023/09/29/800x600/1_mel_maia_3_2_1024x768-29804087.jpg"
            ></v-img>
          </v-avatar>
          <b>&nbsp;&nbsp;Lais:</b>
          Testeee
          <v-icon class="ml-auto" size="16">mdi-close</v-icon>
        </v-card-text>
      </v-card>
      <v-card-text>
        <v-text-field
          class="mt-5"
          placeholder="Faça um comentário"
          bg-color="input_color"
          lazy-validation
          color="primary"
          append-inner-icon="mdi-send"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-row>
</template>
