export const SET_PRODUCT_SEARCH = (state, payload) => {
  state.products = payload;
  //   console.log(state.products);
};

export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const SET_PAGINATION = (state, payload) => {
  state.pagination = payload;
};

export const SET_SHOW = (state, payload) => {
  //   console.log(payload);
  state.show = payload;
};
