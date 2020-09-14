// import store from "~store";
// import router from "~router";
import Vue from "vue";

export default ({ context, headers = {} }) => {
  let authorization;
  console.log(globalContext.store.getters);
  console.log(globalContext.store.getters["user/token"]);

  if (process.server) {
    authorization = context.store.getters["user/token"];
  }
  if (process.client) {
    authorization = $nuxt.$store.getters["user/token"];
  }

  return {
    headers: {
      Authorization: authorization,
      ...headers
    }
  };
};
