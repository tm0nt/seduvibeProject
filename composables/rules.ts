export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || "Campos obrigatórios",
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Seu e-mail não é válido";
    },
    rulePassLen: (v: string) => (!!v && v.length >= 6) || "A senha deve ter 6 caracteres ou mais",
  };
};
