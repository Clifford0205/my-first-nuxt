const bodyParser = require("body-parser");
const axios = require("axios");
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/styles/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~plugins/core-components.js",
    "~plugins/date-filter.js",
    "~plugins/axios.js"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  axios: {
    // baseURL: process.env.BASE_URL || "https://nuxt-blog-9ecf3.firebaseio.com",
    credentials: false
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-9ecf3.firebaseio.com",
    fbAPIKey: "AIzaSyD2n3E-2c9mw2JTTOLUQUnps3OmIsHMHWQ"
  },

  router: {
    linkActiveClass: "active",
    middleware: "log"
  },

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  layoutTransition: {
    name: "fade",
    mode: "out-in"
  },

  serverMiddleware: [bodyParser.json(), "~/api"],

  generate: {
    routes: function() {
      return axios
        .get("https://nuxt-blog-9ecf3.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: "/posts/" + key,
              payload: { postData: res.data[key] }
            });
          }
          return routes;
        });
    }
  }
};
