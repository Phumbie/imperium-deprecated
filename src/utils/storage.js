export default {
  setUser(data) {
    return localStorage.setItem("user_details", JSON.stringify(data));
  },
  getUser() {
    return localStorage.getItem("user_details");
  },
  setToken(data) {
    return localStorage.setItem("token", data);
  },
  setStorageCart(data) {
    return localStorage.setItem("product_id", JSON.stringify(data));
  },
  getStorageCart() {
    return JSON.parse(localStorage.getItem("product_id"));
  },
  setCartCount(data) {
    return localStorage.setItem("cartCounter", JSON.stringify(data));
  },
  getCartCount() {
    return JSON.parse(localStorage.getItem("cartCounter"));
  },
  setLocalCart(data) {
    localStorage.setItem("local_cart", JSON.stringify(data));
  },
  getLocalCart() {
    return JSON.parse(localStorage.getItem("local_cart"));
  },
};
