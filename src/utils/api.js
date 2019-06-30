import axios from 'axios';

const BASE_URL = "https://altpower.herokuapp.com/v1";
const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer`;
const CUSTOMER_LOGIN_URL = `${BASE_URL}/user/login`;
const ALL_PRODUCTS_URL = `${BASE_URL}/product`;
const ADD_TO_CART_URL = `${BASE_URL}/cart`;
const SINGLE_PRODUCT_URL = `${BASE_URL}/product`;
const GET_CART_URL = `${BASE_URL}/cart`;

export default {
  getHeader(){
    let header = { 
      Authorization: "bearer "+localStorage.getItem('token')
    }
    return header;
  },
  signupCustomer: data => {
    return axios.post(CUSTOMER_SIGNUP_URL, data);
  },
  loginCustomer: data => {
    return axios.post(CUSTOMER_LOGIN_URL, data);
  },
  getAllProducts: () => {
    return axios.get(ALL_PRODUCTS_URL);
  },
  getProductBySlug: slug  => {
    return axios.get(`${SINGLE_PRODUCT_URL}/${slug}`);
  },
  addProductToCart(pid) { 
    let data = {}
    return axios.post(`${ADD_TO_CART_URL}/${pid}`, data, {headers: this.getHeader()});
  },
  getCart() {
    return axios.get(`${GET_CART_URL}`, {headers: this.getHeader()});
  } 
};