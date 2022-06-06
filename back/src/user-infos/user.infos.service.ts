import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AddUserInfosDto } from './dto/add-user-infos.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfos } from './schema/user-infos.schema';
import { UserModel } from 'netflix-malet-types';
@Injectable()
export class UserInfosService {
  private logger = new Logger(UserInfosService.name);
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

  async getInfosById(id: string) {
    const user = await this.userInfosModel.findById(id);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    return user;
  }

  async getByUserId(userId: string) {
    const user = await this.userInfosModel.findOne({ userId: userId });
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    return user['_doc'] as UserModel;
  }

  async getUserInfos(username: string): Promise<Partial<UserModel>> {
    const user = await this.userService.getByUsername(username);
    const userInfos = await this.getByUserId(user?._id);
    if (!user || !userInfos)
      throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    const { password, roles, createdAt, updatedAt, ...rest } = user;
    const {
      _id,
      createdAt: created,
      updatedAt: updated,
      ...restInfos
    } = userInfos;
    const infos = {
      ...restInfos,
      ...rest,
    };

    return infos;
  }

  async addToFavorites(userId: string, movieId: string) {
    this.logger.log(`add ${movieId} to favorites`);

    const newUser = await this.userInfosModel.findOneAndUpdate(
      { userId },
      { $push: { favorites: movieId } },
      { new: true },
    );
    return newUser;
  }

  async removeFromFavorites(userId: string, movieId: string) {
    this.logger.log(`remove ${movieId} from favorites`);

    const newUser = await this.userInfosModel.findOneAndUpdate(
      { userId },
      { $pull: { favorites: movieId } },
      { new: true },
    );
    return newUser;
  }
}
