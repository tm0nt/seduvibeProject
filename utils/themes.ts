import { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const LIGHT_THEME = "light";
// Light mode theme
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    headline: "#303030",
    background: "#FFFFFF",
    input_color: "#bbbbbb",
    surface: "#404040",
    primary: "#A020F0",
    body: "#bbbbbb",
    navbarcolor: "#a020f0",
    buttonNavColor: "#ffff",
    postBackground: "#ffff",
  },
};

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark";
// Dark mode theme
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    headline: "#ffff",
    body: "#202020",
    background: "#151515",
    buttonNavColor: "#a020f0",
    input_color: "#262626",
    surface: "#151515",
    primary: "#A020F0",
    navbarcolor: "#151515",
    postBackground: "#202020",
  },
};
