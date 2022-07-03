import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/roles';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AnalyticsService } from './analytics.service';
import { Roles } from '../roles/roles.decorator';

@UseGuards(AuthenticatedGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Roles(Role.Admin)
  @Get('timeline-users')
  private async timelineUsers() {
    const analytics = await this.analyticsService.getUsersByDate();
    return {
      data: 'success',
      analytics,
    };
  }
}
