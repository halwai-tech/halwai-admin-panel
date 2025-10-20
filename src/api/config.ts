import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiUrl } from "./serverConstant";
import Cookies from "js-cookie";



export const authApi = axios.create({
  baseURL: ApiUrl.authenticationUrl,
});

// secured api for admin api
export const securedAdminApi = axios.create({
  baseURL: ApiUrl.adminUrl,
});

// public api for non-token api
export const publicAdminApi=axios.create({
  baseURL:ApiUrl.adminUrl
})

export const publicUserApi=axios.create({
  baseURL:ApiUrl.userUrl
})

export const publicEnquiryApi=axios.create({
  baseURL:ApiUrl.enquiryUrl
})


// adding token to headers for making it secure
securedAdminApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


