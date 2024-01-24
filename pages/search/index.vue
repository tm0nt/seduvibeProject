<template>
  <v-app>
    <menuNav />
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <SearchBar></SearchBar>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup>
definePageMeta({
  middleware: "check-auth",
});
</script>
<script>
import SearchBar from "../../components/search/searchbar.vue";
import menuNav from "../../components/navbar.vue";

export default {
  data: () => ({
    dialogOpenSearchDialog: false,
    isDropdownOpen: false,
    searchText: null,
  }),
  computed: {
    filteredUsers() {
      return this.users.filter((user) => user.user.includes(this.searchText));
    },
  },
  methods: {
    dialogOpenSearch() {
      this.dialogOpenSearchDialog = true;
    },
    async searchUsers() {
      try {
        const response = await axios.get("https://api.seduvibe.com/find_creator", {
          params: {
            search: this.searchText,
          },
        });

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
  },
  components: {
    SearchBar,
    menuNav,
  },
};
</script>
