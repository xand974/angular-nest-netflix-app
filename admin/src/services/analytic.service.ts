import { ApiService } from "./api.service";

export type AnalyticType = {
  _id: number;
  total: number;
};

export type ResponseType = {
  data: {
    data: string;
    analytics: AnalyticType[];
  };
};
export class AnalyticsService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  public async getUsersTimeline() {
    try {
      const res = (await this.apiService.privateReq.get(
        "/analytics/timeline-users"
      )) as ResponseType;
      return res.data.analytics as AnalyticType[];
    } catch (error) {
      throw error;
    }
  }
}
