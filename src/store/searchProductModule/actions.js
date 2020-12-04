import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";

export const searchProducts = ({ commit }, queryParams) => {
  commit("SET_LOADING", true);
  commit("SET_SHOW", true);

  return new Promise((resolve, reject) => {
    api
      .searchProducts(queryParams)
      .then(({ data }) => {
        // console.log(data);
        if (data.data.result.length < 4) {
          const fill = fillArray(4, data.data.result.length);
          const productSearch = data.data.result.concat(fill);
          commit("SET_PRODUCT_SEARCH", productSearch);
          commit("SET_PAGINATION", data.data);
        }
        if (data.data.result.length == 0) {
          commit("SET_SHOW", false);
        } else {
          commit("SET_LOADING", false);
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
