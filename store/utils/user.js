import { getStorage, setStorage, removeStorage } from "./storage";
import Cookie from "js-cookie";
import _ from "lodash";

// 從LocalStorage 拿token
export let getTokenFromLocal = () => {
  let token = getStorage("token");

  if (!_.isString(token) || _.isEmpty(token)) {
    token = "";
  }

  return token;
};

// 從LocalStorage 拿token過期時間
export let getExpirationDateFromLocal = () => {
  let expirationDate = getStorage("tokenExpiration");
  if (!_.isNumber(expirationDate)) {
    expirationDate = "";
  }
  return expirationDate;
};

// 從server端 cookie 拿token
export let getTokenFromCookie = cookie => {
  let token;
  const jwtCookie = cookie.split(";").find(c => c.trim().startsWith("jwt="));

  if (!jwtCookie) {
    token = "";
  } else {
    token = jwtCookie.split("=")[1];

    if (!_.isString(token) || _.isEmpty(token)) {
      token = "";
    }
  }

  return token;
};

// 從server端 cookie拿token過期時間
export let getExpirationDateFromCookie = cookie => {
  let expirationDate = cookie
    .split(";")
    .find(c => c.trim().startsWith("expirationDate="))
    .split("=")[1];

  if (!_.isString(expirationDate) || _.isEmpty(expirationDate)) {
    expirationDate = "";
  }
  return expirationDate;
};

// 把token設定至 LocalStorage 和 server端 cookie
export let setTokenOnWeb = token => {
  setStorage("token", token);
  Cookie.set("jwt", token);
};
// 把token過期時間設定至 LocalStorage 和 server端 cookie
export let setExpirationDateOnWeb = expirationDate => {
  setStorage("tokenExpiration", expirationDate);
  Cookie.set("expirationDate", expirationDate);
};

// 移除LocalStorage的token
export let removeTokenFromLocal = () => {
  removeStorage("token");
};

// 移除LocalStorage的token過期時間
export let removeExpirationDateFromLocal = () => {
  removeStorage("tokenExpiration");
};

// 從server端 cookie 移除 token
export let removeTokenFromCookie = () => {
  Cookie.remove("jwt");
};

// 從server端 cookie 移除 token過期時間
export let removeExpirationDateFromCookie = () => {
  Cookie.remove("expirationDate");
};
