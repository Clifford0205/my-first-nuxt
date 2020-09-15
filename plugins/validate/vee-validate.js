import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zh_TW from "vee-validate/dist/locale/zh_TW.json";
import companySerialNoChecker from "./companySerialNoChecker";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
localize("zh_TW", zh_TW);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
  extend("password", {
    params: ["target"],
    validate(value, { target }) {
      return value === target;
    },
    message: "兩次輸入不一致"
  });
  extend("companySerialNoChecker", {
    validate: companySerialNoChecker,
    message: "統一編號不符合規範"
  });
});
