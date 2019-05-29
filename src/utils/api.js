import axios from 'axios';

const BASE_URL = "https://altpower.herokuapp.com/v1";
const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer`;

export default {
  signupCustomer: data => {
    return axios.post(CUSTOMER_SIGNUP_URL, data);
  },
};