import axios from 'axios';

const BASE_URL = "https://altpower.herokuapp.com/v1";
const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer`;
const PRODUCTS_URL = `${BASE_URL}/product`;

export default {
  signupCustomer: data => {
    return axios.post(CUSTOMER_SIGNUP_URL, data);
  },
  getAllProducts: () => {
    return axios.get(PRODUCTS_URL);
  }
};