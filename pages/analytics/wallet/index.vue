<template>
  <v-app>
    <SideBar />
    <v-container>
      <v-col cols="12" md="8" offset-md="2">
        <v-container>
          <h2>
            <NuxtLink to="/profile"
              ><v-icon size="26" color="primary">mdi-chevron-left-circle</v-icon></NuxtLink
            >&nbsp;Carteira
          </h2>
          <p class="text-caption text-medium-emphasis mt-n1">Atualizações a todo instante.</p>
          <v-card
            color="input_color"
            rounded="xl"
            class="mt-4 d-flex justify-center align-center"
            flat
          >
            <v-row class="ma-2" align="center" justify="center">
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-cash</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Saldo disponível</p>
                    <h3>R$ 256,00</h3>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-clock</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Aguardando</p>
                    <h3>125.475,00</h3>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="24">mdi-lock</v-icon>
                  <div class="ml-2">
                    <p class="text-caption text-medium-emphasis">Saldo bloqueado</p>
                    <h3>R$ 10.454,00</h3>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="rounded-xl mt-4" color="input_color" flat>
            <v-container class="ma-2">
              <h4>Pedir um saque</h4>
              <p class="text-caption text-medium-emphasis">
                A velocidade do saque depende do seu plano de assinatura.
              </p>
              <v-tabs v-model="tab" bg-color="transparent" color="basil" grow class="mt-4">
                <v-tab v-for="item in items" :key="item" :value="item" color="primary" rounded="xl">
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item v-for="item in items" :key="item" :value="item">
                  <v-form>
                    <v-card color="input_color" rounded="xl" flat>
                      <v-row v-if="item === 'PIX'">
                        <v-col class="ma-4">
                          <v-text-field
                            label="CPF"
                            :disabled="true"
                            :readonly="true"
                            color="input_color"
                            outlined
                          ></v-text-field>
                          <v-btn color="primary" @click="submitForm" class="text-capitalize"
                            >Sacar</v-btn
                          >
                        </v-col>
                      </v-row>

                      <v-row v-if="item === 'TED'">
                        <v-col class="ma-4">
                          <v-card
                            class="mx-auto my-5 rounded-xl elevation-0"
                            title="Conta principal"
                            variant="tonal"
                            color="primary"
                            flat
                          >
                            <template v-slot:prepend>
                              <v-icon color="primary">mdi-bank</v-icon>
                            </template>
                            <template v-slot:subtitle>Lais</template>
                            <v-card-text
                              ><p>Caixa</p>
                              <p>Agência 45454 | Conta 555454</p>
                            </v-card-text>
                          </v-card>
                          <v-btn color="primary" @click="submitForm" class="text-capitalize"
                            >Sacar</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card>
          <v-row>
            <v-col cols="12" md="12" lg="12" class="mt-4">
              <v-card class="transparent rounded-xl">
                <v-data-table :headers="headers" :items="vegetables" theme="dark">
                  <template v-slot:item.calories="{ value }">
                    <v-chip color="success">
                      {{ value }}
                    </v-chip>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
    <v-toolbar flat height="50" color="rgb(0,0,0,0)"></v-toolbar>
  </v-app>
</template>

<script setup></script>

