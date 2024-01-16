<template>
  <v-row align="center" justify="center">
    <v-chip-group selected-class="primary" color="primary" mandatory filter>
      <v-chip>Assinantes</v-chip>
      <v-chip>Exclusivo</v-chip>
      <v-chip>Afiliados</v-chip>
    </v-chip-group>
  </v-row>
  <v-row>
    <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
      <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>
