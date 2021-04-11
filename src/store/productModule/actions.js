import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";
import storage from "@/utils/storage.js";

export const getAllProducts = ({ commit }, queryParams) => {
  commit("SET_LOADING", true);
  return new Promise((resolve, reject) => {
    if (queryParams.category === "all products") {
      api
        .getAllProducts(queryParams.page)
        .then(({ data }) => {
          if (data.data.result.length < 4) {
            const fill = fillArray(4, data.data.result.length);
            const productsList = data.data.result.concat(fill);
            commit("SET_PRODUCTLIST", productsList);
            commit("SET_PAGINATION", data.data);
            commit("SET_LOADING", false);
          } else {
            commit("SET_PRODUCTLIST", data.data.result);
            commit("SET_PAGINATION", data.data);
            commit("SET_LOADING", false);
          }
          resolve({ data });
        })
        .catch(({ data }) => {
          alert(data.message);
          reject({ data });
        });
    } else {
      api
        .getProductByCategory(queryParams.category, queryParams.page)
        .then(({ data }) => {
          if (data.data.result.length < 4) {
            const fill = fillArray(4, data.data.result.length);
            const productsList = data.data.result.concat(fill);
            commit("SET_PRODUCTLIST", productsList);
            commit("SET_PAGINATION", data.data);
            commit("SET_LOADING", false);
          } else {
            commit("SET_PRODUCTLIST", data.data.result);
            commit("SET_PAGINATION", data.data);
            commit("SET_LOADING", false);
          }
          resolve({ data });
        })
        .catch(({ data }) => {
          alert(data.message);
          reject({ data });
        });
    }
  });
};

export const getSimilarProducts = ({ commit }, queryParams) => {
  commit("SET_LOADING", true);
  return new Promise((resolve, reject) => {
    api
      .getSimilarProducts(queryParams.category, queryParams.per_page)
      .then(({ data }) => {
        if (data.data.result.length < queryParams.quantity) {
          const fill = fillArray(queryParams.quantity, data.data.result.length);
          switch (queryParams.category) {
            case "solar panel":
              const panels = shuffleArray(data.data.result).concat(fill);
              queryParams.quantity === 2
                ? commit("SET_PANELS", panels)
                : commit("SET_SIMILAR_PRODUCT", panels);
              break;

            case "inverter":
              const inverters = shuffleArray(data.data.result).concat(fill);
              queryParams.quantity === 2
                ? commit("SET_INVERTERS", inverters)
                : commit("SET_SIMILAR_PRODUCT", inverters);
              break;

            case "battery":
              const batteries = shuffleArray(data.data.result).concat(fill);
              queryParams.quantity === 2
                ? commit("SET_BATTERIES", batteries)
                : commit("SET_SIMILAR_PRODUCT", batteries);
              break;

            case "bundle":
              const bundles = shuffleArray(data.data.result).concat(fill);
              queryParams.quantity === 2
                ? commit("SET_BUNDLES", bundles)
                : commit("SET_SIMILAR_PRODUCT", bundles);
              break;

            default:
              break;
          }
          commit("SET_LOADING", false);
        } else {
          switch (queryParams.category) {
            case "solar panel":
              const panels = shuffleArray(data.data.result).slice(
                -queryParams.quantity
              );
              queryParams.quantity === 2
                ? commit("SET_PANELS", panels)
                : commit("SET_SIMILAR_PRODUCT", panels);
              break;

            case "inverter":
              const inverters = shuffleArray(data.data.result).slice(
                -queryParams.quantity
              );
              queryParams.quantity === 2
                ? commit("SET_INVERTERS", inverters)
                : commit("SET_SIMILAR_PRODUCT", inverters);
              break;

            case "battery":
              const batteries = shuffleArray(data.data.result).slice(
                -queryParams.quantity
              );
              queryParams.quantity === 2
                ? commit("SET_BATTERIES", batteries)
                : commit("SET_SIMILAR_PRODUCT", batteries);
              break;

            case "bundle":
              const bundles = shuffleArray(data.data.result).slice(
                -queryParams.quantity
              );
              queryParams.quantity === 2
                ? commit("SET_BUNDLES", bundles)
                : commit("SET_SIMILAR_PRODUCT", bundles);
              break;

            default:
              break;
          }
          commit("SET_LOADING", false);
        }
        resolve({ data });
      })
      .catch(({ data }) => {
        alert(data.message);
        reject({ data });
      });
  });
};

export const searchProducts = ({ commit }, queryParams) => {
  commit("SET_LOADING", true);
  return new Promise((resolve, reject) => {
    api
      .searchProducts(queryParams.query)
      .then(({ data }) => {
        if (data.data.result.length === 0) {
          commit("SET_SHOW", false);
          resolve({ data });
          return;
        }
        if (data.data.result.length < 4) {
          const fill = fillArray(4, data.data.result.length);
          const searchResult = data.data.result.concat(fill);
          commit("SET_PRODUCTLIST", searchResult);
          commit("SET_PAGINATION", data.data);
          commit("SET_LOADING", false);
        } else {
          commit("SET_PRODUCTLIST", data.data.result);
          commit("SET_PAGINATION", data.data);
          commit("SET_LOADING", false);
        }
        resolve({ data });
      })
      .catch(({ data }) => {
        alert(data.message);
        reject({ data });
      });
  });
};

export const getProductBySlug = ({ commit, dispatch }, slug) => {
  commit("SET_LOADING", true);
  return new Promise((resolve, reject) => {
    api
      .getProductBySlug(slug)
      .then(({ data }) => {
        const productDetails = data.data;
        commit("SET_PRODUCT_DETAILS", productDetails);
        dispatch("getSimilarProducts", {
          category: data.data.category,
          per_page: 100000,
          quantity: 4,
        });
        commit("SET_LOADING", false);
        resolve({ data });
      })
      .catch(({ data }) => {
        alert(data.message);
        reject({ data });
      });
  });
};

export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};

export const setProductSlug = ({ commit }, payload) => {
  commit("SET_PRODUCT_SLUG", payload);
};

export const setProductId = ({ commit }, payload) => {
  commit("SET_PRODUCT_ID", payload);
};

export const setBundles = ({ commit }, payload) => {
  commit("SET_BUNDLES", payload);
};

export const setBatteries = ({ commit }, payload) => {
  commit("SET_BATTRIES", payload);
};

export const setPanels = ({ commit }, payload) => {
  commit("SET_PANELS", payload);
};

export const setInverters = ({ commit }, payload) => {
  commit("SET_INVERTERS", payload);
};

export const setPagination = ({ commit }, payload) => {
  commit("SET_PAGINATION", payload);
};

export const setProductsList = ({ commit }, payload) => {
  commit("SET_PRODUCTLIST", payload);
};

export const setPage = ({ commit }, payload) => {
  commit("SET_PAGE", payload);
};

export const setShow = ({ commit }, payload) => {
  commit("SET_SHOW", payload);
};
