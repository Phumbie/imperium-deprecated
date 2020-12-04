import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer`;
const CUSTOMER_LOGIN_URL = `${BASE_URL}/user/login`;
const PRODUCTS_URL = `${BASE_URL}/product`;
const CART_URL = `${BASE_URL}/cart`;
const CART_CHECKOUT_URL = `${BASE_URL}/order/checkout`;
const CUSTOMER_ORDER_URL = `${BASE_URL}/order`;
const FORGET_PASSWORD_URL = `${BASE_URL}/user/reset-password`;
const RESET_PASSWORD_URL = `${BASE_URL}/user/reset-password-confirmation`;
const CONFIRM_CUSTOMER_URL = `${BASE_URL}/user/confirm`;
const SPECTA_PAYMENT_URL = process.env.VUE_APP_SPECTA_PAYMENT_URL;
const SPECTA_VERIFY_PAYMENT_URL = process.env.VUE_APP_SPECTA_VERIFY_PAYMENT_URL;

export default {
  getHeader() {
    let header = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    return header;
  },
  signupCustomer: (data) => {
    return axios.post(CUSTOMER_SIGNUP_URL, data);
  },
  loginCustomer: (data) => {
    return axios.post(CUSTOMER_LOGIN_URL, data);
  },
  getAllProducts: (page) => {
    return axios.get(`${PRODUCTS_URL}?page=${page}`);
  },
  getAllProductsQuery_per_page: (per_page) => {
    return axios.get(`${PRODUCTS_URL}?per_page=${per_page}`);
  },
  getProductBySlug: (slug) => {
    return axios.get(`${PRODUCTS_URL}/${slug}`);
  },
  addProductToCart(pid) {
    let data = {};
    return axios.post(`${CART_URL}/${pid}`, data, {
      headers: this.getHeader(),
    });
  },
  getProductByCategory: (category, page) => {
    return axios.get(`${PRODUCTS_URL}?category=${category}&page=${page}`);
  },
  getSimilarProducts: (category, per_page) => {
    return axios.get(
      `${PRODUCTS_URL}?category=${category}&per_page=${per_page}`
    );
  },
  addBulkProductToCart(data) {
    return axios.post(`${CART_URL}`, data, {
      headers: this.getHeader(),
    });
  },
  getCart() {
    return axios.get(`${CART_URL}`, { headers: this.getHeader() });
  },
  removeFromCart(pid) {
    return axios.delete(`${CART_URL}/${pid}`, {
      headers: this.getHeader(),
    });
  },
  decreaseProductQuantityInCart(pid) {
    return axios.delete(`${CART_URL}/${pid}/decrease`, {
      headers: this.getHeader(),
    });
  },
  cartCheckout() {
    let data = {};
    return axios.post(`${CART_CHECKOUT_URL}`, data, {
      headers: this.getHeader(),
    });
  },
  getCustomerOrder(page) {
    return axios.get(`${CUSTOMER_ORDER_URL}?page=${page}`, {
      headers: this.getHeader(),
    });
  },
  getCustomerOrderById(orderId) {
    return axios.get(`${CUSTOMER_ORDER_URL}/${orderId}`, {
      headers: this.getHeader(),
    });
  },
  forgetPassword: (data) => {
    return axios.post(`${FORGET_PASSWORD_URL}`, data);
  },
  resetPassword: (data) => {
    return axios.post(`${RESET_PASSWORD_URL}`, data);
  },
  confirmCustomer: (id) => {
    return axios.get(`${CONFIRM_CUSTOMER_URL}?id=${id}`);
  },
  spectaPaymentUrl: (data) => {
    return axios.post(`${SPECTA_PAYMENT_URL}`, data, {
      headers: { "x-ApiKey": `TEST_API_KEY` },
    });
  },
  spectaVerifyPayment: (data) => {
    return axios.post(`${SPECTA_VERIFY_PAYMENT_URL}`, data);
  },
};
