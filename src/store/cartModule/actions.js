import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";
import storage from "@/utils/storage.js";

export const addProductToLocalCart = ({ dispatch, rootState }) => {
  let mathcingProducts = false;
  let localCart = storage.getLocalCart();
  let productDetails = rootState.productModule.productDetails;
  let productId = rootState.productModule.productId;
  let stockAvailable = productDetails.stock.quantity_available;
  localCart.map((items) => {
    if (items.id == productId) {
      if (items.quantity < stockAvailable) {
        items.quantity += 1;
        items.subtotal += productDetails.total_price
          ? productDetails.total_price
          : productDetails.price;
        mathcingProducts = true;
        dispatch("incrementCartCounter", {}, { root: true });
        dispatch(
          "notificationModule/showToast",
          { description: "Added to cart", display: true, type: "success" },
          { root: true }
        );
      } else {
        dispatch(
          "notificationModule/showModal",
          {
            description: `We have only ${stockAvailable} of this Product left.`,
            display: true,
            type: "error",
          },
          { root: true }
        );
        mathcingProducts = true;
      }
      return;
    }
  });
  if (!mathcingProducts) {
    if (stockAvailable === 0) {
      dispatch(
        "notificationModule/showModal",
        {
          description: `Product is not available.`,
          display: true,
          type: "error",
        },
        { root: true }
      );
      return;
    }
    productDetails.quantity = 1;
    productDetails.subtotal = productDetails.total_price
      ? productDetails.total_price
      : productDetails.price;
    localCart.push(productDetails);
    dispatch("incrementCartCounter", {}, { root: true });
    dispatch(
      "notificationModule/showToast",
      {
        description: "Added to cart",
        display: true,
        type: "success",
      },
      { root: true }
    );
  }
  storage.setLocalCart(localCart);
};

export const addProductToOnlineCart = ({ commit, dispatch }, productId) => {
  return new Promise((resolve, reject) => {
    api
      .addProductToCart(productId)
      .then(({ data }) => {
        const cartItems = data.data.cart.items;
        let newQuantity = 0;
        if (cartItems.length === 0) {
          newQuantity = 0;
          dispatch("setCartCounter", newQuantity, { root: true });
          storage.setCartCount(newQuantity);
        }
        cartItems.map((item) => {
          newQuantity += item.quantity;
          dispatch("setCartCounter", newQuantity, { root: true });
          storage.setCartCount(newQuantity);
        });
        dispatch(
          "notificationModule/showToast",
          {
            description: "Added to cart",
            display: true,
            type: "success",
          },
          { root: true }
        );
        resolve({ data });
      })
      .catch(({ response }) => {
        dispatch(
          "notificationModule/showModal",
          {
            description: response.data.message,
            display: true,
            type: "error",
          },
          { root: true }
        );
        reject({ response });
      });
  });
};

export const getLocalCart = ({ commit, state }) => {
  commit("FETCHED_LOCAL_STORAGE", false);
  commit("SHOW", true);
  setTimeout(() => {
    let localCart = storage.getLocalCart();
    let subtotalArr = [];
    localCart.map((item) => {
      subtotalArr.push(item.subtotal);
    });
    commit("LOCAL_CART_ITEM", localCart);
    let subtotal = subtotalArr.reduce((acc, value) => {
      return acc + value;
    }, 0);
    commit("LOCAL_SUB_TOTAL", subtotal);
    state.localCartItem.length === 0
      ? (commit("SHOW", false),
        commit("CONTENT_LOADER_TEXT", "Nothing to show"))
      : commit("FETCHED_LOCAL_STORAGE", true);
  }, 500);
};

export const getOnlineCart = ({ commit, dispatch, state }) => {
  commit("FETCHED_ONLINE_CART", false);
  return new Promise((resolve, reject) => {
    api
      .getCart()
      .then(({ data }) => {
        commit("SET_CUSTOMER_CART", data.data);
        commit("SET_CART_ITEMS", data.data.cart.items);
        state.cartItems.length === 0
          ? (commit("SHOW", false),
            commit("CONTENT_LOADER_TEXT", "Nothing to show"))
          : commit("FETCHED_ONLINE_CART", true);
        resolve({ data });
      })
      .catch(({ response }) => {
        dispatch(
          "notificationModule/showModal",
          {
            description: response.data.message,
            display: true,
            type: "error",
          },
          { root: true }
        );
        reject({ response });
      });
  });
};

