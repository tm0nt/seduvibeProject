import { DefaultsInstance } from "vuetify/lib/framework.mjs";

/**
 * A few defaults that I like
 */
export const defaults: DefaultsInstance = {
  VAppBar: {
    elevation: 0,
  },
  VBtn: {
    variant: "flat",
    height: 40, 
    rounded: "xl",
    size: "small",
  },
  VTextField: {
    color: "primary",
    rounded: "xl",
    density: "comfortable",
    variant: "solo",
  },
};
