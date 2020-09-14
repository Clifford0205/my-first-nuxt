import api from "./baseApi";

export default ({
  method,
  url,
  config = {},
  displayLoading = true,
  baseURL
}) => {
  let context = globalContext;

  return api({
    method,
    url,
    config,
    displayLoading,
    baseURL,
    context
  });
};
