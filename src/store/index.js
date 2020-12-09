import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import productModule from "./productModule/index";
import searchProductModule from "./searchProductModule";
import notificationModule from "./NotificationModule";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    productModule,
    searchProductModule,
    notificationModule,
  },
});