export const removeFromLocalCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_LOCAL_STORAGE", false);
  commit("SHOW", true);
  setTimeout(() => {
    let localCart = storage.getLocalCart();
    let subtotalArr = [];
    let counter = storage.getCartCount();
    localCart.map((item, index) => {
      if (item.id === productId) {
        counter -= item.quantity;
        localCart.splice(index, 1);
      }
    });
    localCart.map((item) => {
      subtotalArr.push(item.subtotal);
    });
    let subtotal = subtotalArr.reduce((acc, value) => {
      return acc + value;
    }, 0);
    dispatch("setCartCounter", counter, { root: true });
    storage.setCartCount(counter);
    commit("LOCAL_SUB_TOTAL", subtotal);
    commit("LOCAL_CART_ITEM", localCart);
    storage.setLocalCart(localCart);
    state.localCartItem.length === 0
      ? (commit("SHOW", false),
        commit("CONTENT_LOADER_TEXT", "Nothing to show"))
      : commit("FETCHED_LOCAL_STORAGE", true);
  }, 500);
};

export const removeFromOnlineCart = (
  { commit, dispatch, state },
  productId
) => {
  commit("FETCHED_ONLINE_CART", false);
  commit("SHOW", false);
  return new Promise((resolve, reject) => {
    api
      .removeFromCart(productId)
      .then(({ data }) => {
        let newQuantity = 0;
        if (data.data.cart.items.length === 0) {
          newQuantity = 0;
          dispatch("setCartCounter", newQuantity, { root: true });
          storage.setCartCount(newQuantity);
        }
        data.data.cart.items.map((item) => {
          newQuantity += item.quantity;
          dispatch("setCartCounter", newQuantity, { root: true });
          storage.setCartCount(newQuantity);
        });
        commit("SET_CUSTOMER_CART", data.data);
        // this.customerCart = data.data;
        // this.checkIfCartIsEmpty();
        dispatch(
          "notificationModule/showToast",
          {
            description: "Removed from Cart",
            display: true,
            type: "success",
          },
          { root: true }
        );
        resolve({ data });
      })
      .catch(({ response }) => {
        dispatch(
          "notificationModule/showModal",
          {
            description: response.data.message,
            display: true,
            type: "error",
          },
          { root: true }
        );
        reject({ response });
      });
  });
};

export const decreaseLocalCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_LOCAL_STORAGE", false);
  commit("SHOW", true);
  let localCart = storage.getLocalCart();
  let subtotalArr = [];
  localCart.map((item, index) => {
    if (item.id === productId) {
      item.quantity = item.quantity -= 1;
      item.subtotal = item.total_price
        ? (item.subtotal -= item.total_price)
        : (item.subtotal -= item.price);
      dispatch("decrementCartCounter", {}, { root: true });
      item.quantity === 0 ? localCart.splice(index, 1) : "";
    }
    subtotalArr.push(item.subtotal);
  });
  let subtotal = subtotalArr.reduce((acc, value) => {
    return acc + value;
  }, 0);
  commit("LOCAL_SUB_TOTAL", subtotal);
  commit("LOCAL_CART_ITEM", localCart);
  storage.setLocalCart(localCart);
  state.localCartItem.length === 0
    ? (commit("SHOW", false), commit("CONTENT_LOADER_TEXT", "Nothing to show"))
    : commit("FETCHED_LOCAL_STORAGE", true);
};

export const increaseLocalCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_LOCAL_STORAGE", false);
  commit("SHOW", true);
  let localCart = storage.getLocalCart();
  let subtotalArr = [];
  localCart.map((item, index) => {
    if (item.id === productId) {
      let stockAvailable = item.stock.quantity_available;
      if (item.quantity < stockAvailable) {
        item.quantity = item.quantity += 1;
        item.subtotal = item.total_price
          ? (item.subtotal += item.total_price)
          : (item.subtotal += item.price);
        dispatch("incrementCartCounter", {}, { root: true });
        item.quantity === 0 ? localCart.splice(index, 1) : "";
      } else {
        dispatch(
          "notificationModule/showModal",
          {
            description: `We have only ${stockAvailable} of this Product left.`,
            display: true,
            type: "error",
          },
          { root: true }
        );
      }
    }
    subtotalArr.push(item.subtotal);
  });
  let subtotal = subtotalArr.reduce((acc, value) => {
    return acc + value;
  }, 0);
  commit("LOCAL_SUB_TOTAL", subtotal);
  commit("LOCAL_CART_ITEM", localCart);
  storage.setLocalCart(localCart);
  state.localCartItem.length === 0
    ? (commit("SHOW", false), commit("CONTENT_LOADER_TEXT", "Nothing to show"))
    : commit("FETCHED_LOCAL_STORAGE", true);
};
