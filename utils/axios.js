//config axios for all project
//config interceptors
// take value from .env file


import axios from 'axios';
import {DOMAIN_API} from "../helpers/contants"
const Cookie = process.client ? require("js-cookie") : undefined;
/* request pre-processing */
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export const AxiosAuth = axios.create({
  baseURL: DOMAIN_API
});
