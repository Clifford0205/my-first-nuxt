import api from "./baseApi";

let baseURL = process.env.baseUrl;

export default ({
  method,
  url,
  config = {},
  displayLoading = true,
  context
}) => {
  return api({
    method,
    url,
    context,
    config,
    displayLoading,
    baseURL
  });
};
