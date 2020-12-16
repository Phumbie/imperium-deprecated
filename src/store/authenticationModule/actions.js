import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const registerCustomer = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .signupCustomer(payload)
      .then(({ data }) => {
        if (data.status == "success") {
          dispatch(
            "notificationModule/showToast",
            {
              description: "Successful",
              display: true,
              type: "success",
            },
            { root: true }
          );
          storage.setUser(data.data);
          storage.setToken(data.data.token);
          router.push("/my-account");
          commit("SET_LOADING", false, { root: true });
        }
        if (JSON.parse(localStorage.getItem("product_id"))) {
          let localCart = JSON.parse(localStorage.getItem("product_id"));
          localCart.map((item) => {
            api
              .addProductToCart(item.id)
              .then(({ data }) => {
                dispatch(
                  "incrementCartCounter",
                  {
                    description: "Added to cart",
                    display: true,
                    type: "success",
                  },
                  { root: true }
                );
                resolve({ data });
              })
              .catch(({ data }) => {
                alert(data.message);
                reject({ data });
              });
          });
        }
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showModal",
          {
            description: "User already exist",
            display: true,
            type: "error",
          },
          { root: true }
        );
        router.push("/login");
        reject({ data });
      });
  });
};
