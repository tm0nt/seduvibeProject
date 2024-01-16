import { Ref } from "vue";

export const selectTheme = (theme, dialogOpen: Ref<boolean>) => {
  theme.global.name.value = theme;
  localStorage.setItem("theme", theme);
  dialogOpen.value = false;
};
