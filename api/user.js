import api from "./base/api";

export function login({ account, password }, cb, errCb) {
  const config = {
    data: {
      account,
      password
    }
  };
  return request({
    url: "login",
    method: "post",
    cb,
    errCb,
    config
  });
}
