import axios from "axios";
// import userApi from "@/api/user";
import Cookie from "js-cookie";
import userApi from "@/api/user";
import {
  getTokenFromLocal,
  getExpirationDateFromLocal,
  getTokenFromCookie,
  getExpirationDateFromCookie,
  setTokenOnWeb,
  setExpirationDateOnWeb,
  removeTokenFromLocal,
  removeExpirationDateFromLocal,
  removeTokenFromCookie,
  removeExpirationDateFromCookie
} from "@/store/utils/user.js";

export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  authenticateUser(vuexContext, authData) {
    // 登入的URL
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.fbAPIKey;

    // 註冊的URL
    if (!authData.isLogin) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.fbAPIKey;
    }
    return userApi
      .loginAndRegister({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        authUrl
      })
      .then(res => {
        vuexContext.commit("setToken", res.idToken);
        setTokenOnWeb(res.idToken);
        setExpirationDateOnWeb(
          new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
        );

        return axios.post("http://localhost:3000/api/track-data", {
          data: "Authenticated!"
        });
      })
      .catch(e => console.log(e));
  },

  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    // 要是是server端
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      token = getTokenFromCookie(req.headers.cookie);
      expirationDate = getExpirationDateFromCookie(req.headers.cookie);
    } else if (process.client) {
      // 要是是client端
      token = getTokenFromLocal();
      expirationDate = getExpirationDateFromLocal();
    }

    // 檢查token是否過期 或 token根本不存在
    if (new Date().getTime() > expirationDate || !token) {
      console.log("No token or invalid token");
      vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setToken", token);
  },

  logout(vuexContext) {
    vuexContext.commit("clearToken");
    removeTokenFromCookie();
    removeExpirationDateFromCookie();

    if (process.client) {
      removeTokenFromLocal();
      removeExpirationDateFromLocal();
    }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token != null;
  },

  token(state) {
    return state.token;
  }
};
