import axios from "axios";
import _ from "lodash";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// Init plugin
Vue.use(Loading, { loader: "bars", color: "#8a4fdf", height: 128, width: 128 });

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
};

const debounceErrorAlert = _.debounce(() => {
  alert("伺服器連線異常");
}, 500);

export default ({ method, url, data, displayLoading = true }) => {
 
  //   let isStillGetting = _.get(apiStatus, url, false);
  //   if (isStillGetting) {
  //     return;
  //   }
  //   _.set(apiStatus, url, true);

  //   toggleLoading(true, displayLoading);
  let resData;

  return $nuxt.context.$axios["$" + method](url, data).then(res => {
    console.log("res", res);
    resData = res;
    console.log("xxx", resData);
    return resData;
  });
};
