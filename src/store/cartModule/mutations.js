export const LOCAL_CART_ITEM = (state, payload) => {
  state.localCartItem = payload;
};

export const SET_CART_ITEMS = (state, payload) => {
  state.cartItems = payload;
};

export const ORDER = (state, payload) => {
  state.order = payload;
};

export const ORDER_ITEMS = (state, payload) => {
  state.orderItems = payload;
};

export const SUB_TOTAL_ARR = (state, payload) => {
  state.subtotalArr = payload;
};

export const LOCAL_SUB_TOTAL = (state, payload) => {
  state.localSubtotal = payload;
};

export const SUB_TOTAL = (state, payload) => {
  state.subtotal = payload;
};

export const SHOW = (state, payload) => {
  state.show = payload;
};

export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const FETCHED_LOCAL_STORAGE = (state, payload) => {
  state.fetchedLocalStorage = payload;
};

export const FETCHED_ONLINE_CART = (state, payload) => {
  state.fetchedCart = payload;
};

export const CONTENT_LOADER_TEXT = (state, payload) => {
  state.contentLoaderText = payload;
};

export const SET_CUSTOMER_CART = (state, payload) => {
  state.customerCart = payload;
};
