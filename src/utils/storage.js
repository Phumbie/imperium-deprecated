export default {
  setUser(data) {
    localStorage.setItem("user_details", JSON.stringify(data));
  },
  setToken(data) {
    localStorage.setItem("token", data);
  },
};
