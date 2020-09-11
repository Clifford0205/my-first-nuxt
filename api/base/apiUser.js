import api from "./baseApi";

export default ({
  method,
  url,
  config = {},
  displayLoading = true,
  baseURL
}) => {
  return api({
    method,
    url,
    config,
    displayLoading,
    baseURL
  });
};
