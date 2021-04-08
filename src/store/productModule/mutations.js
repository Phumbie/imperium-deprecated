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

export const SET_PRODUCTLIST = (state, payload) => {
  state.productsList = payload;
};

export const SET_SIMILAR_PRODUCT = (state, payload) => {
  state.similarProducts = payload;
};

export const SET_PRODUCT_DETAILS = (state, payload) => {
  state.productDetails = payload;
};

export const SET_PRODUCT_SLUG = (state, payload) => {
  state.productSlug = payload;
};

export const SET_PAGINATION = (state, payload) => {
  state.pagination = payload;
};

export const SET_PAGE = (state, payload) => {
  state.page = payload;
};

export const SET_SHOW = (state, payload) => {
  state.show = payload;
};
