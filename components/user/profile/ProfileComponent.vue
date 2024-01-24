<template>
  <v-app>
    <v-container>
      <h2>Informações</h2>
      <p class="text-caption text-medium-emphesis">Aqui estão suas informações</p>
      <v-row align="center" justify="center" class="mt-6">
        <v-col>
          <v-form>
            <v-text-field
              v-model="userName"
              placeholder="Usuário"
              bg-color="input_color"
              :disabled="true"
              prepend-inner-icon="mdi-at"
            ></v-text-field>
            <v-text-field v-model="nome" bg-color="input_color" placeholder="Nome"></v-text-field>

            <v-text-field
              v-model="Cpf"
              placeholder="CPF"
              maxlength="14"
              bg-color="input_color"
            ></v-text-field>
            <v-row>
              <v-col cols="6"
                ><v-text-field
                  v-model="celular"
                  placeholder="Celular"
                  prepend-inner-icon="mdi-phone"
                  bg-color="input_color"
                  maxlength="14"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="email"
                  placeholder="Email"
                  prepend-inner-icon="mdi-email"
                  bg-color="input_color"
                >
                  <template v-slot:append-inner>
                    <v-chip v-if="emailConfirmed === 0 || null" color="primary" @click="openDialog">
                      Email não verificado
                    </v-chip>
                    <v-chip v-else color="purple" class="mt-n1" dark> Email verificado </v-chip>
                  </template>
                </v-text-field></v-col
              >
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-btn type="submit" block class="text-capitalize" min-height="40" color="primary"
                  >Salvar alterações</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  type="submit2"
                  variant="outlined"
                  block
                  color="primary"
                  min-height="40"
                  class="text-capitalize"
                >
                  Alterar senha
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
