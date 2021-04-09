import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import fillArray from "@/utils/fillArray.js";
import storage from "@/utils/storage.js";

export const addProductToLocalCart = ({ commit, dispatch, rootState }) => {
  let mathcingProducts = false;
  let localDetails = storage.getStorageCart();
  let productDetails = rootState.productModule.productDetails;
  let productId = rootState.productModule.productId;
  let stockAvailable = productDetails.stock.quantity_available;
  localDetails.map((items) => {
    if (items.id == productId) {
      if (items.quantity < stockAvailable) {
        items.quantity += 1;
        items.subtotal += productDetails.price;
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
    let newProduct = {
      id: productId,
      quantity: 1,
      subtotal: productDetails.price,
    };
    localDetails.push(newProduct);
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
  storage.setStorageCart(localDetails);
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
        reject({ data });
      });
  });
};
