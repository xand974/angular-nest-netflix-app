import { ApiService } from "./api.service";
import { MovieModel } from "netflix-malet-types";

export class FilmService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  public async getAllMovies(limit?: number) {
    try {
      if (!limit)
        return await this.apiService.privateReq.get<MovieModel[]>(
          `/movies/all`
        );
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string) {
    try {
      return await this.apiService.privateReq.get<MovieModel>(
        `/movies/get-one?id=${id}`
      );
    } catch (error) {
      throw error;
    }
  }
}
