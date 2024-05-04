<template>
  <v-app>
    <v-container>
      <h2>Me afiliar</h2>
      <p class="text-caption text-medium-emphasis">Para começar a se afiliar, primeiro digite o usuário da modelo.</p>
      
      <v-text-field class="mt-4" v-model="userSolicitado" label="Digite o usuário" bg-color="input_color" prepend-inner-icon="mdi-at"></v-text-field>
      <v-alert
        closable
        v-model="infoMessage.v"
        class="rounded-xl mb-4"
        type="info"
        variant="tonal"
        :color="infoMessage.color"
      >
        <template v-slot:title>
          <p class="text-caption">{{ infoMessage.text }}</p>
        </template>
      </v-alert>
      <v-btn rounded="xl" color="primary" variant="tonal" min-height="40" block @click="solicitar">Solicitar</v-btn>
    </v-container>
    <v-dialog v-model="openDialog" width="600" persistent>
      <v-card class="rounded-xl elevation-6" flat>
        <v-card-title><v-icon @click="openDialog = false">mdi-close</v-icon></v-card-title>
        <v-card-text class="text-center">
          <v-card
            prepend-icon="mdi-info"
            title="Tutorial"
            class="mb-4"
            subtitle="Assista para entender o funcionamento do sistema."
            rounded="xl"
            variant="tonal"
            link
            color="primary"
          ></v-card>
          <v-card
            prepend-avatar="https://s2.glbimg.com/NOeJtcflf8-o3Ik_GL7XmQ5e9UI=/smart/e.glbimg.com/og/ed/f/original/2021/11/25/melissamelmaia-260929933_273406538180340_4943085334324297278_n.jpg"
            class="mx-auto"
            max-width="500"
            subtitle="@melmaia"
            title="Mel Maia"
          >
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">589 postagens</v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">Valor R$ 10,00</v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip size="small" variant="outlined" color="primary">Comissão 50%</v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-form>
            <v-text-field
              label="Usuário para checkout"
              bg-color="input_color"
              color="primary"
              prepend-inner-icon="mdi-at"
            ></v-text-field>
            <v-textarea
              label="Descrição"
              bg-color="input_color"
              class="mt-n2"
              variant="solo"

              rounded="xl"

              color="primary"
              prepend-inner-icon="mdi-text"
            ></v-textarea>
            <v-btn color="primary" class="text-capitalize" block>Enviar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
const infoMessage = ref({
  v: false,
  text: null,
  color: null,
});
const openDialog = ref(false);
const userSolicitado = ref(null);


const solicitar = async () => {
try{
if(!userSolicitado.value){
  infoMessage.value.text = "Preencha todos os campos";
    infoMessage.value.v = true;
    infoMessage.value.color = "red";
    return;

}
openDialog.value = true;
infoMessage.value.v = false;
}catch(error){
  console.error(error);
}
};

</script>