<script>
import SideBar from "../../components/creator/analytics/SidebarView.vue";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      tab: "PIX",
      items: ["PIX", "TED"],
      headers: [
        { title: "Vegetable (100g serving)", key: "name" },
        { title: "Calories", key: "calories" },
        { title: "Fat (g)", key: "fat" },
        { title: "Carbs (g)", key: "carbs" },
        { title: "Protein (g)", key: "protein" },
        { title: "Iron (%)", key: "iron" },
      ],
      vegetables: [
        {
          name: "Spinach",
          calories: 23,
          fat: 0.4,
          carbs: 3.6,
          protein: 2.9,
          iron: "15%",
        },
        {
          name: "Kael",
          calories: 49,
          fat: 0.9,
          carbs: 8.8,
          protein: 4.3,
          iron: "16%",
        },
        {
          name: "Broccoli",
          calories: 34,
          fat: 0.4,
          carbs: 6.6,
          protein: 2.8,
          iron: "6%",
        },
        {
          name: "Brussels Sprouts",
          calories: 43,
          fat: 0.3,
          carbs: 8.9,
          protein: 3.4,
          iron: "9%",
        },
        {
          name: "Avocado",
          calories: 160,
          fat: 15,
          carbs: 9,
          protein: 2,
          iron: "3%",
        },
        {
          name: "Sweet Potato",
          calories: 86,
          fat: 0.1,
          carbs: 20.1,
          protein: 1.6,
          iron: "3%",
        },
        {
          name: "Corn",
          calories: 96,
          fat: 1.5,
          carbs: 21,
          protein: 3.4,
          iron: "2%",
        },
        {
          name: "Potato",
          calories: 77,
          fat: 0.1,
          carbs: 17.5,
          protein: 2,
          iron: "8%",
        },
        {
          name: "Butternut Squash",
          calories: 45,
          fat: 0.1,
          carbs: 11.7,
          protein: 1,
          iron: "4%",
        },
        {
          name: "Beetroot",
          calories: 43,
          fat: 0.2,
          carbs: 10,
          protein: 1.6,
          iron: "6%",
        },
        {
          name: "Parsnip",
          calories: 75,
          fat: 0.3,
          carbs: 18,
          protein: 1.2,
          iron: "4%",
        },
        {
          name: "Yam",
          calories: 118,
          fat: 0.2,
          carbs: 27.9,
          protein: 1.5,
          iron: "4%",
        },
        {
          name: "Acorn Squash",
          calories: 40,
          fat: 0.1,
          carbs: 10,
          protein: 1,
          iron: "5%",
        },
        {
          name: "Artichoke",
          calories: 47,
          fat: 0.2,
          carbs: 10.5,
          protein: 3.3,
          iron: "7%",
        },
        {
          name: "Peas",
          calories: 81,
          fat: 0.4,
          carbs: 14.5,
          protein: 5.4,
          iron: "25%",
        },
        {
          name: "Green Beans",
          calories: 31,
          fat: 0.1,
          carbs: 6.9,
          protein: 1.8,
          iron: "8%",
        },
        {
          name: "Red Bell Pepper",
          calories: 26,
          fat: 0.2,
          carbs: 6.0,
          protein: 1.0,
          iron: "3%",
        },
        {
          name: "Cauliflower",
          calories: 25,
          fat: 0.1,
          carbs: 5.0,
          protein: 1.9,
          iron: "4%",
        },
        {
          name: "Zucchini",
          calories: 17,
          fat: 0.3,
          carbs: 3.1,
          protein: 1.2,
          iron: "3%",
        },
        {
          name: "Asparagus",
          calories: 20,
          fat: 0.1,
          carbs: 3.9,
          protein: 2.2,
          iron: "16%",
        },
        {
          name: "Eggplant",
          calories: 25,
          fat: 0.2,
          carbs: 6,
          protein: 1,
          iron: "1%",
        },
        {
          name: "Pumpkin",
          calories: 26,
          fat: 0.1,
          carbs: 6.5,
          protein: 1,
          iron: "4%",
        },
        {
          name: "Celery",
          calories: 16,
          fat: 0.2,
          carbs: 3,
          protein: 0.7,
          iron: "1%",
        },
        {
          name: "Cucumber",
          calories: 15,
          fat: 0.1,
          carbs: 3.6,
          protein: 0.7,
          iron: "2%",
        },
        {
          name: "Leek",
          calories: 61,
          fat: 0.3,
          carbs: 14.2,
          protein: 1.5,
          iron: "12%",
        },
        {
          name: "Fennel",
          calories: 31,
          fat: 0.2,
          carbs: 7,
          protein: 1.2,
          iron: "6%",
        },
        {
          name: "Green Peas",
          calories: 81,
          fat: 0.4,
          carbs: 14.5,
          protein: 5.4,
          iron: "25%",
        },
        {
          name: "Okra",
          calories: 33,
          fat: 0.2,
          carbs: 7.5,
          protein: 1.9,
          iron: "3%",
        },
        {
          name: "Chard",
          calories: 19,
          fat: 0.2,
          carbs: 3.7,
          protein: 1.8,
          iron: "22%",
        },
        {
          name: "Collard Greens",
          calories: 32,
          fat: 0.6,
          carbs: 5.4,
          protein: 3,
          iron: "2%",
        },
      ],
    };
  },
  methods: {
    submitForm() {
      // Lógica para enviar o formulário
      console.log("Formulário enviado!");
    },
  },
};
</script>
