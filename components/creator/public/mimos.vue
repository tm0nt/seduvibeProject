<template>
  <v-container>
    <h2>Mime sua criadora favorita</h2>
    <p class="text-caption mt-n2 text-medium-emphasis">
      Use a wishlist, metas ou apenas envie um valor
    </p>
    <v-col>
      <v-btn
        :disabled="amazonWishlist === null"
        block
        color="primary"
        min-height="40"
        class="text-capitalize"
        :href="amazonWishlist"
      >
        <v-icon size="16">mdi-square-rounded-badge</v-icon>&nbsp;Amazon Wishlist
      </v-btn>
    </v-col>

    <v-col>
      <h2>Metas</h2>
      <v-expansion-panels
        v-for="wish in metasUser"
        :key="wish.id"
        class="rounded-xl elevation-0 mb-2"
      >
        <v-expansion-panel class="rounded-xl elevation-0">
          <v-expansion-panel-header>
            <span class="white--text">{{ wish.name }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-progress-linear
              height="10"
              stream
              :buffer-value="calculateProgress(wish.collected, wish.amount)"
              rounded
              class="rounded-xl"
              color="primary "
            ></v-progress-linear>
            <p class="caption white--text text-center">
              {{
                wish.collected.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
              de
              {{
                wish.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </p>
            <v-col>
              <v-btn
                color="primary"
                dark
                v-if="wish.amount !== wish.collected"
                outlined
                fab
                small
                block
                rounded
                @click="verifyAccount(paymentMethod, wish.id)"
                >CONTRIBUIR&nbsp;<v-icon>mdi-send-circle</v-icon></v-btn
              >
              <v-btn
                color="primary"
                dark
                v-if="wish.amount === wish.collected"
                outlined
                fab
                small
                block
                :disabled="true"
                rounded
                >CONCLUÍDO&nbsp;<v-icon>mdi-check-circle</v-icon></v-btn
              >
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-container>
  <v-dialog v-model="enviarValorDialog" persistent max-width="500" dark>
    <v-card>
      <v-card-title>
        <span class="headline primary--text">Envie valor p/ criador</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="valorRandom"
          label="Valor"
          rounded
          outlined
          prefix="R$"
          suffix="BRL"
          color="primary"
        ></v-text-field>
        <p class="caption mt-n6">Valor mínimo: R$10,00</p>
        <h5>Escolher forma de pagamento</h5>
        <v-menu :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-select
              v-model="selectedOption"
              :items="paymentSelectType"
              color="primary"
              outlined
              rounded
              append-icon="mdi-menu-down"
              v-on="on"
            >
              <template v-slot:selection="{ item }">
                <v-chip>
                  <v-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-avatar>
                  {{ item.text }}
                </v-chip>
              </template>
            </v-select>
          </template>
          <v-list>
            <v-list-item
              v-for="option in paymentSelectType"
              :key="option.value"
              @click="selectOption(option)"
            >
              <v-list-item-avatar>
                <v-icon>{{ option.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ option.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-if="selectedOption && selectedOption.value === 1">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="nomeTitular"
                label="Nome do titular"
                color="primary"
                rounded
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="numeroCartao"
                label="Número do cartão"
                color="primary"
                rounded
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="dataVencimento"
                label="Data de vencimento"
                color="primary"
                rounded
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="codigoSeguranca"
                label="Código de segurança"
                color="primary"
                rounded
                outlined
              ></v-text-field>
            </v-col>
            <v-btn block rounded color="primary" dark @click="payWithCredit(valorRandom)"
              >PAGAR</v-btn
            >
          </v-row>
          <v-text-field color="primary" rounded outlined v-model="cpf" label="CPF"></v-text-field>
        </template>
        <template v-if="selectedOption && selectedOption.value === 3">
          <h4 class="primary--text mb-2">Pagando com pix...</h4>
          <v-text-field color="primary" outlined rounded v-model="cpf" label="CPF"></v-text-field>
          <v-btn block color="primary" rounded dark @click="payWithPix(valorRandom, 2)"
            >PAGAR</v-btn
          >
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" rounded text @click="closeDialog()">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="NoLogin" persistent width="500">
    <v-card>
      <v-card-title
        ><v-icon color="primary" size="18" @click="NoLogin = false">mdi-close</v-icon></v-card-title
      >
      <v-container>
        <v-col class="align-center justify-center">
          <v-card-text class="text-center">
            <h2 class="primary--text">Você não está logado, entre com sua conta!</h2>
            <v-spacer></v-spacer>
            <v-container>
              <v-btn block min-height="40" color="primary" to="/login">ENTRAR</v-btn>
            </v-container>
          </v-card-text>
        </v-col>
      </v-container>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogPaymentMethod" width="500">
    <v-card rounded>
      <v-card-title class="primary--text">
        <v-icon color="primary" @click="dialogPaymentMethod = false">mdi-close</v-icon>
        &nbsp;Forma de pagamento
      </v-card-title>
      <v-card-text>
        <p class="caption">Você está contribuindo com uma meta da sua criadora</p>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span class="white--text">&nbsp;Pix</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form
                ><v-text-field
                  label="Valor"
                  outlined
                  v-model="valorContribuicao"
                  color="primary"
                  rounded
                ></v-text-field>
                <v-text-field
                  label="CPF"
                  outlined
                  v-model="cpf"
                  color="primary"
                  rounded
                ></v-text-field>

                <v-btn color="primary" dark rounded @click="payWithPix(valorContribuicao, 1)"
                  >PAGAR</v-btn
                >
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <span class="white--text">&nbsp;Cartão de Crédito</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      rounded
                      color="primary"
                      class="mb-n4"
                      label="Número"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="4">
                    <v-text-field outlined rounded color="primary" label="Mês"></v-text-field
                  ></v-col>
                  <v-col cols="4">
                    <v-text-field outlined rounded color="primary" label="Ano"></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field outlined rounded color="primary" label="CVV"></v-text-field
                  ></v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      class="mt-n5"
                      v-model="cpf"
                      rounded
                      color="primary"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-btn color="primary" dark rounded>PAGAR</v-btn>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="payPix" class="elevation-0" width="500">
    <div class="d-flex justify-center align-center">
      <v-card dark rounded>
        <v-container v-if="paymentSuccessForm === false">
          <v-card-text class="text-center">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <h2 class="primary--text text-center mb-2">Pague seu Pix!</h2>
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-center text-center mt-n2">
                <qrcode-vue :text="qrCodeValue" :size="150"></qrcode-vue>
              </v-col>
              <v-col cols="12">
                <p class="caption grey--text mt-n5">
                  Esse QrCode só funciona com essa página aberta
                </p>
              </v-col>
              <v-col cols="12">
                <v-progress-circular
                  class="mt-n4"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="qrCodeValue"
                  readonly
                  outlined
                  color="primary"
                  rounded
                  @click="copiarParaAreaDeTransferencia"
                  ref="pixInput"
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="copiarParaAreaDeTransferencia">
                          <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span>Copiado com sucesso!</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>

        <v-container v-else class="d-flex justify-center align-center">
          <h3 class="primary--text text-center mb-2">Pagamento realizado com sucesso!</h3>
          <v-row align="center" justify="center">
            <v-col cols="12" class="d-flex align-center justify-center text-center mt-2">
              <v-icon color="primary" size="85">mdi-check-circle</v-icon>
            </v-col>
            <v-snackbar
              color="success"
              centered
              rounded="pill"
              timeout="3000"
              v-model="paymentSnackbar"
            >
              Sua assinatura foi criada com sucesso!
            </v-snackbar>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            :disabled="paymentSuccessForm"
            color="primary"
            @click="
              payPix = false;
              closeConnectSocket();
            "
          >
            CANCELAR
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              payPix = false;
              closeConnectSocket();
            "
          >
            PAGO
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
  <v-toolbar height="50" color="rgb(0,0,0,0)"></v-toolbar>

  <v-snackbar
    v-model="snackbackShow"
    :color="snackbackShowColor"
    timeout="3000"
    centered
    rounded="pill"
    >{{ snackbarShowText }}</v-snackbar
  >
</template>

<script>
export default {
  props: {
    loginValue: {
      type: Number,
      required: true,
    },
    amazonWishlist: {
      type: null,
      required: true,
    },
  },
  data() {
    return {
      valueDeterminate: 100,
      NoLogin: false,
      snackbarShowText: null,
      snackbackShowColor: null,
      valorRandom: null,
      wishProgress: {},
      objectiveIdLatest: null,
      dialogPaymentMethod: false,
      payPixData: null,
      latestPayValue: null,
      qrCodeValue: null,
      cpf: null,
      snackbackShow: false,
      selectedOption: null,
      payPix: false,
      source: null,
      valorContribuicao: null,
      paymentSuccessForm: false,
      metasUser: null,
      paymentSelectType: [
        { value: 1, text: "Cartão de crédito", icon: "mdi-credit-card-plus" },
        { value: 3, text: "Pix", icon: "mdi-currency-usd" },
      ],
      enviarValorDialog: false,
    };
  },
  methods: {
    async copiarParaAreaDeTransferencia() {
      try {
        // Usar a API Clipboard para copiar o texto
        await navigator.clipboard.writeText(this.qrCodeValue);
      } catch (err) {
        console.error("Falha ao copiar texto para a área de transferência", err);
      }
    },
    async paymentMethod() {
      this.dialogPaymentMethod = true;
    },
    async iniciarConexaoWebSocket() {
      try {
        // Inicie a conexão WebSocket
        const socket = io("https://payment.seduvibe.cloud", {
          path: "/webhook/socket.io",
          transports: ["websocket"], // Use apenas o transporte WebSocket
        });

        // Evento de conexão estabelecida
        socket.on("connect", () => {
          console.log("Conexão WebSocket estabelecida");

          // Agora você pode adicionar lógica adicional aqui, se necessário
        });

        // Evento de recebimento de dados
        socket.on("atualizarDados", (dadosTransacao) => {
          this.processarDadosTransacao(dadosTransacao);
        });

        // Evento de erro de conexão
        socket.on("connect_error", (error) => {
          console.error("Erro de conexão:", error);
        });

        // Evento de erro no socket
        socket.on("error", (error) => {
          console.error("Erro no socket:", error);
        });

        // Salvar a instância do socket para referência futura, se necessário
        this.socket = socket;
      } catch (error) {
        console.error("Erro ao conectar WebSocket:", error);
      }
    },
    async closeConnectSocket() {
      try {
        if (this.socket) {
          this.socket.disconnect();
          console.log("Conexão do WebSocket fechada com sucesso!");
        } else {
          console.log("WebSocket não está conectado.");
        }
      } catch (error) {
        console.error("Erro ao fechar conexão do WebSocket:", error);
      }
    },

    // Método para processar os dados de transação
    async processarDadosTransacao(dadosTransacao) {
      const emailFind = dadosTransacao.data.customer.email;
      const idTransacao = dadosTransacao.objectId;
      const statusTransacao = dadosTransacao.data.status;

      // Verificar se o email da modelo coincide
      if (emailFind === this.email) {
        console.log("ID da Transação:", idTransacao);
        console.log("Status da Transação:", statusTransacao);

        // Aguardar até que o status seja "paid"
        await this.aguardarStatusPago(statusTransacao);
        await this.paymentSucess();
        console.log("Pagamento concluído");
      }
    },
    async payWithPix(value, source) {
      try {
        this.iniciarConexaoWebSocket();
        const response = await paymentRequest.payWithPix(
          this.cpf,
          "Tásio",
          "tassio.leite14@gmail.com",
          value * 100
        );
        this.source = source;
        this.latestPayValue = value;
        this.enviarValorDialog = false;
        this.payPix = true;
        this.payPixData = response;
        this.qrCodeValue = response.qrCode.qrcode;
      } catch (error) {
        console.error(error);
      }
    },
    calculateProgress(collected, amount) {
      return (collected / amount) * 100;
    },
    async fetchPublic(userName) {
      try {
        const response = await fetchPublicData.listData(userName);
        this.metasUser = response.data.userData.userObjectives;
        console.log(this.metasUser);
      } catch (error) {
        console.error(error);
      }
    },
    verifyAccount(method, wish) {
      this.objectiveIdLatest = wish;
      if (this.loginValue === 0) {
        this.NoLogin = true;
      } else {
        method();
      }
    },
    async paymentSucess() {
      try {
        //1 é meta
        if (this.source === 1) {
          await paymentRequest.contributeObjective(this.latestPayValue, this.objectiveIdLatest);
          this.snackbackShow = true;
          this.snackbackShowColor = "success";
          this.snackbarShowText = "Você contribuiu com sua criadora!";
          //2 é random
        } else if (this.source === 2) {
          await paymentRequest.donation(this.idCreator, this.valorRandom);
          this.snackbackShow = true;
          this.snackbackShowColor = "success";
          this.snackbarShowText = "Você enviou o valor de ${value}!";
          // Tratar quando source é "random"
        } else {
          this.snackbackShow = true;
          this.snackbackShowColor = "red";
          this.snackbarShowText = "Ocorreu algum erro!";
        }
      } catch (error) {
        console.error(error);
      }
    },

    payMimo(value) {
      this.valueRandom = value;
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    enviarValor() {
      this.enviarValorDialog = true;
    },
    closeDialog() {
      this.enviarValorDialog = false;
    },
  },
};
</script>

<style></style>
