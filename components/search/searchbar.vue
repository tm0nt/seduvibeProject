<template>
    <v-container fluid>
      <h2>Faça uma pesquisa</h2>
      <p class="mt-n2 text-caption text-medium-emphasis">Procure pelo seus criadores</p>
      <v-text-field
        v-model="searchText"
        placeholder="Digite algo"
        @input="searchUsers"
        class="mt-5 elevation-0"
        bg-color="input_color"
        >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
     

      <v-card v-if="searchText?.length > 0" height="auto" :class="{ 'scrollable-card': filteredUsers.length >= 5 }" class="overflow-y rounded-xl elevation-0 mt-2" flat >

        
      <v-row v-if="searchText?.length > 0">
        <v-col v-for="user in filteredUsers" :key="user.id" cols="12">
          <v-card class="mb-1 elevation-0 transparent" flat width="">
            <router-link :to="{ path: `/@${user.user}` }" style="text-decoration: none;">
            <v-row align="center" justify="center">
                <v-col cols="1" class="mr-2">
                <v-avatar :size="40">
                  <img :src="user.profilePicture" style="width:100%;height: auto;" alt="Avatar" />
                </v-avatar>
              </v-col>
              <v-col cols="9">
                  
                <v-card-title class="text-h6 font-weight-light purple--text">
                  oi
                </v-card-title>
                <v-card-subtitle class="caption grey--text">oi</v-card-subtitle>
              </v-col>
            </v-row>
          </router-link>
          </v-card>
        </v-col>
      </v-row>
      </v-card>

      <v-row v-else>
        <v-col>
          <v-card v-if="searchText?.length === 0" class="mb-3 elevation rounded-xl" flat>
            <v-card-text class="text-caption font-weight-light text-center">
             <v-progress-circular indeterminate :size="16"></v-progress-circular>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data: () => ({
    users: [],
    searchText: "",
    dialogOpenSearch: null,
    isDropdownOpen: false,
    drawer: true,
  }),

  methods: {
    closeMenu() {
      this.isDropdownOpen = false;
    },
    async searchUsers() {
      try {
        const response = await axios.get(
          "https://api.seduvibe.com/find_creator",
          {
            params: {
              search: this.searchText,
            },
          },
        );

        let allUsers = [];
        if (Array.isArray(response.data.users)) {
          response.data.users.forEach((user) => {
            allUsers.push(user);
          });
        }
        this.users = allUsers;
      } catch (error) {
        //
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => user.user.includes(this.searchText));
    },
  },

};
</script>
