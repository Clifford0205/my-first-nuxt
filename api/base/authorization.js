export default (headers = {}) => {
  let authorization = globalContext.store.getters["user/token"];
  // console.log(globalContext.store.getters);
  console.log(globalContext.store.getters["user/token"]);

  return {
    headers: {
      Authorization: authorization,
      ...headers
    }
  };
};
