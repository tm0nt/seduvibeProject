<template>
  <v-tabs align-tabs="center" color="buttonNavColor" bg-color="background" class="rounded-xl">
    <NuxtLink to="/profile/creator">
      <v-btn fab class="ma-2 ml-n4 mr-5">
        <v-icon color="primary" size="30">mdi-arrow-left-bold-circle</v-icon>
      </v-btn>
    </NuxtLink>
    <NuxtLink to="/analytics"><v-tab> <v-icon class="ma-1">mdi-home</v-icon>Home </v-tab></NuxtLink>
    <NuxtLink to="/analytics/wallet">
    <v-tab>
      <v-icon class="ma-1">mdi-wallet</v-icon>
      Carteira
    </v-tab>
    </NuxtLink>
    <NuxtLink to="/analytics/affiliate">
    <v-tab>
      <v-icon class="ma-1">mdi-account-group</v-icon>
      Afiliados
    </v-tab>
    </NuxtLink>
    <NuxtLink to="/analytics/metrics">
    <v-tab>
      <v-icon class="ma-1">mdi-file-chart-outline</v-icon>
      Métricas
    </v-tab>
    </NuxtLink>
  </v-tabs>
</template>
