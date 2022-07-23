import { ApiService } from "./api.service";
import { ListModel } from "netflix-malet-types";

export class ListService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  public async getAll() {
    try {
      return await this.apiService.privateReq.get<ListModel[]>(`/lists/all`);
    } catch (error) {
      throw error;
    }
  }
}
