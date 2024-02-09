<template>
  <v-bottom-navigation color="primary" bg-color="background" class="elevation-8">
    <v-btn class="my-btn" to="/profile/creator/analytics">
      <v-icon size="26">mdi-home</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/profile/creator/analytics/wallet">
      <v-icon size="26">mdi-wallet</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/profile/creator/analytics/affiliate">
      <v-icon size="26">mdi-account-group</v-icon>
    </v-btn>
    <v-btn class="my-btn" to="/profile/creator/analytics/metrics">
      <v-icon size="26">mdi-file-chart-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style scoped>
.v-btn.my-btn {
  min-width: 15px !important;
}
</style>
