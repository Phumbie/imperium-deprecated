import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const signupCustomer = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .signupCustomer(payload)
      .then(({ data }) => {
        if (data.status == "success") {
          dispatch(
            "notificationModule/showToast",
            {
              description: "Welcome to imperium",
              display: true,
              type: "success",
            },
            { root: true }
          );
          storage.setUser(data.data);
          storage.setToken(data.data.token);
        }
        if (storage.getStorageCart().length !== 0) {
          let localCart = storage.getStorageCart();
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
                      commit("SET_CART_COUNTER", cartSize, {
                        root: true,
                      });
                    }
                    resolve({ data });
                  })
                  .catch((error) => {
                    alert(error.data.data.message);
                    reject(error);
                  });
              }
              router.push("/cart");
              commit("CLEAR_SIGNUP_DETAILS", {
                signupDetails: {
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  phone_number: "",
                  address: {
                    street: "",
                    lga: "",
                    state: "",
                  },
                },
                confirmPassword: "",
              });
              commit("SET_LOADING", false, { root: true });
              resolve(response);
            })
            .catch((error) => {
              alert(error.data.data.message);
              reject(error);
            });
        } else {
          router.push("/my-account");
          commit("CLEAR_SIGNUP_DETAILS", {
            signupDetails: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              phone_number: "",
              address: {
                street: "",
                lga: "",
                state: "",
              },
            },
            confirmPassword: "",
          });
          commit("SET_LOADING", false, { root: true });
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

export const loginCustomer = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .loginCustomer(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success") {
          storage.setUser(data.data);
          storage.setToken(data.data.token);
        }
        if (storage.getStorageCart().length !== 0) {
          let localCart = storage.getStorageCart();
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
                      commit("SET_CART_COUNTER", cartSize, { root: true });
                    }
                    resolve({ data });
                  })
                  .catch((error) => {
                    alert(error.data.data.message);
                    reject(error);
                  });
              }
              router.push("/cart");
              commit("CLEAR_LOGIN_DETAILS", {
                loginDetails: {
                  email: "",
                  password: "",
                },
              });
              commit("SET_LOADING", false, { root: true });
              resolve(response);
            })
            .catch((error) => {
              alert(error.data.data.message);
              reject(error);
            });
        } else {
          router.push("/my-account");
          commit("CLEAR_LOGIN_DETAILS", {
            loginDetails: {
              email: "",
              password: "",
            },
          });
          commit("SET_LOADING", false, { root: true });
        }
        resolve({ data });
      })
      .catch((error) => {
        commit("SET_LOADING", false, { root: true });
        commit(
          "notificationModule/SHOW_MODAL",
          {
            description: `Invalid account. ${error}`,
            display: true,
            type: "error",
          },
          { root: true }
        );
        reject(error);
      });
  });
};

export const validate = ({ commit }, payload) => {
  commit("VALIDATE_INPUT", payload);
};

export const setConfirmPassword = ({ commit }, payload) => {
  commit("SET_CONFIRM_PASSWORD", payload);
};
