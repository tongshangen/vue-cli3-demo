import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import "./plugins/element.js";
import "./style/common.css";

import { post, get } from "./api/request.js";

// 将axios添加到原型链上
Vue.prototype.$axios = axios;

// 定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
