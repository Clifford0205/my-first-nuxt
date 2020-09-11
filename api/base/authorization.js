export default (headers = {}) => {
  // console.log($nuxt.$store.getters["user/token"]);
  return {
    headers: {
      Authorization: $nuxt.$store.getters["user/token"],
      ...headers
    }
  };
};
