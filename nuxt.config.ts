import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "Seduvibe";
const shortTitle = "Seduvibe";
const description = "Venda com taxa zero! A melhor plataforma de distribuição de conteúdo!";
const image = "./assets/pwa.png";
const url = "https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/seduvibe.com/Seduvibe/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F1f350f0a-7862-4223-8969-611b73e6450b.png%3Ftoken%3DX4Df_l8-kz2mm8kpPC3evdQ2ENQDDdAd9o7RwDQzaQ8%26height%3D520%26width%3D780%26expires%3D33243497606/og.png";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  devtools: { enabled: true },
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-highcharts",
    "@kevinmarrec/nuxt-pwa",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
  ],
  app: {
    head: {
      title: "Seduvibe",
      titleTemplate: "%s | A melhor plataforma para distribuição de conteúdo exclusivo",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },
  pwa: {
    icon: {
      fileName: "pwa.png",
    },
    meta: {
      name: shortTitle,
      author: "Tássio Montenegro",
      theme_color: "#A020F0",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#A020F0",
      description: description,
    },
  },
});
