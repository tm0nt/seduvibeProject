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
          elevation="0"
          flat
            class="mx-auto mb-4"
          >
          <p>Você está enviando uma solicitação para: @{{ userSolicitado }}</p>
          </v-card>
          <v-form>
            <v-text-field
              label="Usuário para checkout"
              v-model="userFake"
              bg-color="input_color"
              color="primary"
              prepend-inner-icon="mdi-at"
            ></v-text-field>
            <v-textarea
              label="Descrição"
              v-model="description"
              bg-color="input_color"
              class="mt-n2"
              variant="solo"

              rounded="xl"

              color="primary"
              prepend-inner-icon="mdi-text"
            ></v-textarea>
            <v-alert
        closable
        v-model="infoMessageEnviar.v"
        class="rounded-xl mb-4"
        type="info"
        variant="tonal"
        :color="infoMessageEnviar.color"
      >
        <template v-slot:title>
          <p class="text-caption">{{ infoMessageEnviar.text }}</p>
        </template>
      </v-alert>
            <v-btn color="primary" class="text-capitalize" @click="enviar" block>Enviar</v-btn>
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
const infoMessageEnviar = ref({
  v: false,
  text: null,
  color: null,
});
const cookie = useCookie("token");
const token = cookie.value


const openDialog = ref(false);
const userSolicitado = ref(null);
const userFake = ref(null)
const description = ref(null)

const enviar = async () => {
  try{
    if(!userFake.value || !description.value){
      infoMessageEnviar.value.v = true;
      infoMessageEnviar.value.text = "Preencha todos os campos!";
      infoMessageEnviar.value.color = "red";
      return;
    }
    const data = await $fetch(`https://api.seduvibe.com/afiliates/user-affiliate-request/${userSolicitado.value}`,{
      headers:{
        Authorization: `Bearer ${token}`
      },
      method:"post",
      body: JSON.stringify({
        description: description.value,
        userFake: userFake.value
      })
    })
    if(data){
      openDialog.value = false
      infoMessage.value.v = true;
      infoMessage.value.text = "Solicitação enviada com sucesso!";
      infoMessage.value.color = "success";
    }
  }catch(error){
    openDialog.value = false
    infoMessage.value.v = true;
      infoMessage.value.text = error.data.error;
      infoMessage.value.color = "red";
    console.error(error);
  }
};

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
