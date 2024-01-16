<template>
  <v-app>
    <v-container>
      <h2>Pagamentos</h2>
      <p class="text-caption text-medium-emphesis">Esse são todos seus pagamentos conosco!</p>
      <v-row align="center" justify="center" class="mt-8">
        <v-data-table
              :headers="headers"
              :items="activeAffiliates"
              :header-props="headerProps"
              :hide-default-footer="true"
              class="elevation-0 rounded-xl"
            >
            <template v-slot:no-data>
                <div class="px-4 text-caption text-medium-emphasis">
                  Você não possui pagamentos.
                </div>
                </template>
        </v-data-table>
      </v-row>
    </v-container>
  </v-app>
</template>
  <script>
    export default {
        headerProps: {
          sortByText: "Ordenar por",
        },
        headers: [
          { text: "Nome", value: "user.name" },
          { text: "E-mail", value: "user.email" },
          { text: "Aplicado em", value: "createdAt" },
          { text: "Ações", value: "actions" },
        ],
    }
  </script>