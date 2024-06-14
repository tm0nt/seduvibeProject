<template>
  <v-app>
    <navbar-view />
    <v-container>
      <v-row no-gutters align="center" class="mt-n2">
        <v-col cols="12" md="8" offset-md="2">
          <header-creator />
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col class="align-center text-center mt-6 justify-center d-flex">
              <v-chip-group color="primary" mandatory filter v-model="selectedTab">
                <v-chip value="0">Meu perfil</v-chip>
                <v-chip value="1">Assinaturas</v-chip>
                <v-chip value="2">Favoritos</v-chip>
                <v-chip value="3">Pagamentos</v-chip>
                <v-chip value="4">Afiliados</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-6">
              <div v-if="selectedTab === null">
                <p class="text-caption text-medium-emphasis text-center">
                  Por favor, selecione uma opção acima.&nbsp;<v-icon color="primary"
                    >mdi-chevron-up-circle</v-icon
                  >
                </p>
              </div>
              <component v-else :is="currentComponent" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>

</script>
<script>
import HeaderCreator from "../../../components/user/headerCreator";
import ProfileComponent from "../../../components/user/profile/ProfileComponent";
import SubscriptionsComponent from "../../../components/user/subscriptions/SubscriptionsComponent";
import FavoritesComponent from "../../../components/user/favorites/FavoritesComponent";
import PaymentsComponent from "../../../components/user/payments/PaymentsComponent";
import AffiliatesComponent from "../../../components/user/affiliates/AffiliatesComponent";
import NavbarView from "../../../components/navbar_user";

export default {
  data() {
    return {
      selectedTab: null,
    };
  },
  computed: {
    currentComponent() {
      switch (this.selectedTab) {
        case "0":
          return ProfileComponent;
        case "1":
          return SubscriptionsComponent;
        case "2":
          return FavoritesComponent;
        case "3":
          return PaymentsComponent;
        case "4":
          return AffiliatesComponent;
        default:
          return 0;
      }
    },
  },
  components: {
    HeaderCreator,
    NavbarView,
    ProfileComponent,
    SubscriptionsComponent,
    FavoritesComponent,
    PaymentsComponent,
    AffiliatesComponent,
  },
};
</script>
