export const setCartCounter = ({ commit }, payload) => {
  commit("SET_CART_COUNTER", payload);
};

export const incrementCartCounter = ({ commit }) => {
  commit("INCREMENT_CART_COUNTER");
};

export const decrementCartCounter = ({ commit }) => {
  commit("DECREMENT_CART_COUNTER");
};

export const setActiveTabId = ({ commit }, payload) => {
  commit("SET_ACTIVE_TAB_ID", payload);
};
