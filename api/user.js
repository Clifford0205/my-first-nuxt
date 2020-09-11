import callApi from "./base/apiUser";

export default {
  loginAndRegister({ email, password, returnSecureToken, authUrl }) {
    const config = {
      data: {
        email,
        password,
        returnSecureToken
      }
    };
    return callApi({
      method: "post",
      config,
      baseURL: authUrl
    });
  }
};
