import { getStorage, setStorage } from "./storage";
import Cookie from "js-cookie";
import _ from "lodash";

// 從LocalStorage 拿Token
export let getTokenFromLocal = () => {
  let token = getStorage("token");

  if (!_.isString(token) || _.isEmpty(token)) {
    token = "";
  }

  return token;
};

// 從LocalStorage 拿Token過期時間
export let getExpirationDateFromLocal = () => {
  let expirationDate = getStorage("tokenExpiration");
  if (!_.isNumber(expirationDate)) {
    expirationDate = "";
  }
  return expirationDate;
};

// 從server端 cookie 拿Token
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

// 從server端 cookie拿Token過期時間
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

// 把Token設定至 LocalStorage 和 server端 cookie
export let setTokenOnWeb = token => {
  setStorage("token", token);
  Cookie.set("jwt", token);
};
// 把Token過期時間設定至 LocalStorage 和 server端 cookie
export let setExpirationDateOnWeb = expirationDate => {
  setStorage("tokenExpiration", expirationDate);
  Cookie.set("expirationDate", expirationDate);
};
