export const SET_BATTERIES = (state, payload) => {
  state.batteries = payload;
};

export const SET_INVERTERS = (state, payload) => {
  state.inverters = payload;
};

export const SET_PANELS = (state, payload) => {
  state.panels = payload;
};

export const SET_BUNDLES = (state, payload) => {
  state.bundles = payload;
};

export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

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
