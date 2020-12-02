// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VModal from "vue-js-modal";
import sweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Pagination, Icon, Select, Option } from "element-ui";
import "@/assets/styles/scss/element-ui.scss";
import store from "./store";

Vue.use(VModal);
Vue.use(sweetalert2);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Option);
Vue.config.productionTip = false;
Vue.filter("shortenString", (value) => {
  if (value.length > 65) {
    return value.slice(0, 65) + "...";
  } else {
    return value;
  }
});
Vue.filter("setUppercase", (value) => {
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
});

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
