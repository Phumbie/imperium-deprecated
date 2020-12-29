export const SET_CART_COUNTER = (state, payload) => {
  state.cartCounter = payload;
};

export const INCREMENT_CART_COUNTER = (state) => {
  state.cartCounter++;
  localStorage.setItem("cartCounter", state.cartCounter);
};

export const DECREMENT_CART_COUNTER = (state) => {
  state.cartCounter--;
  localStorage.setItem("cartCounter", state.cartCounter);
};

export const SET_ACTIVE_TAB_ID = (state, payload) => {
  state.activeTab = payload;
  localStorage.setItem("active_tab", JSON.stringify(payload));
};

export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};
