import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AddUserInfosDto } from './dto/add-user-infos.dto';
import { UserInfosService } from './user.infos.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('api/user-infos')
export class UserInfosController {
  private logger: Logger = new Logger(UserInfosController.name);
  constructor(private readonly userInfosService: UserInfosService) {}

  @Post('add-user-info')
  public async addUserInfo(@Body() addUserInfosDto: AddUserInfosDto) {
    this.logger.log(`proceed to add infos`);
    const user = await this.userInfosService.addUserInfos(addUserInfosDto);
    return user;
  }

  @Get('get')
  public async getInfos(@Query('u') username: string) {
    this.logger.log(`proceed to get infos`);
    return await this.userInfosService.getUserInfos(username);
  }
}
