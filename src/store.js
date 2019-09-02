import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cartCounter: '...'
  },
  mutations: {
    SET_CART_COUNTER (state, payload) {
      state.cartCounter = payload;
    },
    INCREMENT_CART_COUNTER (state) {
      state.cartCounter++;
      localStorage.setItem("cartCounter", state.cartCounter);
    },
    DECREMENT_CART_COUNTER (state) {
      state.cartCounter--;
      localStorage.setItem("cartCounter", state.cartCounter);
    }
  },
  getters: {
    cartCounter: state => state.cartCounter,
  },
  actions: { 
    setCartCounter: ({ commit }, payLoad) => {
      commit('SET_CART_COUNTER', payLoad);
    },
    incrementCartCounter: ({ commit }) => {
      commit('INCREMENT_CART_COUNTER');
    },
    decrementCartCounter: ({ commit }) => {
      commit('DECREMENT_CART_COUNTER');
    }
  }
})