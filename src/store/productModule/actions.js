import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";

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

export const setBatteries = ({ commit }, payload) => {
  commit("SET_BATTERIES", payload);
};
export const setInverters = ({ commit }, payload) => {
  commit("SET_INVERTERS", payload);
};
export const setPanels = ({ commit }, payload) => {
  commit("SET_PANELS", payload);
};
export const setBundles = ({ commit }, payload) => {
  commit("SET_BUNDLES", payload);
};
export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};
