import axios from "axios";

const BASE_URL = 'https://api.imperiumng.com/v1';
const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer`;
const CUSTOMER_LOGIN_URL = `${BASE_URL}/user/login`;
const ALL_PRODUCTS_URL = `${BASE_URL}/product?page=`;
const ADD_TO_CART_URL = `${BASE_URL}/cart`;
const SINGLE_PRODUCT_URL = `${BASE_URL}/product`;
const GET_CART_URL = `${BASE_URL}/cart`;
const CART_CHECKOUT_URL = `${BASE_URL}/order/checkout`;
const CUSTOMER_ORDER_URL = `${BASE_URL}/order/?status=placed`;
const CUSTOMER_ORDER_BY_ID_URL = `${BASE_URL}/order`;

export default {
  getHeader() {
    let header = {
      Authorization: "bearer " + localStorage.getItem("token")
    };
    return header;
  },
  signupCustomer: data => {
    return axios.post(CUSTOMER_SIGNUP_URL, data);
  },
  loginCustomer: data => {
    return axios.post(CUSTOMER_LOGIN_URL, data);
  },
  getAllProducts: page => {
    return axios.get(`${ALL_PRODUCTS_URL}${page}`);
  },
  getProductBySlug: slug => {
    return axios.get(`${SINGLE_PRODUCT_URL}/${slug}`);
  },
  addProductToCart(pid) {
    let data = {};
    return axios.post(`${ADD_TO_CART_URL}/${pid}`, data, {
      headers: this.getHeader()
    });
  },
  getCart() {
    return axios.get(`${GET_CART_URL}`, { headers: this.getHeader() });
  },
  removeFromCart(pid) {
    return axios.delete(`${GET_CART_URL}/${pid}`, {
      headers: this.getHeader()
    });
  },
  decreaseProductQuantityInCart(pid) {
    return axios.delete(`${GET_CART_URL}/${pid}/decrease`, {
      headers: this.getHeader()
    });
  },
  cartCheckout() {
    let data = {};
    return axios.post(`${CART_CHECKOUT_URL}`, data, {
      headers: this.getHeader()
    });
  },
  getCustomerOrder() {
    return axios.get(`${CUSTOMER_ORDER_URL}`, { headers: this.getHeader() });
  },
  getCustomerOrderById(orderId) {
    return axios.get(`${CUSTOMER_ORDER_BY_ID_URL}/${orderId}`, {
      headers: this.getHeader()
    });
  }
};
