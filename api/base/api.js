import api from "./baseApi";

let baseURL = process.env.baseUrl;

export default ({ method, url, config = {}, errCb, displayLoading = true }) => {
  return api({
    method,
    url,
    config,
    errCb,
    displayLoading,
    baseURL
  });
};
