// import store from "~store";
// import router from "~router";

export default (headers = {}) => {
  if (process.client) {
    console.log($nuxt.$store);
  }

  if (process.server) {
    console.log($nuxt);
  }
  return {
    headers: {
      // Authorization: $nuxt.$store.getters["user/token"],
      ...headers
    }
  };
};
