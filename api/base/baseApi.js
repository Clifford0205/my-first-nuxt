import axios from "axios";
import _ from "lodash";
import Vue from "vue";
// import store from "@/store";
// import router from "@/router";
// Import component

import Loading from "vue-loading-overlay";

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import authorization from "./authorization";

// Init plugin
if (process.client) {
  Vue.use(Loading, {
    loader: "bars",
    color: "#8a4fdf",
    height: 128,
    width: 128
  });
}

let apiStatus = {};

let loadingCount = 0;

let loader;

const toggleLoading = (display, displayLoading) => {
  if (!displayLoading) return;

  if (display) {
    loadingCount++;
  } else {
    loadingCount--;
  }

  if (process.client) {
    if (loadingCount > 0) {
      if (!loader) {
        loader = Vue.$loading.show();
      }
    } else {
      loadingCount = 0;
      if (loader === undefined) {
        return;
      }
      loader.hide();
      loader = undefined;
    }
  }
};

const debounceErrorAlert = _.debounce(() => {
  alert("伺服器連線異常");
}, 500);

export default ({ method, url, config, displayLoading, baseURL, context }) => {
  if (process.server) {
    // console.log(context.route);
  }
  if (process.client) {
    // console.log($nuxt.$router);
  }
  let isStillGetting = _.get(apiStatus, url, false);

  if (isStillGetting) {
    return;
  }

  _.set(apiStatus, url, true);

  let defaultConfig = {
    baseURL,
    method,
    url,
    ...authorization({ context })
  };

  let usingConfig = Object.assign(defaultConfig, config);

  toggleLoading(true, displayLoading);

  return axios(usingConfig)
    .then(response => {
      _.unset(apiStatus, url);

      toggleLoading(false, displayLoading);

      // const code = _.get(response, "data.status.code");

      const data = _.get(response, "data");
      // const data = _.get(response, "data.data");
      // 之後串接自己的api要用這個

      // const message = _.get(response, "data.status.message");

      return data;
    })
    .catch(error => {
      _.unset(apiStatus, url);

      toggleLoading(false, displayLoading);

      // eslint-disable-next-line no-console
      console.error(error.response);

      const status = _.get(error, "response.status");

      const code = _.get(error, "response.data.status.code");

      console.log(status);

      if (status == 400) {
        console.log($nuxt.$router);
        $nuxt.$router.push({ name: "首頁" });
        return;
      }

      console.log("ggg");

      const message = _.get(error, "response.data.status.message");

      if (message) {
        return message;
      } else {
        debounceErrorAlert();
      }
    });
};
