import { defineStore } from "pinia";

export const idPayment = defineStore("idPayment", {
  state: () => ({
    cpf: null,
    amount: null,
    method: null,
    email: "seduvibe@seduvibe.com",
    name: "Seduvibe",
    dataReceived: null,
    paymentLatest: null,
    subscriptionId: null,
    tokenCredit: null,
  }),
  actions: {
    setTokenCredit(token) {
      this.tokenCredit = token;
    },
    setCpf(cpf) {
      this.cpf = cpf;
    },
    setAmount(amount) {
      this.amount = amount;
    },
    setMethod(method) {
      this.method = method;
    },
    setName(name) {
      this.name = name;
    },
    setEmail(email) {
      this.email = email;
    },
    setFetchPayment(payment) {
      this.paymentLatest = payment;
    },
    setDataReceived(dataReceived) {
      this.dataReceived = dataReceived;
    },
    setSubsId(subscriptionId) {
      this.subscriptionId = subscriptionId;
    },
  },
});
