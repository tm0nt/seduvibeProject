<template>
  <v-bottom-navigation color="buttonNavColor" bg-color="input_color" class="elevation-4">
    <v-btn class="my-btn" to="/analytics">
      <v-icon size="24">mdi-home</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/analytics/wallet">
      <v-icon size="24">mdi-wallet</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/analytics/affiliate">
      <v-icon size="24">mdi-account-group</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/analytics/metrics">
      <v-icon size="24">mdi-file-chart-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style scoped>
.v-btn.my-btn {
  min-width: 15px !important;
}
</style>
