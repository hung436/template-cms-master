import axios from 'axios';
import {DOMAIN_CMS} from "../helpers/contants"
export const AxiosApiCMS = axios.create({
  // baseURL: "http://api-nbbe.tuoitre.vn"
  baseURL: DOMAIN_CMS
});
export const AxiosApiS3 = axios.create({
  // baseURL: "https://ec2-52-199-77-183.ap-northeast-1.compute.amazonaws.com",
  baseURL: "http://192.168.169.28"
});
