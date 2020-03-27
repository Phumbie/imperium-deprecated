import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cartCounter: 0,
    activeTab: "all products"
  },
  mutations: {
    SET_CART_COUNTER(state, payload) {
      state.cartCounter = payload;
    },
    INCREMENT_CART_COUNTER(state) {
      state.cartCounter++;
    },
    DECREMENT_CART_COUNTER(state) {
      state.cartCounter--;
    },
    SET_ACTIVE_TAB_ID(state, payload) {
      state.activeTab = payload;
      localStorage.setItem("active_tab", JSON.stringify(payload));
    }
  },
  getters: {
    cartCounter: state => state.cartCounter,
    activeTab: state => state.activeTab
  },
  actions: {
    setCartCounter: ({ commit }, payload) => {
      commit("SET_CART_COUNTER", payload);
    },
    incrementCartCounter: ({ commit }) => {
      commit("INCREMENT_CART_COUNTER");
    },
    decrementCartCounter: ({ commit }) => {
      commit("DECREMENT_CART_COUNTER");
    },
    setActiveTabId: ({ commit }, payload) => {
      commit("SET_ACTIVE_TAB_ID", payload);
    }
  }
});
