import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const signupCustomer = ({ commit, dispatch }, payload) => {
  commit("SET_LOADING", true, { root: true });
  let localCart = storage.getLocalCart();
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
      if (localCart.length !== 0) {
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
                })
                .catch((error) => {
                  alert(error.data.data.message);
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
          })
          .catch((error) => {
            dispatch(
              "notificationModule/showModal",
              {
                description:
                  "The quantity you're trying to buy is not available... Please pick other products.",
                display: true,
                type: "error",
              },
              { root: true }
            );
            router.push("/cart");
            commit("CLEAR_LOGIN_DETAILS", {
              loginDetails: {
                email: "",
                password: "",
              },
            });
            commit("SET_LOADING", false, { root: true });
          });
      } else {
        router.push("/products/1");
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
    })
    .catch(({ error }) => {
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
    });
};

export const loginCustomer = ({ commit, dispatch }, payload) => {
  commit("SET_LOADING", true, { root: true });
  let localCart = storage.getLocalCart();
  api
    .loginCustomer(payload)
    .then(({ data }) => {
      if (data.status == "success") {
        storage.setUser(data.data);
        storage.setToken(data.data.token);
      }
      if (localCart.length !== 0) {
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
                })
                .catch((error) => {
                  alert(error.data.data.message);
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
          })
          .catch((response) => {
            dispatch(
              "notificationModule/showModal",
              {
                description:
                  "The quantity you're trying to buy is not available... Please pick other products.",
                display: true,
                type: "error",
              },
              { root: true }
            );
            router.push("/cart");
            commit("CLEAR_LOGIN_DETAILS", {
              loginDetails: {
                email: "",
                password: "",
              },
            });
            commit("SET_LOADING", false, { root: true });
          });
      } else {
        router.push("/products/1");
        commit("CLEAR_LOGIN_DETAILS", {
          loginDetails: {
            email: "",
            password: "",
          },
        });
        commit("SET_LOADING", false, { root: true });
      }
    })
    .catch((error) => {
      commit("SET_LOADING", false, { root: true });
      dispatch(
        "notificationModule/showModal",
        {
          description: "Invalid account... This is not a customer account.💂",
          display: true,
          type: "error",
        },
        { root: true }
      );
    });
};

export const validate = ({ commit }, payload) => {
  commit("VALIDATE_INPUT", payload);
};

export const setConfirmPassword = ({ commit }, payload) => {
  commit("SET_CONFIRM_PASSWORD", payload);
};
