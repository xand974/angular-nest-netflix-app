import { UserModel } from "netflix-malet-types";
import { ApiService } from "../../services/api.service";
import { AppDispatch } from "../../context/store";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
} from "context/slices/user-slice";
export class LoginService {
  public apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  public async signIn(credentials: Partial<UserModel>, dispatch: AppDispatch) {
    try {
      dispatch(loginStart());
      await this.apiService.privateReq.post("/auth/login", {
        ...credentials,
      });
      const res = await this.getUserProfile(credentials.username ?? "");
      console.log(res);

      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFailure());
      throw error;
    }
  }
  public async getUserProfile(username: string): Promise<UserModel | any> {
    try {
      if (!username) throw new Error("cannot login");
      return await this.apiService.privateReq.get<UserModel>(
        `/user-infos/get?u=${username}`
      );
    } catch (error) {
      throw error;
    }
  }

  public async signOut(dispatch: AppDispatch) {
    try {
      localStorage.clear();
      await this.apiService.privateReq.post("/auth/logout", {});
      dispatch(logoutUser());
    } catch (error) {
      throw error;
    }
  }

  public async checkAuth(): Promise<boolean> {
    try {
      localStorage.clear();
      return await (
        await this.apiService.privateReq.get("/auth/check-auth", {})
      ).data;
    } catch (error) {
      throw error;
    }
  }
}
