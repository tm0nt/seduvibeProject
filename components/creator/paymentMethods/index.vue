<template>

  <v-expansion-panels variant="popout" class="mb-4 mt-5">
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-credit-card" collapse-icon="mdi-credit-card-check">
        Cartão de crédito
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
          <v-row>
            <v-col cols="6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Nome do titular"
                type="text"
                placeholder="Nome do titular"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Número do cartão"
                type="number"
                placeholder="Número do cartão"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="mt-n6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Mês"
                type="number"
                placeholder="Mês"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="mt-n6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="Ano"
                type="number"
                placeholder="Ano"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="mt-n6">
              <v-text-field
                hide-spin-buttons
                bg-color="input_color"
                label="CVV"
                type="number"
                placeholder="CVV"
              ></v-text-field>
            </v-col>
            <v-btn block min-height="40" color="primary" class="text-capitalize"
              >Fazer pagamento</v-btn
            >
          </v-row>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="">
        Pix
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
          <v-text-field
            :disabled="true"
            bg-color="input_color"
            placeholder="CPF"
            label="CPF"
            readonly
          >
          </v-text-field>
          <v-btn block min-height="40" color="primary" class="text-capitalize"
            >Fazer pagamento</v-btn
          >
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel bg-color="background" class="rounded-xl">
      <v-expansion-panel-title expand-icon="mdi-currency-btc" collapse-icon="mdi-bitcoin">
        Criptomoeda
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="ma-4">
          <v-img
            cover
            class="mx-auto"
            width="200"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/800px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png"
          >
          </v-img>
          <p class="text-caption text-center text-medium-emphasis">
            Você está pagando 0.0001456 BTC
          </p>
          <v-btn block min-height="40" color="primary" class="mt-2 text-capitalize"
            >Fazer pagamento</v-btn
          >
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
