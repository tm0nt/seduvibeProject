<template>
  <v-container>
    <h2>Meu perfil</h2>
    <p class="text-caption text-medium-emphasis mt-n2">Edite alguns de seus dados</p>
    <form>
      <v-text-field
        v-model="form.usuario"
        placeholder="Usuário"
        bg-color="input_color"
        prepend-inner-icon="mdi-at"
        disabled
        color="primary"
      ></v-text-field>
      <v-text-field
        v-model="form.email"
        placeholder="Email"
        class="mt-n2"
        color="primary"
        prepend-inner-icon="mdi-email"
        bg-color="input_color"
        :rules="emailRules"
      >
        <template v-slot:append-inner>
          <v-chip v-if="emailConfirmed === 0" color="danger" class="mt-n1" dark @click="openDialog">
            Email não verificado
          </v-chip>
          <v-chip v-else class="" color="primary" dark> Email verificado </v-chip>
        </template>
      </v-text-field>
      <v-dialog v-model="mailOpen" max-width="400px">
        <v-card>
          <v-alert type="info" color="primary" dense dismissible @input="mailOpen = false">
            Enviamos o e-mail verificador para o seu e-mail, verifique sua caixa de entrada.
          </v-alert>
        </v-card>
      </v-dialog>

      <v-row>
        <!-- Coluna 1 -->
        <v-col cols="6" class="mt-n2">
          <v-text-field
            v-model="form.tiktok"
            placeholder="Tiktok"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <!-- Coluna 2 -->
        <v-col cols="6" class="mt-n2">
          <v-text-field
            outlined
            v-model="form.twitter"
            placeholder="Twitter"
            prepend-inner-icon="mdi-twitter"
            bg-color="input_color"
            color="primary"
          ></v-text-field>
        </v-col>

        <!-- Coluna 3 -->
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="form.instagram"
            placeholder="Instagram"
            prepend-inner-icon="mdi-instagram"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <!-- Coluna 4 -->
        <v-col cols="6" class="mt-n8">
          <v-text-field
            v-model="form.telegram"
            placeholder="Telegram"
            color="primary"
            prepend-inner-icon="mdi-send-circle"
            bg-color="input_color"
          ></v-text-field>
        </v-col>

        <!-- Coluna 5 -->
        <v-col cols="12" class="mt-n8">
          <v-text-field
            v-model="form.wishlist"
            placeholder="Wishlist Amazon"
            prepend-inner-icon="mdi-web"
            color="primary"
            bg-color="input_color"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            block
            class="text-capitalize"
            min-height="40"
            @click="salvarAlteracoes"
            >Salvar</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            block
            class="text-capitalize"
            min-height="40"
            variant="outlined"
            @click="openDialog"
            >Alterar Senha</v-btn
          >
        </v-col>
      </v-row>
    </form>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card dark>
        <v-card-title style="color: primary">Alterar Senha</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="senha"
            :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showSenha ? 'text' : 'password'"
            placeholder="Senha"
            color="primary"
            dark
            @click:append="showSenha = !showSenha"
          ></v-text-field>
          <v-text-field
            v-model="confirmarSenha"
            :append-icon="showConfirmarSenha ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmarSenha ? 'text' : 'password'"
            placeholder="Confirmar Senha"
            color="primary"
            dark
            @click:append="showConfirmarSenha = !showConfirmarSenha"
          ></v-text-field>
          <p v-if="senha !== confirmarSenha" class="red--text">As senhas não correspondem.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="alterarSenha" :disabled="senha !== confirmarSenha">
            Salvar
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="success" timeout="3000" rounded="pill" centered v-model="showSnackbar"
      >Seus dados foram atualizados!</v-snackbar
    >
  </v-container>
</template>

<style>
.btn-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showSnackbar: false,
      form: {
        usuario: "",
        email: "",
        tiktok: "",
        twitter: "",
        wishlist: "",
        instagram: "",
        telegram: "",
      },
      confirmarSenha: "",
      showSenha: false,
      showConfirmarSenha: false,
      emailRules: [
        (v) => !!v || "Preenchimento de campo obrigatório",
        (v) => /.+@.+\..+/.test(v) || "Seu e-mail não é válido",
      ],
      emailConfirmed: null,
      dialog: false,
      senha: "",
      mailOpen: false,
      cel: [
        (v) => !!v || "O campo Celular é obrigatório",
        (v) => /^(\([1-9]{2}\) )?[9]{1}[0-9]{4}-[0-9]{4}$/.test(v) || "Celular inválido",
      ],
    };
  },

  methods: {
    async salvarAlteracoes() {
      try {
        const url = "https://api.seduvibe.com/change_social_media";
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const updatedData = {
          tiktok: this.form.tiktok,
          twitter: this.form.twitter,
          instagram: this.form.instagram,
          telegram: this.form.telegram,
          wishlist: this.form.wishlist,
        };

        const response = await axios.post(url, updatedData, config);

        if (response.status === 200) {
          this.form.tiktok = updatedData.tiktok;
          this.form.twitter = updatedData.twitter;
          this.form.instagram = updatedData.instagram;
          this.form.telegram = updatedData.telegram;
          this.form.wishlist = updatedData.wishlist;

          this.showSnackbar = true;

          // Exibir uma notificação de sucesso, se necessário
        } else {
          // Lidar com possíveis códigos de status diferentes de 200, se necessário
        }
      } catch (error) {
        // Lidar com erros, exibir mensagens de erro, etc.
        console.error("Erro ao salvar alterações:", error);
      }
    },
    formatCPF() {
      // Remove caracteres não numéricos do valor do CPF
      let cpf = this.CPF.replace(/\D/g, "");

      // Aplica a máscara do CPF (###.###.###-##)
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{2})$/, "$1-$2");

      // Atualiza o valor do campo CPF
      this.CPF = cpf;
    },
    formatCelular() {
      let value = this.celular.replace(/\D/g, "");
      if (value.length > 10) {
        this.celular = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(
          7,
          11
        )}`;
      } else {
        this.celular = value;
      }
    },
    openMail() {
      if (!this.isEmailVerified) {
        const url = "https://api.seduvibe.com/confirm_email";
        const data = {
          email: this.email,
        };
        axios
          .post(url, data)
          .then((response) => {
            if (response.data.msg === "Email successfully sent") {
              // Email enviado com sucesso
              this.mailOpen = true;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    openDialog() {
      this.dialog = true;
    },
    alterarSenha() {
      // Lógica para alterar a senha
    },
  },
};
</script>
