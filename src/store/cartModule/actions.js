import api from "@/utils/api.js";
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

export const addProductToOnlineCart = ({ dispatch }, productId) => {
  api
    .addProductToCart(productId)
    .then(({ data }) => {
      let cartCounter = data.data.total_quantity;
      dispatch("setCartCounter", cartCounter, { root: true });
      storage.setCartCount(cartCounter);
      dispatch(
        "notificationModule/showToast",
        {
          description: "Added to cart",
          display: true,
          type: "success",
        },
        { root: true }
      );
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
    });
};

export const getLocalCart = ({ commit, state }) => {
  commit("FETCHED_ONLINE_CART", false);
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
  commit("FETCHED_LOCAL_STORAGE", false);
  commit("FETCHED_ONLINE_CART", false);
  commit("SHOW", true);
  api
    .getCart()
    .then(({ data }) => {
      commit("SUB_TOTAL", data.data.sub_total);
      commit("SET_CART_ITEMS", data.data.cart.items);
      state.cartItems.length === 0
        ? (commit("SHOW", false),
          commit("CONTENT_LOADER_TEXT", "Nothing to show"))
        : commit("FETCHED_ONLINE_CART", true);
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

export const removeFromCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_ONLINE_CART", false);
  commit("SHOW", true);
  api
    .removeFromCart(productId)
    .then(({ data }) => {
      let cartCounter = data.data.total_quantity;
      dispatch("setCartCounter", cartCounter, { root: true });
      storage.setCartCount(cartCounter);
      commit("SUB_TOTAL", data.data.sub_total);
      commit("SET_CART_ITEMS", data.data.cart.items);
      state.cartItems.length === 0
        ? (commit("SHOW", false),
          commit("CONTENT_LOADER_TEXT", "Nothing to show"))
        : commit("FETCHED_ONLINE_CART", true);
      dispatch(
        "notificationModule/showToast",
        {
          description: "Removed from Cart",
          display: true,
          type: "success",
        },
        { root: true }
      );
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
      item.quantity === 0 ? localCart.splice(index, 1) : null;
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

export const decreaseFromCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_ONLINE_CART", false);
  commit("SHOW", true);
  api
    .decreaseProductQuantityInCart(productId)
    .then(({ data }) => {
      let cartCounter = data.data.total_quantity;
      dispatch("setCartCounter", cartCounter, { root: true });
      storage.setCartCount(cartCounter);
      commit("SUB_TOTAL", data.data.sub_total);
      commit("SET_CART_ITEMS", data.data.cart.items);
      state.cartItems.length === 0
        ? (commit("SHOW", false),
          commit("CONTENT_LOADER_TEXT", "Nothing to show"))
        : commit("FETCHED_ONLINE_CART", true);
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
    });
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

export const increaseFromCart = ({ commit, dispatch, state }, productId) => {
  commit("FETCHED_ONLINE_CART", false);
  commit("SHOW", true);
  api
    .addProductToCart(productId)
    .then(({ data }) => {
      let cartCounter = data.data.total_quantity;
      dispatch("setCartCounter", cartCounter, { root: true });
      storage.setCartCount(cartCounter);
      commit("SUB_TOTAL", data.data.sub_total);
      commit("SET_CART_ITEMS", data.data.cart.items);
      state.cartItems.length === 0
        ? (commit("SHOW", false),
          commit("CONTENT_LOADER_TEXT", "Nothing to show"))
        : commit("FETCHED_ONLINE_CART", true);
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
      commit("FETCHED_ONLINE_CART", true);
    });
};

export const cartCheckout = ({ commit, dispatch }) => {
  commit("SET_LOADING", false);
  commit("SHOW", true);
  api
    .cartCheckout()
    .then(({ data }) => {
      commit("ORDER", data.data.order);
      commit("ORDER_ITEMS", data.data.order.items);
      commit("SET_LOADING", true);
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
      commit("SET_LOADING", true);
    });
};

export const order = ({ commit }, payload) => {
  commit("ORDER", payload);
};

export const orderItems = ({ commit }, payload) => {
  commit("ORDER_ITEMS", payload);
};

export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};
