import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const registerCustomer = ({ commit, dispatch }, payload) => {
  commit("SET_LOADING", true, { root: true });
  api
    .signupCustomer(payload)
    .then((response) => {
      if (response.data.status == "success") {
        dispatch(
          "notificationModule/showToast",
          {
            description: "Successful",
            display: true,
            type: "success",
          },
          { root: true }
        );
        storage.setUser(response.data.data);
        storage.setToken(response.data.data.token);
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
            })
            .catch(({ response }) => {
              alert(response.data.message);
            });
        });
      }
    })
    .catch(({ response }) => {
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
    });
};
