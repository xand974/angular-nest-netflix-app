import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AnalyticsService {
  private _logger = new Logger(AnalyticsService.name);
  constructor(private userService: UsersService) {}

  public async getUsersByDate() {
    try {
      const usersTimeline = await this.userService.getNewUsersByDate();
      return usersTimeline;
    } catch (error) {
      throw error;
    }
  }
}
