// import store from "~store";
// import router from "~router";

export default ({ context, headers = {} }) => {
  let authorization;

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
