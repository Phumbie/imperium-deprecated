import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";

export const getAllProducts = ({ commit }, queryParams) => {
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
        })
        .catch(({ data }) => {
          alert(data.message);
          reject({ data });
        });
    }
  });
};

export const getSimilarProducts = ({ commit }, queryParams) => {
  return new Promise((resolve, reject) => {
    api
      .getSimilarProducts(queryParams.category, queryParams.per_page)
      .then(({ data }) => {
        if (data.data.result.length < 2) {
          const fill = fillArray(2, data.data.result.length);
          switch (queryParams.category) {
            case "solar panel":
              const panels = shuffleArray(data.data.result).concat(fill);
              commit("SET_PANELS", panels);
              break;

            case "inverter":
              const inverters = shuffleArray(data.data.result).concat(fill);
              commit("SET_INVERTERS", inverters);
              break;

            case "battery":
              const batteries = shuffleArray(data.data.result).concat(fill);
              commit("SET_BATTERIES", batteries);
              break;

            case "bundle":
              const bundles = shuffleArray(data.data.result).concat(fill);
              commit("SET_BUNDLES", bundles);
              break;

            default:
              break;
          }
          commit("SET_LOADING", false);
          resolve({ data });
        } else {
          switch (queryParams.category) {
            case "solar panel":
              const panels = shuffleArray(data.data.result).slice(-2);
              commit("SET_PANELS", panels);
              break;

            case "inverter":
              const inverters = shuffleArray(data.data.result).slice(-2);
              commit("SET_INVERTERS", inverters);
              break;

            case "battery":
              const batteries = shuffleArray(data.data.result).slice(-2);
              commit("SET_BATTERIES", batteries);
              break;

            case "bundle":
              const bundles = shuffleArray(data.data.result).slice(-2);
              commit("SET_BUNDLES", bundles);
              break;

            default:
              break;
          }
          commit("SET_LOADING", false);
          resolve({ data });
        }
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
