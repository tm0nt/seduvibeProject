// loginFunctions.ts
import { Ref } from "vue";

export const submitLogin = async (email: Ref<string>, password: Ref<string>) => {
  // Lógica para lidar com a submissão do formulário de login
};

export const togglePasswordVisibility = (showPassword: Ref<boolean>) => {
  showPassword.value = !showPassword.value;
};
