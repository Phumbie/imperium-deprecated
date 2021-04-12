import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import productModule from "./productModule/index";
import cartModule from "./cartModule/index";
import notificationModule from "./notificationModule/index";
import accountModule from "./accountModule/index";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    productModule,
    notificationModule,
    accountModule,
    cartModule,
  },
});
