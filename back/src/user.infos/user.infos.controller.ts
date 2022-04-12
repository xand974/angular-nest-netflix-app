import { Body, Controller, Post } from '@nestjs/common';
import { AddUserInfosDto } from './dto/add-user-infos.dto';
import { UserInfosService } from './user.infos.service';

@Controller('api/user-infos')
export class UserInfosController {
  constructor(private readonly userInfosService: UserInfosService) {}

  @Post('add-user-info')
  public async adduserInfo(@Body() addUserInfosDto: AddUserInfosDto) {
    const user = await this.userInfosService.addUserinfos(addUserInfosDto);
    return user;
  }
}
