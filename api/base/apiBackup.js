import axios from "axios";
import _ from "lodash";
import Vue from "vue";
// import store from "@/store";
// import router from "@/router";
// Import component
// import Loading from "vue-loading-overlay";
// Import stylesheet
// import "vue-loading-overlay/dist/vue-loading.css";
// import authorization from "./authorization";

// Init plugin
// Vue.use(Loading, { loader: "bars", color: "#8a4fdf", height: 128, width: 128 });

let baseURL = process.env.baseUrl;

let apiStatus = {};

let loadingCount = 0;

let loader;

// const toggleLoading = (display, displayLoading) => {
//   if (!displayLoading) return;

//   if (display) {
//     loadingCount++;
//   } else {
//     loadingCount--;
//   }

//   if (loadingCount > 0) {
//     if (!loader) {
//       loader = Vue.$loading.show();
//     }
//   } else {
//     loadingCount = 0;
//     if (loader === undefined) {
//       return;
//     }
//     loader.hide();
//     loader = undefined;
//   }
// };

const debounceErrorAlert = _.debounce(() => {
  alert("伺服器連線異常");
}, 500);

export default ({
  method,
  url,
  config = {},
  cb,
  errCb,
  displayLoading = true
}) => {
  let isStillGetting = _.get(apiStatus, url, false);

  if (isStillGetting) {
    return;
  }

  _.set(apiStatus, url, true);

  let defaultConfig = {
    baseURL,
    method,
    url
    // ...authorization()
  };

  let usingConfig = Object.assign(defaultConfig, config);

  // toggleLoading(true, displayLoading);

  return axios(usingConfig)
    .then(response => {
      _.unset(apiStatus, url);

      // toggleLoading(false, displayLoading);

      // const code = _.get(response, "data.status.code");

      const data = _.get(response, "data");
      // const data = _.get(response, "data.data");
      // 之後串接自己的api要用這個

      // const message = _.get(response, "data.status.message");

      return data;
    })
    .catch(error => {
      _.unset(apiStatus, url);

      // toggleLoading(false, displayLoading);

      // eslint-disable-next-line no-console
      console.error(error);

      const status = _.get(error, "response.status");

      const code = _.get(error, "response.data.status.code");

      if (status == 401) {
        $nuxt.$router.push("index");
        return;
      }

      const message = _.get(error, "response.data.status.message");

      if (message) {
        if (errCb) {
          errCb(message);
        } else {
          alert(message);
        }
      } else {
        debounceErrorAlert();
      }
    });
};
