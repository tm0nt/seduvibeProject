import { defineStore } from "pinia";

export const idPayment = defineStore("idPayment", {
  state: () => ({
    cpf: null,
    amount: null,
    method: null,
    email: null,
    name: null,
    dataReceived: null,
    paymentLatest: null,
  }),
  actions: {
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
  },
});
