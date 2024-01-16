<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-textarea
          variant="solo"
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          rows="2"
          rounded="xl"
          bg-color="input_color"
          placeholder="Escreva algo"
          row-height="20"
          color="primary"
        ></v-textarea>
      </v-col>
      <v-col cols="6" class="mt-n4">
        <v-text-field
          bg-color="input_color"
          rounded="xl"
          clearable
          color="primary"
          clear-icon="mdi-close-circle"
          placeholder="Mencione perfis"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="mt-n4">
        <v-combobox
          clearable
          prepend-inner-icon="mdi-earth"
          chips
          density="comfortable"
          multiple
          placeholder="Público"
          rounded="xl"
          color="primary"
          bg-color="input_color"
          :items="['Assinantes', 'Afiliado', 'Exclusivo']"
          variant="solo-inverted"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="mt-n1 ml-1" align="center">
      <v-btn class="text-capitalize" variant="text" fab>
        <v-icon size="30">mdi-image</v-icon>
      </v-btn>
      <v-btn class="text-capitalize" variant="text" fab>
        <v-icon size="30">mdi-microphone</v-icon>
      </v-btn>
    </v-row>
    <v-btn block class="mt-8 text-capitalize" min-height="40" color="primary">Publicar</v-btn>
  </v-container>
</template>
