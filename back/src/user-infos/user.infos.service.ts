import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AddUserInfosDto } from './dto/add-user-infos.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfos } from './schema/user-infos.schema';
import { UserModel } from 'netflix-malet-types';
@Injectable()
export class UserInfosService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(UserInfos.name)
    private readonly userInfosModel: Model<UserInfos>,
  ) {}

  async addUserInfos(addUserInfosDto: AddUserInfosDto) {
    const user = await this.userService.getUser(addUserInfosDto.userId);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    const newUser = new this.userInfosModel(addUserInfosDto);
    await newUser.save();
    return newUser;
  }

  async getUserInfos(username: string): Promise<UserModel> {
    const user = await this.userService.getByUsername(username);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    const { password, roles, createdAt, updatedAt, ...rest } = user;

    return rest;
  }
}
