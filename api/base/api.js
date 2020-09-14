import api from "./baseApi";

let baseURL = process.env.baseUrl;

export default ({ method, url, config = {}, displayLoading = true }) => {
  let context = globalContext;

  return api({
    method,
    url,
    context,
    config,
    displayLoading,
    baseURL
  });
};
