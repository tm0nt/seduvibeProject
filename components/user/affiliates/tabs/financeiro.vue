<template>
  <v-card color="input_color" rounded="xl" class="mt-4 d-flex justify-center align-center" flat>
    <v-row class="ma-2" align="center" justify="center">
      <v-col cols="12" md="6" lg="6">
        <p class="text-caption text-medium-emphasis">Saldo disponível</p>
        <h3>R$ 256,00<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <p class="text-caption text-medium-emphasis">Total em vendas</p>
        <h3>R$ 10.454,00<v-icon color="primary" size="26">mdi-chevron-up</v-icon></h3>
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
                  <v-btn color="primary" @click="submitForm" class="text-capitalize">Sacar</v-btn>
                </v-col>
              </v-row>

              <v-row v-if="item === 'TED'">
                <v-col class="ma-4">
                  <!--     <v-card
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
                  </v-card> -->
                  <p class="text-center text-caption text-medium-emphasis mt-4 mb-4">
                    Estamos processando os pagamentos via ted.
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tab: "PIX",
      items: ["PIX", "TED"],
    };
  },
};
</script>
