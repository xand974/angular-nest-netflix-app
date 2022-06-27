import { ApiService } from "./api.service";
import { UserModel } from "netflix-malet-types";

export class UserService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  public async getNewUsers(limit?: number) {
    try {
      if (!limit)
        return await this.apiService.privateReq.get<UserModel[]>(
          `/users/get-all`
        );
      return await this.apiService.privateReq.get<UserModel[]>(
        `/users/get-all?limit=${limit}`
      );
    } catch (error) {
      throw error;
    }
  }
}
