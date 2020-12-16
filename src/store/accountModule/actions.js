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
            description: "Email or Phone number already exist",
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

export const loginCustomer = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .loginCustomer(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success") {
          storage.setUser(data.data);
        }
        storage.setToken(data.data.token);
        router.push("/my-account");
        commit("SET_LOADING", false, { root: true });
        if (JSON.parse(localStorage.getItem("product_id")).length !== 0) {
          let localCart = JSON.parse(localStorage.getItem("product_id"));
          localCart.map((product) => {
            product.product_id = product.id;
            delete product.subtotal;
            delete product.id;
          });
          const payload = { products: localCart };
          api
            .addBulkProductToCart(payload)
            .then((response) => {
              if (response) {
                api
                  .getCart()
                  .then(({ data }) => {
                    if (data.status == "success") {
                      let cartSize = 0;
                      let cartItems = data.data.cart.items;
                      cartItems.forEach((item) => {
                        cartSize += item.quantity;
                      });
                      dispatch("setCartCounter", cartSize, { root: true });
                    }
                  })
                  .catch((error) => {
                    alert(error.data.data.message);
                  });
              }
            })
            .catch((error) => {
              alert(error.data.data.message);
            });
        }
      })
      .catch((error) => {
        commit("SET_LOADING", false, { root: true });
        dispatch("notificationModule/showModal", {
          description: "Invalid account.",
          display: true,
          type: "error",
        });
      });
  });
};
