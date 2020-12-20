export default {
  setUser(data) {
    return localStorage.setItem("user_details", JSON.stringify(data));
  },
  setToken(data) {
    return localStorage.setItem("token", data);
  },
  getStorageCart() {
    return JSON.parse(localStorage.getItem("product_id"));
  },
};
