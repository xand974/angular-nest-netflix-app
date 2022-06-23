import axios, { AxiosRequestConfig } from "axios";
import { AxiosInstance } from "axios";
export class ApiService {
  public publicReq: AxiosInstance;
  public privateReq: AxiosInstance;

  constructor() {
    this.publicReq = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    this.privateReq = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    this.privateReq.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}
