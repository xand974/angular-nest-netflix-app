import axios, { AxiosRequestConfig } from "axios";
import { AxiosInstance } from "axios";
export class LoginService {
  public publicReq: AxiosInstance;
  public privateReq: AxiosInstance;
  private BaseURL = process.env.REACT_APP_API_URL;

  constructor() {
    this.privateReq = axios.create({
      baseURL: this.BaseURL,
    });
    this.publicReq = axios.create({ baseURL: this.BaseURL });
    this.privateReq.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //   const TOKEN = store.getState().user?.currentUser?.accessToken;
        const TOKEN = "";
        const auth = TOKEN ? `Bearer ${TOKEN}` : "";
        //   config.headers?.common["authorization"] = auth;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}
